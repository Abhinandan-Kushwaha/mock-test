import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import { styles } from './styles';
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
        setState({ ...state, loading: true })

        API.post('login/', { userId: id })
            .then(res => {
                // console.log('res', res);
                if (res && res.status === 200) {
                    const { userName } = res.data;
                    dispatch(login(id, userName));
                    setState({ ...state, loading: false });
                    props.navigation.navigate('TestScreen')
                }
            })
            .catch(err => {
                console.log('err', err);
                alert('Some error occured');
                setState({ id: '', loading: false })
            });
    }
    const { loading } = state;
    return (
        <View style={styles.landingContainer}>
            <View style={styles.landingBox}>
                <View style={styles.hintBox}>
                    {loading ?
                        <View style={styles.loader}>
                            <Text style={styles.normalTextStyle}>
                                Loading...
                            </Text>
                        </View>
                        : <View>
                            <Text style={styles.normalTextStyle}>
                                The app demonstrates online mock-test feature. Since authenticatication is not integrated,
                                you can proceed with any one of these ids-
                            </Text>
                            <View style={styles.idsRow}>
                                <TouchableOpacity onPress={() => onLoginPressed('user1')}>
                                    <Text style={styles.ids}>user1</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => onLoginPressed('user2')}>
                                    <Text style={styles.ids}>user2</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => onLoginPressed('user3')}>
                                    <Text style={styles.ids}>user3</Text></TouchableOpacity>
                            </View>
                        </View>}
                </View>
            </View>
        </View>
    )
}
export default LandingScreen;