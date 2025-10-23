import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

export default function GerenciarJogosScreen({ navigation }) {
  const [busca, setBusca] = useState("");
  const [mostrarMais, setMostrarMais] = useState(false);

  // Mock de jogos duplicado (para "Ver mais")
  const jogosMock = [
    {
      id: "1",
      nome: "God of War 5 Ragnarok",
      preco: "R$349,90",
      imagem:
        "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/P8AN9kNfSJtfSx0PmlT93mnN.jpg",
      avaliacao: 4.7,
    },
    {
      id: "2",
      nome: "God of War 5 Ragnarok",
      preco: "R$349,90",
      imagem:
        "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/P8AN9kNfSJtfSx0PmlT93mnN.jpg",
      avaliacao: 4.7,
    },
    {
      id: "3",
      nome: "God of War 5 Ragnarok",
      preco: "R$349,90",
      imagem:
        "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/P8AN9kNfSJtfSx0PmlT93mnN.jpg",
      avaliacao: 4.7,
    },
    {
      id: "4",
      nome: "God of War 5 Ragnarok",
      preco: "R$349,90",
      imagem:
        "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/P8AN9kNfSJtfSx0PmlT93mnN.jpg",
      avaliacao: 4.7,
    },
  ];

  const jogos = mostrarMais ? [...jogosMock, ...jogosMock] : jogosMock;

  const renderJogo = ({ item }) => (
  <View style={styles.card}>
    <View style={{ position: "relative" }}>
      <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditarJogo", { jogoId: item.id })}
        >
          <Ionicons name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() =>
            Alert.alert(
              "Excluir Jogo",
              `Tem certeza que deseja excluir "${item.nome}"?`,
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => {} },
              ]
            )
          }
        >
          <Ionicons name="close" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardPrice}>{item.preco}</Text>
      <View style={styles.rating}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{item.avaliacao}</Text>
      </View>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/img/logo_nexus.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
            <Image
              source={require("../assets/img/buscar_icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <Image
              source={require("../assets/img/carrinho_icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
            <Image
              source={require("../assets/img/notificacao_icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão de voltar */}
      <View style={styles.voltarContainer}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.botaoVoltar}
            >
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </View>

      {/* Corpo */}
      <ScrollView style={styles.body} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.titulo}>Gerenciar jogos</Text>

        {/* Barra de busca */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder="Buscar jogos"
            placeholderTextColor="#999"
            value={busca}
            onChangeText={setBusca}
            style={styles.searchInput}
          />
        </View>

        {/* Lista de jogos */}
        <FlatList
          data={jogos}
          keyExtractor={(item) => item.id + Math.random().toString()}
          renderItem={renderJogo}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />

        {/* Ver mais */}
        <TouchableOpacity
          style={styles.verMaisBtn}
          onPress={() => setMostrarMais(!mostrarMais)}
        >
          <Text style={styles.verMaisText}>
            {mostrarMais ? "Ver menos" : "Ver mais"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B009A",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  textoVoltar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 6,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },

  navIcons: {
    flexDirection: "row",
    gap: 15,
  },

  icon: {
    width: 20,
    height: 20,
  },

  backContainer: {
    backgroundColor: "#7B009A",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  body: {
    flex: 1,
    marginTop: 10,
  },

  titulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },

  card: {
    width: "47%",
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    marginBottom: 16,
    paddingBottom: 8,
  },

  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  cardActions: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    gap: 6,
  },

  closeButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 20,
    padding: 4,
  },

  editButton: {
    backgroundColor: "#4C00FF",
    borderRadius: 20,
    padding: 4,
  },

  cardInfo: {
    paddingHorizontal: 8,
    marginTop: 8,
  },

  cardTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  cardPrice: {
    color: "#c5c5c5",
    fontSize: 12,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  ratingText: {
    color: "#FFD700",
    marginLeft: 2,
    fontSize: 12,
  },

  verMaisBtn: {
    backgroundColor: "#7B009A",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 50,
  },

  verMaisText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
