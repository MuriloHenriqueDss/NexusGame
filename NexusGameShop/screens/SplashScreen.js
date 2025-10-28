// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Image, 
  Dimensions, 
  Easing 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  // Animações principais
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(50)).current;

  // Animações de saída
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  const moveOutY = useRef(new Animated.Value(0)).current;
  const backgroundAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrada suave do logo e textos
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Saída e navegação após 4s
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeOutOpacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(moveOutY, {
          toValue: -100,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start(() => {
        navigation.replace('Login'); // Troca de tela
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Animação de cor de fundo
  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#7B009A', '#4B0082'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={['#7b009a', '#4B0082', '#000']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Logo central animado */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: Animated.multiply(fadeAnim, fadeOutOpacity),
            transform: [
              { scale: scaleAnim },
              { translateY: Animated.add(moveY, moveOutY) },
            ],
          },
        ]}
      >
        <Image
          source={require('../screens/assets/nexuslogo.png')}
          style={styles.logo}
        />
      </Animated.View>

      {/* Título */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: Animated.multiply(textFade, fadeOutOpacity),
            transform: [{ translateY: Animated.add(moveY, moveOutY) }],
          },
        ]}
      >
        Bem-vindo à <Text style={styles.highlight}>Nexus Store</Text>
      </Animated.Text>

      {/* Subtítulo */}
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: Animated.multiply(textFade, fadeOutOpacity),
            transform: [{ translateY: Animated.add(moveY, moveOutY) }],
          },
        ]}
      >
        Onde o universo dos jogos ganha vida.
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.55,
    height: width * 0.55,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    letterSpacing: 1,
  },
  highlight: {
    color: '#E0AAFF',
  },
  subtitle: {
    color: '#d1b3ff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
