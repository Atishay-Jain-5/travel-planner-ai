import { View, Dimensions, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripCon } from "../../context/CreateTripCon";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
// import { ToastAndroid } from "react-native";
const SearchPlace = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripCon);
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

  useEffect(() => {
    if (tripData?.locationInfo?.coordinates) {
      const { lat, lng } = tripData.locationInfo.coordinates;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [tripData]);
// console.log(tripData)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search For Your Desired Location</Text>

      <View style={styles.autocompleteContainer}>
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
            setTripData({ locationInfo });

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
      <View style={{ alignItems: "center" }}>
        <Button
          mode="contained"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{
            backgroundColor: "#bb4d00",
            marginTop: 10,
            padding: 5,
            width: "50%",
          }}
          onPress={() => {
            if (tripData?.locationInfo) {
              router.push("searchplace/SelectNumber");
            } else {
              ToastAndroid.show("Please search for a place first", ToastAndroid.SHORT);
            }
          }}
        >
          Next
        </Button>
      </View>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={region} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbba72",
    gap: 70,
  },
  title: {
    fontSize: 22,
    fontFamily: "roundedBold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  autocompleteContainer: {
    marginTop: 40,
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
});

export default SearchPlace;
