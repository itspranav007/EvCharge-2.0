import React, { useEffect, useState } from 'react';
import { View, Modal, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { _noInternet } from '../assets';
import { Size } from '../modules';

const CheckInternet: React.FC = () => {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const disconnected = !state.isConnected || !state.isInternetReachable;

      if (disconnected) {
        // Start 2-second timer before showing modal
        timeout = setTimeout(() => {
          setDelayedShow(true);
        }, 2000);
      } else {
        // If internet is back, cancel timer and hide modal
        clearTimeout(timeout);
        setDelayedShow(false);
      }

      setIsDisconnected(disconnected);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  if (isDisconnected && delayedShow) {
    return (
      <Modal transparent visible animationType={'fade'} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              width: Size.width * 0.8,
              height: Size.width * 0.8,
            }}>
            <Image
              source={_noInternet}
              style={{
                width: Size.width * 0.8,
                height: Size.width * 0.8,
                tintColor: 'black',
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    );
  }

  return null;
};

export default CheckInternet;
