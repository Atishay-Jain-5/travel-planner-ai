import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {CreateTripCon} from '../context/CreateTripCon'
import { useState } from "react";
export default function RootLayout() {
  useFonts({
    "roundedRegular":require("../assets/fonts/MPLUSRounded1c-Regular.ttf"),
    "roundedBold":require("../assets/fonts/MPLUSRounded1c-Bold.ttf"),
    "roundedMed":require("../assets/fonts/MPLUSRounded1c-Medium.ttf"),
   
  })
  const [tripData,setTripData]=useState([]);
  return (
    <CreateTripCon.Provider value={{tripData,setTripData}}>

    <Stack screenOptions={{headerShown:false,}}  >
     <Stack.Screen name="(tabs)"></Stack.Screen>
    </Stack>
    </CreateTripCon.Provider>
  );
}
