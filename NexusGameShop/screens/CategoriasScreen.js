// screens/CategoriasScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const categorias = [
  { id: "4", nome: "Ação", imagem: require("../screens/assets/jogos/godofwar.jpg") },
  { id: "5", nome: "Corrida", imagem: require("../screens/assets/jogos/motor.avif") },
  { id: "6", nome: "Aventura", imagem: require("../screens/assets/minecraftofer.png") },
  { id: "8", nome: "Luta", imagem: require("../screens/assets/lutando.jpg") },
  { id: "9", nome: "Esportes", imagem: require("../screens/assets/rematch.jpg") },
  { id: "10", nome: "RPG", imagem: require("../screens/assets/jogos/zelda.jpg") },
  { id: "11", nome: "FPS", imagem: require("../screens/assets/jogos/callofduty.avif") },
  { id: "12", nome: "Simulação", imagem: require("../screens/assets/simulator.webp") },
];

export default function CategoriasScreen() {
  const navigation = useNavigation(); // <-- adiciona navigation

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Image
            source={require("../assets/img/logo_nexus.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
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

      {/* Barra roxa */}
      <View style={styles.voltarContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.textoVoltar}>Categorias</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginHorizontal: 8 }}
        />
        <TextInput
          placeholder="Buscar jogos"
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>

      {/* Grid de categorias */}
      <Text style={styles.sectionTitle}>Categorias de jogos</Text>
      <View style={styles.grid}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("CategoriaDetalhada", {
                categoriaId: cat.id,
                categoriaNome: cat.nome,
              })
            }
          >
            {cat.imagem ? (
              <Image source={cat.imagem} style={styles.cardImage} />
            ) : (
              <View style={[styles.cardCor, { backgroundColor: cat.cor }]}>
                <Text style={styles.cardTitle}>{cat.nome}</Text>
              </View>
            )}
            {cat.imagem && (
              <Text style={styles.cardTitleOverlay}>{cat.nome}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  logo: { width: 200, height: 60, resizeMode: "contain" },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 20, height: 20 },

  banner: {
    backgroundColor: "#800080",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  bannerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    margin: 12,
  },
  input: { flex: 1, padding: 10, color: "#fff", fontSize: 16 },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  card: {
    width: width / 2 - 18,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  cardCor: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: { width: "100%", height: "100%", position: "absolute" },
  cardTitleOverlay: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
