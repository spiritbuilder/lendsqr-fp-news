import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Item} from '../types';
import {convertToProper} from '../../helpers';
import {TouchableWithoutFeedback} from 'react-native';
import {useAppDispatch} from '../../store/hooks';
import {setSelected} from '../../store/slices/selected';
const NewsCard = ({
  media,
  title,
  topic,
  published_date,
  navigate,
  index,
}: Item & {navigate: any; index: number}) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableWithoutFeedback
    testID='newsItem'
      style={styles.wrapper}
      onPress={() => {
        dispatch(setSelected(index));
        navigate('News Details');
      }}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: media}} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.flex}>
            <Text style={styles.topic}>{convertToProper(topic)}</Text>
            <Text style={styles.topic}>
              {new Date(published_date).toDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#888',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.3,

    elevation: 2,
  },
  details: {
    padding: 12,
    width: '100%',
  },
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1A2421',
  },
  topic: {color: '#1A2421'},
  date: {},
  flex: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
