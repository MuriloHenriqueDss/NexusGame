// screens/DetalhesProdutoScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function DetalhesProdutoScreen({ route, navigation }) {
  const { jogo } = route.params;

  const relacionados = [
    {
      id: "13",
      nome: "Resident Evil 4 Remake",
      imagem: require("../screens/assets/jogos/residentevil4.jpg"),
      preco: 299.9,
      rating: 4.8,
    },
    {
      id: "14",
      nome: "Silent Hill 2 Remake",
      imagem: require("../screens/assets/jogos/silenthill.jpg"),
      preco: 179.9,
      rating: 4.5,
    },
    {
      id: "15",
      nome: "Starfield",
      imagem: require("../screens/assets/jogos/starfield.jpg"),
      preco: 349.9,
      rating: 4.3,
    },
    {
      id: "16",
      nome: "Alan Wake 2",
      imagem: require("../screens/assets/jogos/alanwake.jpg"),
      preco: 279.9,
      rating: 4.6,
    },
    {
      id: "17",
      nome: "Baldur’s Gate 3",
      imagem: require("../screens/assets/jogos/baldursgate.jpg"),
      preco: 299.9,
      rating: 4.9,
    },
    {
      id: "18",
      nome: "Spider-Man 2",
      imagem: require("../screens/assets/jogos/spiderman2.jpg"),
      preco: 349.9,
      rating: 4.7,
    },
  ];

  const handleAdicionarCarrinho = (item) => {
    Alert.alert(
      "Produto Adicionado",
      `${item.nome} foi adicionado ao carrinho!`
    );
  };

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
          <Text style={styles.textoVoltar}>Detalhes do Jogo</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <Image source={jogo.imagem} style={styles.banner} />

      {/* Informações */}
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{jogo.nome}</Text>
        <Text style={styles.plataforma}>
          Plataforma: {jogo.plataforma || "Playstation"}
        </Text>
        <Text style={styles.preco}>R$ {jogo.preco || "149,90"}</Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.carrinhoButton}
          onPress={() => handleAdicionarCarrinho(jogo)}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton}>
          <Ionicons name="heart" size={25} color="#FF09E6" />
        </TouchableOpacity>
      </View>
      <View style={styles.imagensExtrasContainer}>
        <Image
          source={require("../screens/assets/1.png")}
          style={styles.imagemExtra}
        />
        <Image
          source={require("../screens/assets/1.png")}
          style={styles.imagemExtra}
        />
      </View>

      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.descricao}>
          O Cruzado de Capa une forças com os super-heróis do universo DC Comics
          e parte para o espaço sideral para impedir que o maligno Brainiac
          destrua a Terra. Usando o poder dos anéis dos Lanternas, Brainiac
          encolhe mundos para adicionar à sua coleção de cidades em miniatura de
          todo o universo. Agora os maiores super-heróis e os mais espertos
          vilões devem unir forças para impedir o Brainiac antes que seja tarde
          demais.
        </Text>
      </View>

      {/* Jogos Relacionados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relacionados</Text>
        <FlatList
          data={relacionados}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardRelacionado}>
              <Image source={item.imagem} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.cardPreco}>R$ {item.preco.toFixed(2)}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <FontAwesome name="star" size={16} color="#FFD700" />
              </View>

              {/* Botão Adicionar ao Carrinho */}
              <TouchableOpacity
                style={styles.addCartButton}
                onPress={() => handleAdicionarCarrinho(item)}
              >
                <Ionicons name="cart-outline" size={18} color="#fff" />
                <Text style={styles.addCartText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          )}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000ff", padding: 10 },
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
  },
  textoVoltar: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 6,
  },
  banner: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginBottom: 16,
  },
  infoContainer: { marginBottom: 16 },
  titulo: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  plataforma: { color: "#aaa", fontSize: 16, marginBottom: 4 },
  preco: { color: "#FF09E6", fontSize: 20, fontWeight: "bold" },
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
  buttonText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  section: { marginBottom: 20 },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descricao: { color: "#ccc", fontSize: 14, lineHeight: 20 },
  row: { justifyContent: "space-between" },
  cardRelacionado: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: (width - 50) / 2,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 4,
  },
  cardPreco: { color: "#FF09E6", fontWeight: "bold", marginBottom: 4 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  ratingText: { color: "#fff", fontSize: 13 },
  addCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF09E6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    width: "90%",
  },
  addCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 6,
  },

  imagensExtrasContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 2,
  marginTop: 50,
  marginBottom: 50,
  gap: 12,
},

imagemExtra: {
  width: (width - 50) / 2,
  height: 120,
  borderRadius: 12,
  resizeMode: "cover",
},

});
