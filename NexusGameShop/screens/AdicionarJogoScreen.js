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

/*
  INSTRUÇÕES IMPORTANTES (leia antes de rodar):
  1) Bucket de Storage: confirme que existe um bucket chamado "jogos" no Supabase Storage.
     - Se o bucket tiver outra nomenclatura, altere a constante BUCKET_NAME abaixo.
  2) Enum de categorias: se o erro de enum persistir, rode no SQL editor do Supabase:
       SELECT unnest(enum_range(NULL::categoria_enum));
     (Substitua "categoria_enum" pelo nome real do seu tipo enum).
     Depois, ajuste CATEGORY_MAP para mapear seus rótulos para os valores reais do enum.
*/

const BUCKET_NAME = "jogos";

/**
 * Se você já sabe os valores exatos do enum no Supabase, preencha CATEGORY_MAP
 * com pareamentos ["rótulo exibido" : "valor_do_enum_exato"].
 * Exemplo: "Aventura" : "Aventura"  ou "Aventura" : "aventura" (conforme o enum).
 *
 * Se você não souber, o código tenta normalizar (remover acentos e capitalizar).
 * Caso o enum exija outra forma exata, atualize este mapa.
 */
const CATEGORY_MAP = {
  // "Aventura": "Aventura", // Exemplo — ajuste conforme seu enum
  // "Ação": "Acao", // ex: sem acento, se seu enum for assim
};

function removeAccents(str) {
  if (!str) return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toEnumCandidate(displayLabel) {
  // Primeiro tenta mapear via CATEGORY_MAP
  if (CATEGORY_MAP[displayLabel]) return CATEGORY_MAP[displayLabel];

  // Senão, faz normalização inteligente:
  // 1) remove acentos
  // 2) deixa com primeira letra maiúscula e resto minúsculo (ex: "Aventura")
  const noAccents = removeAccents(displayLabel);
  const words = noAccents.split(/\s+/).filter(Boolean);
  const capitalized = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  // Também retorna uma versão sem espaços, sem acento, tudo minusculo
  // caso seu enum use 'aventura' ou 'acao'
  const compactLower = noAccents.replace(/\s+/g, "").toLowerCase();

  // prefira capitalized, mas retornamos um array de candidatos na ordem desejada
  return [capitalized, compactLower];
}

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
      console.error("Erro ao checar admin:", e);
      Alert.alert("Erro", "Falha ao verificar permissões.");
      navigation.navigate("Main");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async () => {
    try {
      setUploadingImage(true);

      // pedir permissão
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Habilite o acesso às imagens nas configurações."
        );
        return;
      }

      // abrir a galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      // obtém extensão (fallback para jpg)
      const extMatch = /\.(\w+)$/.exec(uri);
      const fileExt = extMatch ? extMatch[1] : "jpg";
      const fileName = `jogo_${Date.now()}.${fileExt}`;

      // converter para blob (necessário para supabase-js)
      const response = await fetch(uri);
      const blob = await response.blob();

      // faça o upload (upsert: false evita sobrescrever por padrão)
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, blob, { upsert: false });

      if (uploadError) {
        // algumas vezes a mensagem vem aninhada em uploadError.message
        throw uploadError;
      }

      // obter URL pública
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      if (publicUrlError) {
        throw publicUrlError;
      }

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Não foi possível obter a URL pública da imagem.");
      }

      setImagemUrl(publicUrlData.publicUrl);
      Alert.alert("Imagem enviada", "Imagem enviada com sucesso.");
    } catch (e) {
      console.error("Erro no upload:", e);
      // mostra a mensagem bruta para facilitar debugging (se necessário)
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

  const prepareCategoriesForInsert = (selectedCategories) => {
    // Mapeia cada categoria para o valor (ou candidatos) do enum.
    // Retorna a primeira correspondência válida (string) ou o candidato principal.
    const final = selectedCategories.map((c) => {
      const candidate = toEnumCandidate(c);
      // candidate pode ser array (candidatos) ou string
      if (Array.isArray(candidate)) {
        // preferimos candidate[0] (capitalized), mas pode ser necessário ajustar manualmente em CATEGORY_MAP
        return candidate[0];
      } else {
        return candidate;
      }
    });
    return final;
  };

  const handleCadastrar = async () => {
    if (loading) return;

    // Validações básicas
    if (!titulo.trim()) {
      Alert.alert("Erro", "Informe o título do jogo.");
      return;
    }
    if (!preco.trim() || isNaN(parseFloat(preco))) {
      Alert.alert("Erro", "Informe um preço válido (ex: 99.99).");
      return;
    }
    if (categoriasSelecionadas.length === 0) {
      Alert.alert("Erro", "Selecione ao menos uma categoria.");
      return;
    }
    if (!imagemUrl) {
      Alert.alert("Erro", "Faça o upload da imagem antes de cadastrar.");
      return;
    }

    setLoading(true);

    // prepara categorias para o formato do enum esperado
    const categoriasParaInserir = prepareCategoriesForInsert(
      categoriasSelecionadas
    );

    try {
      const { data, error } = await supabase
        .from("jogos")
        .insert([
          {
            nome_jogo: titulo,
            plataforma_jogo: [plataforma], // array
            preco_jogo: parseFloat(preco),
            descricao_jogo: descricao,
            foto_jogo: imagemUrl,
            categoria_jogo: categoriasParaInserir, // array de strings que devem casar com o enum
          },
        ])
        .select()
        .single();

      if (error) {
        // Se for erro de enum, traga a mensagem completa para o usuário
        console.error("Erro no insert:", error);
        throw error;
      }

      // sucesso
      Alert.alert("Sucesso", `Jogo "${titulo}" cadastrado.`);
      // limpar campos
      setTitulo("");
      setPreco("");
      setDescricao("");
      setImagemUrl("");
      setCategoriasSelecionadas([]);
    } catch (e) {
      console.error("Erro ao cadastrar:", e);
      // Se for um erro de enum, a mensagem do Supabase costuma mencionar 'invalid input value for enum'
      // mostramos a mensagem completa para facilitar correção do CATEGORY_MAP
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
