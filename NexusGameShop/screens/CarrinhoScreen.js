import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function CarrinhoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Carrinho</Text>
      <Button title="Ir para Checkout" onPress={() => navigation.navigate("Checkout")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, marginBottom: 20 },
});
