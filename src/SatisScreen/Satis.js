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
import SatisBrowse from "./SatisBrowse";
import SatisDetay from './SatisDetay';
import { delCariId, delCariName, getCariName, getCariId } from '../Common/Session';
import Cari from "../CariScreen/Cari";

export default class Satis extends React.Component {
  state = {
    isReady: false,
    name: 'Cari Seçilmemiş!..',
    id: ''
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
              onPress={() => this.props.navigation.navigate("SatisBrowse")}
            >
              <Icon name='chatbubbles' />
              <Text>Satışlar</Text>
            </Button>

            <Button
              full 
              rounded
              primary
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("SatisDetay")}
            >
              <Icon name='calculator' />
              <Text>Yeni Satış Yap</Text>
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

Satis.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Satış/Faturalar</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
