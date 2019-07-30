import React from 'react';

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
        this.props.userForm(this.state)
    }

    renderErrors() {
        if (!this.props.errors){ return;}
        const error = this.props.errors.map((error, idx) => { 
            return (
                <li key={`session-error-${idx}`}>
                    {error}
                </li>
        )}) 
        return (
            <ul>
                {error}
            </ul>
        )
    }

    loginInput(){
        return (
            <form onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        <label className="login-email">Email
            <input type="text"
                value={this.state.email}
                placeholder="Your email address"
                onChange={this.update('email')}
                className="login-input"
            />
        </label>
        <label className="login-password">password
            <input type="password" 
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Your Password"
                className="login-input"
            />
        </label>
        <br/>
        <input className="submit-form" type="submit" value={this.props.formType}/>
        </form>
        )
    }

    signupInput(){
        return (
            <form onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        <label className="signup-email">Email
            <input type="text"
                value={this.state.email}
                placeholder="Your email address"
                onChange={this.update('email')}
                className="signup-input"
            />
        </label>
        <label className="signup-username">Username
            <input type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.update('username')}
                className="signup-input"
            />
        </label>
        <label className="signup-password">password
            <input type="password" 
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Your Password"
                className="signup-input"
            />
        </label>
        <br/>
        <input className="submit-form" type="submit" value={this.props.formType}/>
        </form>
        )
    }

    render(){
        
        if (this.props.formType === 'Login')
        { return (
            <div className='login-form-container'>
                <h2>Login</h2>
                {this.loginInput()}
            </div>
        )}
    }       
}

export default Form;