import {setBooks, setLearnMore, getProduct, getUser1, getToken} from "../../../../shared/services/local-storage-service";
import { PATH, TEXT} from "../../../../shared/const";
import {getUsersWish, basketUser} from '../../../../get date/date_users';
import {deleteUserWishlist} from '../../../../aip/aip-handlers';
import { RATING } from "../../../../shared/rating/rating";
import {getAllBookRating} from '../../../../get date/date_users';
import { ListBooks } from "../../../../shared/list_product/booksList";
import { FUNCTION } from "../../../../shared/services/function";
import { ModalDelete } from "../../../../shared/Modal_delete/modal-delete";
import trash_img from '../../../../../asset/images/trash2-fill (1).png';

export const usersWhishes =  async fn_item  => {
  const product = document.querySelector('.user-wishlist__product');
  const block = document.createElement('div');
  const userWishes_date = await getUsersWish();
  const ratingBooks = await getAllBookRating();
  const booksP = getProduct();
  const getId = new Map ();
  const map_books = new Map();

  block.className = 'container_product';

  product.append(block);

  booksP.forEach(({bookId}) => getId.set(bookId, bookId));

  ratingBooks.forEach(item => map_books.set(item.bookId, item.rating));

  const productList = userWishes_date.map(item => {
		return {
			...item,
			rating:map_books.get(item.bookId),
      basketExist:item.bookId === getId.get(item.bookId)
		}
	})

  const delete_wish = (element, massage, btn ,fn_status) => {

    const combine_fn = async () => {
      await deleteUserWishlist(element.id);

      fn_status();
    }

    ModalDelete.setDate(combine_fn, TEXT.deleteWish);
  }

  const get_fn = (fn_remove) =>  ModalDelete.setDate(fn_remove, TEXT.deleteCart);

  const basket = async( goods, spinner, btn, massage) => {
    if (getUser1().authId && getToken()) {
      await basketUser(goods)
        .then(() => {
          btn.innerText = massage;
          spinner.style.display = 'none';
        });
    } else  {
      btn.innerText = massage;
      spinner.style.display = 'none';
    }
  }

    productList.forEach(element => {

      block.append(
        new ListBooks(
          element,
          delete_wish,
          PATH,
          setLearnMore,
          RATING.activeRating,
          getProduct,
          setBooks,
          FUNCTION,
          basket,
          get_fn,
          trash_img
        ).getList())

    });

  fn_item(product);
}
