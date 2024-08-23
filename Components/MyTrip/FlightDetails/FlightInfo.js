import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect } from 'react';
import { Surface } from 'react-native-paper';

const FlightInfo = ({ flightdata }) => {
  useEffect(() => {
    // console.log(flightdata);
  }, [flightdata]);
//   if ((!flightdata || !Array.isArray(flightdata) || flightdata.length === 0)&&(flightdata?.booking_url&&flightdata?.details)) {
//     return (
//       <View style={{ padding: 10 }}>
//         <Text
//           style={{
//             fontSize: 25,
//             fontFamily: "roundedBold",
//             color: "black",
//             marginTop: 20,
//             paddingLeft: 10,
//           }}
//         >
//           Flights
//         </Text>
//         <Text
//           style={{
//             fontSize: 20,
//             fontFamily: "roundedMed",
//             color: "black",
//             paddingLeft: 10,
//             marginBottom: 10,
//           }}
//         >
//           No flight data available
//         </Text>
//       </View>
//     );
//   }
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "roundedBold",
          color: "black",
          marginTop: 20,
          paddingLeft: 10,
        }}
      >
        Flight details
      </Text>
      {/* <Text
        style={{
          fontSize: 20,
          fontFamily: "roundedMed",
          color: "black",
          paddingLeft: 10,
          marginBottom: 10,
        }}
      >
        Airline
      </Text> */}
      <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10, paddingLeft: 10 }}>
  
            <TouchableOpacity onPress={()=>Linking.openURL(flightdata.booking_url)}>

          <Surface
            // key={i.id}
            style={{
                height: "auto",
                width: "auto",
                backgroundColor: "#bb4d00",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                elevation: 4,
            }}
            >
            <Text
              style={{
                  color: "white",
                  fontFamily: "roundedMed",
                  fontSize: 16,
                  textAlign: "center",
                }}
                >
              {flightdata.details}
            </Text>
            {/* <Text
              style={{
                  color: "white",
                  fontFamily: "roundedMed",
                  fontSize: 16,
                  textAlign: "center",
                }}
                >
              {i.FlightPrice }
            </Text> */}
          </Surface>
                </TouchableOpacity>
      
      </View>
    </View>
  );
};

export default FlightInfo;
