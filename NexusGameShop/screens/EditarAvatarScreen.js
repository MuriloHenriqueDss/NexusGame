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
        <View style={styles.header}>
            <View style={styles.nav}>
                <Image style={styles.logoNav} source={require('../assets/img/logo_nexus.png')} />
                <View style={styles.icons}>
                    <Image style={styles.iconNav} source={require('../assets/img/buscar_icon.png')} />
                    <Image style={styles.iconNav} source={require('../assets/img/carrinho_icon.png')} />
                    <Image style={styles.iconNav} source={require('../assets/img/notificacao_icon.png')} />
                </View>
            </View>
            <View style={styles.navGlow} />
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
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "black",
  },
  nav: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  logoNav: {
    height: 50,
    width: 170,
    marginLeft: 10,
    marginTop: -5,
  },
  icons: {
    flexDirection: "row",
    gap: 20,
    marginRight: 5,
  },
  iconNav: {
    height: 20,
    width: 20,
  },
  navGlow: {
    height: 3,
    width: "100%",
    backgroundColor: "black",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  body: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 80,
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
    borderColor: "#FF00C8",
  },
  avatarSelecionadoBorda: {
    borderWidth: 2,
    borderColor: "#FF00C8",
    borderRadius: 30,
    opacity: 0.5,
  },
  marcador: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#FF00C8",
    borderRadius: 8,
    padding: 2,
  },
  botaoSalvar: {
    backgroundColor: "#FF00C8",
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