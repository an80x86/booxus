import React from "react";
import { Alert } from "react-native";
import {
  Text,
  Container,
  Content,
  Header,
  Icon,
  Button,
  ActionSheet,
  Title,
  Spinner,
  List,
  ListItem,
  Left, Body, Right, Thumbnail
} from "native-base";
import { setSessionCariId, setSessionCariName } from '../Common/Session';
import getSiparisDetay from '../Service/SiparisDetay';

let _this = null;
var BUTTONS = [
  { text: "Alt Toplam", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Adres Bilgileri", icon: "analytics", iconColor: "#f42ced" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
var myOrder = require('../../assets/order-detail.png');
export default class SiparisDetay extends React.Component {
  state = {
    data: [],
    isReady: false 
  };

  find = (id) => {
    const that = this;
    this.setState({ isReady: false });
    
    getSiparisDetay(id).then(response => {
      let data = response.data.data; 
      that.setState({ data, isReady: true });
    }).catch(function (response) {
      that.setState({isReady: true});
      alert("Hata : " + response);
    }); 
  }

  componentDidMount() {
    _this = this;
    this.find('97791');
  }

  menuIslem = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "Menü"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    );
  }

  static navigationOptions = ({ navigation }) => ({
    header: ( 
      <Header noShadow>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Sipariş Detayları</Title>
        </Body>
        <Right>
          <Button transparent
            onPress={() => _this.menuIslem()}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    )
  });

  handleClick(id, name) {
    this.setState({ isReady: false });
    setSessionCariId(id).then(()=> {
      setSessionCariName(name).then(()=> {
        this.setState({ isReady: true });
        this.props.navigation.goBack();       
      });
    });
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
          <List>
            {
              this.state.data.map((item, i) => ( 
                <ListItem key={i} avatar button={true} onPress={() => { 
                  Alert.alert(
                    'Dikkat',
                    item.orderNumber + ' isimli sipariş seçilsin mi?',
                    [
                      {
                        text: 'Hayır!',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'Evet', onPress: () => this.props.navigation.navigate("SiparisDetay")},
                    ],
                    {cancelable: false},
                  )
                }}>
                  <Left>
                    <Thumbnail source={myOrder} />
                  </Left>
                  <Body>
                    <Text>{item.name} x {item.quantity}</Text>
                    <Text note>{item.taxRate} {item.price}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.sumNet} {item.sumGross}</Text>
                  </Right>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}
