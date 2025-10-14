import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritosScreen({ navigation }) {
  // Jogos favoritos simulados
  const [jogos, setJogos] = useState([
    {
      id: "1",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
    {
      id: "2",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
    {
      id: "3",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
    {
      id: "4",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
    {
      id: "5",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
    {
      id: "6",
      nome: "Ratchet & Clank: Em Uma Outra Dimensão",
      plataforma: "Playstation 5",
      imagem: require("../assets/img/jogos/ratchet.png"),
      favorito: true,
    },
  ]);

  // Alternar favorito
  const toggleFavorito = (id) => {
    const atualizados = jogos.map((jogo) =>
      jogo.id === id ? { ...jogo, favorito: !jogo.favorito } : jogo
    );
    setJogos(atualizados);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.capa} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>
          {item.nome}
        </Text>

        <View style={styles.baixo}>
          <Text style={styles.plataforma}>{item.plataforma}</Text>
          <TouchableOpacity
            style={styles.botaoFavorito}
            onPress={() => toggleFavorito(item.id)}
          >
            <Ionicons
              name={item.favorito ? "heart" : "heart-outline"}
              size={22}
              color="#FF09E6"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image
          source={require("../assets/img/logo_nexus.png")}
          style={styles.logo}
        />
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

      {/* <Text style={styles.titulo}>Favoritos</Text> */}

      <FlatList
        data={jogos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.titulo}>Favoritos</Text>
        }
      />
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

  logo: { 
    width: 200, 
    height: 60, 
    resizeMode: "contain" 
  },

  navIcons: { 
    flexDirection: "row", 
    gap: 15
  },

  icon: { 
    width: 20, 
    height: 20 
  },

  titulo: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
    textAlign: "center",
  },
  lista: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    width: "40%",
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  capa: {
    width: "120%",
    height: 130,
    borderRadius: 5,
    marginBottom: 8,
  },
  info: {
    width: "100%",
    alignItems: "flex-start",
  },
  nome: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 5,
  },
  baixo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plataforma: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
  botaoFavorito: {
    marginLeft: 50,
  },
});
