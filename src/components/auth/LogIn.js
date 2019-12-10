import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class LogIn extends Component {

    state = {

    } 
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value}, () => {
            console.log(this.state)

        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        let user = await actions.logIn(this.state);
        this.props.setUser({...user.data})  
    }
    render() {
        return (
            <Fragment>
                <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                <p>email:</p>
                    <input name="username" type="text" onChange={this.handleChange} />
                <p>Password:</p>
                    <input name="password" type="password" onChange={this.handleChange} />
                    {/* <input type="submit" value="Log In"/> */}
                    <button>Submit</button>
                </form>
            </Fragment>
        );
    }
}

export default LogIn;