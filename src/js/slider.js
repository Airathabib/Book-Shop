const slides = document.querySelectorAll(".slider-image");
const bottom = document.querySelector(".bottom");

let currentSlideIndex = 0;
const paginationCircles = [];

export function initSlider() {

	const promo = document.querySelectorAll(".promo");
	promo.forEach(item => item.addEventListener("click", e => e.preventDefault()));

	function createPaginationCircle() {
		const div = document.createElement("div");
		div.classList.add("pagination-circle");
		if (bottom !== null) {
			bottom.appendChild(div);
		}
		paginationCircles.push(div);
	}

	function addPagination() {
		slides.forEach(createPaginationCircle);
		paginationCircles[0].classList.add("active");
		paginationCircles.forEach((circle, idx) => {
			circle.addEventListener("click", () => changeSlide(idx));
		});
	}

	function addActiveClass() {
		paginationCircles[currentSlideIndex].classList.add("active");
	}

	function removeActiveClass() {
		paginationCircles[currentSlideIndex].classList.remove("active");
	}

	function showSlide() {
		slides[currentSlideIndex].classList.add("block");
	}

	function hideSlide() {
		slides[currentSlideIndex].classList.remove("block");
	}

	function changeSlide(slideIndex) {
		hideSlide();
		removeActiveClass();
		currentSlideIndex = slideIndex;
		addActiveClass();
		showSlide();
	}

	function nextSlide() {
		let newSlideIndex = currentSlideIndex + 1;
		if (newSlideIndex > slides.length - 1) {
			newSlideIndex = 0;
		}
		changeSlide(newSlideIndex);
	}

	function previousSlide() {
		let newSlideIndex = currentSlideIndex - 1;
		if (currentSlideIndex < 0) {
			newSlideIndex = slides.length - 1;
		}
		changeSlide(newSlideIndex);
	}

	addPagination();
	nextSlide();
	previousSlide();
	setInterval(nextSlide, 5000);
}
