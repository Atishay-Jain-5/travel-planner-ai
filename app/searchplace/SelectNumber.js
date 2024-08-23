import { View, Text, FlatList ,TouchableOpacity} from "react-native";
import React, { useState ,useContext} from "react";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Button, Surface } from "react-native-paper";
import Options from "../../Components/MyTrip/Options";
import { CreateTripCon } from "../../context/CreateTripCon";
import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
const SelectNumber = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectTraveler,setTravelers]=useState();
  const [userChoice,setUserChoice]=useState()
  const { tripData, setTripData } = useContext(CreateTripCon);
  const titles=["Just Me","A Couple","Family","Friends"]
  const icons=["🧗","👥","👨‍👩‍👧","🤝"]
  const desc = ["A sole traveler in exploration","Two travelers in tandem","A group of fun-loving adventurers","A bunch of thrill-seekers"]
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerStyle: { backgroundColor: "#fbba72" },
      headerTintColor: "#000",
    });
  }, []);
  useEffect(()=>{
    setTripData({...tripData,travelerCount:userChoice})
  },[userChoice])
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        marginTop: 90,
        backgroundColor: "#fbba72",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "roundedBold",
          color: "black",
          marginTop: 10,
        }}
      >
        Who's Travelling?
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "roundedBold",
          color: "black",
          marginTop: 10,
        }}
      >
        Select Number of Travellers
      </Text>
      <View
        style={{
          flex: 0.1,
          borderRadius: 20,
          padding: 10,
          height: "55%",
          minHeight: "55%",
          width: "100%",
          marginTop: 40,
          // backgroundColor: "#8f250c",
          alignItems:
          "flex-start",
          gap:10,
          justifyContent:"center"
        }}
        // elevation={4}
      >
        <FlatList
         style={{width:"100%"}}
          data={titles.map((title, index) => ({ title, desc: desc[index] ,icon:icons[index]}))}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>setUserChoice(item.title)} style={{width:"100%"}}>

            <Options title={item.title} desc={item.desc} userChoice={userChoice} icon={item.icon} />
            </TouchableOpacity>
          )}
        />
        
       
      </View>
      <Button
          mode="elevated"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{ backgroundColor: "#bb4d00", marginTop: 15, padding: 5 }}
          onPress={() => {
            if (userChoice) {
              router.push('/searchplace/SelectDates');
            } else {
              ToastAndroid.show("Please select the number of travelers", ToastAndroid.SHORT);
            }
          }}
        >Next</Button>
    </View>
  );
};

export default SelectNumber;


{/* <TouchableOpacity style={{width:"100%",height:"20%",backgroundColor:"#ca5310",borderWidth:1,borderColor:"black",borderRadius:10}}>
<Text
style={{
  fontSize: 20,
  fontFamily: "roundedBold",
  color: "black",
  margin:10
}}
>
A Couple
</Text>
<Text
style={{
  fontSize: 15,
  fontFamily: "rounded",
  color: "black",
 marginLeft:10
}}
>
Two travelers in tandem
</Text>
</TouchableOpacity>
<TouchableOpacity style={{width:"100%",height:"20%",backgroundColor:"#ca5310",borderWidth:1,borderColor:"black",borderRadius:10}}>
<Text
style={{
  fontSize: 20,
  fontFamily: "roundedBold",
  color: "black",
  margin:10
}}
>
Family
</Text>
<Text
style={{
  fontSize: 15,
  fontFamily: "rounded",
  color: "black",
 marginLeft:10
}}
>
A group of fun-loving adventurers
</Text>
</TouchableOpacity>
<TouchableOpacity style={{width:"100%",height:"20%",backgroundColor:"#ca5310",borderWidth:1,borderColor:"black",borderRadius:10}}>
<Text
style={{
  fontSize: 20,
  fontFamily: "roundedBold",
  color: "black",
  margin:10
}}
>
Friends
</Text>
<Text
style={{
  fontSize: 15,
  fontFamily: "rounded",
  color: "black",
 marginLeft:10
}}
>
A bunch of thrill-seekers
</Text>
</TouchableOpacity> */}