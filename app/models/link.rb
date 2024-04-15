class Link
  attr_accessor :to, :from, :requirement

  # create link from JSON representation
  # to = feature[] index from which the link comes from
  # from = feature[] index to which the link points to
  # requirement = mandatory, optional, alternative, or (from arrowheadFill)
  def initialize(
                to = nil,           #int
                from = nil,         #int
                requirement = nil   #string         
                )
    @to = to
    @from = from
    @requirement = requirement
  end

end