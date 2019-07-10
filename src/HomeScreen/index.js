import React from "react";
import { Root } from "native-base";
import { DrawerNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen.js";

import CariScreen from "../CariScreen/index.js";
import SiparisScreen from "../SiparisScreen/index.js";
import SatisScreen from "../SatisScreen/index.js";
import TahsilatScreen from "../TahsilatScreen/index.js";

import IrsaliyeScreen from "../IrsaliyeScreen/index.js";
import TeklifScreen from "../TeklifScreen/index.js";

import SideBar from "../SideBar/SideBar.js";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen }, 
    Cari: { screen: CariScreen },
    Siparis: { screen: SiparisScreen },  // order
    Satis: { screen: SatisScreen },      // invoice
    Tahsilat: { screen: TahsilatScreen }, // tahsilat    

    Irsaliye: { screen: IrsaliyeScreen },
    Teklif: { screen: TeklifScreen }, 
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default () =>
	<Root>
		<HomeScreenRouter/>
	</Root>;

//export default HomeScreenRouter;
