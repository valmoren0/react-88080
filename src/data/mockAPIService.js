// src/data/mockAPIService.js

import products from "./productos";

export const getProducts = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId) {
        const filteredProducts = products.filter(
          (prod) => prod.category === categoryId
        );
        resolve(filteredProducts);
      } else {
        resolve(products);
      }
    }, 1000);
  });
};

export const getProductById = (itemId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((prod) => prod.id === Number(itemId));
      resolve(product);
    }, 1000);
  });
};
