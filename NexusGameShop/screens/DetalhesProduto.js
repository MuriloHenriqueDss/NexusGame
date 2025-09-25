// screens/DetalhesProdutoScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalhesProdutoScreen({ route, navigation }) {
  const { jogo } = route.params;

  const relacionados = [
    { id: "1", nome: "Game 1", imagem: require("../screens/assets/1.png") },
    { id: "2", nome: "Game 2", imagem: require("../screens/assets/1.png") },
    { id: "3", nome: "Game 3", imagem: require("../screens/assets/1.png") },
  ];

  const handleAdicionarCarrinho = () => {
    navigation.navigate("Carrinho", { jogo }); // Passando o jogo para a tela do carrinho
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={jogo.imagem} style={styles.banner} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{jogo.nome}</Text>
        <Text style={styles.plataforma}>
          Plataforma: {jogo.plataforma || "Playstation"}
        </Text>
        <Text style={styles.preco}>R$ {jogo.preco || "149,90"}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.carrinhoButton}
          onPress={handleAdicionarCarrinho} // Navegação aqui
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton}>
          <Ionicons name="heart" size={20} color="#FF09E6" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.descricao}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse jogo é incrível e
          você vai adorar cada detalhe!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relacionados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relacionados.map((item) => (
            <View key={item.id} style={styles.cardRelacionado}>
              <Image source={item.imagem} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.nome}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  banner: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  plataforma: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 4,
  },
  preco: {
    color: "#FF09E6",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "space-between",
  },
  carrinhoButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7B009A",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  favButton: {
    width: 60,
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descricao: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  cardRelacionado: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
