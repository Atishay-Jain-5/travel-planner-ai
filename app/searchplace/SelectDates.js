import { View, Text, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { CreateTripCon } from "../../context/CreateTripCon";
import moment from "moment";
import { useRouter } from "expo-router";
const SelectDates = () => {
    const router = useRouter();
    const { tripData, setTripData } = useContext(CreateTripCon);
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerStyle: { backgroundColor: "#fbba72" },
      headerTintColor: "#000",
    });
  }, []);
  const onDateChange = (date, type) => {
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else if (type == "END_DATE") {
      setEndDate(moment(date));
    }
  };
  const onContinueButton = () => {
    if (!startDate || !endDate) {
        ToastAndroid.show("please select start and end date",ToastAndroid.LONG)
    }
    else{

        const totalDays = endDate.diff(startDate, "days")+1;
        setTripData({...tripData,startDate:startDate,endDate:endDate,totalDays:(totalDays+1)})
        // console.log(endDate)
        router.push('/searchplace/SelectBudget')
    } 
};

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
      >
        Select Travel Dates
      </Text>
      <View style={{ marginTop: 50 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          allowBackwardRangeSelect={false}
          minDate={new Date()}
          selectedRangeStyle={{ backgroundColor: "#8f250c" }}
        />
        <Button
          mode="elevated"
          textColor="#000000"
          maxFontSizeMultiplier={30}
          style={{ backgroundColor: "#bb4d00", marginTop: 15, padding: 5 }}
          onPress={() => onContinueButton()}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default SelectDates;
