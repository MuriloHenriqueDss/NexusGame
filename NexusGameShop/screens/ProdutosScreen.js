import React, { useState, useEffect, useCallback } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { supabase } from "../SupabaseConfig"; // ajuste se necessário

const { width } = Dimensions.get("window");

/* ---------------------------
   BANNERS (mantidos)
   --------------------------- */
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

/* ---------------------------
   UTILIDADES
   --------------------------- */

// Converte string hex (ex: "\\x6874...") em texto UTF-8
function hexToUtf8(hex) {
  try {
    if (!hex) return null;
    let cleaned = hex;
    if (cleaned.startsWith("\\x")) cleaned = cleaned.slice(2);
    // se já for uma URL (começa com http) retorne original — evita conversão desnecessária
    if (hex.startsWith("http")) return hex;

    let bytes = [];
    for (let i = 0; i < cleaned.length; i += 2) {
      const pair = cleaned.substr(i, 2);
      const code = parseInt(pair, 16);
      bytes.push(code);
    }
    // converte array de bytes para string UTF-8
    const str = decodeURIComponent(
      bytes.map((b) => "%" + ("0" + b.toString(16)).slice(-2)).join("")
    );
    return str;
  } catch (e) {
    console.warn("hexToUtf8 error:", e);
    return null;
  }
}

const formatPrice = (value) => {
  if (typeof value !== "number") return "";
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
};

function shuffleArray(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ---------------------------
   ELEMENTOS VISUAIS (mantidos)
   --------------------------- */

function GameCard({ jogo, onPress, onRate }) {
  const navigation = useNavigation();
  const [rating, setRating] = useState(jogo.media_avaliacoes ?? jogo.rating ?? 0);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [tempRating, setTempRating] = useState(rating);

  useEffect(() => {
    setRating(jogo.media_avaliacoes ?? jogo.rating ?? 0);
  }, [jogo.media_avaliacoes, jogo.rating]);

  const handleAddToCart = () => {
    navigation.navigate("Carrinho", { item: { ...jogo, quantidade: 1 } });
    Alert.alert(
      "Produto Adicionado",
      `${jogo.nome} foi adicionado ao carrinho`,
      [
        { text: "Continuar Comprando", style: "cancel" },
        { text: "Ver Carrinho", onPress: () => navigation.navigate("Carrinho") },
      ]
    );
  };

  const submitRating = async (value) => {
    setRatingOpen(false);
    setRating(value);
    setTempRating(value);
    if (onRate) {
      await onRate(jogo.id, value); // delega salvar ao pai
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress && onPress(jogo)}
        style={styles.cardWrapper}
        activeOpacity={0.85}
      >
        <View style={styles.card}>
          {jogo.imagem ? (
            <Image source={{ uri: jogo.imagem }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            // Se não houver imagem no DB, renderiza um espaço vazio com mesma altura
            <View style={[styles.cardImage, { backgroundColor: "#111" }]} />
          )}

          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {jogo.nome}
            </Text>

            <View style={styles.ratingContainerTop}>
              <Icon name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingTextTop}>
                {(rating ?? 0).toFixed(1)}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              {jogo.precoAntigo && (
                <Text style={styles.oldPrice}>
                  {formatPrice(jogo.precoAntigo)}
                </Text>
              )}
              {typeof jogo.preco === "number" ? (
                <Text style={styles.price}>{formatPrice(jogo.preco)}</Text>
              ) : (
                <Text style={styles.price}>Consultar</Text>
              )}
            </View>

            <View style={styles.bottomRow}>
              <TouchableOpacity
                style={styles.starTapArea}
                onPress={() => {
                  setTempRating(rating);
                  setRatingOpen(true);
                }}
              >
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.starText}>
                  {(rating ?? 0).toFixed(1)}
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
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => onPress ? onPress() : navigation.navigate("CategoriaDetalhada")}
      style={[styles.specialCard, { backgroundColor }]}
    >
      <ImageBackground
        source={image}
        style={styles.specialCardImage}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.specialCardContent}>
          <Text style={styles.specialCardTitle}>{title}</Text>
          <TouchableOpacity
            style={styles.specialCardButton}
            onPress={() => navigation.navigate("CategoriaDetalhada")}
          >
            <Text style={styles.specialCardButtonText}>Saiba mais</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function Section({ title, data, onPress, onRate }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => (
          <GameCard jogo={item} onPress={onPress} onRate={onRate} />
        )}
      />
    </View>
  );
}

