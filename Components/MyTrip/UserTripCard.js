import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
import { ScrollView } from 'react-native'
const UserTripCard = ({tripInfo}) => {
   const parsed_data=JSON.parse(tripInfo.userSelection)
  //  console.log((tripInfo.tripData))
  return (
    <View style={{margin:4,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <View style={{display:"flex",flexDirection:'row',gap:10,width:"100%",padding:10}}>

      <Image style={{width:100,height:100,borderRadius:12}} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsed_data?.locationInfo?.photo}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`}}/>
      <View style={{display:"flex",flexDirection:"column"}}>

      <Text
              style={{
                  fontSize: 15,
                  marginLeft:12,
                  fontFamily: "roundedBold",
                  color: "black",
                  // marginTop: 10,
                }}
                >{(parsed_data.locationInfo?.name).slice(0,35)}</Text>
                   <Text
              style={{
                  fontSize: 15,
                  marginLeft:12,
                  fontFamily: "roundedBold",
                  color: "black",
                  // marginTop: 10,
                }}
                >{moment(parsed_data?.startDate).format('DD MMM yyyy')}</Text>
                    <Text
              style={{
                  fontSize: 15,
                  marginLeft:12,
                  fontFamily: "roundedBold",
                  color: "black",
                  // marginTop: 10,
                }}
                >{parsed_data?.travelerCount}</Text>
                  
                </View>
        </View>
    </View>
  )
}

export default UserTripCard