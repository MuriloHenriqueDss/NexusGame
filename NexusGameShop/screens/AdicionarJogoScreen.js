// screens/AdicionarJogoScreen.js
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

export default function AdicionarJogoScreen() {
  const navigation = useNavigation(); // ✅ Agora funciona
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("Playstation");
  const [preco, setPreco] = useState("");

  const handleUploadImage = () => {
    alert("Upload de imagem clicado!");
  };

  const handleCadastrar = () => {
    alert("Jogo cadastrado!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Navbar */}
      <View style={styles.navbar}>
        <Image
          source={require("../assets/img/logo_nexus.png")}
          style={styles.logo}
        />
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

      {/* 🔹 Botão Voltar */}
      <TouchableOpacity
        style={styles.voltar}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      {/* 🔹 Título */}
      <Text style={styles.title}>Cadastro de jogos</Text>

      {/* 🔹 Campo Título */}
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* 🔹 Picker */}
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

      {/* 🔹 Upload Imagem */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
        <Ionicons name="image-outline" size={24} color="#fff" />
        <Text style={styles.uploadText}>Upload Imagem</Text>
      </TouchableOpacity>

      {/* 🔹 Categorias */}
      <View style={styles.categoriasContainer}>
        {["Ação", "Lego", "Aventura", "FPS", "RPG", "Estratégia"].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoria}>
            <Text style={styles.categoriaTexto}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoria}>
          <Text style={styles.categoriaTexto}>+ Nova categoria</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Campo Preço */}
      <TextInput
        style={styles.input}
        placeholder="Preço"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      {/* 🔹 Botão Cadastrar */}
      <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastrar}>
        <Text style={styles.cadastrarTexto}>Cadastrar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 20,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },

  navIcons: {
    flexDirection: "row",
    gap: 15,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },

  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    shadowColor: "#FF09E6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },

  voltarTexto: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 16,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
  },

  pickerContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
  },

  picker: { color: "#fff" },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
  },

  uploadText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    marginHorizontal: 20,
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

  categoriaTexto: {
    color: "#fff",
  },

  cadastrarButton: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    marginTop: 12,
    alignSelf: "center",
    width: "50%",
  },

  cadastrarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
