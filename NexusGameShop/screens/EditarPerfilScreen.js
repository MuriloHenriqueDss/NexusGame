import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState("João Gustavo");
  const [email, setEmail] = useState("joaogustavo2202@gmail.com");
  const [senha, setSenha] = useState("*******");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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

        <ScrollView style={styles.body} contentContainerStyle={{ alignItems: "center" }}>
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
            <Image
            source={require("../assets/img/mario_avatar.png")}
            style={styles.foto}
            />
            <TouchableOpacity style={styles.editarFoto} onPress={() => navigation.navigate('EditarAvatar')}>
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

            <Text style={styles.label}>Senha:</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
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
        <TouchableOpacity style={styles.botaoSalvar} onPress={() => alert("Alterações salvas com sucesso!")}>
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