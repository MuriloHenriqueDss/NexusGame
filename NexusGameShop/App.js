import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import ProdutosScreen from "./screens/ProdutosScreen";
import CategoriasScreen from "./screens/CategoriasScreen";
import CategoriaDetalhadasScreen from "./screens/CategoriaDetalhadaScreen";
import FavoritosScreen from "./screens/FavoritosScreen";
import PerfilScreen from "./screens/PerfilScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import CarrinhoScreen from "./screens/CarrinhoScreen";
import EsqueceuScreen from "./screens/EsqueceuScreen";
import DetalhesProduto from "./screens/DetalhesProduto";
import AdicionarJogoScreen from "./screens/AdicionarJogoScreen";
import NotificacoesScreen from "./screens/NotificacoesScreen";
import SplashScreen from "./screens/SplashScreen";
import EditarPerfilScreen from "./screens/EditarPerfilScreen";
import EditarAvatarScreen from "./screens/EditarAvatarScreen";
import MeusCartoesScreen from "./screens/MeusCartoes";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons = {
  Home: "home",
  Produtos: "game-controller",
  Categorias: "grid",
  Favoritos: "heart",
  Perfil: "person",
};

function TabButton({ label, isFocused, onPress }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(isFocused ? -15 : 0, { damping: 10 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton} activeOpacity={0.8}>
      <Animated.View style={[styles.iconGroup, animatedStyle]}>
        {isFocused && <View style={styles.circle} />}
        <Ionicons name={icons[label]} size={26} color={isFocused ? "#FF09E6" : "#ffffff"} />
      </Animated.View>
    </TouchableOpacity>
  );
}

function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => (
        <TabButton
          key={route.key}
          label={route.name}
          isFocused={state.index === index}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Produtos" component={ProdutosScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ cardStyle: { backgroundColor: '#7B009A' },headerShown: false }} 
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Esqueceu" component={EsqueceuScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Categorias" component={CategoriasScreen} />
        <Stack.Screen name="DetalhesProduto" component={DetalhesProduto} />
        <Stack.Screen name="AdicionarJogo" component={AdicionarJogoScreen} />
        <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="EditarAvatar" component={EditarAvatarScreen} />
        <Stack.Screen name="MeusCartoes" component={MeusCartoesScreen} />
        <Stack.Screen name="CategoriaDetalhada" component={CategoriaDetalhadasScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#7B009A",
    paddingVertical: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  iconGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    zIndex: -1,
  },
});