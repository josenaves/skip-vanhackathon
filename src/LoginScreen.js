import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const API_HOST = 'http://api-vanhack-event-sp.azurewebsites.net';
const LOGIN_ENDPOINT = `${API_HOST}/api/v1/Customer/auth`;

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
      };

    constructor(props) {
        super(props)
        // this.state = { email: '', password: '', error: false, loading: false };
        this.state = {
            email: 'josenaves@gmail.com',
            password: '123456',
            error: false,
            loading: false
        };
    }

    async authenticate() {
        this.setState({ loading: true });
        
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        };

        const LOGIN_WITH_PARAMS = 
            `${LOGIN_ENDPOINT}?email=${this.state.email}&password=${this.state.password}`;
    
        try {
          const resp = await fetch(LOGIN_WITH_PARAMS, options);
          const respJson = await resp.json();

          if (resp.ok) {
            //  navigate to list products
            this.props.navigation.navigate('storeFront');
          } else {
            console.error("Login error");
          }
          this.setState({ loading: false });

        } catch (e) {
          console.error(`Login error - url: ${LOGIN_ENDPOINT} - error: `, e);
          this.setState({ error: true, loading: false });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={(email => this.setState({email}))}
                />
                <Text>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password => this.setState({password}))}
                />
                <Button
                    title='Login'
                    style={ styles.button }
                    onPress={ () => this.authenticate() }
                />

                {
                    this.state.loading &&
                    <ActivityIndicator
                        size='large'
                        color="#0000ff"
                    />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        padding: 20
    },
    button: {
        marginTop: 40
    }
  });
