import React from "react";
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
import FavoritosScreen from "./screens/FavoritosScreen";
import PerfilScreen from "./screens/PerfilScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import CarrinhoScreen from "./screens/CarrinhoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const iconName =
          label === "Home"
            ? "home"
            : label === "Produtos"
            ? "game-controller"
            : label === "Categorias"
            ? "grid"
            : label === "Favoritos"
            ? "heart"
            : "person";

        // animação do grupo (bolinha + ícone)
        const translateY = useSharedValue(isFocused ? -15 : 0);
        translateY.value = withSpring(isFocused ? -15 : 0);

        const animatedGroup = useAnimatedStyle(() => ({
          transform: [{ translateY: translateY.value }],
        }));

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            <Animated.View style={[styles.iconGroup, animatedGroup]}>
              {isFocused && <View style={styles.circle} />}
              <Ionicons
                name={iconName}
                size={26}
                color={isFocused ? "#6A0DAD" : "#aaa"}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Produtos" component={ProdutosScreen} />
      <Tab.Screen name="Categorias" component={CategoriasScreen} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: "Criar Conta" }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
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
