import { StackNavigator } from "react-navigation";
import Satis from "./Satis";
import SatisBrowse from "./SatisBrowse";
import SatisDetay from "./SatisDetay";

export default DrawNav = StackNavigator(
  {
    Satis: { screen: Satis },
    SatisBrowse: { screen: SatisBrowse },
    SatisDetay: { screen: SatisDetay },
  },
  {
    initialRouteName: "Satis"
  }
);

