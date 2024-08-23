import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";

const Login = () => {
  const windowWidth = Dimensions.get("window").width;
  const router=useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#071013",
      }}
    >
      <Image
        style={{ width: windowWidth, height: 450 }}
        source={require("../assets/images/_5e8b9b77-3197-41c6-b1a6-f3d193bba30b.jpg")}
      />
      <View
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: -30,
          padding: 10,
          backgroundColor: "#071013", // Add a background color here
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: "roundedBold",
            color: "white",
            marginTop: 10,
          }}
        >
          AI Travel Planner
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "roundedBold",
            color: "white",
            marginTop: 10,
          }}
        >
          Welcome to AI Travel Planner, your personal guide to the world’s most
          exciting destinations. Whether you’re dreaming of a relaxing beach
          getaway, a thrilling mountain hike, or a cultural city tour, our
          intelligent platform is here to help you plan every detail. With
          customized itineraries, expert recommendations, and seamless booking
          options, your next adventure is just a few clicks away.{" "}
        </Text>
        <TouchableOpacity style={{backgroundColor:"#FBBA72",marginTop:30,height:40,alignItems:"center",borderRadius:99}}
        onPress={()=>router.push('auth/sign-in/SignIn')}>

        <Text
          style={{
            fontSize: 17,
            fontFamily: "roundedBold",
            color: "black",
            marginTop: 10,
          }}
          >
          Sign In
        </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
