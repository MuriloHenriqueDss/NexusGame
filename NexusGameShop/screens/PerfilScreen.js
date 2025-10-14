import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function PerfilScreen({ navigation }) {

  return (
    <View style={styles.container}>
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
            source={require("../assets/img/mario_avatar.png")}
            style={styles.foto}
          />
          <Text style={styles.nome}>João Gustavo</Text>

          <View style={styles.botoesPerfil}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => navigation.navigate('EditarPerfil')}>
              <Text style={styles.textoEditar}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoSair} onPress={() => navigation.navigate('Login')}>
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

          <TouchableOpacity style={styles.card}>
            <Ionicons name="cart-outline" size={20} color="#FF09E6" />
            <Text style={styles.textoCard}>Meu carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <FontAwesome5 name="gamepad" size={18} color="#FF09E6" />
            <Text style={styles.textoCard}>Meus pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeusCartoes')}>
            <MaterialIcons name="credit-card" size={20} color="#FF09E6" />
            <Text style={styles.textoCard}>Meus cartões</Text>
          </TouchableOpacity>
        </View>

        {/* Botões inferiores */}
        <TouchableOpacity style={styles.botaoRosa}>
          <Text style={styles.textoRosa}>Gerenciar jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoRosa}>
          <Text style={styles.textoRosa}>Adicionar jogos</Text>
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
    marginTop: 100,
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
    borderRadius: 12,
    width: "40%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
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