import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar} from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

  
    const FIXED_EMAIL = "adm@teste.com";
    const FIXED_PASSWORD = "123qwe";

    setLoading(true);


    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === FIXED_EMAIL && password === FIXED_PASSWORD) {
        navigation.navigate("Main");
      } else {
        alert("Credenciais inválidas");
      }
    }, 700);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.card}>
        {/* Logo */}
        <Image source={require("./assets/3.png")} style={styles.logo} />

        {/* Título */}
        <Text style={styles.title}>Entrar</Text>

        {/* Input E-mail */}
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="@gmail.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input Senha */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Esqueceu senha */}
        <TouchableOpacity onPress={() => navigation.navigate("Esqueceu")}>
          <Text style={styles.forgotText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={[styles.button, !(email && password) ? styles.buttonDisabled : null]}
          onPress={handleLogin}
          disabled={!(email && password) || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        {/* Cadastro */}
        <Text style={styles.registerText}>
          Não possui uma conta?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#7B009A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#000",
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    color: "#fff",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
  },
  forgotText: {
    color: "#fff",
    fontSize: 13,
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#FF00FF",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#8b008b",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "#fff",
    marginTop: 15,
  },
  registerLink: {
    color: "#00BFFF",
    fontWeight: "bold",
  },
});
