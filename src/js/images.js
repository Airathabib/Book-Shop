import auth from "../assets/svg/user.svg";
import search from "../assets/svg/search.svg";
import cart from "../assets/svg/cart.svg";
import arrow from "../assets/svg/arrow.svg";
import firstBanner from "../assets/img_png/banner1.png";
import secondBanner from "../assets/img_png/banner2.png";
import thirdBanner from "../assets/img_png/banner3.png";

//  определяем и экспортируем функцию которая  выводит изображения
export function imgRender() {
	const userAuth = document.querySelector(".auth__img");
	const userSearch = document.querySelector(".search__img");
	const userCart = document.querySelector(".cart__img");
	const promoArrow = document.querySelectorAll(".promo__arrow");
	const firstBannerImg = document.querySelector(".first-banner");
	const secondBannerImg = document.querySelector(".second-banner");
	const thirdBannerImg = document.querySelector(".third-banner");

	if (userAuth !== null && userSearch !== null && userCart !== null && promoArrow !== null && firstBannerImg !== null && secondBannerImg !==
		null && thirdBannerImg !== null) {
		userAuth.src = auth;
		userSearch.src = search;
		userCart.src = cart;
		firstBannerImg.src = firstBanner;
		secondBannerImg.src = secondBanner;
		thirdBannerImg.src = thirdBanner;
		promoArrow.forEach(item => item.src = arrow);
	}
}
