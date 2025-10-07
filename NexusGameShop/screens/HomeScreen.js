import React, { useRef } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const banners = [
  { id: '1', titulo: 'Descubra novos jogos incríveis!', imagem: require('../assets/img/banner_FarCry.jpg') },
  { id: '2', titulo: 'Promoções imperdíveis!', imagem: require('../assets/img/banner_MortalKombat.jpg') },
  { id: '3', titulo: 'Jogos em pré-venda', imagem: require('../assets/img/banner_TLOU.jpeg') },
];

const maisVendidos = [
  { id: '1', image: require('../screens/assets/fc26.png'), title: 'Jogo 1', price: 'R$199,99' },
  { id: '2', image: require('../screens/assets/supermario.png'), title: 'Jogo 2', price: 'R$149,99' },
  { id: '3', image: require('../screens/assets/ratchet_clank.png'), title: 'Jogo 3', price: 'R$129,99' },
];

const categorias = [
  { id: "4", nome: "Ação", imagem: require("../screens/assets/1.png") },
  { id: "5", nome: "Corrida", imagem: require("../screens/assets/1.png") },
  { id: "6", nome: "Aventura", imagem: require("../screens/assets/1.png") },
  { id: "7", nome: "Estratégia", imagem: require("../screens/assets/1.png") },
  { id: "8", nome: "Luta", imagem: require("../screens/assets/1.png") },
  { id: "9", nome: "Esportes", imagem: require("../screens/assets/1.png") },
  { id: "10", nome: "RPG", imagem: require("../screens/assets/1.png") },
  { id: "11", nome: "FPS", imagem: require("../screens/assets/1.png") },
  { id: "12", nome: "Simulação", imagem: require("../screens/assets/1.png") },
];

const ofertas = [
  { id: '1', image: require('../screens/assets/1.png'), title: 'Oferta 1', price: 'R$99,99' },
  { id: '2', image: require('../screens/assets/1.png'), title: 'Oferta 2', price: 'R$79,99' },
  { id: '3', image: require('../screens/assets/1.png'), title: 'Oferta 3', price: 'R$59,99' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <ScrollView style={styles.container}>
      
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require('../assets/img/logo_nexus.png')} style={styles.logo} />
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Categorias')}>
            <Image source={require('../assets/img/buscar_icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
            <Image source={require('../assets/img/carrinho_icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notificacoes')}>
            <Image source={require('../assets/img/notificacao_icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

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
            imageStyle={{ borderRadius: 10 }}
          >
            <Text style={styles.bannerTitle}>{item.titulo}</Text>
          </ImageBackground>
        )}
      />

      {/* Mais Vendidos */}
      <Text style={styles.sectionTitle}>Mais Vendidos</Text>
      <FlatList
        data={maisVendidos}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        )}
      />

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias de jogos</Text>
      <View style={styles.grid}>
        {categorias.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.gridCard}>
            {cat.imagem ? (
              <Image source={cat.imagem} style={styles.gridCardImage} />
            ) : (
              <View style={[styles.gridCardColor, { backgroundColor: cat.cor }]}>
                <Text style={styles.gridCardText}>{cat.nome}</Text>
              </View>
            )}
            {cat.imagem && <Text style={styles.gridCardOverlay}>{cat.nome}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Prtas */}
      <Text style={styles.sectionTitle}>Ofertas</Text>
      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000ff' 
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logo: { width: 200, height: 60 },
  navIcons: { flexDirection: 'row', gap: 15 },
  icon: { width: 20, height: 20 },

  /* Banner */
  bannerImage: {
    width: width - 40,
    height: 180,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'flex-end',
    padding: 15,
  },

  bannerTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },

  /* Cards horizontais */
  card: { width: 120, marginLeft: 20, marginTop: 10 },
  cardImage: { width: 120, height: 160, borderRadius: 10 },
  cardTitle: { color: '#fff', fontSize: 14, marginTop: 5 },
  cardPrice: { color: '#ff0', fontWeight: 'bold', fontSize: 14 },

  /* Grid categorias 2x2 */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 10,
  },
  gridCard: {
    width: width / 2 - 18,
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCardColor: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  gridCardImage: { width: '100%', height: '100%', position: 'absolute' },
  gridCardOverlay: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  gridCardText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
