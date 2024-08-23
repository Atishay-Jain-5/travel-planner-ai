import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Options = ({ title, desc,userChoice }) => {
  return (
    <View
      style={[{
        width: "100%",
        backgroundColor: "#ca5310",
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 10,
        padding: 20,  
        marginBottom: 20, 
      },userChoice==title&&{borderWidth:3}]}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "roundedBold",
          color: "black",
          marginBottom: 5, 
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "rounded",
          color: "black",
        }}
      >
        {desc}
      </Text>
    </View>
  );
};

export default Options;
