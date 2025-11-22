import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../SupabaseConfig";

export default function EditAvatar({ navigation }) {
  
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

  const [selected, setSelected] = useState(null);

  // Carregar o avatar atual do usuário quando a tela abrir
  useEffect(() => {
    async function loadCurrentAvatar() {
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
          // 💡 CORREÇÃO: Usando avatar_usuario e id_usuario
          .select('avatar_usuario')
          .eq('id_usuario', user.id)
          .single();

        if (profileError) {
          console.log('fetch avatar error', profileError);
          // O PGRST116 é ignorado (não encontrado), outros são logados.
          if (profileError.code !== 'PGRST116') { 
              console.log('fetch avatar error', profileError);
          }
          return;
        }

        // 💡 CORREÇÃO: Usando profile.avatar_usuario
        if (profile?.avatar_usuario) {
          // A referência salva é 'local:<index>'
          const avatarRef = profile.avatar_usuario.toString();
          if (avatarRef.startsWith('local:')) {
            const savedIndex = parseInt(avatarRef.split(':')[1], 10);
            setSelected(savedIndex);
          }
        }
      } catch (e) {
        console.log('loadCurrentAvatar error', e);
      }
    }

    loadCurrentAvatar();
  }, []);

  async function handleSave() {
    if (selected === null) {
      Alert.alert('Erro', 'Por favor, selecione um avatar');
      return;
    }

    try {
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr) {
        Alert.alert('Erro', 'Não foi possível obter o usuário: ' + userErr.message);
        return;
      }
      const user = userRes?.user;
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      // Salvamos a referência local no formato `local:<index>`
      const avatar_value = `local:${selected}`;

      const { error: profileError } = await supabase
        .from('usuarios')
        // 💡 CORREÇÃO: Usando avatar_usuario no UPDATE
        .update({ avatar_usuario: avatar_value })
        // 💡 CORREÇÃO: Usando id_usuario na condição EQ
        .eq('id_usuario', user.id)
        .select(); // Adicionado select para forçar a execução (caso RLS exija)

      if (profileError) {
        // 🛑 Lembre-se: Você precisa de uma política RLS de UPDATE!
        Alert.alert('Erro', 'Não foi possível salvar o avatar: ' + profileError.message);
        return;
      }

      Alert.alert('Edição salva!', 'Avatar atualizado com sucesso.');
      // Volta para a tela de edição de perfil, que irá recarregar o novo avatar
      navigation.navigate('EditarPerfil'); 
    } catch (e) {
      Alert.alert('Erro inesperado', e.message);
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
        contentContainerStyle={{ alignItems: "center", paddingBottom: 50 }}
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
        <Text style={styles.titulo}>Editar Avatar</Text>

        {/* Avatar atual */}
        {selected !== null && (
          <Image source={avatars[selected]} style={[styles.avatarAtual]} />
        )}

        {/* Grade de avatares */}
        <View style={styles.grid}>
          {avatars.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarContainer,
                selected === index && styles.avatarSelecionadoBorda,
              ]}
              onPress={() => setSelected(index)}
            >
              <Image source={img} style={styles.avatar} />
              {selected === index && (
                <View style={styles.marcador}>
                  <Ionicons name="checkmark" size={14} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
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
    backgroundColor: "black",
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

  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    padding: 10,
  },
  voltarTexto: {
    color: "white",
    marginLeft: 5,
  },
  titulo: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  avatarSelecionado: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  grid: {
    backgroundColor: "#2E2E2E",
    borderRadius: 12,
    padding: 15,
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarAtual: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FF09E6",
  },
  avatarSelecionadoBorda: {
    borderWidth: 2,
    borderColor: "#FF09E6",
    borderRadius: 30,
    opacity: 0.5,
  },
  marcador: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#FF09E6",
    borderRadius: 8,
    padding: 2,
  },
  botaoSalvar: {
    backgroundColor: "#FF09E6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
  },
  textoSalvar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});