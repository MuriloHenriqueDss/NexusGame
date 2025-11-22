import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { supabase } from "../SupabaseConfig";

export default function PerfilScreen({ navigation }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [role, setRole] = useState(null); // 'Cliente' ou 'Administrador'
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();


  const localAvatars = [
    require("../assets/img/avatars/tetris.png"),
    require("../assets/img/avatars/pikachu.png"),
    require("../assets/img/avatars/pokeball.png"),
    require("../assets/img/mario_avatar.png"), // ÍNDICE 3 (Padrão)
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

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      setLoading(true);
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.log('getUser error', userError);
          setLoading(false);
          return;
        }

        const user = userData?.user;
        if (!user) {
          setLoading(false);
          return;
        }

        // 🔹 Busca o perfil do usuário na tabela 'usuarios'
        const { data: profile, error: profileError } = await supabase
          .from('usuarios')
          .select('nome_usuario, avatar_usuario, email_usuario, tipo_usuario') 
          .eq('id_usuario', user.id) 
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.log('profile fetch error', profileError);
        } 
        
        if (mounted && profile) {
          // 💡 DEBBUG: Verifica qual URL/ref está sendo lida do DB
          console.log("Avatar lido do DB:", profile.avatar_usuario);
          
          setName(profile.nome_usuario || user.email || 'Usuário'); 
          setAvatarUrl(profile.avatar_usuario || null);
          setRole(profile.tipo_usuario || 'Cliente');
        } else {
            setName(user.email || 'Usuário');
            setRole('Cliente');
        }
      } catch (e) {
        console.log('loadProfile error', e);
      } finally {
        setLoading(false);
      }
    }

    if (isFocused) {
        loadProfile();
    }
    return () => { mounted = false };
  }, [isFocused]);

  // 🔹 Logout (RF 11 - Sair do sistema)
  async function handleLogout() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log('signOut error', e);
    }
    navigation.navigate('Login');
    Alert.alert('Logout efetuado!', 'Você saiu da sua conta com sucesso.');
  }

  // 🔹 Checa se o usuário é administrador (enum 'Administrador')
  const isAdmin = role === 'Administrador';
  
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
          
          {!isAdmin && (
            <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
              <Image
                source={require("../assets/img/notificacao_icon.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 50 }}
      >
        {/* Título */}
        <Text style={styles.titulo}>Perfil</Text>

        {/* Foto e nome */}
        <View style={styles.perfilContainer}>
          <Image
            source={
              // 1. Verifica se é uma referência local ('local:<index>')
              avatarUrl && avatarUrl.startsWith && avatarUrl.startsWith('local:')
                ? (localAvatars[parseInt(avatarUrl.split(':')[1], 10)] || require("../assets/img/mario_avatar.png"))
                // 2. Se for uma URL externa ou nulo, usa o fallback
                : (avatarUrl ? { uri: avatarUrl } : require("../assets/img/mario_avatar.png"))
            }
            style={styles.foto}
          />
          <Text style={styles.nome}>{loading ? 'Carregando...' : (name || 'Usuário')}</Text>

          <View style={styles.botoesPerfil}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate('EditarPerfil')}>
              <Text style={styles.textoEditar}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoSair}
              onPress={() =>
                Alert.alert(
                  "Desconectar",
                  "Tem certeza que deseja sair da sua conta?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Sair",
                      style: "destructive",
                      onPress: handleLogout,
                    },
                  ]
                )
              }
            >
              <Text style={styles.textoSair}>Sair</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Seção de atalhos */}
        <View style={styles.opcoesContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Favoritos')}>
            <Ionicons name="heart-outline" size={20} color="#FF09E6" />
            <Text style={styles.textoCard}>Meus favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Carrinho')}>
            <Ionicons name="cart-outline" size={20} color="#FF09E6" />
            <Text style={styles.textoCard}>Meu carrinho</Text>
          </TouchableOpacity>
          
          
          {!isAdmin && (
            <>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeusPedidos')}>
                <FontAwesome5 name="gamepad" size={18} color="#FF09E6" />
                <Text style={styles.textoCard}>Meus pedidos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeusCartoes')}>
                <MaterialIcons name="credit-card" size={20} color="#FF09E6" />
                <Text style={styles.textoCard}>Meus cartões</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Botões inferiores (Administrador) */}
        {isAdmin && (
          <>
            <TouchableOpacity style={styles.botaoRosa} onPress={() => navigation.navigate('GerenciarJogos')}>
              <Text style={styles.textoRosa}>Gerenciar jogos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoRosa} onPress={() => navigation.navigate('AdicionarJogo')}>
              <Text style={styles.textoRosa}>Adicionar jogos</Text>
            </TouchableOpacity>
          </>
        )}
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
    resizeMode: "contain"
  },

  navIcons: {
    flexDirection: "row",
    gap: 15
  },

  icon: {
    width: 20,
    height: 20
  },

  body: {
    flex: 1,
    marginTop: 10, // espaço para não sobrepor a nav
  },
  titulo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  perfilContainer: {
    alignItems: "center",
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  nome: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  botoesPerfil: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  botaoEditar: {
    backgroundColor: "#FF09E6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  textoEditar: {
    color: "white",
    fontWeight: "bold",
  },
  botaoSair: {
    backgroundColor: "#FF0000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  textoSair: {
    color: "white",
    fontWeight: "bold",
  },
  opcoesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
    gap: 15,
    width: "90%",
  },
  card: {
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoCard: {
    color: "white",
    fontWeight: "bold",
  },
  botaoRosa: {
    backgroundColor: "#FF09E6",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
  },
  textoRosa: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});