import "../style/style.scss";
import { imgRender } from "./images.js";
import { initSlider } from "./slider.js";
import { selectActualCategory } from "./books.js";
import { checkQuantityGoods } from "./books.js";
import { getBooks } from "./books.js";
import { scroll } from "./scroll.js";


const promo = document.querySelectorAll(".promo");
promo.forEach(item => item.addEventListener("click", e => e.preventDefault()));

document.addEventListener("DOMContentLoaded", function () {
	imgRender();
	initSlider();
	selectActualCategory();
	checkQuantityGoods();
	getBooks();
	scroll();
});
