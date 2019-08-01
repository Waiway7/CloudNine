import React from 'react';
import LoginFormContainer from './login_container';
import SignupFormContainer from './signup_container';

// export default ({modal, closeModal, switchForm}) => {
//     if (!modal){
//         return null;
//     }
//     let componentContainer;
//     let switchModal;
//     switch (modal){
//         case 'login':
//             componentContainer = <LoginFormContainer />
//             break;
//         case 'signup':
//             componentContainer = <SignupFormContainer />
//             break;
//         default:
//             return null;
//     }

//     return (
//         <div className="modal-background" onClick={() => closeModal()}>
//         <div className="close-x-btn" onClick={() => closeModal()}>X</div>
//             <div className="modal-form" onClick={e => e.stopPropagation()}>
//                 {componentContainer}
//                  <div className="okay">
//                      <button onClick={() => switchForm(switchModal)}>Change me</button>
//                  </div>
//             </div>
//         </div>
//     )

// }

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
            modal === 'signup' ? changeModal= 'login' : changeModal = 'signup'; 
            modal === 'signup' ? formType = 'Sign in' : formType = 'Create account'; 
            modal === 'login' ? message = "Don't have an account?" : message = "Have an account?";
            return (
                <div className="modal-background" onClick={() => this.closeModal()}>
                <div className="close-x-btn" onClick={() => this.closeModal()}>X</div>
                    <div className="modal-form" onClick={e => e.stopPropagation()}>
                        <div className="modal-container">
                            {this.switchForm()}
                            {this.successfulLogin()}
                            <div className="other-btns">
                                <p className="message-session">{message}</p>
                                <button className="change-session-btn" onClick={() => this.switchModal(changeModal)}>
                                    {formType}
                                </button>
                                <p className="message-session">Sign in as a demo user instead!</p>
                                <button className="demo-user-btn" 
                                    onClick={() => this.props.demoLogin({email: "cloudnine@gmail.com", password: "hunter12"})}>
                                    Demo as user: High Nine
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