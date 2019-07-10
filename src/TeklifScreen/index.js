import Teklif from "./Teklif";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Teklif: { screen: Teklif }
  },
  {
    initialRouteName: "Teklif"
  }
));
