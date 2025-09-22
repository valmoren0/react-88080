import Item from "./Item";

function ItemListContainer({ greeting }) {
  return (
    <section className="itemlist">
      <h3> {greeting} </h3>
      <Item
        title="Mate Imperial Premium"
        img="/imagenes/mate-imperial.png"
        price="25.000"
      />
      <Item
        title="Yerba Mate Rosamonte"
        img="/imagenes/yerba-rosamonte.jpg"
        price="3.500"
      />
      <Item
        title="Bombilla de Acero Inoxidable"
        img="/imagenes/bombilla-acero.jpg"
        price="4.000"
      />
    </section>
  );
}

export default ItemListContainer;
