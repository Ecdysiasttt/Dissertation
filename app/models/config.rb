class Config
  attr_accessor :to, :from, :requirement

  def initialize(
                features = [],
                selected = []
              )
    @features = features
    @selected = selected
  end

end