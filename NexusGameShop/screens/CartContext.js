import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (jogo) => {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === jogo.id);
      if (existente) return prev; // evita duplicado
      return [...prev, jogo];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCarrinho = () => useContext(CartContext);
