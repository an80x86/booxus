import Irsaliye from "./Irsaliye";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Irsaliye: { screen: Irsaliye }
  },
  {
    initialRouteName: "Irsaliye"
  }
));
