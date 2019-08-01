class ApplicationController < ActionController::Base
    helper_method :current_user, :logged?

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def require_to_be_logged
        render json ['Please login or create a new account!'], status: 401
    end
end
