import { View, Text ,Image, ScrollView} from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from "react";
import { Button, List } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import FlightInfo from '../../Components/MyTrip/FlightDetails/FlightInfo';
import HotelList from '../../Components/MyTrip/HotelDetails/HotelList';
import ActivityCard from '../../Components/MyTrip/Activity/ActivityCard';
const Index = () => {
  
    const {trip}=useLocalSearchParams()
    const navigation=useNavigation()
    const [details,setDetails]=useState()
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          // headerStyle: { backgroundColor: "#fbba72" },
          // headerTintColor: "#000",
          headerBackVisible:true
        });
       setDetails(JSON.parse(trip))
      }, []);
      useEffect(()=>{
        console.log(details?.tripData?.trip?.itinerary[1])
        // console.log("here"+details?.tripData?.hotels[0])
        // console.log(JSON.parse(details?.userSelection))
        // console.log(JSON.parse(details?.userSelection).locationInfo?.endDate)
      },[details])
  return (
    <ScrollView
    style={{
      flex: 1,
      // paddingTop: 10,
      // marginTop: 100,
      backgroundColor: "#fbba72",
    }}
  >
      {details&&
      <>
       <Image style={{ width: "100%", height: 300,borderRadius:15  }} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${JSON.parse(details?.userSelection)?.locationInfo?.photo}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`}} />
      <Text
      style={{
        fontSize: 25,
        fontFamily: "roundedBold",
        color: "black",
        marginTop: 10,
        paddingLeft:10
      }}
      >{JSON.parse(details?.userSelection).locationInfo?.name}</Text>
      <View style={{display:"flex",flexDirection:"row"}}>

         <Text
      style={{
        fontSize: 18,
        fontFamily: "roundedBold",
        color: "black",
        marginTop: 10,
        paddingLeft:10
      }}
      >{moment(JSON.parse(details?.userSelection)?.startDate).format('DD MMM yyyy')}</Text>
       <Text
      style={{
        fontSize: 18,
        fontFamily: "roundedBold",
        color: "black",
        marginTop: 10,
        paddingLeft:10
      }}
      >- {moment(JSON.parse(details?.userSelection)?.endDate).format('DD MMM yyyy')}</Text>
       
      </View>
      <Text
      style={{
        fontSize: 18,
        fontFamily: "roundedBold",
        color: "black",
        marginTop: 10,
        paddingLeft:10
      }}
      >{JSON.parse(details?.userSelection)?.travelerCount}</Text>
      {details?.tripData?.trip?.flight&&

        <FlightInfo flightdata={details?.tripData?.trip?.flight}></FlightInfo>
      }
      {details?.tripData?.trip?.hotels&&

        <HotelList hotelData={details?.tripData?.trip?.hotels}></HotelList>
      }
 <Text  style={{
     fontSize: 25,
     fontFamily: "roundedBold",
     color: "black",
     marginTop: 10,
     paddingLeft: 10,
    //  backgroundColor: '#e0e0e0',
     margin:12
  }}>
  Activities
  </Text>
  {details?.tripData?.trip?.itinerary && details.tripData.trip.itinerary.map((i, index) => (
            <View key={index}>
              
               <ActivityCard activity={i} index={index} />
            </View>
          ))}
         </>
         }
    </ScrollView>
  )
}

export default Index



