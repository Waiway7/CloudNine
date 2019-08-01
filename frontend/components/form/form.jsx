import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: '', username: '', password: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field){
        return (e) => this.setState({[field]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.userForm(this.state);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, idx) => (
                    <li key={`error-${idx}`}>{error}</li>
                ))}
            </ul>
        );
    }

    loginInput(){
        return (
            <form className="session-form-box" onSubmit={this.handleSubmit}>
                {this.renderErrors()}
                    <input type="text" 
                        value={this.state.email}
                        placeholder="Your email address"
                        onChange={this.update('email')}
                        className="signup-input"
                     />
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className="signup-input"
                    />
                <input className="submit-form" type="submit" value={this.props.formType}/>
            </form>
        )
    }

    signupInput(){
        return (
            <form className="session-form-box" onSubmit={this.handleSubmit}>
                {this.renderErrors()}
                {/* <label className="signup-email">Email */}
                    <input type="text"
                        value={this.state.email}
                        placeholder="Your email address"
                        onChange={this.update('email')}
                        className="signup-input"
                    />
                {/* </label> */}
                {/* <label className="signup-username">Username */}
                    <input type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.update('username')}
                        className="signup-input"
                    />
                {/* </label> */}
                {/* <label className="signup-password">password */}
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className="signup-input"
                    />
                {/* </label> */}
                    <input className="submit-form" type="submit" value={this.props.formType}/>
            </form>
        )
    }
    

    render(){
        
        const {switchForm} = this.props

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