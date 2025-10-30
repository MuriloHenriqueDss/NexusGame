import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../SupabaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 LOGIN
  async function handleLogin() {
    setLoading(true);
    try {
      // Usar Supabase Auth (não buscar senha em tabela)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error || !data?.user) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else {
        // Buscar perfil completo incluindo avatar
        try {
          const { data: profile } = await supabase
            .from("usuarios")
            .select("nome, avatar_url")
            .eq("id", data.user.id)
            .single();

          // Se não tiver avatar definido, vamos definir um padrão (Mario - índice 3)
          if (!profile?.avatar_url) {
            await supabase
              .from("usuarios")
              .update({ avatar_url: "local:3" })
              .eq("id", data.user.id);
          }

          Alert.alert(
            "Bem-vindo(a)!",
            `Olá, ${profile?.nome ?? data.user.email}!`
          );
        } catch (e) {
          Alert.alert("Bem-vindo(a)!", `Olá, ${data.user.email}!`);
        }

        navigation.navigate("Main");
      }
    } catch (err) {
      Alert.alert("Erro inesperado", err.message);
    } finally {
      setLoading(false);
    }
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
          style={[
            styles.button,
            !(email && password) ? styles.buttonDisabled : null,
          ]}
          onPress={handleLogin}
          disabled={loading || !(email && password)}
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
