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

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Sequência de animações encadeadas
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

    // Timer para mudar de tela
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#7b009a', '#4B0082', '#000']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../screens/assets/nexuslogo.png')}
          style={styles.logo}
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: textFade,
            transform: [{ translateY: moveY }],
          },
        ]}
      >
        Bem-vindo à <Text style={styles.highlight}>Nexus Store</Text>
      </Animated.Text>

      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: textFade,
            transform: [{ translateY: moveY }],
          },
        ]}
      >
        Onde o universo dos jogos ganha vida.
      </Animated.Text>
    </LinearGradient>
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
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#d1b3ff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
