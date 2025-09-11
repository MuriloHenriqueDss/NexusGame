import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FavoritosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Favoritos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // ou a cor desejada
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});