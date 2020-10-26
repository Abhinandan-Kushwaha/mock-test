import React from 'react';
import './index.css';
import API from '../../utils/API';
import { Button } from '../../components/Button';

export default class LoginScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loading: false
        };
    }

    onIdChange = () => {
        this.setState({ id: this.id.value })
    }

    onLoginPressed = () => {
        const { id } = this.state;
        if (!id || !id.length) {
            alert("Please enter User Id");
            return;
        }
        this.setState({ loading: true })
    }
    render() {
        const { loading } = this.state;
        return (
            <div className="loginContainer">
                <div className="loginBox">
                    <div className="loginRow">
                        <div className="label">
                            User Id :
                        </div>
                        <input
                            ref={input => this.id = input}
                            className="inputBox"
                            onChange={this.onIdChange}
                        />
                    </div>
                    <div className="loginButtonContainer">
                        <Button
                            onClick={loading ? null : this.onLoginPressed}
                            text={loading ? "Loading..." : "Login"}
                            backgroundColor={loading ? "gray" : "#282c34"} />
                    </div>
                    <div className="hintBox">
                        The app demonstrates online mock-test feature. Since authenticatication is not integrated, you can login with any one of these ids-
                        <div className="ids">
                            <div>user1</div>
                            <div>user2</div>
                            <div>user3</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}