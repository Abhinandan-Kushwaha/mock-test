import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import './index.css';
import API from '../../utils/API';

const LandingScreen = props => {
    const [state, setState] = useState({
        id: '',
        loading: false
    });

    const dispatch = useDispatch();

    const onLoginPressed = id => {
        if (!id || !id.length) {
            alert("Please enter User Id");
            return;
        }
        setState({ loading: true })

        API.post('login/', { userId: id })
            .then(res => {
                // console.log('res', res);
                if (res && res.status === 200) {
                    const { userName } = res.data;
                    dispatch(login(id, userName));
                    props.history.push('/mockTest')
                }
            })
            .catch(err => {
                // console.log('err', err);
                alert('Some error occured');
                setState({ id: '', loading: false })
            });
    }
    const { loading } = state;
    return (
        <div className="landingContainer">
            <div className="landingBox">
                <div className="hintBox">
                    {loading ?
                        <div className="loader">
                            Loading...
                            </div>
                        : <div>
                            The app demonstrates online mock-test feature. Since authenticatication is not integrated,
                            you can proceed with any one of these ids-
                        <div className="idsRow">
                                <div className="ids" onClick={() => onLoginPressed('user1')}>user1</div>
                                <div className="ids" onClick={() => onLoginPressed('user2')}>user2</div>
                                <div className="ids" onClick={() => onLoginPressed('user3')}>user3</div>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default LandingScreen;