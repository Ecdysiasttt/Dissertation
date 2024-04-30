class ValidConfigsJob
  include Sidekiq::Job

  def perform(features, leaves, depth, ctcs, rootFeature)
    @numFeatures = features.size - 1
    @features = features
    getValidConfiguations(leaves, depth, ctcs, rootFeature)
    # find all valid configurations for the system
    # need to iterate through each feature, and for each valid status (selected/not),
    # obtain all valid configurations for other features
    # probably will have to check for identical configs - scope for optimisation
  end

  # will obtain all valid configurations given a particular feature model diagram
  def getValidConfiguations(leaves, depth, ctcs, rootFeature)
    puts "Features: #{@features.size}"
    # print feature contents
    @features.each do |f|
      puts "Feature: #{f.name} (#{f.status})"
    end

    puts "getting all valid configs..."
    configsCount = 0
    # puts "got all configs. Checking validity..."

    validConfigs = []

    # go through all configs to check validity
    eachConfig do |c|
      configsCount += 1
      validConfig = true
      # puts "============================="
      # puts "Configuration: #{c}"
      # puts "============================="
      catch :nextConfig do  # allows us to jump ahead to next combination if an error is found
        # puts "========= new config ========="
        c.each do |combination|
          # combination looks like: [Feature(as object), 1/0]
          feature = combination[0]      # separate combination into parts for readability
          selection = combination[1]
          # puts "========"
          # puts "Feature: #{feature.name} (#{feature.status}) selected: #{selection}"
          # if a feature is mandatory and not selected, throw config away
          #   will eliminate a huge chunk of invalid configs, reserving the
          #   more in-depth checking for a smaller number of configs
          if (feature.status == "Mandatory" && selection == 0)
            # puts "  Mandatory feature #{feature.name} not selected. Invalid."
            validConfig = false
            throw :nextConfig   # jump to next configuration
          # if a feature is alternate (i.e., one or the other)
          # OR feature is or (i.e. one or both) and hasn't been selected
          # then check for a status clash with sibling.
          # these two checks will catch all invalid configs before CTCs are checked
          elsif (feature.status == "Alternative" || (feature.status == "Or" && selection == 0))
            # if (feature.status == "Alternative")
            # x = (selection == 1) ? " " : " not "
            # puts "Checking #{feature.name}'s #{feature.siblings.size} siblings. #{feature.name} is#{x}selected"
            # end
            validConfig = checkSiblings(feature, selection, c)
          end

          if ((feature.status == "Alternative" || feature.status == "Or") && selection == 1)
            # check if parent hasn't been selected
            parent = Fmodel.findFeatureFromKey(@features, feature.parent)
            # puts "Checking if #{feature.name}'s parent: #{parent.name} (status : #{parent.status}) is also selected"
            # puts "  Checking if #{feature.name}'s (selected: #{selection}) parent: #{parent.name} (status : #{parent.status}) is also selected "
            isParentSelected = c.find_index([parent, 0]).nil? # will return true if parent is not unselected
            if (!isParentSelected)
              # puts "    #{feature.name}'s parent: #{parent.name} isn't selected"
              validConfig = false
            end
            # elsif (parentSelected.)
          end

          # TODO make it so features with optional parents are allowed to be not selected

          ctcs.each do |constraint|
            if (constraint.from == feature.id) # constraint present for this feature
              # puts "  Constraint found between #{feature.name} and #{@features[constraint.to].name}"
              # if feature is selected, and ctc excludes another feature:
              #   if targeted feature is also selected, invalid
              #   if targeted feature not selected, valid
              # if feature is selected, and ctc required another feature:
              #   if targeted feature is also selected, valid
              #   if targeted feature is not selected, invalid
              isConstraintTargetSelected = c.find_index([Fmodel.findFeatureFromKey(@features, constraint.to), selection])
              if ((constraint.requires && selection == 1) && !isConstraintTargetSelected)
                validConfig = false
              elsif ((!constraint.requires && selection == 1) && isConstraintTargetSelected)
                validConfig = false
              end
            end
          end

          if !validConfig
            # puts " Invalid config"
            throw :nextConfig   # jump to next configuration
          elsif validConfig
            # puts "Valid config found!"
          end
        end
      end
      if validConfig
        # puts "Valid config found!"
      end
      validConfigs << c if validConfig
    end
    
    puts "#{validConfigs.size} valid configurations for this model"
    
    # # keep for debugging when rendering in table
    # validConfigs.each do |c|
    #   c.each do |combination|
    #     print "#{combination[0].name} #{combination[1]}. "
    #   end
    #   puts ""
    # end
    validConfigs
  end

  # obtain all possible configurations for a given feature model.
  # this gets very very big.
  def eachConfig
    # Range from 0-2^(numFeatures - 1). Represents all possible
    # combinations of bits.SS
    (0..(2**@numFeatures - 1)).each do |i|
      config = []
      # Iterate for as many features there are
      @numFeatures.times do |j|
        feature = @features.drop(1)[j]    # Drop the 1st element (root feature) and remove any nil features
        value = (i >> j) & 1              # Assign 0/1 using bitwise operations
        config << [feature, value]        # Add feature selection to current config
      end
      # Check if i is a multiple of 1,000,000
      if i % 10_000_000 == 0
        puts "Iteration #{i}"
      end
      yield config  # Yield the current config
    end
  end

  # checks for status conflicts with siblings, given
    #   - feature as an object
    #   - feature's selection in a given configuration
    #   - the given configuration
    # if any sibling is found to have a conflicting selection status, return true, else false
    # if the feature's status is or (i.e. at least one, but can be all), check for if sibling statuses == 0
    #   if the feature's status is alternate (i.e. exactly one), then:
    #     IF the feature's selection == 1, if any sibling has selection of 1, invalid
    #     IF the feature's selection == 0, if more than one sibling has selection of 1, invalid
    # if the feature's status is or (i.e. at least one), then:
    #    IF the feature's selection == 0, if no sibling has selection of 1, invalid
    #    IF the feature's selection == 1, valid
    def checkSiblings(feature, selection, config)
      siblingsWithSameSelection = 0
      siblingsWithDifferentSelection = 0
      oppositeSelection = ((selection == 1) ? 0 : 1)

      feature.siblings.each do |siblingKey|
        siblingObject = Fmodel.findFeatureFromKey(@features, siblingKey)

        doesSiblingHaveSameSelection = config.find_index([siblingObject, oppositeSelection]).nil? #true if not found

        if doesSiblingHaveSameSelection
          siblingsWithSameSelection += 1
        else
          siblingsWithDifferentSelection += 1
        end
      end

      if (feature.status == "Alternative")
        if (selection == 1)
          if (siblingsWithSameSelection > 0 )
            # puts "    Invalid!!\n\n"
            return false
          end
        else
          if (siblingsWithDifferentSelection != 1)
            # puts "    Invalid!!\n\n"
            return false
          end
        end
      else
        if (selection == 0)
          if (siblingsWithDifferentSelection == 0)
            # check for if parent is also not selected.
            # in this case, the selection is not invalid.
            parent = Fmodel.findFeatureFromKey(@features, feature.parent)
            isParentSelected = config.find_index([parent, 0]).nil? # true if parent is selected

            if (isParentSelected)
              return false
            end
          end
        end
      end

      true
    end
end
