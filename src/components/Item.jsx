export default function Item({ title, img, price }) {
  return (
    <div
      className="item-card"
      style={{
        border: "solid 1px grey",
        backgroundColor: "#ffffffff",
        margin: "10px",
      }}
    >
      <img width="120" src={img} alt={title} />
      <h4>{title}</h4>
      <p>Precio: ${price}</p>
      <button>Ver detalle</button>
    </div>
  );
}
