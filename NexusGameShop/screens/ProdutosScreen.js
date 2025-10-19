import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const banners = [
  { id: "1", titulo: "Descubra novos jogos incríveis!", imagem: require("../screens/assets/minecraft.png") },
  { id: "2", titulo: "Promoções imperdíveis!", imagem: require("../screens/assets/rematch.jpg") },
  { id: "3", titulo: "Jogos em pré-venda", imagem: require("../screens/assets/gta6banner.jpg") },
];

const jogosIniciais = {
  sugestoes: [
    { id: "1", nome: "The Witcher 3", imagem: require("../screens/assets/1.png"), rating: 4.9, preco: 79.9, precoAntigo: 129.9 },
    { id: "2", nome: "Skyrim", imagem: require("../screens/assets/1.png"), rating: 4.8, preco: 49.9 },
    { id: "3", nome: "Cyberpunk 2077", imagem: require("../screens/assets/1.png"), rating: 4.5, preco: 89.9, precoAntigo: 199.9 },
    { id: "4", nome: "Dragon Age", imagem: require("../screens/assets/1.png"), rating: 4.7, preco: 59.9 },
  ],
  pesquisados: [
    { id: "5", nome: "FIFA 26", imagem: require("../screens/assets/fc26.png"), preco: 249.9 },
    { id: "6", nome: "NBA 2K24", imagem: require("../screens/assets/1.png"), preco: 199.9 },
  ],
  lancamentos: [
    { id: "9", nome: "Resident Evil 4", imagem: require("../screens/assets/1.png"), preco: 299.9 },
    { id: "10", nome: "Silent Hill 2", imagem: require("../screens/assets/1.png"), preco: 179.9 },
  ],
  promocoes: [
    { id: "12", nome: "Mario Odyssey", imagem: require("../screens/assets/1.png"), preco: 39.9, precoAntigo: 79.9 },
    { id: "13", nome: "Mario Kart", imagem: require("../screens/assets/supermario.png"), preco: 29.9, precoAntigo: 59.9 },
  ],
};

const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

function GameCard({ jogo }) {
  const navigation = useNavigation();

  const handleAddToCart = () => {
    navigation.navigate("Carrinho", { 
      item: {
        id: jogo.id,
        nome: jogo.nome,
        preco: jogo.preco,
        imagem: jogo.imagem,
        quantidade: 1
      }
    });
    
    Alert.alert(
      "Produto Adicionado",
      `${jogo.nome} foi adicionado ao carrinho`,
      [
        { text: "Continuar Comprando", style: "cancel" },
        { text: "Ver Carrinho", onPress: () => navigation.navigate("Carrinho") }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image source={jogo.imagem} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{jogo.nome}</Text>

        {jogo.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{jogo.rating.toFixed(1)}</Text>
          </View>
        )}

        <View style={styles.priceContainer}>
          {jogo.precoAntigo && <Text style={styles.oldPrice}>{formatPrice(jogo.precoAntigo)}</Text>}
          <Text style={styles.price}>{formatPrice(jogo.preco)}</Text>
        </View>

        <TouchableOpacity style={styles.addCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.addCartText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Section({ title, data }) {
  const navigation = useNavigation();
  
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>Ver tudo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => <GameCard jogo={item} />}
      />
    </View>
  );
}

export default function ProdutosScreen() {
  const [jogos] = useState(jogosIniciais);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginLeft: 8 }} />
        <TextInput placeholder="Buscar jogos" placeholderTextColor="#888" style={styles.input} />
      </View>

      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageBackground source={item.imagem} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
            <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.bannerTexto}>{item.titulo}</Text>
          </ImageBackground>
        )}
      />

      <Section title="Sugestões para você" data={jogos.sugestoes} />
      <Section title="Mais pesquisados" data={jogos.pesquisados} />
      <Section title="Lançamentos" data={jogos.lancamentos} />
      <Section title="Promoções" data={jogos.promocoes} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000",
    paddingTop: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logo: { width: 200, height: 60, resizeMode: "contain" },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 20, height: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#fff",
    fontSize: 16
  },
  banner: {
    width: width * 0.9,
    height: 180,
    marginHorizontal: width * 0.05,
    justifyContent: "center",
    padding: 20
  },
  bannerTexto: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "70%"
  },
  sectionContainer: { 
    marginBottom: 20 
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },
  viewAllText: {
    color: "#bbb",
    fontSize: 14
  },
  card: {
    width: 150,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 8
  },
  cardImage: {
    width: "100%",
    height: 130
  },
  cardBody: {
    padding: 8,
    alignItems: "center"
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center"
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    marginLeft: 4
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  oldPrice: {
    color: "#aaa",
    fontSize: 12,
    textDecorationLine: "line-through",
    marginRight: 6
  },
  price: {
    color: "#FF09E6",
    fontSize: 14,
    fontWeight: "bold"
  },
  addCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF09E6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8
  },
  addCartText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
    fontSize: 12
  }
});