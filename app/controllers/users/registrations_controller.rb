# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  def new
    redirect_to new_user_session_path
  end

  # # POST /resource
  # def create
  #   super
  # end

  # POST /resource
  def create
    # super
    super do |resource|
      if !resource.persisted?
        flash[:notice] = flash[:notice].to_a.concat resource.errors.full_messages
        redirect_back fallback_location: root_path and return
      end
    end
  end

  # def build_resource(hash=nil)
  #   super
  #   @sign_up_user = self.resource
  # end

  # GET /resource/edit
  def edit
    super
  end

  # PUT /resource
  def update
    super do |resource|
      if !resource.errors.empty?
        puts "failed to save user \n\n\n"
        flash[:notice] = flash[:notice].to_a.concat resource.errors.full_messages
        redirect_back fallback_location: root_path and return        
      # else
      #   flash[:notice] = flash[:notice].to_a.concat resource.errors.full_messages
      #   redirect_back fallback_location: root_path and return  
      end
    end
  end

  # DELETE /resource
  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    super
  end

  # protected

  # # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  #   # devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me) }
  # end

  

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
