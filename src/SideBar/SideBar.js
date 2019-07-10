import React from "react";
import { Image, Alert } from "react-native";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Badge
} from "native-base";
import menus from '../Common/Menu';
import users from '../Common/User';
import { getNameFromEmail, getLogin, delLogin } from '../Common/Session';

var myLogo = require('../../assets/logo.png');
var myBackground = require('../../assets/drawer-cover.png');


export default class SideBar extends React.Component {
  state = {
    email : '',
    name: ''
  };

  cikis = () => {
    Alert.alert(
      'Dikkat',
      'Çıkış yapmak istiyor musunuz?',
      [
        {
          text: 'Hayır!',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => delLogin()},
      ],
      {cancelable: false},
    );
  }

  render() {
    
    getLogin().then(email =>  {
      let name = getNameFromEmail(users, email)
      this.setState({ email, name });
    });

    return (
      <Container>
        <Content>
          <Image
            source={myBackground}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            source={myLogo}
          />
          <List
            dataArray={menus}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem Icon
                  button
                  onPress={() => {
                    if (data.link !== 'cikis') {
                      this.props.navigation.navigate(data.link)
                    } else {
                      this.cikis();
                    }
                  }}
                >
                  <Icon active name={data.icon} />
                  <Text style={{marginLeft: 10}}>{data.title}</Text>
                </ListItem>
              );
            }} 
          />
          <Badge style={{marginTop: 2, marginLeft: 20}} info>
            <Text>Kullanıcı : { this.state.name === '' ? 'Kullanıcı Seçilmemiş' : this.state.name }</Text>
          </Badge>
        </Content>
      </Container>
    );
  }
}
