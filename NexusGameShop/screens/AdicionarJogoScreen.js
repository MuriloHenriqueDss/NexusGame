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
import { supabase } from "../SupabaseConfig"; // Importando o Supabase

export default function AdicionarJogoScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Estados dos inputs
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("Playstation");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  
  // Estados de controle
  const [loading, setLoading] = useState(false); // Carregamento de permissões/cadastro
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagemUrl, setImagemUrl] = useState(""); // URL da imagem após o upload
  const [uploadingImage, setUploadingImage] = useState(false); // Carregamento do upload da imagem

  // Categorias (Ainda não integradas ao DB, apenas para a interface)
  const [categorias] = useState([
    "Aventura", "Ação", "Corrida", "Esportes", "Estratégia",
    "FPS", "Lego", "Luta", "RPG", "Simulação"
  ]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

  // --- Funções de Autenticação e Verificação de Admin ---

  useEffect(() => {
    if (isFocused) {
      checkAdminStatus();
    }
  }, [isFocused]);

  const checkAdminStatus = async () => {
    // Busca o usuário logado
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;

    if (!user) {
      // Se não estiver logado, redireciona
      Alert.alert("Acesso Negado", "Você precisa estar logado para acessar esta página.");
      navigation.navigate("Login");
      return;
    }

    setLoading(true);
    try {
      // Verifica o tipo de usuário na tabela 'usuarios'
      const { data: profile, error } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id_usuario', user.id)
        .single();

      if (error || !profile || profile.tipo_usuario !== 'Administrador') {
        // Redireciona se não for administrador
        Alert.alert("Acesso Negado", "Somente administradores podem cadastrar jogos.");
        navigation.navigate("Main"); 
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Erro ao verificar status de admin:", e);
      Alert.alert("Erro", "Falha ao verificar permissões.");
      navigation.navigate("Main"); 
    } finally {
      setLoading(false);
    }
  };


  // --- Funções da Tela ---

  const handleUploadImage = async () => {
    if (uploadingImage) return;

    // Em uma aplicação real, aqui seria usado um picker para selecionar a imagem
    
    Alert.alert(
      "Aviso", 
      "Funcionalidade de Upload de Imagem Simulado! Em produção, usaria 'expo-image-picker' e Supabase Storage.", 
      [{ text: "OK" }]
    );
    
    setUploadingImage(true);
    
    try {
        // Simulação de delay para o upload
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // Mock: URL de placeholder para simular a imagem salva no Storage
        const mockPublicUrl = `https://placehold.co/600x400/FF09E6/white?text=Capa+Game+${Date.now()}`;

        setImagemUrl(mockPublicUrl);

    } catch (e) {
        console.error("Erro simulado de upload:", e);
        Alert.alert("Erro de Upload", e.message || "Falha ao simular o upload da imagem.");
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
    
    // Validações
    if (!titulo.trim()) {
      Alert.alert("Erro de Cadastro", "Por favor, insira o título do jogo.");
      return;
    }
    if (!preco.trim()) {
      Alert.alert("Erro de Cadastro", "Por favor, insira o preço do jogo.");
      return;
    }
    if (isNaN(parseFloat(preco))) {
      Alert.alert("Erro de Cadastro", "O preço deve ser um número válido (ex: 99.99).");
      return;
    }
    if (categoriasSelecionadas.length === 0) {
      Alert.alert("Erro de Cadastro", "Selecione pelo menos uma categoria.");
      return;
    }
    if (!imagemUrl) {
      Alert.alert("Erro de Cadastro", "Por favor, carregue a imagem do jogo antes de cadastrar.");
      return;
    }


    setLoading(true);

    try {
      const precoNumerico = parseFloat(preco);
      
      // 1. Inserir o Jogo na tabela `jogos`
      const { data: jogoData, error: jogoError } = await supabase
        .from('jogos')
        .insert([
          {
            // Mapeando colunas - CORREÇÃO DE ARRAY MALFORMADO APLICADA
            nome_jogo: titulo, 
            plataforma_jogo: [plataforma], // CORRIGIDO: Deve ser um array de plataformas (ex: ["Playstation"])
            preco_jogo: precoNumerico,
            foto_jogo: imagemUrl, 
            descricao_jogo: descricao, 
            categoria_jogo: categoriasSelecionadas, // ADICIONADO: Inserindo categorias (que também é um array de ENUM)
          },
        ])
        .select()
        .single();

      if (jogoError) {
        // Lançando um erro mais claro para o console
        throw new Error("Erro ao inserir jogo: " + jogoError.message);
      }
      
      // O código de inserção em uma tabela de ligação (categorias_jogos) foi removido,
      // pois o esquema de colunas que você forneceu indica que a coluna
      // 'categoria_jogo' na tabela 'jogos' já é um array, o que a torna redundante.
      

      Alert.alert("Sucesso!", `Jogo "${titulo}" cadastrado com sucesso!`);

      // Limpar campos
      setTitulo("");
      setPreco("");
      setDescricao("");
      setImagemUrl("");
      setCategoriasSelecionadas([]);

    } catch (e) {
      console.error("Erro no cadastro:", e);
      Alert.alert("Erro de Cadastro", e.message || "Erro inesperado ao cadastrar o jogo.");
    } finally {
      setLoading(false);
    }
  };

  // Tela de Carregamento de Permissões
  if (loading && !isAdmin) { 
    return (
      <View style={[styles.scrollview, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF09E6" />
        <Text style={styles.loadingText}>Carregando Permissões...</Text>
      </View>
    );
  }

  // Tela de Acesso Negado
  if (!isAdmin && !loading) { 
    return (
        <View style={[styles.scrollview, styles.loadingContainer]}>
            <Text style={styles.loadingText}>Acesso não autorizado. Você não tem permissões de administrador.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text style={styles.backButtonText}>Voltar para o Início</Text>
            </TouchableOpacity>
        </View>
    );
  }


  return (
    <ScrollView style={styles.scrollview}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {/* Usando Image de forma simplificada, em um projeto real, os assets precisam ser importados */}
        <Text style={styles.logoText}>Nexus Admin</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
            <Ionicons name="search-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.voltar}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Cadastro de Jogos</Text>

        {/* Campo Título */}
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Campo Descrição */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição do Jogo"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* Picker Plataforma */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={plataforma}
            onValueChange={(itemValue) => setPlataforma(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Playstation" value="Playstation" />
            <Picker.Item label="Xbox" value="Xbox" />
            <Picker.Item label="Nintendo" value="Nintendo" />
          </Picker>
        </View>

        {/* Pré-visualização da Imagem */}
        {imagemUrl ? (
            <View style={styles.imagePreviewContainer}>
                <Image
                    source={{ uri: imagemUrl }}
                    style={styles.imagePreview}
                />
                <Text style={styles.imageUploadedText}>Imagem Carregada!</Text>
                <TouchableOpacity onPress={() => setImagemUrl("")} style={styles.removeImageButton}>
                    <Ionicons name="close-circle" size={20} color="#FF09E6" />
                    <Text style={styles.removeImageText}>Remover</Text>
                </TouchableOpacity>
            </View>
        ) : null}

        {/* Upload Imagem */}
        <TouchableOpacity 
          style={[styles.uploadButton, uploadingImage && { backgroundColor: '#4a0090' }]} 
          onPress={handleUploadImage}
          disabled={uploadingImage}
        >
          {uploadingImage ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
              <Text style={styles.uploadText}>{imagemUrl ? "Carregar Nova Imagem" : "Carregar Imagem"}</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Selecione as Categorias:</Text>
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

        {/* Campo Preço */}
        <TextInput
          style={styles.input}
          placeholder="Valor (ex: 99.99)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        {/* Botão Cadastrar */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
      color: '#fff',
      marginTop: 10,
      fontSize: 16,
  },
  backButtonText: {
      color: '#FF09E6',
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
  },
  container: {
    backgroundColor: "#1A1A1A",
    width: "90%",
    alignSelf: 'center',
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF09E6',
  },
  navIcons: { flexDirection: "row", gap: 15 },
  icon: { width: 20, height: 20, tintColor: "#fff" },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  voltarTexto: { color: "#fff", marginLeft: 6, fontSize: 16 },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: { color: "#fff" },
  pickerItem: { color: "#fff" }, // Estilo específico para o item do Picker (pode não funcionar em todas as plataformas)
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  uploadText: { color: "#fff", marginLeft: 8, fontWeight: "600", fontSize: 16 },
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
    backgroundColor: '#333',
  },
  categoriaTexto: { color: "#fff", fontSize: 14 },
  cadastrarButton: {
    backgroundColor: "#FF09E6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  cadastrarTexto: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FF09E6',
  },
  imageUploadedText: {
    color: '#FF09E6',
    fontWeight: '600',
    fontSize: 14,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 3,
  }
});