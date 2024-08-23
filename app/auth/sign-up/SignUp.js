import { ScrollView, StyleSheet, TextInput, View, PixelRatio, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Button, Surface, Text } from "react-native-paper";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import { updateCurrentUser,updateProfile } from "firebase/auth";
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const createNewAcc = () => {
    if (!password || !fullname || !email) {
      ToastAndroid.show("please enter all details",ToastAndroid.TOP)
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullname,
        })
        // console.log(user);
        router.replace('(tabs)/Mytrip')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        alert("Error: " + errorMessage);
      });
  };

  return (
    <View style={{ padding: 25, backgroundColor: "#CA5310", flex: 1 }}>
      <TouchableOpacity onPress={() => router.replace('auth/sign-in/SignIn')}>
        <Ionicons name="arrow-back" style={{ marginTop: 30 }} size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Sign Up</Text>
      <ScrollView
        style={{ marginTop: 30 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={styles.surface} elevation={4}>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              onChangeText={(value) => setFullname(value)}
              placeholder="Full Name"
              textContentType="name"
              style={styles.input}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={(value) => setEmail(value)}
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={(value) => setPassword(value)}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
            />
            <Button
              mode="elevated"
              textColor="#ffffff"
              style={styles.button}
              onPress={() => createNewAcc()}
            >
              SignUp
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  surface: {
    flex: 0.1,
    borderRadius: 20,
    padding: 8,
    height: "auto",
    minHeight: "50%",
    width: "100%",
    backgroundColor: "#FBBA72",
  },
  text: {
    fontFamily: "roundedBold",
    fontSize: 40 * PixelRatio.getFontScale(),
    marginTop: 30,
    margin: 12
  },
  label: {
    fontFamily: "roundedBold",
    fontSize: 25 * PixelRatio.getFontScale(),
    margin: 12,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    width: "90%",
  },
  button: {
    width: "90%",
    margin: 12,
    marginTop: 10,
    backgroundColor: "#CA5310",
  },
});
