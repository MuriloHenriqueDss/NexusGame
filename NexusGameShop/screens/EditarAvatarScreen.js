import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditAvatar({ navigation }) {
  // lista de avatares (coloque seus arquivos na pasta /assets/img/avatars/)
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

  const [selected, setSelected] = useState(3); // por padrão, Mario

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
        {/* <Image source={avatars[selected]} style={styles.avatarSelecionado} /> */}

        <Image source={avatars[selected]} style={[styles.avatarAtual]} />

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
        <TouchableOpacity style={styles.botaoSalvar} onPress={() => alert("Avatar atualizado com sucesso!")}>
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

  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    boxShadow: "0px 4px 4px #FF09E6",
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
    marginTop: 50,
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