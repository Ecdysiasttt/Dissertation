class IndexController < ApplicationController

  # GET /
  def index
    addUname = "!"
    if user_signed_in?
      addUname = ", #{current_user.username}!"
    end

    @title = "Home"
    @header = "Welcome to Software Products Online#{addUname}"
  end

end