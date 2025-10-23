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
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    titulo: "Descubra novos jogos incríveis!",
    imagem: require("../screens/assets/minecraft.png"),
  },
  {
    id: "2",
    titulo: "Promoções imperdíveis!",
    imagem: require("../screens/assets/rematch.jpg"),
  },
  {
    id: "3",
    titulo: "Jogos em pré-venda",
    imagem: require("../screens/assets/gta6banner.jpg"),
  },
];

const jogosIniciais = {
  sugestoes: [
    {
      id: "1",
      nome: "The Witcher 3",
      imagem: require("../screens/assets/jogos/thewicher.jpg"),
      rating: 4.9,
      preco: 79.9,
      precoAntigo: 129.9,
    },
    {
      id: "2",
      nome: "Skyrim",
      imagem: require("../screens/assets/jogos/skyrim.jpg"),
      rating: 4.8,
      preco: 49.9,
    },
    {
      id: "3",
      nome: "Cyberpunk 2077",
      imagem: require("../screens/assets/jogos/cyberpunk.jpg"),
      rating: 4.5,
      preco: 89.9,
      precoAntigo: 199.9,
    },
    {
      id: "4",
      nome: "Dragon Age: Inquisition",
      imagem: require("../screens/assets/jogos/dragonage.jpg"),
      rating: 4.7,
      preco: 59.9,
    },
    {
      id: "5",
      nome: "Elden Ring",
      imagem: require("../screens/assets/jogos/eldenring.jpg"),
      rating: 4.9,
      preco: 249.9,
      precoAntigo: 299.9,
    },
    {
      id: "6",
      nome: "God of War Ragnarök",
      imagem: require("../screens/assets/jogos/godofwar.jpg"),
      rating: 4.8,
      preco: 279.9,
    },
  ],
  pesquisados: [
    {
      id: "7",
      nome: "FIFA 26",
      imagem: require("../screens/assets/fc26.png"),
      preco: 249.9,
    },
    {
      id: "8",
      nome: "NBA 2K24",
      imagem: require("../screens/assets/jogos/nba2k.jpg"),
      preco: 199.9,
    },
    {
      id: "9",
      nome: "Call of Duty: Modern Warfare III",
      imagem: require("../screens/assets/jogos/callofduty.jpg"),
      preco: 279.9,
    },
    {
      id: "10",
      nome: "Assassin’s Creed Mirage",
      imagem: require("../screens/assets/jogos/assasinscreed.jpg"),
      preco: 199.9,
    },
    {
      id: "11",
      nome: "Forza Horizon 5",
      imagem: require("../screens/assets/jogos/forzahorizon5.jpg"),
      preco: 229.9,
    },
    {
      id: "12",
      nome: "Overwatch 2",
      imagem: require("../screens/assets/jogos/overwatch2.jpg"),
      preco: 159.9,
    },
  ],
  lancamentos: [
    {
      id: "13",
      nome: "Resident Evil 4 Remake",
      imagem: require("../screens/assets/jogos/residentevil4.jpg"),
      preco: 299.9,
    },
    {
      id: "14",
      nome: "Silent Hill 2 Remake",
      imagem: require("../screens/assets/jogos/silenthill.jpg"),
      preco: 179.9,
    },
    {
      id: "15",
      nome: "Starfield",
      imagem: require("../screens/assets/jogos/starfield.jpg"),
      preco: 349.9,
    },
    {
      id: "16",
      nome: "Alan Wake 2",
      imagem: require("../screens/assets/jogos/alanwake.jpg"),
      preco: 279.9,
    },
    {
      id: "17",
      nome: "Baldur’s Gate 3",
      imagem: require("../screens/assets/jogos/baldursgate.jpg"),
      preco: 299.9,
    },
    {
      id: "18",
      nome: "Spider-Man 2",
      imagem: require("../screens/assets/jogos/spiderman2.jpg"),
      preco: 349.9,
    },
  ],
  promocoes: [
    {
      id: "19",
      nome: "Mario Odyssey",
      imagem: require("../screens/assets/jogos/marioodyssey.jpg"),
      preco: 39.9,
      precoAntigo: 79.9,
    },
    {
      id: "20",
      nome: "Mario Kart 8 Deluxe",
      imagem: require("../screens/assets/supermario.png"),
      preco: 29.9,
      precoAntigo: 59.9,
    },
    {
      id: "21",
      nome: "Cuphead",
      imagem: require("../screens/assets/jogos/cuphead.png"),
      preco: 24.9,
      precoAntigo: 59.9,
    },
    {
      id: "22",
      nome: "Hollow Knight",
      imagem: require("../screens/assets/jogos/hollowknight.jpg"),
      preco: 19.9,
      precoAntigo: 49.9,
    },
    {
      id: "23",
      nome: "Celeste",
      imagem: require("../screens/assets/jogos/celeste.jpg"),
      preco: 19.9,
      precoAntigo: 59.9,
    },
    {
      id: "24",
      nome: "Dead Cells",
      imagem: require("../screens/assets/jogos/deadcells.jpg"),
      preco: 29.9,
      precoAntigo: 69.9,
    },
  ],
  preVendas: [
    {
      id: "25",
      nome: "GTA VI",
      imagem: require("../screens/assets/jogos/gta6.jpg"),
      preco: 499.9,
      dataLancamento: "2025-09-17",
    },
    {
      id: "26",
      nome: "Elder Scrolls VI",
      imagem: require("../screens/assets/jogos/elderscrolls.jpg"),
      preco: 449.9,
      dataLancamento: "2026-03-10",
    },
    {
      id: "27",
      nome: "Hades II",
      imagem: require("../screens/assets/jogos/hadesII.jpg"),
      preco: 199.9,
      dataLancamento: "2025-04-05",
    },
    {
      id: "28",
      nome: "Avowed",
      imagem: require("../screens/assets/jogos/avowed.jpg"),
      preco: 319.9,
      dataLancamento: "2025-07-01",
    },
    {
      id: "29",
      nome: "Fable Reboot",
      imagem: require("../screens/assets/jogos/fable.jpg"),
      preco: 289.9,
      dataLancamento: "2025-11-12",
    },
    {
      id: "30",
      nome: "Metal Gear Solid Δ: Snake Eater",
      imagem: require("../screens/assets/jogos/metalgear.jpg"),
      preco: 339.9,
      dataLancamento: "2025-05-30",
    },
  ],
  destaques: [
    {
      id: "31",
      nome: "Red Dead Redemption 2",
      imagem: require("../screens/assets/jogos/reddead2.jpg"),
      rating: 4.9,
      preco: 199.9,
    },
    {
      id: "32",
      nome: "The Legend of Zelda: Tears of the Kingdom",
      imagem: require("../screens/assets/jogos/zelda.jpg"),
      rating: 5.0,
      preco: 349.9,
    },
    {
      id: "33",
      nome: "Horizon Forbidden West",
      imagem: require("../screens/assets/jogos/horizonforbidden.jpg"),
      rating: 4.7,
      preco: 199.9,
    },
    {
      id: "34",
      nome: "Dark Souls III",
      imagem: require("../screens/assets/jogos/darksouls3.jpg"),
      rating: 4.8,
      preco: 149.9,
    },
  ],
};

