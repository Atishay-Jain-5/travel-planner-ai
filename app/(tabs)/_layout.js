import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: "#FFD60A",
        tabBarInactiveTintColor: "#FFD60A",
        tabBarActiveBackgroundColor: "#bb4d00",
        tabBarInactiveBackgroundColor: "#691e06",
        
      }}
    >
      
      <Tabs.Screen
        name="Mytrip"
        options={{
          tabBarLabelStyle:{fontSize:15},
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={24} color="#fbba72" />
          ),
          
        }}
      ></Tabs.Screen>
      {/* <Tabs.Screen
        name="Discover"
        options={{
          tabBarLabelStyle:{fontSize:15},
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="globe" size={24} color="#fbba72" />
          ),
          
        }}
      ></Tabs.Screen> */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#fbba72" },
          headerTintColor: "#000",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color="#fbba72" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
