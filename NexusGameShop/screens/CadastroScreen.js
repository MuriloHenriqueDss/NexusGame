import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { supabase } from "../SupabaseConfig";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CPF, setCPF] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome || !email || !password || !confirmPassword || !CPF) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);

    // 🔹 Criação do usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
      setLoading(false);
      return;
    }

    // Após signUp, precisamos garantir que há uma sessão (auth.uid())
    // Caso não haja (ex: confirmação de e-mail obrigatória), a política RLS
    // que exige auth.uid() = id para INSERT irá bloquear a operação.
    // Aqui tentamos logar imediatamente para obter sessão; se não for possível,
    // avisamos o usuário para confirmar o e-mail.
    let userId = data?.user?.id;
    let hasSession = !!data?.session?.access_token;

    if (!hasSession) {
      // Tenta autenticar para criar sessão
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !signInData?.user) {
        setLoading(false);
        // Não tentamos inserir o perfil por causa da política RLS.
        alert(
          "Conta criada! Confirme seu e-mail (se aplicável) e depois faça login para completar o perfil."
        );
        navigation.navigate("Login");
        return;
      }

      userId = signInData.user.id;
    }

    // 🔹 Agora que temos sessão (auth.uid()), podemos inserir o registro do usuário
    const { error: profileError } = await supabase
      .from("usuarios")
      .insert([
        {
          id: userId,
          email: email,
          nome: nome,
          cpf: CPF,
          created_at: new Date().toISOString(),
            avatar_url: "local:3", // Define Mario como avatar padrão
            role: "user", // papel padrão
        },
      ]);

    setLoading(false);

    if (profileError) {
      alert("Erro ao salvar perfil: " + profileError.message + "\nSe for RLS, ajuste as políticas no Supabase ou confirme a sessão antes de inserir.");
      return;
    }

    alert("Conta criada com sucesso!");
    navigation.navigate("Login");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

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

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="xxx.xxx.xxx-xx"
          placeholderTextColor="#aaa"
          value={CPF}
          onChangeText={setCPF}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Já possui uma conta?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Login")}
          >
            Entrar
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
  title: {
    fontSize: 22,
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
  button: {
    backgroundColor: "#FF00FF",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
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
