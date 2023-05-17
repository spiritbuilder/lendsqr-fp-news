/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import analytics from '@react-native-firebase/analytics';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  const routeNameRef = React.useRef<any>();
  const navigationRef = React.useRef<any>();
  return (
    <NavigationContainer
    // ref={navigationRef}
    // onReady={() => {
    //   routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    // }}
    // onStateChange={async () => {
    //   const previousRouteName = routeNameRef.current;
    //   const currentRouteName = navigationRef.current.getCurrentRoute().name;
    //   console.log('got here');
    //   if (previousRouteName !== currentRouteName) {
    //     try {
    //       let x = await analytics().logScreenView({
    //         screen_name: currentRouteName,
    //         screen_class: currentRouteName,
    //       });
    //       console.log(x);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   routeNameRef.current = currentRouteName;
    // }}
    >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="News Listing" component={News} />
        <Stack.Screen name="News Details" component={NewsItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appbar: {
    width: '100%',
    padding: 20,
    backgroundColor: 'black',
  },
  toptext: {
    color: 'white',
    fontSize: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
