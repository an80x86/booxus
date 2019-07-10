import { StackNavigator } from "react-navigation";
import Siparis from "./Siparis";
import SiparisBrowse from "./SiparisBrowse";
import SiparisDetay from "./SiparisDetay";

export default DrawNav = StackNavigator(
  {
    Siparis: { screen: Siparis },
    SiparisBrowse: { screen: SiparisBrowse },
    SiparisDetay: { screen: SiparisDetay },
  },
  {
    initialRouteName: "Siparis"
  }
);

