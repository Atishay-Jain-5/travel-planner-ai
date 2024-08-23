import { View, Text, Image } from "react-native";
import React from "react";
import { createContext } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { CreateTripCon } from "../../context/CreateTripCon";
import { ChatSession } from "@google/generative-ai";
import { chatSession } from "../../configs/AI-Model";
import LoaderKit from "react-native-loader-kit";
import { doc, setDoc } from "firebase/firestore"; 
import  {db}  from "../../configs/FirebaseConfig";
import {auth} from "../../configs/FirebaseConfig"
const Loading = () => {
  const navigation = useNavigation();
  const router=useRouter()
  const user = auth.currentUser
  const [loading,setloading]=useState(false);
  const { tripData, setTripData } = useContext(CreateTripCon);
  const prompt =
    `Please generate a detailed travel plan in JSON format for the location ${tripData?.locationInfo?.name} for the dates ${tripData?.startDate} to ${tripData?.endDate}, covering ${tripData?.totalDays} days and ${tripData?.totalDays - 1} nights, for ${tripData?.travelerCount} travelers with a budget of ${tripData?.budget}. The plan should include flight details with prices and booking URLs, a list of hotel options with the hotel name, address, price per night, image URL, geo coordinates, rating, and a short description. Additionally, provide a list of nearby places to visit with their name, details, image URL, geo coordinates, ticket pricing, and travel time from the hotel or previous location. Create a day-by-day itinerary for the trip, including activities, travel times between locations, and the best time to visit each place.Assume Departure City to always be Los Angeles .If data for any field is unavailable, leave it empty. Ensure that the generated JSON is valid.The JSON should have the following structure:{
  "trip": {
    "destination": "",
    "travelers": "",
    "budget": "",
    "dates": {
      "start": "",
      "end": ""
    },
    "duration": {
      "days": "",
      "nights": ""
    },
    "flight": {
      "details": "",
      "booking_url": ""
    },
    "hotels": [
      {
        "name": "",
        "address": "",
        "price_per_night": "",
        "image_url": "",
        "geo_coordinates": {
          "latitude": "",
          "longitude": ""
        },
        "rating": "",
        "description": ""
      }
    ],
    "places_to_visit": [
      {
        "name": "",
        "details": "",
        "image_url": "",
        "geo_coordinates": {
          "latitude": "",
          "longitude": ""
        },
        "ticket_pricing": "",
        "travel_time_from_hotel": ""
      }
    ],
    "itinerary": [
      {
        "day": "",
        "activities": [
          {
            "name": "",
            "time": "",
            "description": "",
            "travel_time": ""
          }
        ]
      }
    ]
  }
}
`;
    useEffect(()=>{
        if(tripData && tripData?.locationInfo?.name && tripData?.startDate && tripData?.endDate && tripData?.travelerCount && tripData?.budget){
            setloading(true)
        //  console.log(prompt)   
           gemini()
         
        }
    },[])
    const gemini =async()=>{
        const result = await chatSession.sendMessage(prompt);
            // console.log(result.response.text());
            const tripResponse=JSON.parse(result.response.text())
            setloading(false)
            const docId=(Date.now()).toString()
          const response_=  await setDoc(doc(db,"usertrips",docId),{
              UserEmail:user.email,
              tripData:tripResponse,
              // startDate:tripData?.startDate,
              // endDate:tripData?.endDate,
              // Location:tripData?.locationInfo?.name,
              // budget:tripData?.budget
              userSelection:JSON.stringify(tripData),
              docId:docId
            })
           
              router.push('(tabs)/Mytrip')
            setTripData();
    }
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
        marginTop: 70,
        width: "100%",
        backgroundColor: "#fbba72",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "roundedBold",
          color: "black",
          textAlign: "center",
          // marginTop: 10,
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginTop: 20,
          fontFamily: "roundedBold",
          color: "black",
          textAlign: "center",
          // marginTop: 10,
        }}
      >
        We are working on planning your trip.
      </Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../../assets/images/aj.gif")}></Image>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            fontFamily: "roundedBold",
            color: "black",
            textAlign: "center",
            marginTop: -80,
          }}
        >
          Do not go back.
        </Text>
        {/* <LoaderKit
  style={{ width: 150, height: 150 }}
  name={'BallPulseSync'} // Optional: see list of animations below
  color={'#8f250c'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
/> */}
      </View>
    </View>
  );
};

export default Loading;
