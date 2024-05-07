# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  created_by :integer
#  graph      :string
#  notes      :string
#  title      :string
#  visibility :integer          default("global")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class Fmodel < ApplicationRecord
  enum visibility: { global: 0, unlisted: 1, followers: 2 }

  paginates_per = 10  #set pagination limit

  def getCreator
    creator = ""
    if self.created_by.nil?
      creator = "Guest"
    elsif User.current.present? && User.current.id == self.created_by
      creator = "You"
    else
      creator = User.find_by(id: self.created_by).username
    end
    creator
  end

  # true if user made the model or is an admin
  def canModify
    User.current.present? && (User.current.id == self.created_by || User.current.isAdmin)
  end

  def getVisibility
    if self.visibility == "global"
      return "Public"
    elsif self.visibility == "unlisted"
      return "Private"
    else
      return "Followers"
    end
  end

  def self.findFeatureFromKey(features, key)
    return (features.select { |feat| feat.id == key}).first
  end

  # parse JSON
  # middle-man function that handles passing data to the right functions
  def self.parseJson(json, features, links, ctcs)
    json = JSON.parse(json)

    createFeatures(json, features)    # create feature objects
    createLinks(json, links, ctcs)          # create link objects

    parseFeatures(features, links)    # link objects and links together
  end

  # iterates through features in the JSON to convert to objects
  def self.createFeatures(json, features)
    json["nodeDataArray"].each do |feature|        
      # create new feature, supplying the key as the id and the text as the name
      feature = Feature.new((feature['key'].to_i.abs - 1), feature['text'])

      # add newly created feature to features array
      features << feature
    end
  end

  # iterates through links in the JSON to convert to objects
  def self.createLinks(json, links, ctcs)
    json["linkDataArray"].each do |link|
      if (link['arrowShape'] == "Standard") #ctc
        requires = !(link['fromArrowShape'] == "Backward")

        ctc = Ctc.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requires)

        ctcs << ctc
      else
        # set requirement status according to arrowhead fill
        requirement = (link['arrowheadFill'] == "white") ? "Optional" : "Mandatory"

        # create new link with 'to'/'from' matching IDs in features[] and requirement status
        link = Link.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requirement)
          
        # add newly created link to links array
        links << link
      end
    end
  end

  # associate links with features in order to finalise programmatic representation
  def self.parseFeatures(features, links)
    features.each do |f|
      links.each do |l|
        if (l.from == -1 && l.to == -1)
          return {
            error: "floatingLink",
            message: "Link is disconnected."
          }
        elsif (l.from == -1)
          return {
            error: "floatingLink",
            message: "Link is not connected at its origin."
          }
        elsif (l.to == -1)
          return {
            error: "floatingLink",
            message: "Link is not connected at its destination."
          }
        end
        # if the current link originates from the current feature
        if (f.id == l.from)
          targetFeature = findFeatureFromKey(features, l.to)
          if (targetFeature.parent.nil?)           # if link is pointing to something WITHOUT a parent:
            targetFeature.status = l.requirement   #   - set requirement status of target feature
            targetFeature.parent = f.id            #   - set target feature's parent to current feature
            f.children << l.to                      #   - add target feature as a child of current feature
          else                                      # if link is pointing to something WITH a parent:
            f.status = l.requirement                #   - set requirement status of current feature
            f.parent = l.to                         #   - set current feature's parent as target feature
            targetFeature.children << f.id         #   - add current feature as a child of target feature
          end
        end
      end
    end

    # after initial traversal, repeat to:
    #   - obtain siblings
    #   - set status of root feature
    #   - verify consistency of siblings wrt alternative/or selections
    features.each do |f|          
      # if feature has a parent and parent has more than one child
      parent = findFeatureFromKey(features, f.parent)
      if (!f.parent.nil? && parent.children.size > 1)
        parent.children.each do |sibling|
          if (sibling != f.id && !f.siblings.include?(sibling))
            f.siblings << sibling
          end
        end
      end

      # if feature has no parent and no status, must be root feature:
      if (f.parent.nil? && f.status.nil?)
        f.status = "Root"
      end          
    end

    # traverse once more to collect features and their siblings that point to their parents,
    # i.e. in the case of an alternative/or situation.
    # check for consistency with requirement selection.
    features.each do |f|
      matchingSiblings = Array.new
      links.each do |l|
        # if a link from a feature is pointing to its parent
        if (f.id == l.from && f.parent == l.to)
          # if status of sibling matches, add to array
          f.siblings.each do |s|
            sibling = findFeatureFromKey(features, s)
            if (sibling.status == f.status)
              matchingSiblings << s
            end
          end
          
          # !! if this check fails, there's an issue in the diagram's creation
          if (matchingSiblings.size == f.siblings.size)
            # replace status to match the standard terminology for feature models
            newStatus = (f.status == "Mandatory" || f.status == "Or") ? "Or" : "Alternative"
                      
            # apply new status to all siblings
            f.status = newStatus
            matchingSiblings.each do |s|
              sibling = findFeatureFromKey(features, s)
              sibling.status = newStatus
            end
          else
            puts "Error: Inconsistent requirement selection in feature model."
            # return name of parent feature
            return {
              error: "groupRequirementInconsistent",
              message: "Please ensure the requirements for links pointing towards #{findFeatureFromKey(features, f.parent).name} are consistent."
            }
          end
        end 
      end
    end
    return { }
  end

  def self.printFeatures(features)
    features.each do |f|
      puts "\n#{f.name}:"
      puts "  ID:     #{f.id}"
      puts "  Name:   #{f.name}"
      puts "  Status: #{f.status}"
      if (f.parent.nil?)
        puts "  Parent: None"
      else
        puts "  Parent: #{Fmodel.findFeatureFromKey(features, f.parent).name}"
      end
      puts "  Children:"
      f.children.each do |c|
        puts "    #{Fmodel.findFeatureFromKey(features, c).name}"
      end
      puts "  Siblings:"
      f.siblings.each do |s|
        puts "    #{Fmodel.findFeatureFromKey(features, s).name}"
      end
    end
  end

end
