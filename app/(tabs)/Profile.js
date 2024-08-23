import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth, } from '../../configs/FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import { Button, Surface } from 'react-native-paper';
import { collection, query, where } from 'firebase/firestore';
import { getDoc,doc ,getDocs} from 'firebase/firestore';
import {db} from '../../configs/FirebaseConfig'
import { CreateTripCon } from '../../context/CreateTripCon';
import { useContext } from 'react';
import { useRouter } from 'expo-router';
const Profile = () => {
  const user = auth.currentUser;
  const [image, setImage] = useState(null);
  const [newPassword, setNewPassword] = useState(''); 
  let count = 0;
  const router=useRouter();
  const [userTrips,setUserTrips]=useState([])
  const [upcomingTripsCount, setUpcomingTripsCount] = useState(0);
  const Auth = getAuth();
  const out = ()=>{

    signOut(Auth).then(() => {
      router.replace('auth/sign-in/SignIn')
    }).catch((error) => {
      // An error happened.
    });
  }
  const getUserTrips = async () => {
    const q = query(collection(db, 'usertrips'), where('UserEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    let upcomingCount = 0;
    const trips = [];
    querySnapshot.forEach((doc) => {
      const startDate = new Date(doc.data().tripData.trip.dates.start);
      if (startDate > new Date()) {
        upcomingCount += 1;
      }
      trips.push(doc.data());
    });

    setUserTrips(trips);
    setUpcomingTripsCount(upcomingCount); // Update the state
  };

  useEffect(()=>{
    // console.log(user?.displayName)
    if(user){getUserTrips()
      // console.log()
    }
   
},[user])



  const changePassword = () => {
    if (newPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          alert('Password updated successfully');
          setNewPassword("")
        })
        .catch((error) => {
          alert('Error updating password: ' + error.message);
        });
    } else {
      alert('Please enter a new password');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        backgroundColor: "#fbba72",
        // alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 35,
          marginTop: 50,
          fontFamily: "roundedBold",
          color: "black",
        }}
      >
        Welcome {user?.displayName}
      </Text>
      {/* <Image
        style={{ height: 200, width: 200, borderRadius: 100, marginTop: 20 }}
        source={image ? { uri: image } : require('../../assets/images/istockphoto-1147544807-612x612.jpg')}
      /> */}
     
    {  <TextInput
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{
          borderWidth: 2,
          borderRadius: 15,
          padding: 10,
          marginTop:20,
          marginBottom: 10,
          backgroundColor: "#bb4d00",
          color: "white",
          fontSize: 16,
          width:"90%"
        }}
      />}

      <Button onPress={changePassword}   mode="contained"
          textColor="#000000" style={{    backgroundColor: "#bb4d00",
            marginTop: 10,
            padding: 5,
            width: "50%", }} >changePassword</Button>
        {/* <Text style={{ color: 'red', fontSize: 18 }}>Change Password</Text> */}
    <Surface
   style={{
    flex: 0.1,
    borderRadius: 20,
    padding: 10,
    height: "30%",
    minHeight: "30%",
    width: "100%",
    marginTop: "10%",
    backgroundColor: "#bb4d00",
    alignItems:
    "flex-start",
    gap:20,
    // justifyContent:"center"
  }}
  elevation={4}
    >
       <Text
        style={{
          fontSize: 35,
          // marginTop: 50,
          fontFamily: "roundedBold",
          color: "black",
        }}
      >
        Your Stats - 
      </Text>
      <Text
        style={{
          fontSize: 28,
          // marginTop: 50,
          fontFamily: "roundedBold",
          color: "black",
        }}
      >
       Total Trips - {userTrips.length}
      </Text>
      <Text
        style={{
          fontSize: 28,
          // marginTop: 50,
          fontFamily: "roundedBold",
          color: "black",
        }}
      >
       Upcoming Trips - {upcomingTripsCount}
      </Text>
      <Text
        style={{
          fontSize: 28,
          // marginTop: 50,
          fontFamily: "roundedBold",
          color: "black",
        }}
      >
       Past Trips - {userTrips.length-upcomingTripsCount}
      </Text>
    </Surface>
    <Button onPress={()=>out()}   mode="contained"
          textColor="#000000" style={{    backgroundColor: "#bb4d00",
            marginTop: 20,
            padding: 5,
            width: "80%", }} >LogOut</Button>
    </View>
  );
};

export default Profile;
