import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';
import CategoriasScreen from "./CategoriasScreen";

const { width } = Dimensions.get("window");

// Dados
const banners = [
  {
    id: "1",
    titulo: "Descubra novos jogos incríveis!",
    imagem: require("../assets/img/banner_FarCry.jpg"),
  },
  {
    id: "2",
    titulo: "Promoções imperdíveis!",
    imagem: require("../assets/img/banner_MortalKombat.jpg"),
  },
  {
    id: "3",
    titulo: "Jogos em pré-venda",
    imagem: require("../assets/img/banner_TLOU.jpeg"),
  },
];

const maisVendidos = [
  {
    id: "1",
    image: require("../screens/assets/fc26.png"),
    title: "FC 26 Ultimate Edition",
    price: "R$199,99",
    rating: 4.5,
  },
  {
    id: "2",
    image: require("../screens/assets/supermario.png"),
    title: "Super Mario World",
    price: "R$149,99",
    rating: 4.8,
  },
  {
    id: "3",
    image: require("../screens/assets/ratchet_clank.png"),
    title: "Ratchet Clank",
    price: "R$129,99",
    rating: 4.7,
  },
  {
    id: "4",
    image: require("../screens/assets/fc26.png"),
    title: "FC 26 Ultimate Edition",
    price: "R$199,99",
    rating: 4.5,
  },
  {
    id: "5",
    image: require("../screens/assets/supermario.png"),
    title: "Super Mario World",
    price: "R$149,99",
    rating: 4.8,
  },
  {
    id: "6",
    image: require("../screens/assets/ratchet_clank.png"),
    title: "Ratchet Clank",
    price: "R$129,99",
    rating: 4.7,
  },
];

const preVenda = [
  {
    id: "1",
    image: require("../screens/assets/minecraftofer.png"),
    title: "Minecraft",
    price: "R$99,99",
    rating: 4.6,
  },
  {
    id: "2",
    image: require("../screens/assets/spiderman2.png"),
    title: "Marvel Spider-Man 2",
    price: "R$79,99",
    rating: 4.9,
  },
  {
    id: "3",
    image: require("../screens/assets/the_last_of_us.png"),
    title: "The Last of Us II",
    price: "R$59,99",
    rating: 4.7,
  },
];

const categorias = [
  {
    id: "4",
    nome: "Ação",
    imagem: require("../screens/assets/tombraider.png"),
    personagem: require("../screens/assets/tombrainder1.png"),
  },
  {
    id: "5",
    nome: "Aventura",
    imagem: require("../screens/assets/Sea-of-Thieves.png"),
    personagem: require("../screens/assets/SeaofThives.png"),
  },
  {
    id: "6",
    nome: "Esportes",
    imagem: require("../screens/assets/nba2k.png"),
    personagem: require("../screens/assets/stephencurry.png"),
  },
  {
    id: "7",
    nome: "FPS",
    imagem: require("../screens/assets/haloback.png"),
    personagem: require("../screens/assets/halo.png"),
  },
  {
    id: "8",
    nome: "Simulação",
    imagem: require("../screens/assets/fundo_simulacao.png"),
    personagem: require("../screens/assets/simulacao.png"),
  },
  {
    id: "9",
    nome: "RPG",
    imagem: require("../screens/assets/fightback.png"),
    personagem: require("../screens/assets/streetfighter.png"),
  },
];

const melhorAvaliacao = [
  {
    id: "1",
    image: require("../screens/assets/fc26.png"),
    title: "FC 26 Ultimate Edition",
    price: "R$199,99",
    rating: 4.8,
  },
  {
    id: "2",
    image: require("../screens/assets/supermario.png"),
    title: "Super Mario World",
    price: "R$149,99",
    rating: 4.9,
  },
  {
    id: "3",
    image: require("../screens/assets/ratchet_clank.png"),
    title: "Ratchet Clank",
    price: "R$129,99",
    rating: 4.7,
  },
];

const ofertas = [
  {
    id: "1",
    image: require("../screens/assets/minecraftofer.png"),
    title: "Minecraft",
    price: "R$99,99",
    rating: 4.5,
  },
  {
    id: "2",
    image: require("../screens/assets/spiderman2.png"),
    title: "Marvel Spider-man 2",
    price: "R$79,99",
    rating: 4.8,
  },
  {
    id: "3",
    image: require("../screens/assets/the_last_of_us.png"),
    title: "The Last of Us II",
    price: "R$59,99",
    rating: 4.6,
  },
];