/* ---------------------------
   TELA PRINCIPAL
   --------------------------- */

export default function ProdutosScreen() {
  const [jogos, setJogos] = useState([]); // todos os jogos
  const [medias, setMedias] = useState({}); // mapa id -> { media_avaliacoes, total_avaliacoes }
  const navigation = useNavigation();

  const fetchJogos = useCallback(async () => {
    try {
      // pega todos os jogos
      const { data: jogosData, error: jogosError } = await supabase
        .from("jogos")
        .select("*");

      if (jogosError) {
        console.error("Erro ao buscar jogos:", jogosError);
        return;
      }

      // pega médias da view jogo_media_avaliacoes (se você criou a view)
      const { data: mediasData, error: mediasError } = await supabase
        .from("jogo_media_avaliacoes")
        .select("*");

      if (mediasError && mediasError.code !== "42P01") {
        // se a view não existir, pode ignorar; mas se for outro erro, logue.
        console.warn("Aviso ao buscar view jogo_media_avaliacoes:", mediasError);
      }

      const mediasMap = {};
      if (Array.isArray(mediasData)) {
        mediasData.forEach((m) => {
          mediasMap[m.id_jogo] = {
            media_avaliacoes: parseFloat(m.media_avaliacoes) || 0,
            total_avaliacoes: m.total_avaliacoes || 0,
          };
        });
      }

      // prepare jogos: extrai imagem (trata bytea hex ou URL)
      const processed = (jogosData || []).map((j) => {
        // tentativas de interpretar foto_jogo:
        let imgUrl = null;

        if (typeof j.foto_jogo === "string") {
          // pode ser URL direta
          if (j.foto_jogo.startsWith("http")) imgUrl = j.foto_jogo;
          else {
            // pode ser hex armazenado como string
            const converted = hexToUtf8(j.foto_jogo);
            if (converted && converted.startsWith("http")) imgUrl = converted;
            else imgUrl = null;
          }
        } else if (j.foto_jogo instanceof Uint8Array || j.foto_jogo?.data) {
          // improvise: algumas libs trazem bytea como object/array — tentamos converter
          try {
            // se vier como objeto com 'data' array de bytes
            const bytes = j.foto_jogo.data || j.foto_jogo;
            let str = "";
            for (let b of bytes) str += String.fromCharCode(b);
            // tenta decodificar
            const decoded = decodeURIComponent(escape(str));
            if (decoded.startsWith("http")) imgUrl = decoded;
          } catch (e) {
            // ignore
          }
        }

        const media = mediasMap[j.id_jogo] || {};
        return {
          id: j.id_jogo,
          nome: j.nome_jogo,
          preco: typeof j.preco_jogo === "number" ? j.preco_jogo : parseFloat(j.preco_jogo) || null,
          precoAntigo: null,
          imagem: imgUrl, // pode ser null — GameCard trata isso
          media_avaliacoes: media.media_avaliacoes ?? 0,
          total_avaliacoes: media.total_avaliacoes ?? 0,
        };
      });

      setJogos(processed);
      setMedias(mediasMap || {});
    } catch (e) {
      console.error("Erro inesperado ao buscar jogos:", e);
    }
  }, []);

  useEffect(() => {
    fetchJogos();
    // re-fetch quando voltar para a tela, se desejar você pode usar foco da navegação
  }, [fetchJogos]);

  // Chama RPC salvar_avaliacao que sugeri no SQL
  const handleSalvarAvaliacao = async (id_jogo, nota) => {
    try {
      // pega user id
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr || !user) {
        Alert.alert("Não autenticado", "Faça login para avaliar.");
        return;
      }

      const uid = user.id;

      const { error: rpcErr } = await supabase.rpc("salvar_avaliacao", {
        uid,
        idj: id_jogo,
        nota,
      });

      if (rpcErr) {
        console.error("Erro ao salvar avaliação:", rpcErr);
        Alert.alert("Erro", "Falha ao salvar avaliação.");
        return;
      }

      // atualizar médias locais:
      // re-busca a view de médias para sincronizar
      const { data: mediasData, error: mediasError } = await supabase
        .from("jogo_media_avaliacoes")
        .select("*")
        .eq("id_jogo", id_jogo);

      if (!mediasError && Array.isArray(mediasData) && mediasData.length > 0) {
        const m = mediasData[0];
        setMedias((prev) => ({
          ...prev,
          [id_jogo]: {
            media_avaliacoes: parseFloat(m.media_avaliacoes) || 0,
            total_avaliacoes: m.total_avaliacoes || 0,
          },
        }));

        // atualiza também no estado jogos para refletir o card imediatamente
        setJogos((prev) =>
          prev.map((jg) =>
            jg.id === id_jogo
              ? { ...jg, media_avaliacoes: parseFloat(m.media_avaliacoes) || 0 }
              : jg
          )
        );
      } else {
        // se view não existir, apenas atualiza localmente (melhor do que nada)
        setJogos((prev) =>
          prev.map((jg) => (jg.id === id_jogo ? { ...jg, media_avaliacoes: nota } : jg))
        );
      }
    } catch (e) {
      console.error("Erro handleSalvarAvaliacao:", e);
      Alert.alert("Erro", "Falha inesperada ao salvar avaliação.");
    }
  };

  // seleciona subconjuntos aleatórios distintos para seções
  const buildSections = () => {
    const shuffled = shuffleArray(jogos);
    // garante que cada seção mostre até 6 itens e preferencialmente distintos
    const suggestions = shuffled.slice(0, 6);
    const searched = shuffleArray(shuffled.slice(6)).slice(0, 6);
    const launches = shuffleArray(shuffled.slice(12)).slice(0, 6);
    const promos = shuffleArray(shuffled.slice(18)).slice(0, 6);

    return { suggestions, searched, launches, promos };
  };

  const { suggestions, searched, launches, promos } = buildSections();

  const handlePress = (jogo) => {
    // o usuário pediu que clique leve para CategoriaDetalhada
    navigation.navigate("CategoriaDetalhada", { jogo });
  };

  return (
    <View style={styles.container}>
      {/* Navbar mantida */}
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

      <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#fff" style={{ marginLeft: 12 }} />
          <TextInput placeholder="Buscar jogos" placeholderTextColor="#535353ff" style={styles.input} />
        </View>

        <View style={styles.platformRow}>
          <TouchableOpacity style={[styles.platformCircle, { backgroundColor: "#003791" }]} onPress={() => navigation.navigate("CategoriaDetalhada")}>
            <FontAwesome5 name="playstation" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.platformCircle, { backgroundColor: "#107C10" }]} onPress={() => navigation.navigate("CategoriaDetalhada")}>
            <FontAwesome5 name="xbox" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.platformCircle, { backgroundColor: "#ff0000" }]} onPress={() => navigation.navigate("CategoriaDetalhada")}>
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
            <ImageBackground source={item.imagem} style={styles.banner} imageStyle={{ borderRadius: 12 }}>
              <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
              <Text style={styles.bannerTexto}>{item.titulo}</Text>
            </ImageBackground>
          )}
        />

        {/* SEÇÕES com jogos aleatórios do BD */}
        <Section title="Sugestões para você" data={suggestions} onPress={handlePress} onRate={handleSalvarAvaliacao} />
        <Section title="Mais pesquisados" data={searched} onPress={handlePress} onRate={handleSalvarAvaliacao} />
        <Section title="Lançamentos" data={launches} onPress={handlePress} onRate={handleSalvarAvaliacao} />
        <Section title="Promoções" data={promos} onPress={handlePress} onRate={handleSalvarAvaliacao} />

        <View style={styles.specialCardsContainer}>
          <SpecialCard title="Confira nossa seleção Nintendo!" backgroundColor="#E60012" image={require("../screens/assets/bannermario.png")} />
          <SpecialCard title="Confira nossa seleção PlayStation!" backgroundColor="#0070D1" image={require("../screens/assets/bannerkratos.png")} />
          <SpecialCard title="Confira nossa seleção Xbox!" backgroundColor="#107C10" image={require("../screens/assets/bannerhalo.png")} />
        </View>

        <Section title="Pré venda" data={suggestions} onPress={handlePress} onRate={handleSalvarAvaliacao} />
        <Section title="Destaques" data={searched} onPress={handlePress} onRate={handleSalvarAvaliacao} />

        <TouchableOpacity style={styles.categoriesButton} onPress={() => navigation.navigate("Categorias")}>
          <Ionicons name="grid-outline" size={24} color="#fff" />
          <Text style={styles.categoriesButtonText}>Ver Todas as Categorias</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

/* ---------------------------
   ESTILOS (idênticos ao seu original)
   --------------------------- */
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
  specialCardButtonText: { color: "#fff", fontWeight: "bold" },

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
