class Feature
  attr_accessor :id, :name, :status, :parent, :children, :siblings

  # create feature object from JSON representation
  # id = from key
  # name = text in feature box
  # status = mandatory / optional - arrowheadFill
  # parent = key of parent
  # child = key(s) of children
  # fields have default values to account for errors in parsing
  def initialize(
                id = -1,          # int
                name = "error",   # string
                status = nil,     # string
                parent = nil,     # int
                children = [],    # [int]
                siblings = []     # [int]
                )
    @id = id
    @name = name
    @status = status
    @parent = parent
    @children = children
    @siblings = siblings
  end
end
