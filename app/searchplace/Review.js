import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { CreateTripCon } from "../../context/CreateTripCon";
import { useEffect, useState, useContext } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from "moment";
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Review = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripCon);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerStyle: { backgroundColor: "#fbba72" },
      headerTintColor: "#000",
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        marginTop: 70,
        backgroundColor: "#fbba72",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "roundedBold",
          color: "black",
          // marginTop: 10,
        }}
      >
        Review Your Trip
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 15,
          fontFamily: "roundedBold",
          color: "black",
          // marginTop: 10,
        }}
      >
        Before generating your trip please review your options
      </Text>
      <View style={{ marginTop: 40 ,flex:1,gap:30 }}>
        <View style={{display:"flex",flexDirection:"row",gap:20,alignItems:"center"}}>
        <Ionicons name="location" size={34} color="black" />
          <View
            style={{
              display: "flex",
              
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontFamily: "roundedRegular",
                color: "black",
                // marginTop: 10,
              }}
            >
              Destination
            </Text>
          
            <Text
                
                style={{
                    flexShrink:1,
                    fontSize: 16,
                    fontFamily: "roundedBold",
                    color: "black",
                    // marginTop: 10,
                }}
                >
              {tripData?.locationInfo?.name}
            </Text>
              
          </View>
        </View>


        <View style={{display:"flex",flexDirection:"row",gap:20,alignItems:"center",marginLeft:5}}>
        <FontAwesome5 name="calendar-day" size={34} color="black" />
          <View
            style={{
              display: "flex",
            
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontFamily: "roundedRegular",
                color: "black",
                // marginTop: 10,
              }}
            >
              Travel Dates
            </Text>
            <Text
              style={{
                fontSize: 16,

                fontFamily: "roundedBold",
                color: "black",
                // marginTop: 10,
              }}
            >
              {moment(tripData?.startDate).format("DD MMM")+" To "+moment(tripData?.endDate).format("DD MMM")+" ("+tripData?.totalDays+" Days, "+(tripData?.totalDays-1) + " Nights)"}
            </Text>
          </View>
        </View>

        <View style={{display:"flex",flexDirection:"row",gap:20,alignItems:"center",marginLeft:3}}>
        <MaterialCommunityIcons name="bus-side" size={38} color="black" />
          <View
            style={{
              display: "flex",
            
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontFamily: "roundedRegular",
                color: "black",
                // marginTop: 10,
              }}
            >
             Who is Travelling
            </Text>
            <Text
              style={{
                fontSize: 16,

                fontFamily: "roundedBold",
                color: "black",
                // marginTop: 10,
              }}
            >
              {tripData?.travelerCount}
            </Text>
          </View>
        </View>

        <View style={{display:"flex",flexDirection:"row",gap:20,alignItems:"center",marginLeft:3}}>
        <Foundation name="dollar-bill" size={38} color="black" />
          <View
            style={{
              display: "flex",
            
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontFamily: "roundedRegular",
                color: "black",
                // marginTop: 10,
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontSize: 16,

                fontFamily: "roundedBold",
                color: "black",
                // marginTop: 10,
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
        <Button
          mode="elevated"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{ backgroundColor: "#bb4d00", marginTop: 5, padding: 5 }}
          onPress={()=>router.push('searchplace/Loading')}
        >Create Trip Plan</Button>
      </View>
    </View>
  );
};

export default Review;