const StarRating = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <FontAwesome name="star" size={14} color="#FFD700" />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderCard = (item, tipo) => {
    if (item.id === "verMais") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Produtos");
          }}
        >
          <LinearGradient
            colors={["#8000FF", "#FF00FF"]}
            style={[
              tipo === "grande" ? styles.cardVendidos : styles.card,
              styles.verMaisCard,
            ]}
          >
            <Text style={styles.verMaisText}>Ver mais</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    if (tipo === "grande") {
      return (
        <View style={styles.cardVendidos}>
          <Image source={item.image} style={styles.cardImageVendidos} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.cardPrice}>{item.price}</Text>
            {item.rating && <StarRating rating={item.rating} />}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.cardPrice}>{item.price}</Text>
            {item.rating && <StarRating rating={item.rating} />}
          </View>
        </View>
      );
    }
  };

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

        <TouchableOpacity />
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

      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />

        {/* Banner */}
        <Animated.FlatList
          data={banners}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item }) => (
            <ImageBackground
              source={item.imagem}
              style={styles.bannerImage}
              imageStyle={{ borderRadius: 5 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.7)", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFillObject, { borderRadius: 5 }]}
              />
              <Text style={styles.bannerTitle}>{item.titulo}</Text>
            </ImageBackground>
          )}
        />

        {/* Mais Vendidos */}
        <Text style={styles.sectionTitle}>Mais Vendidos</Text>
        <FlatList
          data={[...maisVendidos, { id: "verMais" }]}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "grande")}
        />

        {/* Pré-Venda */}
        <Text style={styles.sectionTitle}>Pré-Venda</Text>
        <FlatList
          data={[...preVenda, { id: "verMais" }]}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "pequeno")}
        />

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias de jogos</Text>
        <View style={styles.grid}>

          {categorias.map((cat) => {
            let characterStyle = {};
            let textStyle = {};
            switch (cat.id) {
              case "4":
                characterStyle = styles.characterAcao;
                textStyle = styles.overlayAcao;
                break;
              case "5":
                characterStyle = styles.characterAventura;
                textStyle = styles.overlayAventura;
                break;
              case "6":
                characterStyle = styles.characterEsportes;
                textStyle = styles.overlayEsportes;
                break;
              case "7":
                characterStyle = styles.characterFPS;
                textStyle = styles.overlayFPS;
                break;
              case "8":
                characterStyle = styles.characterSimulacao;
                textStyle = styles.overlaySimulacao;
                break;
              case "9":
                characterStyle = styles.characterRPG;
                textStyle = styles.overlayRPG;
                break;
            }
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.gridCard3D}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('CategoriaDetalhada')}
              >
                <Image
                  source={cat.imagem}
                  style={styles.gridCardImage}
                  blurRadius={2}
                />
                <View style={styles.overlay3D} />
                <View style={styles.cardContent}>
                  {cat.personagem && (
                    <Image
                      source={cat.personagem}
                      style={characterStyle}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={textStyle}>{cat.nome}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Melhores Avaliações */}
        <Text style={styles.sectionTitle}>Melhores Avaliações</Text>
        <FlatList
          data={[...melhorAvaliacao, { id: "verMais" }]}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "pequeno")}
        />

        {/* Ofertas */}
        <Text style={styles.sectionTitle}>Ofertas</Text>
        <FlatList
          data={[...ofertas, { id: "verMais" }]}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "grande")}
        />
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
  scrollview: { flex: 1, backgroundColor: "#000", paddingTop: 5 },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 4,
    marginRight: 4,
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
  bannerImage: {
    width: width * 0.9,
    height: 180,
    marginHorizontal: width * 0.05,
    justifyContent: "center",
    padding: 20,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "70%",
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
  },
  card: {
    width: 200,
    height: 160,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 40,
    margin: 5,
    backgroundColor: "#252525ff",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 50,
    shadowColor: "#ff00d0ff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
  },

  cardImage: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardVendidos: {
    width: 140,
    height: 250,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#252525ff",
    borderRadius: 10,
    paddingBottom: 50,
    boxShadowColor: "#86007bb3",
    shadowColor: "#ff00d0ff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 20,
  },

  cardImageVendidos: {
    width: 120,
    height: 160,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 4
  },

  cardPrice: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
    paddingLeft: 4,
  },
  verMaisCard: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  verMaisText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 50,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  gridCard3D: {
    width: width / 2 - 18,
    height: 130,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    transform: [
      { perspective: 800 },
      { rotateX: "4deg" },
      { rotateY: "-3deg" },
    ],
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  gridCardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 14,
  },
  overlay3D: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 14,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 10,
    zIndex: 10,
  },
  characterAcao: {
    width: 200,
    height: 230,
    bottom: -110,
    left: -90,
    position: "absolute",
    zIndex: 100,
  },
  overlayAcao: {
    marginLeft: 80,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
  characterAventura: {
    width: 200,
    height: 230,
    bottom: -110,
    left: -90,
    position: "absolute",
    zIndex: 100,
  },
  overlayAventura: {
    marginLeft: 50,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
  characterEsportes: {
    width: 200,
    height: 230,
    bottom: -30,
    left: -60,
    position: "absolute",
    zIndex: 100,
  },
  overlayEsportes: {
    marginLeft: 80,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
  characterFPS: {
    width: 200,
    height: 200,
    bottom: -90,
    left: -70,
    position: "absolute",
    zIndex: 100,
  },
  overlayFPS: {
    marginLeft: 80,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
  characterSimulacao: {
    width: 200,
    height: 200,
    bottom: -70,
    left: -50,
    position: "absolute",
    zIndex: 100,
  },
  overlaySimulacao: {
    marginLeft: 80,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
  characterRPG: {
    width: 200,
    height: 220,
    bottom: -80,
    left: -70,
    position: "absolute",
    zIndex: 100,
  },
  overlayRPG: {
    marginLeft: 80,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    textAlign: "center",
    zIndex: 15,
  },
});
