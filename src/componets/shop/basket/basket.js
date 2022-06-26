import { Header} from '../../shared/header/header'
import { getToken, getUser1, setBooks, getProduct} from '../../shared/services/local-storage-service'
import {getBasketBooks, basketUser} from '../../get date/dateusers';
import { ShoppingCart } from '../../shared/shoping-cart/shoping-cart';
import {ModalDelete} from '../../shared/Modal_delete/modal-delete';
import {PATH, TEXT } from '../../shared/const';
import { Confirmation } from '../../shared/confirmation/confirmation window';
import { FUNCTION } from '../../shared/services/function';
import { Massage } from '../../shared/masseges/masseges';

export const basketPage =  async () => {
	const header = document.querySelector('.header-basket');
	const wrapper = document.querySelector('.wrapper-basket');
	let product_book = document.querySelector('.product');
	const modal_deleteWindow = document.querySelector('.modal-window');
	const modal_confirmation = document.querySelector('.modal-confirmation');
	const renderProduct = getProduct();

	const countFullPrice =(element) => {
		const books = getProduct();
		const total  = Object.values(books).reduce((acc, item) => acc += item.cost * item.count, 0);
	
		element.innerText = `${total.toFixed(2)} $`;
	}

	const setValueLocla = (id, operation, p) => {
		const getBooks =  getProduct();
		p.innerText = operation;

		const setArray = getBooks.map(el => (el.bookId === id) ? ({...el, count:operation}) : el);

		(operation >= 1) ? setBooks(setArray) : null;

		setBooks(setArray);
	}

	const countItems  = () => {
		let number = FUNCTION.countItems();

		Header.countItems(number);
	}

	const remove = id => {
		const books = getProduct();
		const product = books.filter((item, index) => item.bookId !== id);

		(getUser1() && getToken()) ? basketUser(product) : null;

		setBooks(product);
	}

	const renderShoppingCart = product => {
		const table = document.createElement('table');
		const tr = document.createElement('tr');
		const td_fullPrice = document.createElement('td');
		const full_total = document.createElement('p');
		const containerPrice = document.createElement('div');
		const total_p = document.createElement('p');
		const wrapper_btn = document.createElement('div');
		const btn_update = document.createElement('button');

		td_fullPrice.setAttribute('colspan', 7);
		td_fullPrice.style.textAlign = 'right'; 
		total_p.innerText = 'TOTAL PRICE :';
		containerPrice.className = 'full-total';
		total_p.className = 'full-total__text';
		full_total.className = 'full-total__prise';
		btn_update.className = 'container_btn__btn-update-cart';
		wrapper_btn.className = 'container_btn';
		btn_update.innerText = 'UPDATE'

		product_book.append(table);

		header.append(Header.getHeader());

		Massage.setMassage(wrapper, TEXT.upDateCart);

		product.forEach((item, i) => {
		
			table.append( 
				new ShoppingCart(
					item, 
					setValueLocla,
					remove,
					full_total,
					countFullPrice,
					ModalDelete,
					TEXT.deleteCart,
					countItems
				).getCart())
		});

		tr.append(td_fullPrice);
		table.append(tr);
		wrapper_btn.append(btn_update);
		containerPrice.append(total_p, full_total, wrapper_btn);
		td_fullPrice.append(containerPrice);

		btn_update.onclick = () => {
			const books =	getProduct();
			(getUser1().authId && getToken()) ? 
				basketUser(books).then(() => Massage.getElement()) : 
				Confirmation.showWindow();
		}

		countFullPrice(renderProduct, full_total);
	}

		if (getUser1().authId && getToken()) {

			await getBasketBooks().then(res => {
					(res === 0 || res === undefined) ? setBooks([]) : setBooks(res);
					const renderProduct = getProduct();
					renderShoppingCart(renderProduct);
			})
		
		} else  renderShoppingCart(renderProduct);


	modal_deleteWindow.append(ModalDelete.getModalDelete());
	
	modal_confirmation.append(Confirmation.confirmation(PATH, TEXT));

}
