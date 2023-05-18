import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import * as Yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles as importedStyles} from '../signin';
import {MyGoogleButton} from '../signin';
import {signIn} from '../signin';
import auth from '@react-native-firebase/auth';
import {setUser} from '../../store/slices/user';
import {useAppDispatch} from '../../store/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.number().required('Phone number is Required'),
});
const Index = ({navigation}: any) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  let {navigate} = navigation;
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  let dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      email: '',
      fullName: '',
      phone: '',
    },
    onSubmit: values => {
      auth()
        .createUserWithEmailAndPassword(values.email, values.fullName)
        .then(async m => {
          dispatch(setUser(m));
          AsyncStorage.setItem('user', JSON.stringify(m));
          navigate('News Listing');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            dispatch(setUser({...values}));
            console.log('That email address is already in use!');
            auth().sendSignInLinkToEmail(values.email);
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={importedStyles.header}>Sign Up</Text>

        <ScrollView style={styles.scroll}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            enabled={!loading}
            style={styles.input}
            placeholder="Elon Musk"
            value={formik.values.fullName}
            onChangeText={formik.handleChange('fullName')}
            onTouchEnd={formik.handleBlur('fullname')}
          />
          {formik.errors.fullName && formik.touched.fullName ? (
            <Text style={styles.error}>{formik.errors.fullName}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            enabled={!loading}
            keyboardType="email-address"
            style={styles.input}
            placeholder="musk@tesla.com"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onTouchEnd={formik.handleBlur('email')}
          />
          {formik.errors.email && formik.touched.email ? (
            <Text style={styles.error}>{formik.errors.email}</Text>
          ) : null}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            enabled={!loading}
            keyboardType="numeric"
            style={styles.input}
            placeholder="+445 44566 XXXX"
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onTouchEnd={formik.handleBlur('phone')}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <Text style={styles.error}>{formik.errors.phone}</Text>
          ) : null}
          <TouchableOpacity
            disabled={loading}
            style={[styles.button, {margin: 20}]}
            onPress={() => {
              formik.handleSubmit();
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.line}></View>
          {MyGoogleButton(isSigningIn, setIsSigningIn, dispatch, navigation)}

          <View style={importedStyles.footer}>
            <Text style={importedStyles.newText}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Sign In');
              }}>
              <Text style={[importedStyles.newText, importedStyles.underline]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  scroll: {
    flex: 1,
    padding: 10,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 6,
    fontSize: 16,
  },
  error: {color: 'red', marginTop: 5},
  line: {borderBottomWidth: 1, margin: 20},
  button: {
    backgroundColor: '#1A2421',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#1A2421',
    marginTop: 10,
  },
  googlebtn: {
    width: 192,
    height: 48,
    alignSelf: 'center',
    marginTop: 100,
  },
});
