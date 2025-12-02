# NexusGameShop 🎮

## 📄 Descrição do Projeto  
**NexusGameShop** é um aplicativo mobile desenvolvido com React Native + Expo que funciona como uma loja virtual de jogos. O app permite navegar por jogos, ver detalhes, visualizar imagens e adicionar produtos ao carrinho. Os dados (jogos, imagens, descrições, preços etc.) são obtidos de um backend de banco de dados fornecido por Supabase.

---

## 🧰 Tecnologias utilizadas  

- React Native / Expo  
- Supabase (database + storage) :contentReference[oaicite:3]{index=3}  
- JavaScript / ES6+  
- React Navigation (ou similar) para navegação entre telas  
- Hooks React (`useState`, `useEffect`) para estado e efeitos  
- FlatList / ScrollView para renderização das listas de jogos  

---

## ✅ Funcionalidades  

- Listar todos os jogos buscados no Supabase  
- Exibir imagem, nome, preço e rating fictício (atualmente gerado aleatoriamente) para cada jogo  
- Tela de detalhes: ao clicar em um jogo, abrir uma tela com informações completas — imagem grande, nome, preço, plataforma, descrição e botão para “Adicionar ao Carrinho”  
- Layout com banners estáticos, categorias e seções como “Mais Vendidos”, “Pré-Venda”, “Ofertas”  
- Estrutura de navegação básica (Home → DetalhesProduto, categorias, carrinho etc.)  

---

## 🛠️ Como executar o projeto  

### Pré-requisitos  
- Node.js instalado  
- Yarn ou npm  
- Expo CLI globalmente (recomendado)  

### Passos  
```bash
# Clonar o repositório  
git clone https://github.com/MuriloHenriqueDss/NexusGame.git  

# Entrar na pasta do projeto  
cd NexusGame  

# Instalar dependências  
npm install  
# ou  
yarn install  

# Iniciar o app com Expo  
npx expo start  
# ou  
yarn start  
