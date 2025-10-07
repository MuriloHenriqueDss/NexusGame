import React from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

const produtos = [
  { id: '1', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
  { id: '2', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
  { id: '3', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
  { id: '4', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
  { id: '5', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
  { id: '6', nome: "God of War 5 Ragnarok", preco: "R$349,90", img: require('./assets/godofwar.png') },
];

const categorias = [
  { id: '1', nome: 'Playstation', cor: '#1E50FF' },
  { id: '2', nome: 'Xbox', cor: '#107C10' },
  { id: '3', nome: 'Nintendo', cor: '#E60012' },
  { id: '4', nome: 'Ação', cor: '#000' },
];

export default function ProdutosScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Categoria: Playstation</Text>
      </View>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Buscar jogos desta categoria"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Ionicons name="search" size={24} color="#000" style={{ marginLeft: 10 }} />
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
        {["Playstation", "Xbox", "Nintendo", "Ofertas", "Ver todas"].map((filtro, index) => (
          <TouchableOpacity key={index} style={styles.filtroBtn}>
            <Text style={styles.filtroText}>{filtro}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Produtos */}
      <Text style={styles.sectionTitle}>Principais resultados:</Text>
      <FlatList 
        data={produtos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.img} style={styles.produtoImg} resizeMode="cover" />
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <Text style={styles.produtoPreco}>{item.preco}</Text>
          </View>
        )}
      />

      {/* Categorias extras */}
      <Text style={styles.sectionTitle}>Explore mais categorias</Text>
      <View style={styles.categoriasContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity key={cat.id} style={[styles.categoriaCard, { backgroundColor: cat.cor }]}>
            <Text style={styles.categoriaText}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão ver todas categorias */}
      <TouchableOpacity style={styles.verTodasBtn}>
        <Text style={styles.verTodasText}>Ver todas as categorias de produtos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b2b', padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerTitle: { color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 5, marginBottom: 10 },
  searchInput: { flex: 1, padding: 5, color: '#000' },
  filtros: { marginBottom: 10 },
  filtroBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  filtroText: { color: '#000', fontWeight: 'bold' },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  card: { backgroundColor: '#1a1a3b', borderRadius: 10, width: (width/2)-20, marginBottom: 15, padding: 10 },
  produtoImg: { width: '100%', height: 120, borderRadius: 10, marginBottom: 5 },
  produtoNome: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  produtoPreco: { color: '#FFD700', fontWeight: 'bold', marginTop: 5 },
  categoriasContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 15 },
  categoriaCard: { width: '48%', height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 10 },
  categoriaText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  verTodasBtn: { backgroundColor: '#8000FF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  verTodasText: { color: '#fff', fontWeight: 'bold' },
});
