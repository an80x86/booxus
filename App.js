import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Spinner } from 'native-base';
/* import { Font } from 'expo'; */ 
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import SignIn from './src/SignIn';
import HomeScreen from "./src/HomeScreen/index.js";
import { getLogin, setSessionLogin } from './src/Common/Session';
import userCheck from './src/Service/User';
import GlobalStyles from './src/Common/GlobalStyles';

export default class App extends React.Component {
  state = { 
    loading: true, 
    loggedIn: false,
    email : '',
    password: '' 
  }
  
  async componentDidMount() {
    console.disableYellowBox = true;
    await Font.loadAsync({
      'Roboto': require('./assets/Fonts/Roboto.ttf'),
      'Roboto_medium': require('./assets/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    getLogin().then(res =>  {
      this.setState({ loading: false,  loggedIn: res === '' ? false : true });
    });
  }

  signOut = () => {
    setSessionLogin('');
    this.setState({loggedIn: false, email:'', password:''});
  }

  signIn = (email,password) => {

    const that = this;
    this.setState({loading: true});
    userCheck(email,password).then(function (response) {
      that.setState({loading: false});
      const { error } =  response.data;

      if (error === true) {
        alert('Dikkat: ' + response.data.msg);
        return;
      } 
      
      setSessionLogin(email);
      that.setState({loggedIn: true, email, password});
    }).catch(function (response) {
      that.setState({loading: false});
      alert("Hata : " + response);
    });
  }

  renderView = () => {
    if(!this.state.loggedIn) {
      return(
        <SignIn signIn={this.signIn}/>
      )
    } else {
      return (
        <SafeAreaView style={GlobalStyles.droidSafeArea} forceInset={{ top: 'always' }}>
            <HomeScreen />
        </SafeAreaView>
      );
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner style={{flex: 1}}/>
      )
    } else {
      return (
        this.renderView()
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
