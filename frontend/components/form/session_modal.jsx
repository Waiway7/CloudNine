import React from 'react';
import LoginFormContainer from './login_container';
import SignupFormContainer from './signup_container';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.closeModal = this.props.closeModal.bind(this);
        this.switchModal = this.props.switchModal.bind(this);
    }

    successfulLogin(){
        if (this.props.session) {
            this.closeModal()
        } 
        return;
    }

    switchForm(){
        if (!this.props.modal){
            return null;
        }
        let componentContainer;
        switch (this.props.modal){
            case 'login':
                componentContainer = <LoginFormContainer />
                break;
            case 'signup':
                componentContainer = <SignupFormContainer />
                break;
            default:
                return null;
        }
        return componentContainer
    }



    render(){
        const {modal} = this.props;
        if (modal != null){
            let changeModal;
            let formType;
            let message;
            let formTitle;
            let formText
            let modalForm
            modal === 'signup' ? changeModal= 'login' : changeModal = 'signup'; 
            modal === 'signup' ? formType = 'Sign in' : formType = 'Create account'; 
            modal === 'login' ? message = "Don't have an account?" : message = "Have an account?";
            modal === 'login' ? formTitle = null : formTitle = "Create your CloudNine account";
            modal === 'login' ? formText = "login-form-title" : formText = "signup-form-title";
            modal === 'login' ? modalForm = "modal-container login-fc" : modalForm = "modal-container signup-fc"

            return (
                <div className="modal-background" onClick={() => this.closeModal()}>
                <div className="close-x-btn" onClick={() => this.closeModal()}>X</div>
                    <div className="modal-form" onClick={e => e.stopPropagation()}>
                    <div className={formText}>{formTitle}</div>
                        <div className={modalForm}>
                        <button className="demo-user-btn" 
                                    onClick={() => this.props.demoLogin({email: "cloudnine@gmail.com", password: "hunter12"})}>
                                    Demo as user: CloudNine
                        </button>
                            {this.switchForm()}
                            {this.successfulLogin()}
                            <div className="other-btns">
                                <p className="message-session">{message}</p>
                                <button className="change-session-btn" onClick={() => this.switchModal(changeModal)}>
                                    {formType}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
            }
        return (<></>);
    }
}   

export default Modal;