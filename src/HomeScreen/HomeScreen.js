import React from "react";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';

export default class HomeScreen extends React.Component {
  render() {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
    const contentInset = { top: 20, bottom: 20 };
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Ana Ekran</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Merhaba Hoş Geldiniz.</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                data={ data }
                contentInset={ contentInset }
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                  }}
                  numberOfTicks={ 10 }
                  formatLabel={ value => `${value}ºC` }
              />
              <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={ contentInset }
                 >
                  <Grid/>
              </LineChart>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Booxus Mobile v1.0 (Beta)</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  aboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                  proident, sunt in culpa qui officia deserunt mollit anim id est 
                  laborum.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>(c)' 2019 Booxus. Tüm hakları saklıdır.</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
