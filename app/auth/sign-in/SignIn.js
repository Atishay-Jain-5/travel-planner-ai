import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "expo-router";
import { Button, Surface, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import { ToastAndroid } from "react-native";
const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignin = () => {
    if (!password  || !email) {
      ToastAndroid.show("please enter all details",ToastAndroid.TOP)
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user)
        router.replace('Mytrip')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        if(errorCode==='auth/invalid-credential'){
          ToastAndroid.show("Email or Password doesn't Match",ToastAndroid.CENTER)
        }
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ padding: 25, backgroundColor: "#CA5310", flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          style={{ marginTop: 30 }}
          size={30}
          color="black"
        />
      </TouchableOpacity>
      <Text style={styles.text}>Sign In</Text>
      <Text
        style={{
          fontFamily: "roundedBold",
          fontSize: 25 * PixelRatio.getFontScale(),
          marginTop: 12,
          margin: 12,
        }}
      >
        New to AI-Travel-Planner?
        <Link href={"auth/sign-up/SignUp"} style={styles.signupLink}>
          SignUp here
        </Link>
      </Text>
      <ScrollView
        style={{ marginTop: 30 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={styles.surface} elevation={4}>
          <View style={{ alignItems: "flex-start" }}>
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
              onPress={() => onSignin()}
            >
              SignIn
            </Button>
            <Link href={""} style={styles.forgotPasswordLink}>
              Forgot Password
            </Link>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default SignIn;

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
    margin: 12,
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
  signupLink: {
    fontSize: 22 * PixelRatio.getFontScale(),
    color: "#fbba72",
    textDecorationLine: "underline",
    margin: 12,
  },
  forgotPasswordLink: {
    fontFamily: "roundedBold",
    fontSize: 20 * PixelRatio.getFontScale(),
    margin: 12,
    color: "#FBBA72",
    textDecorationLine: "underline",
  },
});
