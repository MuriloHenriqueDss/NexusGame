import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const produtosIniciais = [
  { id: "1", nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require("./assets/godofwar.png"), avaliacao: 4.7 },
  { id: "2", nome: "FIFA 24", preco: "R$299,90", img: require("./assets/godofwar.png"), avaliacao: 4.5 },
  { id: "3", nome: "Minecraft", preco: "R$199,90", img: require("./assets/godofwar.png"), avaliacao: 4.6 },
  { id: "4", nome: "Spider-Man 2", preco: "R$249,90", img: require("./assets/godofwar.png"), avaliacao: 4.8 },
];

export default function ProdutosScreen() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [mostrandoMais, setMostrandoMais] = useState(false);

  const handleVerMais = () => {
    if (!mostrandoMais) {
      const novosProdutos = [
        { id: "5", nome: "Horizon Forbidden West", preco: "R$349,90", img: require("./assets/godofwar.png"), avaliacao: 4.7 },
        { id: "6", nome: "Elden Ring", preco: "R$399,90", img: require("./assets/godofwar.png"), avaliacao: 4.9 },
        { id: "7", nome: "Resident Evil 4", preco: "R$299,90", img: require("./assets/godofwar.png"), avaliacao: 4.6 },
        { id: "8", nome: "Super Mario Odyssey", preco: "R$279,90", img: require("./assets/godofwar.png"), avaliacao: 4.8 },
      ];
      setProdutos([...produtos, ...novosProdutos]);
      setMostrandoMais(true);
    }
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
        <Image source={require("../assets/img/logo_nexus.png")} style={styles.logo} />
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
            <Image source={require("../assets/img/buscar_icon.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <Image source={require("../assets/img/carrinho_icon.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
            <Image source={require("../assets/img/notificacao_icon.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar jogos desta categoria" placeholderTextColor="#aaa" style={styles.searchInput} />
        <Ionicons name="search" size={24} color="#000" style={{ marginLeft: 10 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15, paddingLeft: 10 }}>
        {["Todos", "PlayStation", "Xbox", "Nintendo", "PC", "Ação", "Aventura"].map((cat) => (
          <TouchableOpacity key={cat} style={{ marginRight: 10, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#8000FF", borderRadius: 20 }}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Produtos */}
      <Text style={styles.sectionTitle}>Sugestões para você</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduto}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />

      {/* Botão Ver Mais */}
      {!mostrandoMais && (
        <TouchableOpacity style={styles.verMaisBtn} onPress={handleVerMais}>
          <Text style={styles.verMaisText}>Ver Mais</Text>
        </TouchableOpacity>
      )}

      {/* Boxes grandes no final */}
      <Text style={styles.sectionTitle}>Categorias:</Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#1E50FF" }]}>
          <Text style={styles.boxText}>Playstation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#107C10" }]}>
          <Text style={styles.boxText}>Xbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, { backgroundColor: "#E60012" }]}>
          <Text style={styles.boxText}>Nintendo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 10 },
  navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 },
  logo: { width: 180, height: 50, resizeMode: "contain" },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 24, height: 24 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, padding: 5, marginHorizontal: 10, marginBottom: 15 },
  searchInput: { flex: 1, padding: 5, color: "#000" },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 15, marginBottom: 10 },
  card: { backgroundColor: "#1a1a3b", borderRadius: 12, width: width * 0.4, marginRight: 15, padding: 10 },
  produtoImg: { width: "100%", height: 120, borderRadius: 10, marginBottom: 8 },
  produtoNome: { color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 5 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  produtoPreco: { color: "#FFD700", fontWeight: "bold", fontSize: 14 },
  avaliacao: { flexDirection: "row", alignItems: "center" },
  avaliacaoText: { color: "#fff", marginRight: 3, fontSize: 12 },
  verMaisBtn: { backgroundColor: "#8000FF", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 15, marginHorizontal: 20 },
  verMaisText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  boxContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginTop: 15 },
  box: { flex: 1, height: 80, marginHorizontal: 5, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  boxText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
