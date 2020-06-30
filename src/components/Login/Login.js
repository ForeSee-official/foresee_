import { Text, TouchableOpacity, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import Logo from '../../../Utils/Logo';
import { auth } from '../../config/config';
import { useEffect } from 'react';
import { StyledInput } from '../../../Utils/StyledInput';
import { LinearGradientBackground } from '../../../Utils/LinearGradientBackground';
import { RoundButton } from '../../../Utils/RoundButton';
import { ScreenHeight, ScreenWidth, FontScale, Scale } from '../../../constant/Constant';
import { KeyIcon, MailIcon } from '../../utils/icon';
import Modal from 'react-native-modal';

export const Login = ({ navigation, route }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoadingState(false);
        navigation.navigate('Main');
      }
    });
  });

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setLoadingState] = useState(false);

  const handleLoginError = (message) => {
    setLoginErrorMessage(message);
    setLoadingState(false);
  }

  const handleLogin = () => {
    setLoadingState(true);
    console.log('isLoading? ', isLoading);
    auth.signInWithEmailAndPassword(emailInput, passwordInput).catch(function onFailure(err) {
      switch (err.code) {
        case 'auth/invalid-email':
          handleLoginError('電子郵件格式無效');
          break;
        case 'auth/wrong-password':
          handleLoginError('密碼錯誤');
          break;
        case 'auth/user-not-found':
          handleLoginError('帳號不存在，\n該帳戶有可能已被刪除');
          break;
        default:
          console.log(err.code)
          handleLoginError(err.code + ': ' + err.message);
      }
    });
  };

  return (
    <>
      <LinearGradientBackground>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={styles.content}>
            <Logo />
            <View style={{ marginTop: ScreenHeight * 0.1 }}>
              <StyledInput containerStyle={{ height: 50 }} placeholder="電子郵件" icon={MailIcon} defaultValue={emailInput} setValue={setEmailInput} hideEmbeddedErrorMessage={true} />
              <StyledInput containerStyle={{ height: 50 }} placeholder="密碼" icon={KeyIcon} defaultValue={passwordInput} setValue={setPasswordInput} secureTextEntry={true} hideEmbeddedErrorMessage />
              <View>
                <Text
                  style={{
                    marginTop: ScreenHeight * 0.01,
                    marginBottom: ScreenHeight * 0.03,
                    textAlign: 'center',
                    fontSize: FontScale * 18,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    flexWrap: 'wrap',
                  }}
                >
                  {loginErrorMessage}
                </Text>
              </View>
            </View>
            <RoundButton title={'登入'} onPress={handleLogin} />
            <View style={styles.registrationNav}>
              <Text style={styles.registrationNavText}>未有用戶? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                <Text style={[styles.registrationNavText, { color: '#FFFFFF' }]}>登記</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradientBackground>
      <Modal isVisible={isLoading}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <ActivityIndicator size={Scale * 30} color="lightskyblue" />
      </Modal>
    </>
  );
};
