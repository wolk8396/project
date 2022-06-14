import '../../shared/const'
import { Header, COUNTMAP} from '../../shared/header/header'
import { getToken, getUser1, numbers, setBooks, getProduct} from '../../shared/services/local-storage-service'
import {getBasketBooks, basketUser} from '../../get date/dateusers'
import { ShoppingCart } from '../../shared/shoping-cart/shoping-cart'
import { updatBasket} from '../../aip/aip-handlers'

export const basketPage =  async () => {
	const header = document.querySelector('.header-basket');
	let product_book = document.querySelector('.product');
	const renderProduct = getProduct();

  

		const countFullPrice =(element) => {
			const books = getProduct();
			const total  = Object.values(books).reduce((acc, item) => acc += item.cost * item.count, 0);
		
			element.innerText = `${total.toFixed(2)} $` ;
		}

		const setValueLocla = (id, operation, p) => {
			const getBooks =  getProduct();
			p.innerText = operation

			const setArray = getBooks.map(el => (el.id === id) ? ({...el, count:operation}) : el);

			(operation >= 1) ? setBooks(setArray) : null;

			setBooks(setArray)
		}

		const remove = async id => {
			const books = getProduct();
			const product = books.filter((item, index) => item.id !== id);

			await	basketUser(product);

			setBooks(product)

		}

    const renderShoppingCart = (product) => {
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

			product_book.append(table);

			product.forEach((item, i) => {
			
				table.append( 
					new ShoppingCart(
						item, 
						setBooks, 
						setValueLocla,
						remove,
						full_total,
						countFullPrice,
						).getCart())
			});
	
			tr.append(td_fullPrice);
			table.append(tr);
			wrapper_btn.append(btn_update)
			containerPrice.append(total_p, full_total, wrapper_btn);
			td_fullPrice.append(containerPrice);

			btn_update.onclick = async() => {
			 const books =	getProduct()
			 await basketUser( books)
			}

			countFullPrice(renderProduct, full_total);
    }

		if (getUser1().authId && getToken()) {

			await getBasketBooks().then(res => {
					(res === 0 || res === undefined) ? setBooks([]) : setBooks(res);
					const renderProduct = getProduct();
					renderShoppingCart(renderProduct);
			})
		} else renderShoppingCart(renderProduct);

		header.append(Header.getHeader());



	
}
