import React, { useState } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, Dimensions } from "react-native";

const produtosExemplo = [
  { id: "1", nome: "Produto 1" },
  { id: "2", nome: "Produto 2" },
  { id: "3", nome: "Produto 3" },
  { id: "4", nome: "Produto 4" },
];

export default function ProdutosScreen() {
  const [text, setText] = useState("");

  const { width } = Dimensions.get("window");
  const cardWidth = width * 0.7;
  const cardMargin = 15;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Digite o nome do produto"
      />

      <FlatList
        data={produtosExemplo}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + cardMargin}
        snapToAlignment="start"
        contentContainerStyle={{
          marginTop: 20,
          paddingHorizontal: (width - cardWidth) / 2,
        }}
        style={{ flexGrow: 0 }} 
        renderItem={({ item }) => (
          <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardText}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 80,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  card: {
    height: 150,
    borderRadius: 15,
    backgroundColor: "#2196F3",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
