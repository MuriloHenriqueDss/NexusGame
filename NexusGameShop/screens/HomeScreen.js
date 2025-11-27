import React, { useRef, useEffect, useState } from "react";
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
import { supabase } from "../SupabaseConfig";

const { width } = Dimensions.get("window");

// --------------------------
// CONVERSOR HEX → STRING URL
// --------------------------
const hexToString = (hex) => {
  try {
    if (!hex) return null;

    hex = hex.replace(/^\\x/, "");

    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      const code = parseInt(hex.substr(i, 2), 16);
      if (!isNaN(code)) str += String.fromCharCode(code);
    }
    return str;
  } catch (e) {
    console.log("Erro ao converter HEX:", e);
    return null;
  }
};

// --------------------------
// BANNERS (ESTÁTICOS)
// --------------------------
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

// --------------------------
// CATEGORIAS (ESTÁTICAS)
// --------------------------
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

const StarRating = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <FontAwesome name="star" size={14} color="#FFD700" />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  const [allGames, setAllGames] = useState([]);

  // --------------------------
  // CARREGAR JOGOS DO SUPABASE
  // --------------------------
  const loadGames = async () => {
    const { data, error } = await supabase.from("jogos").select("*");

    if (error) {
      console.log("Erro ao buscar jogos:", error);
      return;
    }

    const jogosTratados = data.map((jogo) => ({
      id: jogo.id_jogo.toString(),
      title: jogo.nome_jogo,
      price: `R$${jogo.preco_jogo}`,
      rating: Math.floor(Math.random() * 2) + 4, // fake rating 4–5
      image: hexToString(jogo.foto_jogo), // <-- CONVERSÃO FINAL
    }));

    setAllGames(jogosTratados);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const renderCard = (item, tipo) => {
    if (!item.image) return null;

    if (tipo === "grande") {
      return (
        <View style={styles.cardVendidos}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImageVendidos}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <StarRating rating={item.rating} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <StarRating rating={item.rating} />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
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
            { useNativeDriver: false }
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

        {/* MAIS VENDIDOS */}
        <Text style={styles.sectionTitle}>Mais Vendidos</Text>
        <FlatList
          data={allGames}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "grande")}
        />

        {/* PRÉ-VENDA */}
        <Text style={styles.sectionTitle}>Pré-Venda</Text>
        <FlatList
          data={allGames}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "pequeno")}
        />

        {/* CATEGORIAS */}
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

        {/* MELHORES AVALIAÇÕES */}
        <Text style={styles.sectionTitle}>Melhores Avaliações</Text>
        <FlatList
          data={allGames}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "pequeno")}
        />

        {/* OFERTAS */}
        <Text style={styles.sectionTitle}>Ofertas</Text>
        <FlatList
          data={allGames}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderCard(item, "grande")}
        />

      </ScrollView>
    </View>
  );
}

/* ------------------------------------------ */
/* --------   STYLES (SEM ALTERAÇÃO)   ------ */
/* ------------------------------------------ */

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
    alignSelf: "center",
    marginTop: 5,
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
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    zIndex: 10,
  },

  characterAcao: {
    width: 200,
    height: 230,
    bottom: -110,
    left: -90,
    position: "absolute",
  },
  overlayAcao: {
    marginLeft: 80,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  characterAventura: {
    width: 200,
    height: 230,
    bottom: -110,
    left: -90,
    position: "absolute",
  },
  overlayAventura: {
    marginLeft: 50,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  characterEsportes: {
    width: 200,
    height: 230,
    bottom: -30,
    left: -60,
    position: "absolute",
  },
  overlayEsportes: {
    marginLeft: 80,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  characterFPS: {
    width: 200,
    height: 200,
    bottom: -90,
    left: -70,
    position: "absolute",
  },
  overlayFPS: {
    marginLeft: 80,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  characterSimulacao: {
    width: 200,
    height: 200,
    bottom: -70,
    left: -50,
    position: "absolute",
  },
  overlaySimulacao: {
    marginLeft: 80,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  characterRPG: {
    width: 200,
    height: 220,
    bottom: -80,
    left: -70,
    position: "absolute",
  },
  overlayRPG: {
    marginLeft: 80,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
});
