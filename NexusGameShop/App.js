import React, { useEffect, useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as Asset from "expo-asset";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

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
import SplashScreenCustom from "./screens/SplashScreen";
import EditarPerfilScreen from "./screens/EditarPerfilScreen";
import EditarAvatarScreen from "./screens/EditarAvatarScreen";
import MeusCartoesScreen from "./screens/MeusCartoesScreen";
import MeusPedidosScreen from "./screens/MeusPedidosScreen";
import AdicionarCartaoScreen from "./screens/AdicionarCartaoScreen";
import FinalizarCompraScreen from "./screens/FinalizarCompraScreen";
import PixScreen from "./screens/PixScreen";
import PixPagarScreen from "./screens/PixPagarScreen";
import BoletoScreen from "./screens/BoletoScreen";
import BoletoPagarScreen from "./screens/BoletoPagarScreen";
import GerenciarJogosScreen from "./screens/GerenciarJogosScreen";
import EscolherCartaoScreen from "./screens/EscolherCartaoScreen";
import PagarCartaoScreen from "./screens/PagarCartaoScreen";
import EditarJogoScreen from "./screens/EditarJogoScreen";
import { CartProvider } from "./screens/CartContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons = {
  Home: "home",
  Produtos: "game-controller",
  Favoritos: "heart",
  Perfil: "person",
};

// 🔹 Função para pré-carregar recursos (ícones, imagens e fontes)
async function loadResources() {
  const images = [
    require("./assets/icon.png"),
    require("./assets/splash-icon.png"),
    require("./assets/1.png"),
  ];
  const cacheImages = images.map((img) => Asset.Asset.fromModule(img).downloadAsync());
  const fonts = Font.loadAsync(Ionicons.font);
  await Promise.all([...cacheImages, fonts]);
}

// 🔹 Botão da Tab animado
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

// 🔹 Barra inferior personalizada
function CustomTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
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

// 🔹 Tabs principais
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

// 🔹 App Principal
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadResources();
      } catch (e) {
        console.warn("Erro ao carregar recursos:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreenCustom} />
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
            <Stack.Screen name="MeusPedidos" component={MeusPedidosScreen} />
            <Stack.Screen name="AdicionarCartao" component={AdicionarCartaoScreen} />
            <Stack.Screen name="Pagamento" component={FinalizarCompraScreen} />
            <Stack.Screen name="Pix" component={PixScreen} />
            <Stack.Screen name="PagarPix" component={PixPagarScreen} />
            <Stack.Screen name="Boleto" component={BoletoScreen} />
            <Stack.Screen name="PagarBoleto" component={BoletoPagarScreen} />
            <Stack.Screen name="EscolherCartao" component={EscolherCartaoScreen} />
            <Stack.Screen name="PagarCartao" component={PagarCartaoScreen} />
            <Stack.Screen name="GerenciarJogos" component={GerenciarJogosScreen} />
            <Stack.Screen name="EditarJogo" component={EditarJogoScreen} />
            <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
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
