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

export default function PerfilScreen({ navigation }) {
  const isFocused = useIsFocused(); // Hook para detectar quando a tela está focada
  
  // lista de avatares (mesma lista do EditarAvatarScreen)
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
  const [cep, setCEP] = useState("");
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
      if (!isFocused) return; // Não carrega se a tela não estiver focada
      setLoading(true);
      try {
        const { data: userRes, error: userErr } = await supabase.auth.getUser();
        if (userErr) {
          console.log('getUser error', userErr);
          return;
        }
        const user = userRes?.user;
        if (!user) return;

        // buscar dados na tabela usuarios
        const { data: profile, error: profileError } = await supabase
          .from('usuarios')
          .select('nome, email, cpf, avatar_url, role')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.log('fetch profile error', profileError);
        } else if (mounted && profile) {
          setNome(profile.nome || '');
          setEmail(profile.email || user.email || '');
          setCPF(profile.cpf || '');
          setAvatarUrl(profile.avatar_url);
          setRole(profile.role);
          // endereco/cep não estão no schema por padrão — mantenha vazios se não houver
        }
      } catch (e) {
        console.log('loadProfile error', e);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
    return () => { mounted = false };
  }, [isFocused]); // Recarrega quando a tela recebe foco

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

      // Atualizar senha se solicitado
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

      // Atualizar dados na tabela usuarios
      const updates = {
        nome,
        cpf: CPF,
        // se quiser salvar cep/endereco, adicione esses campos na tabela e no objeto
      };

      const { error: profileError } = await supabase
        .from('usuarios')
        .update(updates)
        .eq('email', email); // usa email como chave alternativa

      if (profileError) {
        Alert.alert('Erro', 'Falha ao salvar perfil: ' + profileError.message);
      } else {
        Alert.alert('Perfil salvo!', 'Alterações salvas com sucesso.');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Erro inesperado', e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
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
              source={avatars[parseInt(avatarUrl.split(':')[1], 10)]}
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
          />

          {/* Senha antiga não é exibida aqui; use 'Alterar senha' abaixo */}

          <Text style={styles.label}>CPF: </Text>
          <TextInput style={styles.input} value={CPF} onChangeText={setCPF} />

          <Text style={styles.label}>CEP:</Text>
          <TextInput style={styles.input} value={cep} onChangeText={setCEP} />

          <Text style={styles.label}>Endereço:</Text>
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
        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSave}>
          <Text style={styles.textoSalvar}>Salvar</Text>
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
    marginTop: "-20px",
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
