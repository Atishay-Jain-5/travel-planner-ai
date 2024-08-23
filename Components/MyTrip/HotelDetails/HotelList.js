import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { Surface } from 'react-native-paper'
import { photo_ref } from '../../../service/GooglePlace'
const HotelList = ({hotelData}) => {
  const [images,setImages]=useState([]);
  const fetchPhotos = async () => {
    const photos = await Promise.all(hotelData.map(async (hotel) => {
      const res = await photo_ref(hotel.name);
      return res?.results?.[0]?.photos?.[0]?.photo_reference || null;
    }));
    setImages(photos);
  };
  let i=0;
  useEffect(() => {
    
    
    if (hotelData.length) {
      fetchPhotos();
    }
    // console.log(images)
  }, [hotelData]);
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "roundedBold",
          color: "black",
        //   marginTop: 20,
        marginBottom: 10,
          paddingLeft: 10,
        }}
      >
        Hotel Recommendations
      </Text>
      {/* <Text
        style={{
          fontSize: 20,
          fontFamily: "roundedMed",
          color: "black",
          paddingLeft: 10,
         
        }}
      >
        Airline
      </Text> */}
     <FlatList
      data={hotelData||{}}
    //   keyExtractor={(item) => item.id.toString()}
      horizontal
      contentContainerStyle={{ paddingLeft: 10 }}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}  
      renderItem={({ item }) => (
        <Surface
          style={{
            height: "auto",
            width: "auto",
            backgroundColor: "#bb4d00",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          
          }}
          elevation={4}
        >
            {/* <Image style={{ width: "100%", height: 300,borderRadius:15  }}  /> */}
          <Image style={{ width: "100%", height: 100, borderRadius: 12 }} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${images[i++]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`}} />
          <Text
            style={{
              color: "white",
              fontFamily: "roundedMed",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "roundedMed",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {item.price_per_night}/Night
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "roundedMed",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {item.rating}⭐
          </Text>
        </Surface>
      )}
    />
    </View>
  )
}

export default HotelList