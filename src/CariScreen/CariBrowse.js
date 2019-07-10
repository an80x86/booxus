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
  ListItem
} from "native-base";
import { setSessionCariId, setSessionCariName } from '../Common/Session';
import getCari from '../Service/Cari';

let _this = null;
export default class CariBrowse extends React.Component {
  state = {
    data: [],
    isReady: false
  };

  find = (search) => {
    const that = this;
    this.setState({ isReady: false });
    getCari(search).then(response => {
      let data = response.data.data; 
      that.setState({ data, isReady: true });
    }).catch(function (response) {
      that.setState({isReady: false});
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
    console.log('Girdi mi?');

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
                <ListItem key={i} button={true} onPress={() => { 
                    Alert.alert(
                      'Dikkat',
                      item.name + ' isimli cari seçilsin mi?',
                      [
                        {
                          text: 'Hayır!',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'Evet', onPress: () => this.handleClick(item.id, item.name)},
                      ],
                      {cancelable: false},
                    )
                  }}>
                    <Text>{item.name}</Text>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
    );
  }
}
