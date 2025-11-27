import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../SupabaseConfig";

const BUCKET_NAME = "jogos";

/*
  Ajuste EXATO dos valores do ENUM no Supabase:
  Substitua os valores à direita se necessário.
*/
const CATEGORY_MAP = {
  "Aventura": "Aventura",
  "Ação": "Ação",
  "Corrida": "Corrida",
  "Esportes": "Esportes",
  "Estratégia": "Estratégia",
  "FPS": "FPS",
  "Lego": "Lego",
  "Luta": "Luta",
  "RPG": "RPG",
  "Simulação": "Simulação",
};

export default function AdicionarJogoScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("Playstation");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagemUrl, setImagemUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [categorias] = useState([
    "Aventura",
    "Ação",
    "Corrida",
    "Esportes",
    "Estratégia",
    "FPS",
    "Lego",
    "Luta",
    "RPG",
    "Simulação",
  ]);

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

  useEffect(() => {
    if (isFocused) checkAdminStatus();
  }, [isFocused]);

  const checkAdminStatus = async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;

    if (!user) {
      Alert.alert("Acesso Negado", "Faça login.");
      navigation.navigate("Login");
      return;
    }

    setLoading(true);
    try {
      const { data: profile, error } = await supabase
        .from("usuarios")
        .select("tipo_usuario")
        .eq("id_usuario", user.id)
        .single();

      if (error || !profile || profile.tipo_usuario !== "Administrador") {
        Alert.alert("Acesso Negado", "Somente administradores.");
        navigation.navigate("Main");
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    } catch (e) {
      Alert.alert("Erro", "Falha ao verificar permissões.");
      navigation.navigate("Main");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async () => {
    try {
      setUploadingImage(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Habilite o acesso às imagens.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      const extMatch = /\.(\w+)$/.exec(uri);
      const fileExt = extMatch ? extMatch[1] : "jpg";
      const fileName = `jogo_${Date.now()}.${fileExt}`;

      const response = await fetch(uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, blob, { upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      if (publicUrlError) throw publicUrlError;

      setImagemUrl(publicUrlData.publicUrl);
      Alert.alert("Imagem enviada", "Imagem enviada com sucesso.");
    } catch (e) {
      Alert.alert("Erro no upload", e?.message || String(e));
    } finally {
      setUploadingImage(false);
    }
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

  const handleCadastrar = async () => {
    if (loading) return;

    if (!titulo.trim()) {
      Alert.alert("Erro", "Informe o título.");
      return;
    }
    if (!preco.trim() || isNaN(parseFloat(preco))) {
      Alert.alert("Erro", "Preço inválido.");
      return;
    }
    if (categoriasSelecionadas.length === 0) {
      Alert.alert("Erro", "Selecione ao menos uma categoria.");
      return;
    }
    if (!imagemUrl) {
      Alert.alert("Erro", "Envie a imagem.");
      return;
    }

    setLoading(true);

    const categoriasParaInserir = categoriasSelecionadas.map(
      (c) => CATEGORY_MAP[c]
    );

    try {
      const { data, error } = await supabase
        .from("jogos")
        .insert([
          {
            nome_jogo: titulo,
            plataforma_jogo: [plataforma],
            preco_jogo: parseFloat(preco),
            descricao_jogo: descricao,
            foto_jogo: imagemUrl,
            categoria_jogo: categoriasParaInserir,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      Alert.alert("Sucesso", `Jogo "${titulo}" cadastrado.`);
      setTitulo("");
      setPreco("");
      setDescricao("");
      setImagemUrl("");
      setCategoriasSelecionadas([]);
    } catch (e) {
      Alert.alert("Erro ao cadastrar", e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isAdmin) {
    return (
      <View style={[styles.scrollview, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF09E6" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!isAdmin) {
    return (
      <View style={[styles.scrollview, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Acesso negado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.navbar}>
        <Text style={styles.logoText}>Nexus Admin</Text>
        <View style={styles.navIcons}>
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>
      </View>

      <TouchableOpacity
        style={styles.voltar}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Jogos</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          placeholderTextColor="#888"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plataforma}
            onValueChange={setPlataforma}
            style={styles.picker}
          >
            <Picker.Item label="Playstation" value="Playstation" />
            <Picker.Item label="Xbox" value="Xbox" />
            <Picker.Item label="Nintendo" value="Nintendo" />
          </Picker>
        </View>

        {imagemUrl !== "" && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imagemUrl }} style={styles.imagePreview} />
            <Text style={styles.imageUploadedText}>Imagem Carregada!</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.uploadButton, uploadingImage && { opacity: 0.8 }]}
          onPress={handleUploadImage}
          disabled={uploadingImage}
        >
          {uploadingImage ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
              <Text style={styles.uploadText}>
                {imagemUrl ? "Substituir Imagem" : "Enviar Imagem"}
              </Text>
            </>
          )}
        </TouchableOpacity>

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
        </View>

        <TextInput
          style={styles.input}
          placeholder="Preço (ex: 99.99)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity
          style={styles.cadastrarButton}
          onPress={handleCadastrar}
          disabled={loading || uploadingImage}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.cadastrarTexto}>Cadastrar Jogo</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: { flex: 1, backgroundColor: "#000" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: { color: "#fff", marginTop: 10 },
  container: {
    backgroundColor: "#1A1A1A",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
  },
  logoText: { fontSize: 24, fontWeight: "bold", color: "#FF09E6" },
  navIcons: { flexDirection: "row", gap: 15 },
  voltar: { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  voltarTexto: { color: "#fff", marginLeft: 6 },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  pickerContainer: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  picker: { color: "#fff" },
  uploadButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  uploadText: { color: "#fff", marginLeft: 8 },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
  },
  categoria: {
    borderWidth: 1,
    borderColor: "#FF09E6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#333",
  },
  categoriaTexto: { color: "#fff" },
  cadastrarButton: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  cadastrarTexto: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  imagePreviewContainer: { paddingHorizontal: 20 },
  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF09E6",
  },
  imageUploadedText: { color: "#FF09E6", textAlign: "center", marginTop: 5 },
});
