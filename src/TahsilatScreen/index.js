import { StackNavigator } from "react-navigation";
import Tahsilat from "./Tahsilat";
import TahsilatBrowse from "./TahsilatBrowse";
import TahsilatDetay from "./TahsilatDetay";

export default DrawNav = StackNavigator(
  {
    Tahsilat: { screen: Tahsilat },
    TahsilatBrowse: { screen: TahsilatBrowse },
    TahsilatDetay: { screen: TahsilatDetay },
  },
  {
    initialRouteName: "Tahsilat"
  }
);

