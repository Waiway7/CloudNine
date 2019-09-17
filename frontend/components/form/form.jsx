import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', username: '', password: ''};
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field){
        return (e) => this.setState({[field]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const {errors} = this.props
        let errorEmail;
        let errorUsername;
        let errorPassword;
        errors.forEach((error) => {
            if (error.includes("Email")) {errorEmail = error}
            else if (error.includes("Username")) {errorUsername = error}
            else if (error.includes("Password")) {errorPassword = error}
        })
        this.setState({errorEmail,errorUsername, errorPassword})
        this.props.userForm(this.state);
    }


    // renderErrors() {
    //     const listErrors = (
    //         <ul>
    //             {this.props.errors.map((error, idx) => (
    //                 <li key={`error-${idx}`}>{error}</li>
    //             ))}
    //         </ul>
    //     );
    //     return listErrors
    // }

    clearErrors(){
        this.props.resetErrors();
    }

    clearUserError(){
        this.setState({errorUsername: undefined})
    }

    clearPasswordError(){
        this.setState({errorPassword: undefined})
    }

    clearEmailError(){
        this.setState({errorEmail: undefined})
    }

    loginInput(){
        const {errors} = this.props
        const usernameError = errors[0] != undefined ? errors[0] : null;
        const passwordLengthError = errors[1] !== undefined && this.state.password.length < 6 ? errors[1] : null;
        let email = "signup-input";
        if (usernameError) {email = "signup-input error-signup";}
        let password = "signup-input";
        if (passwordLengthError) {password = "signup-input error-password"}
        return (
            <form className="session-form-box" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" 
                        value={this.state.email}
                        placeholder="Your email address"
                        onChange={this.update('email')}
                        className={email}
                        onClick={this.clearErrors.bind(this)}
                     />
                     <div className="error-credentials" >{usernameError}</div>
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className={password}
                        onClick={this.clearErrors.bind(this)}
                    />
                    <div className="error-credentials" >{passwordLengthError}</div>
                <input className="submit-form" type="submit" value={this.props.formType}/>
            </form>
        )
    }

    signupInput(){
        const email = this.state.errorEmail !== undefined ? "signup-input error-signup" : "signup-input";
        const username = this.state.errorUsername !== undefined ? "signup-input error-signup" : "signup-input";
        const password= this.state.errorPassword !== undefined ? "signup-input error-signup" : "signup-input";

        return( <form className="session-form-box" onSubmit={this.handleSubmit.bind(this)}>
                {/* <label className="signup-email">Email */}
                    <input type="text"
                        value={this.state.email}
                        placeholder="Your email address"
                        onChange={this.update('email')}
                        className={email}
                        onClick={this.clearEmailError.bind(this)}
                    />
                    <div className="error-credentials">{this.state.errorEmail}</div>
                {/* </label> */}
                {/* <label className="signup-username">Username */}
                    <input type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.update('username')}
                        className={username}
                        onClick={this.clearUserError.bind(this)}
                    />
                    <div className="error-credentials">{this.state.errorUsername}</div>
                {/* </label> */}
                {/* <label className="signup-password">password */}
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className={password}
                        onClick={this.clearPasswordError.bind(this)}
                    />
                    <div className="error-credentials">{this.state.errorPassword}</div>

                {/* </label> */}
                    <input className="submit-form" type="submit" value={this.props.formType}/>
            </form>
        )
    }
    

    render(){
        
        if (this.props.formType === 'Login')
            { return (
            <div className='form-container'>
                {this.loginInput()}
                {/* <button className="switch-form" onClick={() => switchForm()}>Roar</button> */}
            </div>
        )}
        if (this.props.formType === 'Create account'){return(
            <div className='form-container'>
                {this.signupInput()}
                {/* <button className="switch-form" onClick={() => switchForm()}>Roar</button> */}
            </div>
        )}
    }       
}

export default withRouter(Form);