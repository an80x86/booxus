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
  Button,
} from "native-base";
import { StackNavigator } from "react-navigation";
import CariBrowse from "../CariScreen/CariBrowse";
import { delCari, getCariName, getCariId } from '../Common/Session';

export default class Irsaliye extends React.Component {
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
    delCari().then(() => {
      // nop
      this.setState({isReady : true});
    });
  }

  getCariButton = () => {
    if (this.state.id === '') {
      return (
        <Button
          full 
          rounded
          primary
          style={{ marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("CariBrowse")}
        >
          <Text>Cari Kart Seçimi</Text>
        </Button>
      )
    }

    return (null);
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

Irsaliye.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left> 
        <Body>
          <Title>İrsaliyeler</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
