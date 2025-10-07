import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, FlatList, ImageBackground, } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    titulo: "Descubra novos jogos incríveis!",
    imagem: require("../assets/img/banner_FarCry.jpg"),
  },
  {
    id: "2",
    titulo: "Promoções imperdíveis!",
    imagem: require("../assets/img/banner_TLOU.jpeg"),
  },
  {
    id: "3",
    titulo: "Jogos em pré-venda",
    imagem: require("../assets/img/banner_MortalKombat.jpg"),
  },
];

export default function HomeScreen() {
  return (

    <ScrollView style={styles.body} contentContainerStyle={{ alignItems: "center" }}>
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
      <View style={styles.main}>
        <View style={styles.carrosselBanners}>
          <FlatList
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ImageBackground
                source={item.imagem}
                style={styles.banner}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.textoBanners}>{item.titulo}</Text>
              </ImageBackground>
            )}
          />
        </View>
        <View>
          <View>
            <Image source={require('../assets/img/categorias/acao_fundo.png')} />
          </View>

        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: "100%",
  },
  nav: {
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5px",
  },
  logoNav: {
    height: 50,
    width: 170,
    marginLeft: 10,
    marginTop: -5,
  },
  icons: {
    display: "flex",
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
    width: '100%',
    backgroundColor: 'black',
    boxShadow: "0px 2px 3px rgba(255,255,255,1)"
  },
  // navGlow: {
  //   height: 3,
  //   width: '100%',
  //   backgroundColor: 'rgba(0, 0, 0, 1)',
  //   shadowColor: 'white',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 1,
  //   shadowRadius: 3,
  //   elevation: 3,
  // },

  // main: {
  //   backgroundColor: "black",
  // },

  carrosselBanners: {
    marginTop: 20,
  },
  banner: {
    // width: width,
    width: width * 0.8,
    // width: 317,
    height: 180,
    marginHorizontal: width * 0.05,
    justifyContent: "center",
    padding: 20,
    opacity: 0.75
  },
  textoBanners: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "70%",
  },
});