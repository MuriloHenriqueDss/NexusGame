import React, { useState } from "react";
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

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState("João Gustavo");
  const [email, setEmail] = useState("joaogustavo2202@gmail.com");
  const [senha, setSenha] = useState("*******");
  const [cep, setCEP] = useState("12280-470");
  const [endereco, setEndereco] = useState("Rua José Bonifácio, 395");
  const [CPF, setCPF] = useState("123.456.789-1");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

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
          <Image
            source={require("../assets/img/mario_avatar.png")}
            style={styles.foto}
          />
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

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

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
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={() =>
            Alert.alert("Perfil salvo!", "Alterações salvas com sucesso.")
          }
        >
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
