import logoImg from "./assets/img/lemoncode.png";

const container = document.getElementById("imgContainer");

if (container) {
  const img = document.createElement("img");
  img.src = logoImg;
  container.appendChild(img);
} else {
  console.error("El contenedor con id 'imgContainer' no existe.");
}
