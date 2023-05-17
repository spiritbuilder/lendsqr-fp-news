import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {ScrollView} from 'react-native-gesture-handler';
import {convertToProper} from '../../helpers';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = ({navigation}: any) => {
  let {selected, news} = useAppSelector(m => m);
  let {title, media, topic, summary, published_date, author, link, country} =
    news[selected];
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('News Listing')}>
        <Text style={styles.author}>{'< News'}</Text>
      </TouchableOpacity> */}
        <Image style={styles.image} source={{uri: media}} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.flex}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>
              {new Date(published_date).toDateString()}
            </Text>
          </View>
          <Text style={styles.summary}>{summary}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <Text style={styles.link}>Link: {link}</Text>
          </TouchableOpacity>
          <View style={styles.topic}>
            <Text>
              Category:{' '}
              {convertToProper(topic) +
                '   Country:' +
                convertToProper(country)}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  flex: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    marginVertical: 10,
  },
  date: {
    fontStyle: 'italic',
    color: '#212427',
  },
  author: {
    fontWeight: '500',
    color: '#212427',
  },
  summary: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
  },
  topic: {
    marginVertical: 10,
    borderColor: 'grey',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
