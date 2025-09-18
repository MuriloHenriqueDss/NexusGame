import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Image style={styles.logo_nav} source={require('../assets/img/logo_nexus.png')} />
      </View>
      <Text style={styles.text}>Tela Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    padding: 10,
    display: "flex",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
