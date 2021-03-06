import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/native';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Pressable,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { kakaoSignupInStorage } from '../redux/userSlice';

const SignupCompleteScreen: React.FC = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const { name, accessToken, loading, nickname, foodStyle, foodType } = useAppSelector(
    (state) => state.users,
  );

  const headerStyle = () => {
    navigation.setOptions({
      headerShown: true,
      title: '회원가입',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        ...Platform.select({
          ios: {
            fontWeight: '600',
            fontSize: 17,
          },
          android: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }),
      },
      headerStyle: {
        ...Platform.select({
          android: {
            borderWidth: 0.8,
          },
        }),
        borderColor: '#dfe2e5',
      },
      headerLeft: () => <></>,
    });
  };

  headerStyle();

  const onPress = async () => {
    if (name && foodType && foodStyle) {
      await dispatch(
        kakaoSignupInStorage({
          accessToken: accessToken,
          nickname: nickname,
          name: name,
          foodType: foodType,
          foodStyle: foodStyle,
        }),
      );
    }
    navigation.navigate('Feed');
  };

  if (loading) {
    return (
      <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Wrapper>
      <Image
        style={{
          width: '100%',
          ...Platform.select({
            ios: {
              height: '57%',
            },
            android: {
              height: '64%',
            },
          }),
        }}
        resizeMode="cover"
        source={require(`../assets/images/onBoading/signupComplete.png`)}
      />
      <SignupEndTextContainer>
        <Text style={styles.signupEndTitle}>회원가입 완료</Text>
        <View style={styles.signupEndContentBox}>
          <Text style={styles.signupEndContent}>친구와 함께</Text>
          <Text style={styles.signupEndContent}>맛있는 순간을 함께 해요!</Text>
        </View>
      </SignupEndTextContainer>
      <TouchableOpacity onPress={() => onPress()} style={styles.signupEndButton}>
        <Text style={styles.signupEndButtonText}>이용하러 가기</Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default SignupCompleteScreen;

const styles = StyleSheet.create({
  backIcon: {
    width: 50,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 20,
  },
  signupEndTitle: {
    ...Platform.select({
      ios: {
        fontSize: 22,
      },
      android: {
        fontSize: 19,
      },
    }),
    fontWeight: 'bold',
    color: '#2e3e5c',
    paddingLeft: 3,
  },
  signupEndContentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
  signupEndContent: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 15,
      },
    }),
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#7e8389',
  },
  signupEndButton: {
    ...Platform.select({
      ios: {
        marginTop: 28,
        width: '80%',
        height: 56,
      },
      android: {
        width: '80%',
        height: 48,
      },
    }),
    borderRadius: 32,
    backgroundColor: '#fe554a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupEndButtonText: {
    fontSize: 15,
    fontWeight: '900',
    fontStyle: 'normal',
    color: '#ffffff',
  },
});

const Wrapper = styled.View({
  backgroundColor: '#fff',
  flex: 1,
  alignItems: 'center',
});

const SignupEndTextContainer = styled.View({
  width: '100%',
  height: '20%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
