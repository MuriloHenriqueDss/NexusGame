// screens/HomeScreen.js
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    { id: "1", nome: "The Witcher 3", imagem: require("../screens/assets/1.png") },
    { id: "2", nome: "Skyrim", imagem: require("../screens/assets/1.png") },
    { id: "3", nome: "Cyberpunk 2077", imagem: require("../screens/assets/1.png") },
    { id: "4", nome: "Dragon Age", imagem: require("../screens/assets/1.png") },
  ],
  pesquisados: [
    { id: "5", nome: "FIFA 24", imagem: require("../screens/assets/1.png") },
    { id: "6", nome: "NBA 2K24", imagem: require("../screens/assets/1.png") },
    { id: "7", nome: "Madden 24", imagem: require("../screens/assets/1.png") },
    { id: "8", nome: "eFootball 2024", imagem: require("../screens/assets/1.png") },
  ],
  lancamentos: [
    { id: "9", nome: "Resident Evil 4", imagem: require("../screens/assets/1.png") },
    { id: "10", nome: "Silent Hill 2", imagem: require("../screens/assets/1.png") },
    { id: "11", nome: "Alan Wake 2", imagem: require("../screens/assets/1.png") },
  ],
  promocoes: [
    { id: "12", nome: "Mario Odyssey", imagem: require("../screens/assets/1.png") },
    { id: "13", nome: "Mario Kart", imagem: require("../screens/assets/1.png") },
    { id: "14", nome: "Smash Bros", imagem: require("../screens/assets/1.png") },
    { id: "15", nome: "Pokémon Scarlet", imagem: require("../screens/assets/1.png") },
  ],
  prevenda: [
    { id: "16", nome: "GTA 6", imagem: require("../screens/assets/1.png") },
    { id: "17", nome: "Stalker 2", imagem: require("../screens/assets/1.png") },
    { id: "18", nome: "Metroid Prime 4", imagem: require("../screens/assets/1.png") },
  ],
  destaques: [
    { id: "19", nome: "Zelda BOTW", imagem: require("../screens/assets/1.png") },
    { id: "20", nome: "Elden Ring", imagem: require("../screens/assets/1.png") },
    { id: "21", nome: "God of War Ragnarök", imagem: require("../screens/assets/1.png") },
  ],
};

export default function HomeScreen() {
  const [jogos, setJogos] = useState(jogosIniciais);
  const navigation = useNavigation();

  const handlePress = (jogo) => {
    navigation.navigate("DetalhesProduto", { jogo });
  };

  const handleAddGame = () => {
    navigation.navigate("AdicionarJogo");
  };

  const handleVerCategorias = () => {
    navigation.navigate("Categorias");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../screens/assets/1.png")} style={styles.logo} />
        <View style={styles.icons}>
          <Ionicons name="search-outline" size={22} color="#fff" style={styles.icon} />
          <Ionicons name="cart-outline" size={22} color="#fff" style={styles.icon} />
          <Ionicons name="person-outline" size={22} color="#fff" style={styles.icon} />
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginLeft: 8 }} />
        <TextInput placeholder="Buscar jogos" placeholderTextColor="#888" style={styles.input} />
      </View>

      {/* Carrossel de banners */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageBackground source={item.imagem} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
              <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
              />
              <Text style={styles.bannerTexto}>{item.titulo}</Text>
            </ImageBackground>
          )}
        />
      </View>

      {/* Seções */}
      <Section title="Sugestões para você" data={jogos.sugestoes} onPress={handlePress} onAdd={handleAddGame} />
      <Section title="Mais pesquisados" data={jogos.pesquisados} onPress={handlePress} onAdd={handleAddGame} />
      <Section title="Lançamentos" data={jogos.lancamentos} onPress={handlePress} onAdd={handleAddGame} />
      <Section title="Promoção Fim de ano Nexus" data={jogos.promocoes} onPress={handlePress} onAdd={handleAddGame} />

      {/* Blocos especiais */}
      <SpecialCard title="Confira nossa seleção Nintendo!" cor="#D32F2F" imagem={require("../screens/assets/bannermario.png")} />
      <SpecialCard title="Confira nossa seleção PlayStation!" cor="#1976D2" imagem={require("../screens/assets/bannerkratos.png")} />
      <SpecialCard title="Confira nossa seleção Xbox!" cor="#388E3C" imagem={require("../screens/assets/bannerhalo.png")} />

      <Section title="Pré-venda" data={jogos.prevenda} onPress={handlePress} onAdd={handleAddGame} />
      <Section title="Destaques" data={jogos.destaques} onPress={handlePress} onAdd={handleAddGame} />

      {/* Botão final */}
      <TouchableOpacity style={styles.botao} onPress={handleVerCategorias}>
        <Text style={styles.botaoTexto}>Ver todas as categorias de produtos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componente Section
function Section({ title, data, onPress, onAdd }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onAdd}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <View style={styles.card}>
              <Image source={item.imagem} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.nome}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function SpecialCard({ title, cor, imagem }) {
  return (
    <ImageBackground
      source={imagem}
      style={styles.specialCard}
      imageStyle={{ borderRadius: 12, opacity: 0.6 }}
    >
      <View style={styles.specialOverlay}>
        <Text style={styles.specialText}>{title}</Text>
        <TouchableOpacity style={styles.specialButton}>
          <Text style={styles.specialButtonText}>Saiba mais</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: "contain",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 6,
  },
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
    fontSize: 16,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  banner: {
    width: width * 0.9,
    height: 180,
    marginHorizontal: width * 0.05,
    justifyContent: "center",
    padding: 20,
  },
  bannerTexto: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "70%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: 120,
    marginHorizontal: 8,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    color: "#fff",
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },

   specialCard: {
    height: 120,
    marginHorizontal: 12,
    marginBottom: 16,
    overflow: "hidden",
    justifyContent: "center",
    padding: 16,
  },
  specialOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 12,
    justifyContent: "center",
    padding: 16,
  },
  specialText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  specialButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  specialButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },

  botao: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    margin: 20,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

