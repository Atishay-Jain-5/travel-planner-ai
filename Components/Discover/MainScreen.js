// import { View, Text } from 'react-native'
// import React from 'react'
// import { useEffect } from 'react';
// import { useNavigation } from 'expo-router';
import { View, Dimensions, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripCon } from "../../context/CreateTripCon";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
const MainScreen = () => {
    // const navigation = useNavigation();
//   const { tripData, setTripData } = useContext(CreateTripCon);
  const router = useRouter();

  const window = Dimensions.get("window");
  const { width, height } = window;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
      headerStyle: { backgroundColor: "#fbba72" },
      headerTintColor: "#000",
    });
  }, []);

//   useEffect(() => {
//     if (tripData?.locationInfo?.coordinates) {
//       const { lat, lng } = tripData.locationInfo.coordinates;
//       setRegion({
//         latitude: lat,
//         longitude: lng,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       });
//     }
//   }, [tripData]);
    const navigation=useNavigation()
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#fbba72" },
          headerTintColor: "#000",
          headerBackVisible:false
        });
      }, []);
  return (
    <View
    style={{
      flex: 1,
      padding: 30,
    //   marginTop: 70,
      width: "100%",
      backgroundColor: "#fbba72",
    }}
  >
      <Text style={{ fontFamily: "roundedBold", fontSize: 35 ,textAlign:"center",marginTop:30,marginBottom:40 }}>Discover</Text>
      <GooglePlacesAutocomplete
          placeholder="Search Place"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const locationInfo = {
              name: data.description,
              coordinates: details?.geometry.location,
              photo: details?.photos[0]?.photo_reference,
              url: details?.url,
            };
            // setTripData({ locationInfo });

            if (details?.geometry.location) {
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
            }
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            language: "en",
          }}
          styles={{
            textInput: {
              borderWidth: 2,
              borderRadius: 15,
              padding: 15,
              marginBottom: 20,
              backgroundColor: "#bb4d00",
              color: "white",
              fontSize: 16,
            },
            listView: {
              zIndex: 1000,
            },
          }}
        />
    </View>
  )
}

export default MainScreen