import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
// import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {string} from 'yup';

const Index = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Text style={styles.appText}>Welcome to FP News</Text>
        <Text style={styles.header}>Sign In with Google Account</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('signed');
            navigation.navigate('News Listing');
          }}>
          <Text style={styles.btnText}>Sign in with google</Text>
        </TouchableOpacity>

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
});

export {styles};
