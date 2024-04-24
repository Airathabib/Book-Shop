import fillStar from "../assets/svg/star_filled.svg";
import star from "../assets/svg/star.svg";
import thumbnail from "../assets/img_png/thumbnail.png";

// находим нужные элементы
let quantityGoods = document.querySelector(".quantityGoods");
let quantityGoodsNumber = document.querySelector(".quantityGoods__number");
let categoryItems = document.querySelectorAll(".nav__categories--item");

let indexItem = 0;
let startIndex = 0;
let indexBooksArray = [];
let category = "Architecture";

const apiKey = "AIzaSyDrP99qMob9hQ92cfQVELe9qzmvpL4NUto";
let books = document.querySelector(".books");

// определяем и экспортируем функцию которая по клику вызывает нужную категорию книг
export function selectActualCategory() {
	console.log("CATEGORY CLICK");
	categoryItems.forEach(item => {
		item.addEventListener("click", () => {
			books.innerHTML = ""; // очищаем ранее загруженные книги
			removeActiveCategory(); // очищаем выбранную ранее катего
			item.classList.add("category-active");
			category = item.innerHTML;
			addActualCategory();
			saveActualCategory();
			getBooks();
		});
	});
}

// определяем и экспортируем функцию которая выводит количество товаров в корзине, если таковые имеются
export function checkQuantityGoods() {
	quantityGoodsNumber.innerHTML = localStorage.getItem("countGoods");

	if (quantityGoodsNumber.innerHTML >= 1) {
		quantityGoods.style.display = "flex";
	} else {
		quantityGoods.style.display = "none";
	}
}
//  определяем функцию которая убирает классы с неактивной категории книг
function removeActiveCategory() {
	document.querySelector(".category-active").classList.remove(
		"category-active");
}
//  определяем и экспортируем функцию которая выводит книги,кнопки в разметку в HTML
export function getBooks() {
	indexItem++;
	const localIndexItem = localStorage.getItem("indexBook");
	const parseIndexBook = JSON.parse(localIndexItem);

	fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&
langRestrict=en`)
		.then(response => response.json())
		.then(data => {
			for (let book of data.items) {
				const bookItem = `
                      <div class="book" data-index=${book.id}>
                        <img class="book-cover" src=${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : thumbnail}
alt="book-cover"/>
                        <div class="book-information" >
                          <span class="book-author">${book.volumeInfo.authors}</span>
                          <h2 class="book-title">${book.volumeInfo.title}</h2>
                          <div class="rating">
                            <div class="rating-items">
                              <img src=${book.volumeInfo.averageRating > 0 ? fillStar : star}
															 alt="rating" width="12" height="12"/>
                              <img src=${book.volumeInfo.averageRating > 1 ? fillStar : star}
															 alt="rating" width="12" height="12"/>
                              <img src=${book.volumeInfo.averageRating > 2 ? fillStar : star}
															alt="rating" width="12" height="12"/>
                              <img src=${book.volumeInfo.averageRating > 3 ? fillStar : star}
															 alt="rating" width="12" height="12"/>
                              <img src=${book.volumeInfo.averageRating > 4 ? fillStar : star}
															 alt="rating" width="12" height="12"/>
                            </div>
                            <span class="review">${book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount +
						` ${book.volumeInfo.ratingsCount === 1 ? "review" : "reviews"}` : ""}</span>
                          </div>
                          <p class="book-description">${book.volumeInfo.description || ""}</p>
                          <span class="book-price">${book.saleInfo.listPrice ? "&#8381; " + book.saleInfo.listPrice.amount : ""}
													</span>
                          <button class="button book-buy">Buy now</button>
                        </div>
                      </div>
                      `;
				if (books !== null) {
					books.innerHTML += bookItem;
					console.log(books);
				}
			}
			const div = document.createElement("div");
			div.classList.add("button-container");
			if (books !== null) {
				books.append(div);
			}
			const loadButton = document.createElement("button");
			loadButton.classList.add("button", "load-button");
			loadButton.innerHTML = "Load more";
			if (div !== null) {
				div.append(loadButton);
			}

			loadButton.addEventListener("click", () => {
				startIndex += 6;
				getBooks();
				loadButton.classList.add("hidden");
			});

			let bookBuy = document.querySelectorAll(".book-buy");
			bookBuy.forEach(button => {
				const indexBook = button.closest(".book").dataset.index;
				button.addEventListener("click", () => {
					if (button.innerHTML == "Buy now") {
						button.innerHTML = "IN THE CART";
						indexBooksArray.push(indexBook);
						quantityGoodsNumber.innerHTML = Number(quantityGoodsNumber.innerHTML) + 1;

						if (quantityGoodsNumber.innerHTML > 0) {
							quantityGoods.style.display = "flex";
						} else {
							quantityGoods.style.display = "none";
						}

						const stringIndexBook = JSON.stringify(indexBooksArray);
						localStorage.setItem("indexBook", stringIndexBook);

						addCountGoods();
						saveCountGoods();
					} else {
						button.innerHTML = "Buy now";
						const localIndexItem = localStorage.getItem("indexBook");
						if (localIndexItem) {
							const parseIndexBook = JSON.parse(localIndexItem);
							indexBooksArray = parseIndexBook.filter(item => item !== indexBook);
						}
						quantityGoodsNumber.innerHTML = Number(quantityGoodsNumber.innerHTML) - 1;

						if (quantityGoodsNumber.innerHTML > 0) {
							quantityGoods.style.display = "flex";
						} else {
							quantityGoods.style.display = "none";
						}

						addCountGoods();
						saveCountGoods();
					}

					const stringIndexBook = JSON.stringify(indexBooksArray);
					localStorage.setItem("indexBook", stringIndexBook);
				});

				if (parseIndexBook) {
					for (indexItem = 0; indexItem < parseIndexBook.length; indexItem++) {
						if (indexBook === parseIndexBook[indexItem]) {
							button.innerHTML = "In the cart";
							indexBooksArray = parseIndexBook;
						}
					}
				}
			});

			function addCountGoods() {
				localStorage.setItem("countGoods", quantityGoodsNumber.innerHTML); // переписываем первоначально заданное значение
			}

			function saveCountGoods() {
				if (localStorage.getItem("countGoods")) {
					quantityGoodsNumber.innerHTML = localStorage.getItem("countGoods"); // если значение есть, считываем его
				} else {
					localStorage.setItem("countGoods", quantityGoodsNumber.innerHTML); // если изначально счетчик пуст, записываем значение
				}
			}
		});
}


function addActualCategory() {
	localStorage.setItem("actualCategory", category);
}

function saveActualCategory() {
	if (localStorage.getItem("actualCategory")) {
		category = localStorage.getItem("actualCategory");
	} else {
		localStorage.setItem("actualCategory", category);
	}
}
