import KiwiJpg from "./kiwi.jpg";
import KiwiPng from "./kiwi.png";
import altText from "./altText.txt";

function addImage() {
  const body = document.querySelector("body");

  const jpgImg = document.createElement("img");
  jpgImg.alt = altText;
  jpgImg.width = 300;
  jpgImg.src = KiwiJpg;

  body.appendChild(jpgImg);

  const pngImg = document.createElement("img");
  pngImg.alt = altText;
  pngImg.width = 300;
  pngImg.src = KiwiPng;
  body.appendChild(pngImg);
}

export default addImage;
