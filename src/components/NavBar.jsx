import CartWidget from "./CartWidget";

function NavBar() {
  return (
    <nav>
      <a href="/">
        <h2>🧉 Imperial</h2>
      </a>

      {/* Menú de categorías */}
      <ul>
        <li>
          <a href="#">Mates</a>
        </li>
        <li>
          <a href="#">Yerbas</a>
        </li>
        <li>
          <a href="#">Bombillas</a>
        </li>
        <li>
          <a href="#">Termos y Accesorios</a>
        </li>
      </ul>

      {/* Carrito de compras */}
      <CartWidget />
    </nav>
  );
}
export default NavBar;
