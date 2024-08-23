import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
const NoTrips = () => {
  const router=useRouter()
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          margin: 20,
          paddingTop: 50,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <MaterialIcons name="luggage" size={45} color="black" />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "roundedBold",
            color: "black",
            marginTop: 10,
          }}
        >
          No Trips Planned Yet
        </Text>
        <Text
          style={{
            fontSize: 20,
            padding: 8,
            fontFamily: "rounded",
            color: "black",
            marginTop: 10,
            textAlign: "left",
          }}
        >
          Time to plan a new adventure. Get started Below
        </Text>
        <Button
          mode="elevated"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{ backgroundColor: "#bb4d00", marginTop: 10, padding: 5 }}
          onPress={()=>router.push('/searchplace/SearchPlace')}
        >
          Start a New Trip
        </Button>
      </View>
    </View>
  );
};

export default NoTrips;
