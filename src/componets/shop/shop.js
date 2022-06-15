import {PATH, TEXT} from '../shared/const';
import {PRODUCT} from './shop-products';
import {getProduct, setBooks, setLearnMore, setUser, getUser1, getToken} from '../shared/services/local-storage-service';
import { RATING } from '../shared/rating/rating';
import {getAllBookRating,} from '../get date/dateusers';
import {Confirmation} from '../shared/confirmation/confirmation window';
import { Header} from '../shared/header/header';
import { FUNCTION } from '../shared/services/function';
import { Footer } from '../shared/footer/footer';

export const my = async () => {
	const wrapper_shope = document.querySelector('.wrapper-shop');
  const shop_header = document.querySelector('.header-wrapper');
  const bookPage = document.querySelector('.main-products');
	const btn_page = document.querySelector('.btn-container');
	const window_modal = document.querySelector('.modal-window-log')
	const block_pages = document.createElement('div');
  const getBtns = block_pages.childNodes;
	const map_books = new Map();
	const books =	getProduct();
	const ratingBooks = await getAllBookRating();

	let number = 0;
	let getElement;
	
	block_pages.className = 'btn-page';

  (books === null) ? setBooks([]) : null;

  (!getUser1()) ? setUser([]) : null;

  const getBlock = element => getElement = element;

	ratingBooks.forEach(item => map_books.set(item.bookId, item.rating));

	const productList = PRODUCT.map(item => ({...item, rating:map_books.get(item.id)}));

	window_modal.append(Confirmation.confirmation(PATH, TEXT));

	const pagesCreate = FUNCTION.pagination(12, productList);

	for (let i = 0; i < pagesCreate.length; i++) {
		const btn_page = document.createElement('button');
		block_pages.append(btn_page);

		btn_page.className = 'btn-number-page';
		btn_page.innerText = i+1;
		btn_page.id = i+1;

		btn_page.onclick = () => {
			number = (+ btn_page.textContent -1);

			getElement.remove();
			render();
			btn_active(number, btn_page);
		}
	}
  
  const btn_active = number_page => {
		let start = 0, pages = 1;
		let middle = 0, end = 0;
	
		start =  number_page * pages;
		end = start + pages;
		middle = end - 2;

		getBtns.forEach((btn, i) => {

			(i !== start) ? btn.style.backgroundColor = '#7a747499' :
				btn.style.backgroundColor = 'red';

			if (i < 3 || i === start || i === end  || i === middle) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
				getBtns[getBtns.length-1].classList.add('active');
			}

		})
	}

  const checkLog = () => {
		(!getUser1().authId) ? 
			setTimeout(() => { Confirmation.showWindow()}, 2000): null;
  }

  btn_page.append(block_pages);

	const render = () => {
		const block = document.createElement('div');

		getBtns[0].style.backgroundColor = 'red';
		block.className ='main-products__list_books';

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
			btnMore.className ='products-element__more';
			cost.className ='products-element__cost';
			cart_check.className ='move';
		
			bookPage.append(block);
			block.append(container);
			container.append(productsElement);
			container_title.append(product);
			productsElement.append(container_rating, container_title, photo, author, cost, btnMore);
			container_rating.append(RATING.activeRating(item.rating));

			getBlock(block);

			btnAdd.innerHTML = 'ADD TO CARD';
			btnMore.innerText = 'Learn More'
			product.innerHTML = item.product;
			photo.src = item.photo;
			author.innerHTML = item.author;
			cost.innerHTML = item.cost + '$';
  
			btnMore.onclick = () => {
				setLearnMore(item);
				window.location.href = PATH.inf;
			}
		});
	}

  checkLog();

	btn_active();

  shop_header.append(Header.getHeader());

	render();

	Footer.getFooter(wrapper_shope);
}
