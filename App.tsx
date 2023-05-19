import analytics from '@react-native-firebase/analytics';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import News from './screens/newslisting';
import NewsItem from './screens/newsdetails';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {setUser} from './store/slices/user';
import {object} from 'yup';
const Stack = createStackNavigator();
function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  let dispatch = useAppDispatch();
  let {user} = useAppSelector(m => m);
  const isDarkMode = useColorScheme() === 'dark';
  const checkIfSignedIn = async () => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
    setLoading(false);
  };
  useEffect(() => {
    checkIfSignedIn();
  }, []);
  const routeNameRef = React.useRef<any>();
  const navigationRef = React.useRef<any>();
  return (
    <>
      {loading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;
            console.log('got here');
            if (previousRouteName !== currentRouteName) {
              try {
                let x = await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
                console.log(x);
              } catch (error) {
                console.log(error);
              }
            }
            routeNameRef.current = currentRouteName;
          }}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {Object.keys(user).length < 1 ? (
              <>
                <Stack.Screen name="Sign In" component={SignIn} />
                <Stack.Screen name="Sign Up" component={SignUp} />
              </>
            ) : (
              <>
                <Stack.Screen name="News Listing" component={News} />
                <Stack.Screen name="News Details" component={NewsItem} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default App;
