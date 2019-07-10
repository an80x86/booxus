import React from "react";
import { Alert } from "react-native";
import {
  Text,
  Container,
  Content,
  Header,
  Icon,
  Button,
  Item,
  Input,
  Spinner,
  List,
  ListItem,
  Left, Body, Right, Thumbnail
} from "native-base";
import { setSessionCariId, setSessionCariName } from '../Common/Session';
import getSatis from '../Service/Satis';

let _this = null;
var myOrder = require('../../assets/order.png');
export default class SatisBrowse extends React.Component {
  state = {
    data: [],
    isReady: false 
  };

  find = (search) => {
    const that = this;
    this.setState({ isReady: false });
    
    getSatis(search).then(response => {
      let data = response.data.data; 
      that.setState({ data, isReady: true });
    }).catch(function (response) {
      that.setState({isReady: true});
      alert("Hata : " + response);
    });
  }

  componentDidMount() {
    _this = this;
    this.find('');
  }

  static navigationOptions = ({ navigation }) => ({
    header: ( 
      <Header searchBar rounded>
        <Item>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
          <Input placeholder="Arama" 
            onChangeText={(str) => _this.find(str)}/>
          <Icon name="ios-search" />
        </Item>
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
                    item.invoiceNumber + ' isimli fatura seçilsin mi?',
                    [
                      {
                        text: 'Hayır!',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'Evet', onPress: () => this.props.navigation.navigate("SatisDetay")},
                    ],
                    {cancelable: false},
                  )
                }}>
                  <Left>
                    <Thumbnail source={myOrder} />
                  </Left>
                  <Body>
                    <Text>invoice no {item.invoiceNumber}</Text>
                    <Text note>{item.header} {item.address}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.currency} {item.sumNet}</Text>
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
