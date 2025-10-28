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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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

  const [filtro, setFiltro] = useState(categoriaRecebida);
  const [busca, setBusca] = useState("");

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
      {/* Barra superior */}
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

      {/* Botão Voltar */}
      <View style={styles.voltarContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltar}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.textoVoltar}>Categoria</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de busca */}
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

      {/* Ícones de plataforma */}
      <View style={styles.platformRow}>
        <TouchableOpacity
          style={[
            styles.platformCircle,
            filtro === "PlayStation" && { backgroundColor: "#003791" },
          ]}
          onPress={() => setFiltro("PlayStation")}
        >
          <FontAwesome5
            name="playstation"
            size={24}
            color={filtro === "PlayStation" ? "#fff" : "#003791"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.platformCircle,
            filtro === "Xbox" && { backgroundColor: "#107C10" },
          ]}
          onPress={() => setFiltro("Xbox")}
        >
          <FontAwesome5
            name="xbox"
            size={24}
            color={filtro === "Xbox" ? "#fff" : "#107C10"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.platformCircle,
            filtro === "Nintendo" && { backgroundColor: "#E60012" },
          ]}
          onPress={() => setFiltro("Nintendo")}
        >
          <FontAwesome5
            name="gamepad"
            size={24}
            color={filtro === "Nintendo" ? "#fff" : "#E60012"}
          />
        </TouchableOpacity>
      </View>

      {/* Lista de produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <FlatList
        data={filtrarProdutos()}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        numColumns={2} 
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 10 },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logo: { width: 200, height: 60, resizeMode: "contain" },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 20, height: 20 },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B009A",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  textoVoltar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 40,
    marginBottom: 15,
    justifyContent: "center",
  },
  searchInput: { flex: 1, padding: 5, color: "#000" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 30,
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

  platformRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    gap: 25,
  },
  platformCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
