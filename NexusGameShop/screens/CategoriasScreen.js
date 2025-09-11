import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoriasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Categorias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },
});