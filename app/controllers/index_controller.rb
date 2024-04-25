class IndexController < ApplicationController

  # GET /
  def index
    @title = "Home"
    @header = "Welcome to Software Products Online!"
  end

end