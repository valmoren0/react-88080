// src/components/ItemList.jsx
import React from "react";
import Item from "./Item";

const ItemList = ({ products }) => {
  return products.map((item) => <Item key={item.id} item={item} />);
};

export default ItemList;
