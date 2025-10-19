import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const produtosIniciais = [
  {
    id: "1",
    nome: "God of War 5 Ragnarok",
    preco: "R$349,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.7,
    categoria: "PlayStation",
  },
  {
    id: "2",
    nome: "FIFA 24",
    preco: "R$299,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.5,
    categoria: "PlayStation",
  },
  {
    id: "3",
    nome: "Minecraft",
    preco: "R$199,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.6,
    categoria: "PC",
  },
  {
    id: "4",
    nome: "Spider-Man 2",
    preco: "R$249,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.8,
    categoria: "PlayStation",
  },
  {
    id: "5",
    nome: "Horizon Forbidden West",
    preco: "R$349,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.7,
    categoria: "PlayStation",
  },
  {
    id: "6",
    nome: "Elden Ring",
    preco: "R$399,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.9,
    categoria: "Xbox",
  },
  {
    id: "7",
    nome: "Resident Evil 4",
    preco: "R$299,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.6,
    categoria: "Xbox",
  },
  {
    id: "8",
    nome: "Super Mario Odyssey",
    preco: "R$279,90",
    img: require("./assets/godofwar.png"),
    avaliacao: 4.8,
    categoria: "Nintendo",
  },
];

export default function ProdutosScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const categoriaRecebida = route.params?.categoria || "Todos";

  const [produtos, setProdutos] = useState(produtosIniciais);
  const [filtro, setFiltro] = useState(categoriaRecebida);
  const [busca, setBusca] = useState("");

  const categorias = [
    "Todos",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "PC",
    "Ação",
    "Aventura",
  ];

  // Atualiza filtro ao receber parâmetro
  useEffect(() => {
    if (categoriaRecebida) setFiltro(categoriaRecebida);
  }, [categoriaRecebida]);

  const filtrarProdutos = () => {
    return produtosIniciais.filter((p) => {
      const correspondeCategoria = filtro === "Todos" || p.categoria === filtro;
      const correspondeBusca = p.nome
        .toLowerCase()
        .includes(busca.toLowerCase());
      return correspondeCategoria && correspondeBusca;
    });
  };

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.img} style={styles.produtoImg} resizeMode="cover" />
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.produtoPreco}>{item.preco}</Text>
        <View style={styles.avaliacao}>
          <Text style={styles.avaliacaoText}>{item.avaliacao}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
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

      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar jogos desta categoria"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
        <Ionicons
          name="search"
          size={24}
          color="#000"
          style={{ marginLeft: 10 }}
        />
      </View>

      {/* Filtros horizontais */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, paddingLeft: 10 }}
      >
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={{
              marginRight: 10,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: filtro === cat ? "#FF09E6" : "#8000FF",
              borderRadius: 20,
            }}
            onPress={() => setFiltro(cat)}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <FlatList
        data={filtrarProdutos()}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduto}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Boxes grandes no final */}
      <Text style={styles.sectionTitle}>Categorias:</Text>
      <View style={styles.boxContainer}>
        {["PlayStation", "Xbox", "Nintendo"].map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.box,
              {
                backgroundColor:
                  cat === "PlayStation"
                    ? "#1E50FF"
                    : cat === "Xbox"
                    ? "#107C10"
                    : "#E60012",
              },
            ]}
            onPress={() => setFiltro(cat)}
          >
            <Text style={styles.boxText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 10 },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: { width: 180, height: 50, resizeMode: "contain" },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 24, height: 24 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: { flex: 1, padding: 5, color: "#000" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1a1a3b",
    borderRadius: 12,
    width: width * 0.4,
    marginRight: 15,
    padding: 10,
  },
  produtoImg: { width: "100%", height: 120, borderRadius: 10, marginBottom: 8 },
  produtoNome: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  produtoPreco: { color: "#FFD700", fontWeight: "bold", fontSize: 14 },
  avaliacao: { flexDirection: "row", alignItems: "center" },
  avaliacaoText: { color: "#fff", marginRight: 3, fontSize: 12 },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 15,
  },
  box: {
    flex: 1,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
