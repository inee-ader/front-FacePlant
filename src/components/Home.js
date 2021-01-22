import React, { Component } from 'react';
import Registration from './auth/Registration'; 
import Login from './auth/Login'

class Home extends Component {

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div className="home-div">
                <h1>{this.props.user.username} Status: {this.props.loggedInStatus}</h1>
                <Registration 
                    handleSuccessfulAuth={this.handleSuccessfulAuth} 
                />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                
            </div>
        );
    }
}

export default Home;
