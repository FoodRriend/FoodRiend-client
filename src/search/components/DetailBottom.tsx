import { Animated, Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text } from 'react-native-elements';
import { useAppSelector } from '@/redux/hooks';
import { Image } from 'react-native-elements/dist/Image';
import { shortLoction } from '../helper';
import { useNavigation } from '@react-navigation/core';

interface DetailBottomProps {
  param: any;
  scrollY: any;
}

const DetailBottom: React.FC<DetailBottomProps> = ({ param, scrollY }) => {
  const navigation = useNavigation();
  const shopInfo = useAppSelector((state) => state.search.data);
  const detailShopInfo = shopInfo?.data.shopInfo[param.index];

  const animateBorderRadius = scrollY.interpolate({
    inputRange: [0, 450],
    outputRange: [40, 0],
  });

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 500,
        backgroundColor: 'transparent',
        marginTop: -100,
      }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      style={{
        paddingTop: 450,
        ...Platform.select({
          android: {
            width: 417,
          },
        }),
      }}>
      <Animated.View
        style={[
          styles.block,
          {
            borderTopLeftRadius: animateBorderRadius,
            borderTopRightRadius: animateBorderRadius,
          },
        ]}>
        <View
          style={{
            backgroundColor: '#DFE2E6',
            width: 40,
            height: 4,
            marginTop: 14,
            borderRadius: 100,
          }}
        />
        <View style={{ display: 'flex', width: 390, padding: 24 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%' }}>
              <Text style={styles.componentSubject}>{detailShopInfo?.title}</Text>
              <Image
                source={require('../../assets/icons/star.png')}
                style={{ position: 'relative', marginRight: 4.5, bottom: 30 }}
              />
              <Text>{detailShopInfo?.aveRating}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '50%',
                top: 7,
              }}>
              <Image
                source={require('../../assets/icons/write2.png')}
                style={{ position: 'relative', width: 19, height: 19, marginRight: 14 }}
              />
              <Image
                source={require('../../assets/icons/share.png')}
                style={{ position: 'relative', width: 22, height: 19, marginRight: 14 }}
              />
              <Image
                source={require('../../assets/icons/bookmark.png')}
                style={{ position: 'relative', width: 19, height: 20 }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.colorAaacaeText}>{shortLoction(detailShopInfo?.location)}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#D0DBEA',
              height: 1,
              marginTop: 14,
              marginBottom: 12,
            }}></View>
          {detailShopInfo?.friends ? (
            <>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.componentSubject}>???????????? ??????</Text>
                <Text style={styles.colorAaacaeText}>
                  {detailShopInfo?.friends?.length}?????? ?????? ????????? ?????????
                </Text>
                {detailShopInfo.friends.length >= 2 && (
                  <View style={{ width: '32.5%' }}>
                    <Text style={{ textAlign: 'right', color: '#0057FF' }}>?????????</Text>
                  </View>
                )}
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', width: '70%' }}>
                <View style={{ marginRight: 10 }}>
                  <View
                    style={{
                      marginTop: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <Image
                        source={require('../../assets/images/onBoading/friends/friend1.png')}
                        style={{ position: 'relative', marginRight: 12 }}
                      />
                      <Text style={{ fontWeight: 'bold' }}>{detailShopInfo?.friends[0].name}</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/icons/star.png')}
                        style={{ position: 'relative' }}
                      />
                      <Text style={{ textAlign: 'right', marginLeft: 4.5 }}>
                        {detailShopInfo.aveRating}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.colorAaacaeText}>
                      {/* {detailShopInfo.friends[0].comments} */}??? ?????? ?????? ?????? ??? ?????? ?????????
                      ?????? ????????????. ???????????? ?????????... ?????? ??????. ???????????? ?????? ????????? ??????
                      ???????????? ??????????????? ????????? ????????? ??? ???????????????. ????????? ??? ??????????????? ????????????
                    </Text>
                  </View>
                </View>
                {detailShopInfo.friends.length >= 2 && (
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                        marginTop: 10,
                      }}>
                      <Image
                        source={require('../../assets/images/onBoading/friends/friend2.png')}
                        style={{ position: 'relative', marginRight: 12 }}
                      />
                      <Text style={{ fontWeight: 'bold' }}>{detailShopInfo?.friends[0].name}</Text>
                    </View>
                  </View>
                )}
              </View>
            </>
          ) : null}
          <View
            style={{
              backgroundColor: '#D0DBEA',
              height: 1,
              marginTop: 14,
              marginBottom: 12,
            }}
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.componentSubject}>??????</Text>
            <TouchableOpacity
              style={{ width: '86.5%' }}
              onPress={() => {
                navigation.navigate('RestaurantPhotoDetail');
              }}>
              <Text style={{ textAlign: 'right', color: '#0057FF' }}>?????????</Text>
            </TouchableOpacity>
          </View>
          {/* ?????? */}
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
            <Image
              source={require('../../assets/images/profile/Rectangle3.png')}
              style={{ position: 'relative', marginRight: 8, width: 186, height: 187 }}
            />
            <Image
              source={require('../../assets/images/profile/Rectangle1.png')}
              style={{
                position: 'relative',
                marginRight: 8,
                width: 186,
                height: 187,
                borderRadius: 10,
              }}
            />
            <Image
              source={require('../../assets/images/profile/Rectangle3.png')}
              style={{ position: 'relative', marginRight: 8, width: 186, height: 187 }}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default DetailBottom;

const styles = StyleSheet.create({
  componentSubject: {
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 17.5,
  },
  colorAaacaeText: { color: '#AAACAE', fontSize: 12 },
  block: {
    backgroundColor: '#fff',
    width: '100%',
    height: 450,
    alignItems: 'center',
  },
});
