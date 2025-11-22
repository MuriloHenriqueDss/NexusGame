import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { supabase } from "../SupabaseConfig"; // Importa a configuração Supabase

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CPF, setCPF] = useState(""); // Campo CPF está sendo coletado
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

    // 🔹 RF 01 - Cadastro de usuário: Criação do usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // Erro comum: usuário já registrado.
      alert("Erro ao cadastrar: " + error.message);
      setLoading(false);
      return;
    }

    // O Supabase Auth pode exigir confirmação de e-mail.
    // Tentamos obter o ID do usuário (auth.uid()) e uma sessão.
    let userId = data?.user?.id;
    let hasSession = !!data?.session?.access_token;

    // Se não houver sessão imediatamente (confirmação de e-mail ativada),
    // tentamos fazer o login para obter o ID e inserir o perfil.
    if (!hasSession && userId) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !signInData?.user) {
        setLoading(false);
        alert(
          "Conta criada! Confirme seu e-mail (se aplicável) e depois faça login para completar o perfil."
        );
        navigation.navigate("Login");
        return;
      }

      userId = signInData.user.id;
    }
    
    // Se não conseguirmos o userId, há um problema
    if (!userId) {
        setLoading(false);
        alert("Erro desconhecido ao obter o ID do usuário.");
        return;
    }

    // 🔹 Inserir perfil na tabela 'usuarios' com os nomes de colunas do nosso DB
    // Nota: O campo CPF coletado foi omitido do insert, pois a coluna no DB é 'cep_usuario'.
    const { error: profileError } = await supabase
      .from("usuarios")
      .insert([
        {
          id_usuario: userId, // Liga o registro com o ID do Supabase Auth
          email_usuario: email, // Mapeamento: email -> email_usuario
          nome_usuario: nome, // Mapeamento: nome -> nome_usuario
          tipo_usuario: 'Cliente', // Definido como 'Cliente' por padrão (enum)
          avatar_usuario: 'local:3', // Mapeamento: avatar_url -> avatar_usuario (referência)
        },
      ]);

    setLoading(false);

    if (profileError) {
      alert("Erro ao salvar perfil: " + profileError.message);
      // O erro mais comum aqui é de RLS (Row Level Security). Certifique-se
      // que as políticas de 'INSERT' para 'authenticated' e 'auth.uid() = id_usuario' estão ativas na tabela 'usuarios'.
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

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
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