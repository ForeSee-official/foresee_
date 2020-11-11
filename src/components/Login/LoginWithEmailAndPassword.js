import {
 Text,
 TouchableOpacity,
 View,
 KeyboardAvoidingView,
 ActivityIndicator,
 StyleSheet,
 Dimensions,
 ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../Utils/Logo";
import { auth, config } from "../../config/config";
import { useEffect } from "react";
import { InputTextField } from "../Utils/InputTextField";
import { LinearGradientBackground } from "../Utils/LinearGradientBackground";
import { RoundButton } from "../../../Utils/RoundButton";
import {
 ScreenHeight,
 FontScale,
 Scale,
 ScreenWidth,
} from "../../../constant/Constant";
import { KeyIcon, MailIcon } from "../Utils/Icons";
import Modal from "react-native-modal";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

export const LoginWithEmailAndPassword = ({ navigation, route }) => {
 useLocalization();
 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
   if (user) {
    setLoadingState(false);
    navigation.navigate("Main");
   }
  });
  return () => {
   unsubscribe();
  };
 });

 const [emailInput, setEmailInput] = useState("");
 const [passwordInput, setPasswordInput] = useState("");
 const [loginErrorMessage, setLoginErrorMessage] = useState("");
 const [isLoading, setLoadingState] = useState(false);

 const handleLoginError = (message) => {
  setLoginErrorMessage(message);
  setLoadingState(false);
 };

 const handleLogin = () => {
  setLoadingState(true);
  auth
   .signInWithEmailAndPassword(emailInput, passwordInput)
   .catch(function onFailure(err) {
    switch (err.code) {
     case "auth/invalid-email":
      handleLoginError(i18n.t('invalid_email'));
      break;
     case "auth/wrong-password":
      handleLoginError(i18n.t('wrong_password'));
      break;
     case "auth/user-not-found":
      handleLoginError(i18n.t('user_not_found'));
      break;
     default:
      //console.log(err.code);
      handleLoginError(err.code + ": " + err.message);
    }
   });
 };

 return (
  <>
   <LinearGradientBackground>
    <ScrollView style={{ flex: 1 }}>
     <KeyboardAvoidingView behavior={"position"}>
      <View style={styles.content}>
       <Logo />
       <View
        style={{
         marginTop: ScreenHeight * 0.045,
         marginBottom: ScreenHeight * 0.05,
        }}>
        <InputTextField
         label={i18n.t('email')}
         icon={MailIcon}
         defaultValue={emailInput}
         setValue={setEmailInput}
         hideEmbeddedErrorMessage={true}
        />
        <InputTextField
         label={i18n.t('password')}
         icon={KeyIcon}
         defaultValue={passwordInput}
         setValue={setPasswordInput}
         secureTextEntry={true}
         hideEmbeddedErrorMessage
        />
        <View>
         {loginErrorMessage !== "" ? (
          <Text
           style={{
            textAlign: "center",
            fontSize: FontScale * 18,
            fontWeight: "700",
            color: "#FFFFFF",
            flexWrap: "wrap",
           }}>
           {loginErrorMessage}
          </Text>
         ) : null}
        </View>
       </View>
       <RoundButton title={i18n.t('login')} onPress={handleLogin} />
       <View style={styles.registrationNav}>
        <Text style={styles.registrationNavText}>{i18n.t('dont_have_an_account')}</Text>
        <TouchableOpacity
         onPress={() => {
          navigation.navigate("Register");
         }}>
         <Text style={[styles.registrationNavText, { color: "#FFFFFF" }]}>
          {i18n.t('register')}
         </Text>
        </TouchableOpacity>
       </View>
       <View style={styles.registrationNav}>
        <TouchableOpacity
         onPress={() => {
          navigation.navigate("Forget Password");
         }}>
         <Text style={[styles.registrationNavText, { color: "#FFFFFF" }]}>
          {i18n.t('forget_password')}
         </Text>
        </TouchableOpacity>
       </View>
      </View>
     </KeyboardAvoidingView>
     <View style={{ marginBottom: ScreenHeight * 0.2 }}></View>
    </ScrollView>
   </LinearGradientBackground>
   <Modal isVisible={isLoading} animationIn={"fadeIn"} animationOut={"fadeOut"}>
    <ActivityIndicator size={Scale * 30} color="#00acc1" />
   </Modal>
  </>
 );
};

const styles = StyleSheet.create({
 content: {
  marginTop: ScreenHeight * 0.15,
  marginHorizontal: ScreenWidth * 0.15,
 },
 registrationNav: {
  flexDirection: "row",
  marginTop: ScreenHeight * 0.02,
  alignSelf: "center",
 },
 registrationNavText: {
  fontSize: 18,
  color: "#24559E",
 },
});
