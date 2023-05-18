import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import {news} from '../constants';
import {Item} from '../types';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useDispatch} from 'react-redux';
import {setNews} from '../../store/slices/news';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../store/slices/user';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Index = () => {
  let {navigate} = useNavigation();
  //   const [news, setNews] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  let {news} = useAppSelector(state => state);
  let dispatch = useAppDispatch();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };
  useEffect;
  const fetchNews = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
        params: {
          q: 'covid',
          lang: 'en',
          media: 'True',
          sort_by: 'date',
        },
        headers: {
          'X-RapidAPI-Key':
            '82b2a1178emshd3d2251a111dcf8p1ae1e9jsn919010601a22',
          'X-RapidAPI-Host': 'covid-19-news.p.rapidapi.com',
        },
      };

      let {data} = await axios.request(options);
      dispatch(setNews(data.articles));
      console.log(data.articles[0]);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  const logout = () => {};
  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.screen}>
        <View style={styles.appbar}>
          <Text style={styles.toptext}>FP News</Text>
          <TouchableOpacity
            style={styles.errorbtn}
            onPress={() => {
              throw new Error('RunTime error');
            }}>
            <Text style={styles.errText}>Error</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newsListContainer}>
          {loading ? (
            <ActivityIndicator size={'large'} color={'#1A2421'} />
          ) : news.length > 0 ? (
            <FlatList
              refreshing={loading}
              onRefresh={() => fetchNews()}
              style={styles.list}
              data={news}
              renderItem={({item, index}) => (
                <NewsCard {...item} navigate={navigate} index={index} />
              )}
              ListFooterComponent={<View style={{height: 20}} />}
            />
          ) : (
            <>
              <Text style={styles.fallback}>No news to display</Text>
              <TouchableOpacity style={styles.btn} onPress={() => fetchNews()}>
                {loading ? (
                  <Text style={styles.btnText}>Try Again</Text>
                ) : (
                  <ActivityIndicator />
                )}
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={async () => {
            setLoggingOut(true);
            await GoogleSignin.signOut()
            await AsyncStorage.removeItem('user');
            dispatch(setUser({}));
            setLoggingOut(false);
          }}>
          {!loggingOut ? (
            <Text style={styles.logoutText}>Logout</Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  appbar: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1A2421',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorbtn: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  toptext: {
    color: 'white',
    fontSize: 24,
  },
  errText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
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
  safeArea: {
    paddingVertical: 10,
  },
  newsListContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  list: {
    // flex: 1,
    width: '100%',
    // backgroundColor:"green"
  },
  fallback: {
    textAlign: 'center',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 7,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logout: {
    borderColor: 'red',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderWidth: 2,
    zIndex: 50,
    elevation: 50,
    backgroundColor: 'white',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
