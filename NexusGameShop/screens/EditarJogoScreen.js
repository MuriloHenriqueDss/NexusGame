// screens/EditarJogoScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function EditarJogoScreen() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState("God of War 5 Ragnarok");
  const [plataforma, setPlataforma] = useState("Playstation");
  const [preco, setPreco] = useState("R$349,90");
  const [categorias, setCategorias] = useState([
    "Ação",
    "Lego",
    "Aventura",
    "FPS",
    "RPG",
    "Estratégia",
  ]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState(["Ação", "RPG"]);
  const [imagem, setImagem] = useState(
    "https://image.api.playstation.com/vulcan/ap/rnd/202207/1117/P8AN9kNfSJtfSx0PmlT93mnN.jpg"
  );

  const handleUploadImage = () => {
    // Apenas simula a troca de imagem
    const novaImagem =
      "https://via.placeholder.com/200x120.png?text=Nova+Imagem";
    setImagem(novaImagem);
  };

  const toggleCategoria = (cat) => {
    if (categoriasSelecionadas.includes(cat)) {
      setCategoriasSelecionadas(
        categoriasSelecionadas.filter((c) => c !== cat)
      );
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, cat]);
    }
  };

  const handleNovaCategoria = () => {
    const novaCat = prompt("Digite o nome da nova categoria:");
    if (novaCat && novaCat.trim() !== "") {
      setCategorias([...categorias, novaCat.trim()]);
      setCategoriasSelecionadas([...categoriasSelecionadas, novaCat.trim()]);
    }
  };

  const handleSalvar = () => {
    // Apenas volta para GerenciarJogosScreen sem alterar nada
    navigation.navigate("GerenciarJogos");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image
          source={require("../assets/img/logo_nexus.png")}
          style={styles.logo}
        />
      </View>

      {/* Botão Voltar */}
      <View style={styles.voltarContainer}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.botaoVoltar}
            >
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
        </View>

      {/* Container central */}
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Editar Jogo</Text>

        {/* Preview da Imagem */}
        <Image source={{ uri: imagem }} style={styles.previewImage} />

        {/* Upload Imagem */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
          <Ionicons name="image-outline" size={24} color="#fff" />
          <Text style={styles.uploadText}>Alterar Imagem</Text>
        </TouchableOpacity>

        {/* Campo Título */}
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#aaa"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Picker Plataforma */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plataforma}
            onValueChange={(itemValue) => setPlataforma(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Playstation" value="Playstation" />
            <Picker.Item label="Xbox" value="Xbox" />
            <Picker.Item label="PC" value="PC" />
            <Picker.Item label="Nintendo" value="Nintendo" />
          </Picker>
        </View>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoria,
                categoriasSelecionadas.includes(cat) && {
                  backgroundColor: "#FF09E6",
                  borderColor: "#FF09E6",
                },
              ]}
              onPress={() => toggleCategoria(cat)}
            >
              <Text style={styles.categoriaTexto}>{cat}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.categoria}
            onPress={handleNovaCategoria}
          >
            <Text style={styles.categoriaTexto}>+ Nova categoria</Text>
          </TouchableOpacity>
        </View>

        {/* Campo Preço */}
        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        {/* Botão Salvar */}
        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={handleSalvar}
        >
          <Text style={styles.cadastrarTexto}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
  logo: { width: 180, height: 50, resizeMode: "contain" },
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
  cardContainer: {
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 60,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  uploadText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: { color: "#fff" },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 8 },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  categoria: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  categoriaTexto: { color: "#fff" },
  cadastrarButton: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  cadastrarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
