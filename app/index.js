import { Text, View } from "react-native";
import Login from '../Components/Login.js';
import {auth} from '../configs/FirebaseConfig.js'
import { Redirect } from "expo-router";
export default function Index() {
  const user=auth.currentUser;
  // console.log(user)
  // if(us)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user?<Redirect href={'(tabs)/Mytrip'}></Redirect>
    :
    <Login></Login>
      }
    </View>
  );
}
