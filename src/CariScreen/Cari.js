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
  Icon,
  Title,
  Button,
  Spinner
} from "native-base";
import { StackNavigator } from "react-navigation";
import CariBrowse from "./CariBrowse";
import { getCariName, delCariId, delCariName } from '../Common/Session';

export default class Cari extends React.Component {
  state = {
    isReady: false,
    name: 'Cari Seçilmemiş!..'
  }

  updateVal = () => {
    this.setState({isReady: false});
    getCariName().then(name =>  {
      this.setState({ name, isReady: true });
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
    this.setState({name: '', isReady: false});
    delCariId().then(() => {
      delCariName().then(() => {
        this.setState({isReady: true});
      });
    });
  }

  onSelect = (data) => {
    this.updateVal();
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
              <Text> {this.state.name === '' ? 'Cari Seçilmemiş!..' : this.state.name} </Text>
              <Right>
                <Button transparent
                  onPress={() => {
                    if (this.state.name ==='') return;
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

          <Button
            full 
            rounded 
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("CariBrowse")}
          >
            <Icon name='person' />
            <Text>Cari Kart Seçimi.</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

Cari.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Cariler</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
