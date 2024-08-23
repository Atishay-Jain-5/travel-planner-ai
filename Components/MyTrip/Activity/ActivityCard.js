import { View, Text } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'
import { Button } from 'react-native-paper'
import { useState } from 'react'
const ActivityCard = ({activity,index}) => {
    const activ=activity?.activities
    // console.log(activity.activities)
    const [visible,setvisible]=useState(false);
    const desc = activity?.description
    // const fetchPhotos = async () => {
    //   const photos = await Promise.all(hotelData.map(async (hotel) => {
    //     const res = await photo_ref(hotel.name);
    //     return res?.results?.[0]?.photos?.[0]?.photo_reference || null;
    //   }));
    //   setImages(photos);
    // };
    // let i=0;
    // useEffect(() => {
      
      
    //   if (hotelData.length) {
    //     fetchPhotos();
    //   }
    //   console.log(images)
    // }, [hotelData]);
  return (
    <View>
        <Button
                onPress={() => setvisible(!visible)}
                mode="elevated"
                textColor="#ffffff"
                style={{
                  width: "90%",
                  margin: 12,
                  marginTop: 10,
                  backgroundColor: "#CA5310",
                }}
              >
                Day {(index + 1)}
              </Button>
   {visible&&activ.map((i, index) => ( <Surface
          key={index}
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 10,
            elevation: 4, 
            backgroundColor: '#ca5310', 
          }}
        >
   <Text
  //  key={index}
   style={{
       fontSize: 17,
       fontFamily: "roundedBold",
       color: "black",
       marginBottom: 5,
       paddingLeft: 10,
       // borderBottomWidth: 1,
       // borderBottomColor: '#ccc',
    }}
      >
      * {i.name}
      </Text>
    <Text
    // key={index}
    style={{
        fontSize: 15,
        fontFamily: "roundedBold",
        color: "black",
        marginBottom: 10,
        paddingLeft: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    }}
    >
        {i.description}
       </Text>
       <Text
    // key={index}
    style={{
        fontSize: 15,
        fontFamily: "roundedBold",
        color: "black",
        marginBottom: 10,
        paddingLeft: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    }}
    >
      Time - {i.travel_time}
       </Text>
    
           </Surface>
    ))}
    </View>
  )
}

export default ActivityCard