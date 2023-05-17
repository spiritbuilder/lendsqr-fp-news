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
const Index = () => {
  let {navigate} = useNavigation();
  //   const [news, setNews] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.screen}>
        <View style={styles.appbar}>
          <Text style={styles.toptext}>FP News</Text>
        </View>
        <View style={styles.newsListContainer}>
          {!loading && news.length > 0 ? (
            <FlatList
              style={styles.list}
              data={news}
              renderItem={({item, index}) => (
                <NewsCard {...item} navigate={navigate} index={index} />
              )}
              ListFooterComponent={<View style={{height: 20}} />}
            />
          ) : (
            <ActivityIndicator size={'large'} color={'#1A2421'} />
          )}
        </View>
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
  },
  appbar: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1A2421',
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
});
