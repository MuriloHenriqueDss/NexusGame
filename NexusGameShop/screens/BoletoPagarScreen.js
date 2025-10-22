import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BoletoPagarScreen({ navigation }) {
    const linhaDigitavel = "1234515135151";
    const dataVencimento = "09/09/2025";

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

            <ScrollView style={styles.scrollview}>
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </TouchableOpacity>

                {/* Título */}
                <Text style={styles.titulo}>Faça o pagamento</Text>

                {/* Card principal */}
                <View style={styles.card}>
                    <Image
                        source={require("../assets/img/boleto_exemplo.png")}
                        style={styles.boleto}
                        resizeMode="contain"
                    />

                    <TouchableOpacity style={styles.botao} onPress={() => Alert.alert("Obrigado!", "Compra efetuada com sucesso.")}>
                        <Text style={styles.botaoTexto}>Baixar boleto</Text>
                    </TouchableOpacity>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTexto}>
                            <Text style={styles.bold}>Nome do beneficiário</Text>{"\n"}
                            Nexus Game Shop LTDA.
                        </Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.bold}>Banco emissor</Text>{"\n"}
                            Bradesco.
                        </Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.bold}>Linha digitável do boleto</Text>{"\n"}
                            {linhaDigitavel}
                        </Text>

                        <Text style={styles.infoTexto}>
                            <Text style={styles.bold}>Data de vencimento</Text>{"\n"}
                            {dataVencimento}
                        </Text>
                    </View>
                </View>

                {/* Instruções */}
                <View style={styles.instrucoesContainer}>
                    <Text style={styles.subtitulo}>Como pagar com BOLETO?</Text>
                    <Text style={styles.instrucoes}>
                        1. Copie o código ou baixe o boleto.{"\n"}
                        2. Pague pelo aplicativo do seu banco, internet banking ou casa lotérica.{"\n"}
                        3. A confirmação pode levar até 3 dias úteis.
                    </Text>
                </View>
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

    scrollview: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    voltar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    voltarTexto: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 6,
    },
    titulo: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#0d0d0d",
        borderWidth: 2,
        borderColor: "#a200ff",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        marginBottom: 30,
    },
    boleto: {
        width: "100%",
        height: 120,
        marginBottom: 15,
    },
    botao: {
        backgroundColor: "#FF00C8",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    infoContainer: {
        alignSelf: "flex-start",
    },
    infoTexto: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 10,
    },
    bold: {
        color: "#FF00C8",
        fontWeight: "700",
    },
    instrucoesContainer: {
        marginBottom: 40,
    },
    subtitulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    instrucoes: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 22,
    },
});