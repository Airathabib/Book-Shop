export function scroll() {
	// находим кнопку прокрутки и вешаем на нее обработчик
	const goTopBtn = document.querySelector(".up-btn");
	if (goTopBtn !== null) {
		goTopBtn.addEventListener("click", goTop);
		window.addEventListener("scroll", trackScroll, { passive: true });
	}
	// отпределяем функцию  которая вычисляет высоту видимой части экрана и вешает или убирает классы с кнопки
	function trackScroll() {
		const offset = window.pageYOffset;
		const coords = document.documentElement.clientHeight;
		if (offset > coords) {
			goTopBtn.classList.add("up-btn--show");
		} else {
			goTopBtn.classList.remove("up-btn--show");
		}
	}
	// определяем функцию которая прокручивает экран наверх
	function goTop() {
		if (window.pageYOffset > 0) {
			window.scrollBy(0, -35);
			setTimeout(goTop, 5);
		}
	}

}
