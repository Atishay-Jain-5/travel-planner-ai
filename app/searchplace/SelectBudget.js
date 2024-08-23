import { View, Text } from 'react-native'
import React from 'react'
import { useEffect,useState,useContext } from 'react';
import { useNavigation } from 'expo-router';
import { Surface } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import Options from '../../Components/MyTrip/Options';
import { Button } from 'react-native-paper';
import { FlatList } from 'react-native';
import { CreateTripCon } from "../../context/CreateTripCon";
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';
const SelectBudget = () => {
  const router = useRouter();
    const { tripData, setTripData } = useContext(CreateTripCon);
    const titles=["Affordable","Moderate","Luxury"]
  const desc = ["Keep the cost at Minimum ","Keeping the cost on the average side","Can Spend without restrictons"]
    const navigation = useNavigation();
    const [userChoice,setUserChoice]=useState()
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
        
        // console.log(tripData)
      },[userChoice])
      const onNextButton = () =>{
        if(!userChoice){
          ToastAndroid.show("Please Select an option",ToastAndroid.LONG)
          return;
        }
        setTripData({...tripData,budget:userChoice})
        router.push('searchplace/Review')
      }
  return (
    <View
    style={{
      flex: 1,
      padding: 30,
      marginTop: 70,
      backgroundColor: "#fbba72",
    }}
  >
    <Text
      style={{
        fontSize: 35,
        fontFamily: "roundedBold",
        color: "black",
        // marginTop: 10,
      }}
    >Select Your Budget</Text>

<View
        style={{
          flex: 0.1,
          borderRadius: 20,
          padding: 10,
          height: "40%",
          minHeight: "40%",
          width: "100%",
          marginTop: "10%",
          // backgroundColor: "#8f250c",
          alignItems:
          "flex-start",
          gap:20,
          justifyContent:"center"
        }}
       
      >
        <FlatList
        style={{width:"100%"}}
          data={titles.map((title, index) => ({ title, desc: desc[index] }))}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>setUserChoice(item.title)} style={{width:"100%"}}>

            <Options title={item.title} desc={item.desc} userChoice={userChoice} />
            </TouchableOpacity>
          )}
        />
        
       
      </View>
      <Button
          mode="elevated"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{ backgroundColor: "#bb4d00", marginTop: 5, padding: 5 }}
          onPress={()=>onNextButton()}
        >Next</Button>
    </View>
  )
}

export default SelectBudget