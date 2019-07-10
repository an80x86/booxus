import React from "react";
import Cari from "./Cari.js";
import CariBrowse from "./CariBrowse.js";
import { StackNavigator } from "react-navigation";

export default DrawNav = StackNavigator(
  {
    Cari: { screen: Cari },
    CariBrowse: { screen: CariBrowse }
  },
  {
    initialRouteName: "Cari"
  }
);