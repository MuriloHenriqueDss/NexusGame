import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { supabase } from "../SupabaseConfig";

export default function EditarPerfilScreen({ navigation }) { 
  const isFocused = useIsFocused(); 
  
  const avatars = [
    require("../assets/img/avatars/tetris.png"),
    require("../assets/img/avatars/pikachu.png"),
    require("../assets/img/avatars/pokeball.png"),
    require("../assets/img/mario_avatar.png"),
    require("../assets/img/avatars/luigi.png"),
    require("../assets/img/avatars/boo.png"),
    require("../assets/img/avatars/sonic.png"),
    require("../assets/img/avatars/pacman.png"),
    require("../assets/img/avatars/pacghost.png"),
    require("../assets/img/avatars/kratos.png"),
    require("../assets/img/avatars/godofwar.png"),
    require("../assets/img/avatars/minecraft.png"),
    require("../assets/img/avatars/amongus.png"),
    require("../assets/img/avatars/playstation.png"),
    require("../assets/img/avatars/xbox.png"),
    require("../assets/img/avatars/switch.png"),
  ];

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  // Estado para CEP usa o nome da coluna do DB
  const [cep, setCEP] = useState(""); 
  // Estado para Endereço e CPF (mantidos no frontend, mas sem interação com o DB por não constarem no ERS)
  const [endereco, setEndereco] = useState("");
  const [CPF, setCPF] = useState(""); 
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      if (!isFocused) return;
      setLoading(true);
      try {
        const { data: userRes, error: userErr } = await supabase.auth.getUser();
        if (userErr) {
          console.log('getUser error', userErr);
          return;
        }
        const user = userRes?.user;
        if (!user) return;

        
        const { data: profile, error: profileError } = await supabase
          .from('usuarios')
          // 💡 CORREÇÃO 1: Usando apenas as colunas que existem no DB: nome_usuario, email_usuario, cep_usuario
          .select('nome_usuario, email_usuario, avatar_usuario, tipo_usuario, cep_usuario') 
          .eq('id_usuario', user.id) 
          .single();

        if (profileError) {
          console.log('fetch profile error', profileError);
          
        } else if (mounted && profile) {
          // Mapeamento dos estados
          setNome(profile.nome_usuario || '');
          setEmail(profile.email_usuario || user.email || '');
          // 💡 CORREÇÃO 2: Mapeando corretamente cep_usuario
          setCEP(profile.cep_usuario || ''); 
          // CPF e Endereço não são carregados do DB por não existirem
          setAvatarUrl(profile.avatar_usuario);
          setRole(profile.tipo_usuario);
          
        }
      } catch (e) {
        console.log('loadProfile error', e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
    return () => { mounted = false };
  }, [isFocused]); 

  async function handleSave() {
    setLoading(true);
    try {
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr) {
        Alert.alert('Erro', 'Não foi possível obter o usuário: ' + userErr.message);
        setLoading(false);
        return;
      }
      const user = userRes?.user;
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        setLoading(false);
        return;
      }

      // 1. Atualizar senha se solicitado (Auth)
      if (novaSenha) {
        if (novaSenha !== confirmarSenha) {
          Alert.alert('Erro', 'As senhas não coincidem');
          setLoading(false);
          return;
        }
        const { error: updateUserError } = await supabase.auth.updateUser({ password: novaSenha });
        if (updateUserError) {
          Alert.alert('Erro', 'Não foi possível atualizar a senha: ' + updateUserError.message);
          setLoading(false);
          return;
        }
      }

      // 2. Atualizar perfil (Tabela 'usuarios')
      const updates = {
        // 💡 CORREÇÃO 3: Usando apenas as colunas que existem no DB (nome_usuario e cep_usuario)
        nome_usuario: nome,
        cep_usuario: cep, 
        // CPF e Endereço foram removidos, pois não constam no diagrama do DB.
      };

      const { error: profileError } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('id_usuario', user.id); 

      if (profileError) {
        Alert.alert('Erro', 'Falha ao salvar perfil: ' + profileError.message);
      } else {
        Alert.alert('Perfil salvo!', 'Alterações salvas com sucesso.');
        navigation.navigate("Main", { screen: "Perfil" });

      }
    } catch (e) {
      Alert.alert('Erro inesperado', e.message);
    } finally {
      setLoading(false);
    }
  }
  
  // ... (Restante do JSX e Styles não alterados, mas mantidos para a integridade do arquivo)

  return (
    <View style={styles.container}>
      {/* ... navbar ... */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
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

      <ScrollView
        style={styles.body}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Voltar */}
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation?.goBack && navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.titulo}>Editar Perfil</Text>

        {/* Foto de perfil */}
        <View style={styles.fotoContainer}>
          {avatarUrl && avatarUrl.startsWith('local:') && (
            <Image
              // Carrega o avatar local
              source={avatars[parseInt(avatarUrl.split(':')[1], 10)] || require("../assets/img/mario_avatar.png")}
              style={styles.foto}
            />
          )}
          <TouchableOpacity
            style={styles.editarFoto}
            onPress={() => navigation.navigate("EditarAvatar")}
          >
            <Ionicons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </View>

        {/* Campos */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={false} // E-mail é a chave de login, não deve ser editável
          />

          <Text style={styles.label}>CPF: </Text>
          {/* Este campo agora só coleta o valor para o estado local, não interage com o DB */}
          <TextInput style={styles.input} value={CPF} onChangeText={setCPF} /> 

          <Text style={styles.label}>CEP:</Text>
          <TextInput style={styles.input} value={cep} onChangeText={setCEP} />

          <Text style={styles.label}>Endereço:</Text>
          {/* Este campo agora só coleta o valor para o estado local, não interage com o DB */}
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        {/* Alterar senha */}
        <Text style={styles.subtitulo}>Alterar senha</Text>

        <View style={[styles.form, styles.margemCima]}>
          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />

          <Text style={styles.label}>Confirmar nova senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        {/* Botão salvar */}
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSave} disabled={loading}>
          <Text style={styles.textoSalvar}>{loading ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
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
  // ... (Estilos omitidos por brevidade)
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
  },

  body: {
    flex: 1,
    backgroundColor: "black",
  },

  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
  },
  voltarTexto: {
    color: "white",
    marginLeft: 5,
  },
  titulo: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  fotoContainer: {
    marginTop: 15,
    marginBottom: 25,
    alignItems: "center",
    position: "relative",
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  editarFoto: {
    backgroundColor: "#FF09E6",
    borderRadius: 50,
    padding: 5,
    position: "absolute",
    bottom: 0,
    left: 58,
  },
  margemCima: {
    marginTop: -20,
  },
  form: {
    width: "85%",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  subtitulo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
  },
  botaoSalvar: {
    backgroundColor: "#FF09E6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  textoSalvar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});