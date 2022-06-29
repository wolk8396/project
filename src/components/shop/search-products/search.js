import {Header} from '../../shared/header/header';
import { PRODUCT } from '../../shared/products_shop/shop-products';
import { ListBooks } from '../../shared/list_product/booksList';
import {userWishlist, deleteUserWishlist} from '../../aip/aip-handlers'
import { getUser1, setLearnMore, setBooks , getProduct, getToken} from '../../shared/services/local-storage-service';
import { PATH, TEXT } from '../../shared/const';
import {getAllBookRating, getUsersWish, basketUser} from '../../get date/date_users';
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
  const map_books = new Map();
  const itemId = new Map();
  const basketMap = new Map();
  const find = document.querySelector('.category');
  const getDate = await getUsersWish();
  const getBasketItems = getProduct();

  getDate.forEach(({bookId})=>  itemId.set(bookId, bookId));

  getBasketItems.forEach(({bookId}) =>  basketMap.set(bookId, bookId));

  ratingBooks.forEach(item => map_books.set(item.bookId, item.rating));

  const productList = PRODUCT.map(item => {
    return {
      ...item,
      rating:map_books.get(item.bookId),
      exist:item.bookId === itemId.get(item.bookId),
      basketExist:item.bookId === basketMap.get(item.bookId)
    }
  })

  const removeItems = () => {
    const container_product = document.querySelectorAll('.container_product__book');
    container_product.forEach(item => item.remove());
  }

  const get_fn = (fn_remove) => ModalDelete.setDate(fn_remove, TEXT.deleteCart);

  const render = books => {

    const basket = async (goods, spinner, btn, massage) => {

      if (getUser1().authId && getToken()) {
        await basketUser(goods)
          .then(() => {
            btn.innerText = massage;
            spinner.style.display = 'none';
          })

      } else  {
        btn.innerText = massage;
        spinner.style.display = 'none';
      }
    }

    const add_wish = async (item, spinner, btn) => {

      if (getToken() &&  getUser1().authId) {
        const getDate = await getUsersWish();

        const findSome = getDate.find(element => element.bookId === item.bookId);

        const deleteWish = async() => {
          spinner.style.display = 'none';
          item.exist = false;
          await deleteUserWishlist(findSome.id);
        }

        const addWish = async() => {
          spinner.style.display = 'block';
          item.exist = true;

          await userWishlist (item, authId)
            .then(()=> {
              btn.innerText = 'delete';
              spinner.style.display = 'none';
            } );
        }

        (!findSome) ? addWish() : ModalDelete.setDate(deleteWish, TEXT.deleteWish);

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
          get_fn,
        ).getList())
    })
  }

  const filter_items = text => {

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

   categoryBooks(text);
  }

  modal_window.append(Confirmation.confirmation(PATH, TEXT));

  header_search.append(Header.getHeader());

  Footer.getFooter(wrapper_search);

  modal_delete.append(ModalDelete.getModalDelete());

  render(productList);
}
