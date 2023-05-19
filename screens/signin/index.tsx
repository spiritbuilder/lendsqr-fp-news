import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';

import {string} from 'yup';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setUser} from '../../store/slices/user';
import {useAppDispatch} from '../../store/hooks';

export const signIn = async (
  setIsSigningIn: any,
  dispatch: any,
  navigation: any,
) => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',
    iosClientId:
      '672262671858-ttsuooja3b52s97hh900b67m3kfe6n7a.apps.googleusercontent.com',
    googleServicePlistPath: '',
    openIdRealm: '',
    profileImageSize: 120,
  });
  setIsSigningIn(true);
  try {
    await GoogleSignin.hasPlayServices();
    // let signedIn = await GoogleSignin.isSignedIn();
    // if (signedIn) navigation.navigate('News Listing');
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    dispatch(setUser({...userInfo}));
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    navigation.navigate('News Listing');
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('SignIn in cancelled');
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);
      // let userInfo = await GoogleSignin.signInSilently();
      // console.log(userInfo);
      // dispatch(setUser({...userInfo}));
      // await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      // navigation.navigate('News Listing');
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      console.log(error);
      let userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);
      dispatch(setUser({...userInfo}));
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      navigation.navigate('News Listing');
      console.log('other happpened');
      // some other error happened
    }
  }
  setIsSigningIn(false);
};

export const MyGoogleButton = (
  isSigningIn: any,
  setIsSigningIn: any,
  dispatch: any,
  navigation: any,
  style?: any,
) => {
  return (
    <GoogleSigninButton
      style={style ? style : styles.googlebtn}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => await signIn(setIsSigningIn, dispatch, navigation)}
      disabled={isSigningIn}
    />
  );
};
const Index = ({navigation}: any) => {
  let dispatch = useAppDispatch();
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Text style={styles.appText}>Welcome to FP News</Text>
        <Text style={styles.header}>Sign In with Google Account</Text>
        {MyGoogleButton(isSigningIn, setIsSigningIn, dispatch, navigation)}
        <View style={styles.footer}>
          <Text style={styles.newText}>New here ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Sign Up');
            }}>
            <Text style={[styles.newText, styles.underline]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  appText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 20,
  },
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#1A2421',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginTop: 200,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  newText: {
    fontWeight: '500',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  googlebtn: {
    width: 192,
    height: 48,
    alignSelf: 'center',
    marginTop: 200,
  },
});

export {styles};
