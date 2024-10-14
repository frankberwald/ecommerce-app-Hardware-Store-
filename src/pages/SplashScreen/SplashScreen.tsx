import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = () => {
  const translateXValue = useRef(new Animated.Value(-300)).current; // Start position (off-screen to the left)
  const opacityValue = useRef(new Animated.Value(1)).current; // Start fully visible

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateXValue, {
        toValue: 0, // Move to the center (0 X position)
        duration: 1000, // 1 second
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(opacityValue, {
        toValue: 0, // Fade out
        duration: 1000, // 0.5 seconds for fade-out
        delay: 2000, // Delay of 1 second after reaching center
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ translateX: translateXValue }], // Moving animation
            opacity: opacityValue // Fading animation
          },
        ]}
      >
        <Text style={styles.title}>Berwald Hardware Store</Text>
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
        <Text style={styles.subtitle}>In Bussiness since 1997.</Text>
        <Text style={styles.subtitle}><Text style={{color: '#e1e5ea'}}>You Trust,</Text>We Deliver.</Text>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#435064',
  },
  animatedContainer: {
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    margin: 10
  }
});

export default SplashScreen;