const formatPrice = (value) => {
  if (typeof value !== "number") return "";
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
};

function GameCard({ jogo, onPress }) {
  const navigation = useNavigation();
  const [rating, setRating] = useState(jogo.rating ?? 0);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [tempRating, setTempRating] = useState(rating);

  const handleAddToCart = () => {
    navigation.navigate("Carrinho", { item: { ...jogo, quantidade: 1 } });
    Alert.alert(
      "Produto Adicionado",
      `${jogo.nome} foi adicionado ao carrinho`,
      [
        {
          text: "Continuar Comprando",
          style: "cancel",
          onPress: () => navigation.navigate("Produtos"),
        },
        {
          text: "Ver Carrinho",
          onPress: () => navigation.navigate("Carrinho"),
        },
      ]
    );
  };

  const openRating = () => {
    setTempRating(rating);
    setRatingOpen(true);
  };

  const submitRating = (value) => {
    setRating(value);
    setRatingOpen(false);
    Alert.alert("Obrigado", `Você avaliou ${value} estrela(s)`);
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={styles.cardWrapper}
        activeOpacity={0.85}
      >
        <View style={styles.card}>
          <Image
            source={jogo.imagem}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {jogo.nome}
            </Text>

            {jogo.rating != null && (
              <View style={styles.ratingContainerTop}>
                <Icon name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingTextTop}>
                  {(jogo.rating ?? rating).toFixed(1)}
                </Text>
              </View>
            )}

            <View style={styles.priceContainer}>
              {jogo.precoAntigo != null && (
                <Text style={styles.oldPrice}>
                  {formatPrice(jogo.precoAntigo)}
                </Text>
              )}
              {jogo.preco != null && (
                <Text style={styles.price}>{formatPrice(jogo.preco)}</Text>
              )}
              {jogo.preco == null && (
                <Text style={styles.price}>Consultar</Text>
              )}
            </View>

            <View style={styles.bottomRow}>
              <TouchableOpacity style={styles.starTapArea} onPress={openRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.starText}>
                  {rating ? rating.toFixed(1) : "0.0"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addCartButton}
                onPress={handleAddToCart}
              >
                <Ionicons name="cart-outline" size={18} color="#fff" />
                <Text style={styles.addCartText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={ratingOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRatingOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setRatingOpen(false)}
        >
          <View style={styles.ratingModal}>
            <Text style={styles.ratingModalTitle}>Avaliar</Text>
            <View style={styles.ratingStarsRow}>
              {[1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity
                  key={n}
                  onPress={() => submitRating(n)}
                  onPressIn={() => setTempRating(n)}
                  style={styles.modalStarButton}
                  activeOpacity={0.7}
                >
                  <Icon
                    name={n <= tempRating ? "star" : "star-o"}
                    size={32}
                    color={n <= tempRating ? "#FFD700" : "#666"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.ratingCancel}
              onPress={() => setRatingOpen(false)}
            >
              <Text style={styles.ratingCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

function SpecialCard({ title, backgroundColor, image, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.specialCard, { backgroundColor }]}
    >
      <ImageBackground
        source={image}
        style={styles.specialCardImage}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.specialCardContent}>
          <Text style={styles.specialCardTitle}>{title}</Text>
          <TouchableOpacity style={styles.specialCardButton}>
            <Text style={styles.specialCardButtonText}>Saiba mais</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function Section({ title, data, onPress, onAdd, initialVisible = 5 }) {
  const [expanded, setExpanded] = useState(false);
  const visibleData = expanded ? data : data.slice(0, initialVisible);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setExpanded((s) => !s)}>
            <Text style={styles.viewAllText}>
              {expanded ? "Ver menos" : `Ver tudo`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={visibleData}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <GameCard jogo={item} onPress={() => onPress(item)} />
        )}
      />
    </View>
  );
}

export default function ProdutosScreen() {
  const [jogos] = useState(jogosIniciais);
  const navigation = useNavigation();
  const handlePress = (jogo) =>
    navigation.navigate("DetalhesProduto", { jogo });
  const handleAddGame = () => navigation.navigate("AdicionarJogo");

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/img/logo_nexus.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity />
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
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#ffffffff"
          style={{ marginLeft: 12 }}
        />
        <TextInput
          placeholder="Buscar jogos"
          placeholderTextColor="#535353ff"
          style={styles.input}
        />
      </View>

      <View style={styles.platformRow}>
        <TouchableOpacity
          style={[styles.platformCircle, { backgroundColor: "#003791" }]}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        >
          <FontAwesome5 name="playstation" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.platformCircle, { backgroundColor: "#107C10" }]}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        >
          <FontAwesome5 name="xbox" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.platformCircle, { backgroundColor: "#ff0000ff" }]}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        >
          <FontAwesome5 name="gamepad" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.imagem}
            style={styles.banner}
            imageStyle={{ borderRadius: 12 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.bannerTexto}>{item.titulo}</Text>
          </ImageBackground>
        )}
      />

      <Section
        title="Sugestões para você"
        data={jogos.sugestoes}
        onPress={handlePress}
        onAdd={handleAddGame}
      />
      <Section
        title="Mais pesquisados"
        data={jogos.pesquisados}
        onPress={handlePress}
        onAdd={handleAddGame}
      />
      <Section
        title="Lançamentos"
        data={jogos.lancamentos}
        onPress={handlePress}
        onAdd={handleAddGame}
        initialVisible={3}
      />
      <Section
        title="Promoções"
        data={jogos.promocoes}
        onPress={handlePress}
        onAdd={handleAddGame}
      />

      <View style={styles.specialCardsContainer}>
        <SpecialCard
          title="Confira nossa seleção Nintendo!"
          backgroundColor="#E60012"
          image={require("../screens/assets/bannermario.png")}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        />
        <SpecialCard
          title="Confira nossa seleção PlayStation!"
          backgroundColor="#0070D1"
          image={require("../screens/assets/bannerkratos.png")}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        />
        <SpecialCard
          title="Confira nossa seleção Xbox!"
          backgroundColor="#107C10"
          image={require("../screens/assets/bannerhalo.png")}
          onPress={() => navigation.navigate("CategoriaDetalhada")}
        />
      </View>

      <Section
        title="Pré venda"
        data={jogos.preVendas}
        onPress={handlePress}
        onAdd={handleAddGame}
        initialVisible={3}
      />
      <Section
        title="Destaques"
        data={jogos.destaques}
        onPress={handlePress}
        onAdd={handleAddGame}
      />

      <TouchableOpacity
        style={styles.categoriesButton}
        onPress={() => navigation.navigate("Categorias")}
      >
        <Ionicons name="grid-outline" size={24} color="#fff" />
        <Text style={styles.categoriesButtonText}>Ver Todas as Categorias</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
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
  scrollview: { flex: 1, backgroundColor: "#000", paddingTop: 10 },
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
  input: { flex: 1, padding: 10, color: "#fff", fontSize: 16 },
  banner: {
    width: width * 0.9,
    height: 160,
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
  sectionContainer: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
  },
  viewAllText: { color: "#bbb", fontSize: 14, marginTop: 30 },
  cardWrapper: { paddingHorizontal: 8 },
  card: {
    width: 190,
    height: 270,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginHorizontal: 8,
  },
  cardImage: { width: "100%", height: 130 },
  cardBody: { padding: 8, alignItems: "center", justifyContent: "center" },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  ratingContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingTextTop: {
    color: "#FFD700",
    fontSize: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  priceContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  oldPrice: {
    color: "#aaa",
    fontSize: 12,
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  price: { color: "#FF09E6", fontSize: 14, fontWeight: "bold" },

  bottomRow: {
    marginTop: 10,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  starTapArea: { flexDirection: "row", alignItems: "center" },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  starText: {
    color: "#FFD700",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "700",
  },

  addCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF09E6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 0,
  },
  addCartText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
    fontSize: 12,
  },

  specialCardsContainer: { paddingHorizontal: 16, marginBottom: 20, gap: 2 },
  specialCard: {
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginTop: 20,
  },
  specialCardImage: { width: "100%", height: "100%", justifyContent: "center" },
  specialCardContent: {
    padding: 16,
    justifyContent: "space-between",
    height: "100%",
  },
  specialCardTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 8,
    marginTop: 50, 
  },
  specialCardButton: {
    borderColor: '#fff',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  specialCardButtonText: { color: "#ffffffff", fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ratingModal: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ratingModalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  ratingStarsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  modalStarButton: { paddingHorizontal: 6 },
  ratingCancel: { marginTop: 6 },
  ratingCancelText: { color: "#bbb" },

  categoriesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF09E6",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoriesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  platformCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  platformRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 20,
  },
});
