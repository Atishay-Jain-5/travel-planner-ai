import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import NoTrips from '../../Components/MyTrip/NoTrips';
// import { Query } from 'firebase/firestore';
import {db} from '../../configs/FirebaseConfig'
import { auth } from '../../configs/FirebaseConfig';
import { collection, query, where } from 'firebase/firestore';
import { getDoc,doc ,getDocs} from 'firebase/firestore';
import { useContext } from 'react';
import { CreateTripCon } from '../../context/CreateTripCon';
import UserTripList from '../../Components/MyTrip/UserTripList';
import { useRouter } from 'expo-router';
const Mytrip = () => {
  const router=useRouter()
  const user = auth.currentUser
  const [load,setload]=useState(false);
  const [userTrips,setUserTrips]=useState([])
  const { tripData, setTripData } = useContext(CreateTripCon);
  const getUserTrips = async() =>{
    setload(true)
    const q =query(collection(db,'usertrips'),where('UserEmail','==',user?.email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserTrips(prev=>[...prev,doc.data()])
    });
    setload(false)
  }
  useEffect(()=>{
    console.log(user?.displayName)
    if(user){getUserTrips()}
    // console.log(trip)
},[user])
  return (
    <View style={{ flex: 1 ,backgroundColor:"#fbba72"}}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: 50, 
        margin: 12,
      }}>
        <Text style={{ fontFamily: "roundedBold", fontSize: 35 }}>My Trip</Text>
        <Ionicons name="add-circle" size={35} color="black"   onPress={()=>router.push('/searchplace/SearchPlace')
          
        }/> 
    {load&&   <ActivityIndicator size="large" />}
      </View>
      {userTrips?.length===0?<NoTrips></NoTrips>:<UserTripList userTrips={userTrips}></UserTripList>}
    </View>
  );
};

export default Mytrip;
