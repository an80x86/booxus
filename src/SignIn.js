import React from 'react';
import {View,Text,Dimensions,ImageBackground} from 'react-native';
import {Form,Item,Label,Input, Button} from 'native-base';

var myBackground = require('../assets/landing2.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SignIn extends React.Component {
    state = {
        email: '',
        password: ''
    }
    login = () => {
        const {email, password} = this.state;
		this.props.signIn(email,password);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={myBackground} style={styles.backgroundImage}>
                    <View style={styles.inputStyle}>
                        <Form>
                        <Item floatingLabel>
                                <Label style={{color: 'white'}}>Mail</Label>
                                <Input 
                                    style={{color: 'yellow'}}
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({email})}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={{color: 'white'}}>Şifre</Label>
                                <Input 
                                    keyboardType="numeric"
                                    style={{color: 'yellow'}}
                                    autoCorrect={false}
                                    onChangeText={(password) => this.setState({password})}
                                    secureTextEntry
                                />
                            </Item>
                        </Form>
                        <View style={{marginTop: 10}}>
                            <Button 
                                primary
                                block
                                onPress={this.login}
                            >
                                <Text style={{color: 'white'}}>Giriş</Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = {
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height
    },
    inputStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10
    }
}

export default SignIn;