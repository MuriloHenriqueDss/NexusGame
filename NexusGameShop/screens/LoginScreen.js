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

  // 🔹 LOGIN (RF 02 - Login de usuário)
  async function handleLogin() {
    setLoading(true);
    try {
      // 1. Autenticação via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error || !data?.user) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else {
        // 2. Buscar perfil completo para obter nome e avatar
        try {
          const { data: profile, error: profileError } = await supabase
            .from("usuarios")
            // 💡 AJUSTE: Mapeando para as colunas do DB: nome_usuario e avatar_usuario
            .select("nome_usuario, avatar_usuario") 
            // 💡 AJUSTE: Mapeando para a PK do DB: id_usuario
            .eq("id_usuario", data.user.id) 
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
              console.error("Erro ao buscar perfil:", profileError);
          }
          
          // 3. Definir avatar padrão se estiver faltando
          if (!profile?.avatar_usuario) {
            // 💡 AJUSTE: Mapeando para a coluna do DB: avatar_usuario e id_usuario
            await supabase
              .from("usuarios")
              .update({ avatar_usuario: "local:3" }) 
              .eq("id_usuario", data.user.id);
          }

          // 4. Mostrar mensagem de boas-vindas
          Alert.alert(
            "Bem-vindo(a)!",
            // 💡 AJUSTE: Usando nome_usuario
            `Olá, ${profile?.nome_usuario ?? data.user.email}!`
          );

        } catch (e) {
          // Fallback se a busca de perfil falhar por qualquer motivo
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