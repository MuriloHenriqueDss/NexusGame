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
import { Picker } from "@react-native-picker/picker";

export default function AdicionarJogoScreen() {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("Playstation");
  const [preco, setPreco] = useState("");

  const handleUploadImage = () => {
    // Aqui você pode implementar o upload usando expo-image-picker ou Firebase
    alert("Upload de imagem clicado!");
  };

  const handleCadastrar = () => {
    // Aqui você pode salvar os dados no banco
    alert("Jogo cadastrado!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro de jogos</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />

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

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
        <Ionicons name="image-outline" size={24} color="#fff" />
        <Text style={{ color: "#fff", marginLeft: 8 }}>Upload Imagem</Text>
      </TouchableOpacity>

      <View style={styles.categoriasContainer}>
        {["Ação", "Lego", "Aventura", "FPS", "RPG", "Estratégia"].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoria}>
            <Text style={{ color: "#fff" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.categoria}>
          <Text style={{ color: "#fff" }}>+ Nova categoria</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Preço"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastrar}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Cadastrar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 12,
  },
  picker: { color: "#fff" },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  categoriasContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  categoria: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  cadastrarButton: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
});
