
import {PRODUCT} from './shop-products';
import {getProduct, setBooks, setLearnMore} from '../shared/services/local-storage-service';
import {PATH} from '../shared/const';
import { RATING } from '../shared/rating/rating';
import {getAllBookRating} from '../get date/dateusers';
import {Confirmation} from '../shared/confirmation/confirmation window';
import { Header } from '../shared/header/header';


export const renderShop = async() => {
	const bookPage = document.querySelector('.main-products');
	const btn_page = document.querySelector('.btn-container');
	const window_modal = document.querySelector('.modal-window-log')
	const block_pages = document.createElement('div');
	const window_element = document.querySelector('.main-window');
	const shop_header = document.querySelector('.header-wrapper');
	const getBtns = block_pages.childNodes;
	const ratingBooks = await getAllBookRating();
	const map_books = new Map();

	block_pages.className = 'btn-page';

	const books =	getProduct();
	let number = 0;
	let getElement;
	let getItem;


	(books === null) ? setBooks([]) : null;

	const setItems = (product) => {
		let listProduct = getProduct()
	
		const addProdcut  = [...listProduct, product];

		setBooks(addProdcut);
	};

	const getBlock = element => getElement = element;

	ratingBooks.forEach(item => {
		map_books.set(item.bookId, item.rating)

	});


	const productList = PRODUCT.map(item => {
		return {
			...item,
			rating:map_books.get(item.id)
		}
	})

	const getItemWindow = el => {
		console.log(el);

		return el = getItem
	}  

	
	window_modal.append(Confirmation.confirmation(getItemWindow));


	const pagesCreate = productList.reduce((acc, item, i, product) => !(i % 12) ? acc.concat([product.slice(i, i + 12)]) : acc, []);

	for (let i = 0; i < pagesCreate.length; i++) {
		const btn_page = document.createElement('button');
		block_pages.append(btn_page);

		btn_page.className = 'btn-number-page';
		btn_page.innerText = i+1;
		btn_page.id = i+1

		btn_page.onclick = () => {
			number = (+ btn_page.textContent -1);

			getElement.remove()
			render();
			btn_active(number, btn_page);
		}
	}

	const btn_active = number_page => {
		let start = 0;
		let end = 0;
		let m = 0;
		let pages = 1;

		start =  number_page * pages
		end = start + pages
		m = end - 2;

		getBtns.forEach((btn, i) => {

			(i !== start) ? btn.style.backgroundColor = '#7a747499' :
				btn.style.backgroundColor = 'red';

			if (i < 3 || i === start || i === end  || i === m) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
				getBtns[getBtns.length-1].classList.add('active');
			}
		})
	}

	btn_page.append(block_pages);

	const render = () => {
		const block = document.createElement('div');
		const markerBtn = new Map ();

		getBtns[0].style.backgroundColor = 'red';
		block.className ='main-products__list_books';

		// books.forEach(({id}, i) => markerBtn.set(id, id));
	
		pagesCreate[number].forEach((item, i) => {
			let container = document.createElement('div');
			let productsElement = document.createElement('div');
			const container_title = document.createElement('div');
			const container_rating = document.createElement('div');
			const product = document.createElement('span');
			const cart_check = document.createElement('img');
			const photo = document.createElement('img');
			const author = document.createElement('p');
			const btnAdd = document.createElement('button');
			const btnMore = document.createElement('button');
			const cost = document.createElement('span');
			

			container.className = 'products-container';
			productsElement.className = 'products-element';
			container_title.className = 'products-element__product'
			product.className = 'title';
			container_rating.className = 'products-element__rating-stars';
			photo.className = 'products-element__photo';
			author.className ='products-element__author';
			btnAdd.className ='products-element__add';
			btnMore.id = item.id;
			btnAdd.id= item.id;
			btnMore.className ='products-element__more';
			cost.className ='products-element__cost';
			cart_check.className ='move'
		
			bookPage.append(block)
			block.append(container);
			container.append(productsElement);
			container_title.append(product)
			productsElement.append(container_rating, container_title, photo, author, cost, btnAdd, btnMore);
			container_rating.append(RATING.activeRating(item.rating));
			// dateRating()
			getBlock(block)

			btnAdd.innerHTML = 'ADD TO CARD';
			btnMore.innerText = 'Learn More'
			product.innerHTML = item.product;
			photo.src = item.photo;
			author.innerHTML = item.author;
			cost.innerHTML = item.cost + '$';

		
			const removeElemet = () => {
				const booksList = getProduct();

				const productRemove =  booksList.filter(product => product.id !== item.id);

				setBooks(productRemove);
			};

			btnAdd.onclick = event => {

				if (event.target.className === 'products-element__add') {
					btnAdd.classList.add('active')
					btnAdd.textContent = 'Remove';
					setItems(item);

				} else if (event.target.className === 'products-element__add active') {
					btnAdd.classList.remove('active');
					btnAdd.textContent = 'ADD TO CARD';
					removeElemet();
				}
				cartNumbers();
			}

			btnMore.onclick = () => {
				setLearnMore(item)
				window.location.href = PATH.inf;
			}

			// if (markerBtn.get(item.id) === 	btnAdd.id) {
			// 	btnAdd.classList.add('active');
			// 	btnAdd.innerText = 'Remove';
			// }

		});
	}
	console.log(getItem, 'getItem');

	shop_header.append(Header.getHeader())

	setTimeout(() => {
		document.querySelector('.main-window').style.display = 'block'
	}, 2000);
	
	btn_active();
	render();
}
