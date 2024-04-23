class Ctc
  attr_accessor :to, :from, :requires

  # create ctc from JSON representation
  # to = feature[] index from which the ctc comes from
  # from = feature[] index to which the ctc points to
  # requires(?) = whether ctc is requires (true) or excludes (false)
  def initialize(
                to = nil,           #int
                from = nil,         #int
                requires = nil      #bool         
                )
    @to = to
    @from = from
    @requires = requires
  end
end
