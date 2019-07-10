import React from "react";
import { Alert } from "react-native";
import {
  Text,
  Container, 
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Spinner,
  Icon,
  Title,
  Button
} from "native-base";
import { StackNavigator } from "react-navigation";
import CariBrowse from "../CariScreen/CariBrowse";
import SiparisBrowse from "./SiparisBrowse";
import SiparisDetay from './SiparisDetay';
import { delCariId, delCariName, getCariName, getCariId } from '../Common/Session';
import { setSiparisOlustur } from '../Service/SiparisOlustur';
import Cari from "../CariScreen/Cari";

export default class Siparis extends React.Component {
  state = {
    isReady: false,
    name: 'Cari Seçilmemiş!..',
    id: '',
    data: []
  }

  updateVal = () => {
    getCariName().then(name =>  {
      this.setState({ name });

      getCariId().then(id =>  {
        this.setState({ id, isReady: true });
      });
    });
  }

  componentDidMount() {
    this.updateVal();

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updateVal();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleClick =() => {
    this.setState({name: '', id: '', isReady: false});
    delCariId().then(() => {
      delCariName().then(() => {
        this.setState({isReady: true});
      });
    });

  }

  siparisOlustur =() => {
    this.setState({isReady: false});
    setSiparisOlustur(this.state.id).then(response => {
      let data = response.data.data; 
      that.setState({ data, isReady: true });
    }).catch(function (response) {
      that.setState({isReady: true});
      alert("Hata : " + response);
    });

    this.setSiparisOlustur('www').then(() => {
      this.setState({isReady: true});
    });
  }

  getCariButton = () => {
    if (this.state.id === '') {
      return (
        <Card>
          <CardItem>
            <Body>
              <Button
                full 
                rounded
                primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("CariBrowse")}
              >
                 <Icon name='person' />
                <Text>Cari Kart Seçimi</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      )
    }

    return (
      <Card>
        <CardItem>
          <Body>

            <Button
              full 
              rounded
              primary
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("SiparisBrowse")}
            >
              <Icon name='chatbubbles' />
              <Text>Siparişler</Text>
            </Button>

            <Button
              full 
              rounded
              primary
              style={{ marginTop: 10 }}
              onPress={() => Alert.alert(
                'Dikkat',
                this.state.name + ' isimli cari için yeni sipariş oluşturulsun mu?',
                [
                  {
                    text: 'Hayır!',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Evet', onPress: () => this.siparisOlustur()},
                ],
                {cancelable: false},
              )}
            >
              <Icon name='calculator' />
              <Text>Yeni Sipariş Al</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    if (!this.state.isReady) {
      return (
        <Spinner style={{flex: 1}}/>
      );
    }

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Icon active name="person" />
              <Text> {this.state.id === '' ? 'Cari Seçilmemiş!..' : this.state.name} </Text>
              <Right>
                <Button transparent
                  onPress={() => {
                    if (this.state.id ==='') return;
                    Alert.alert(
                      'Dikkat',
                      this.state.name + ' isimli cari bırakılsın mı?',
                      [
                        {
                          text: 'Hayır!',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'Evet', onPress: () => this.handleClick()},
                      ],
                      {cancelable: false},
                    )
                  }}>
                  <Icon name="close" />
                </Button>
              </Right>
            </CardItem>
          </Card>
          { this.getCariButton()}
        </Content>
      </Container>
    );
  }
}

Siparis.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Siparişler</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
