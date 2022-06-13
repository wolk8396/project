import {Header} from '../../shared/header/header';
import { PRODUCT } from '../shop-products';
import { ListBooks } from '../../shared/list_product/booksList';
import {getUser, userWishlist, deleteUserWishlist} from '../../aip/aip-handlers'
import { getUser1, setLearnMore, setBooks , getProduct, getToken} from '../../shared/services/local-storage-service';
import { PATH, TEXT } from '../../shared/const';
import {getAllBookRating, getUsersWish, basketUser , getBasketBooks} from '../../get date/dateusers';
import { RATING } from '../../shared/rating/rating';
import { FUNCTION } from '../../shared/services/function';
import { Confirmation } from '../../shared/confirmation/confirmation window'; 
import { Footer } from '../../shared/footer/footer';
import { ModalDelete } from '../../shared/Modal_delete/modal-delete';

export const searchBooks = async() => {
  const header_search = document.querySelector('.header-search');
  const input_search = document.getElementById('input-query');
  const books_list = document.querySelector('.container_product');
  const modal_window = document.querySelector('.modal-window');
  const modal_delete = document.querySelector('.modal-delete-window');
  const btn_search = document.getElementById('btn-query');
  const wrapper_search = document.querySelector('.wrapper-search');
 
  const ratingBooks = await getAllBookRating();
  const {authId} = getUser1();
  const getBtns = new Map ();
  const map_books = new Map();
  const itemId = new Map();
  const basketMap = new Map();
  const find = document.querySelector('.category');
  const getDate = await getUsersWish();
  const getBasketItems = await getBasketBooks();


  getDate.forEach(({bookID})=>  itemId.set(bookID, bookID));

  if (getBasketItems !== undefined) {
    getBasketItems.forEach(({id}) =>  basketMap.set(id, id));
  }

  ratingBooks.forEach(item => map_books.set(item.bookId, item.rating))

	const productList = PRODUCT.map(item => ({...item, rating:map_books.get(item.id), exist:item.id === itemId.get(item.id), basketExist:item.id === basketMap.get(item.id)}));

  const removeItems = () => {
    const container_product = document.querySelectorAll('.container_product__book');
    container_product.forEach(item => item.remove());

  }

  const get_fn = (fn_remove) => ModalDelete.setDate(fn_remove, TEXT.deleteCart);

  const render = books => {

    const basket = goods => {

      (getUser1().authId && getToken()) ?  basketUser(goods) : null
    }

    const add_wish = async (item, massage, btn) => {

      if (getToken() &&  getUser1().authId) {
        const getDate = await getUsersWish();

        const findSome = getDate.find(element => element.bookID === item.id);

        const deleteWish = async() => {
          btn.innerText = 'add to wish'
          item.exist = false
          massage.innerText = 'was not added to'
          await deleteUserWishlist(findSome.id);
        }

        const addWish = async() => {
          btn.innerText = 'delete'
          massage.innerText = 'was added to'
          item.exist = true
          await userWishlist (item, authId);
        }

        (!findSome) ? addWish() : ModalDelete.setDate(deleteWish, TEXT.deleteWish)

      } else  Confirmation.showWindow();
    };

    books.forEach(element => {

      books_list.append(
        new ListBooks(
          element, 
          add_wish, 
          PATH, 
          setLearnMore, 
          RATING.activeRating, 
          getProduct, 
          setBooks, 
          FUNCTION,
          basket,
          get_fn
        ).getList())
    })
  }

  const filter_items = (text) => {

    const searching_books = productList.filter(({category}) => category === text);

    render(searching_books);
  }

  const getInputValue = str => {

    btn_search.onclick = () => {
      const searching_books = productList.filter(({product})=> product.startsWith(str));

      removeItems();
      render(searching_books);
    }
  }

  input_search.oninput = () => {
    const getText = input_search.value;

    let newStr = getText.charAt(0).toUpperCase() + getText.slice(1);

    getInputValue(newStr);
  }

  const categoryBooks = str => {

    if (str === "all books") {
      removeItems();
      render(productList);
    }
  
     productList.forEach(item => {

      if (item.category === str) {
        removeItems();
        filter_items(str);
      }
    })
  }


  find.onclick = event => {
   let text = event.target.textContent;
   
   categoryBooks(text)
  }

  modal_window.append(Confirmation.confirmation(PATH, TEXT));

  header_search.append(Header.getHeader());

  Footer.getFooter(wrapper_search);

  modal_delete.append(ModalDelete.getModalDelete())

  render(productList);

}