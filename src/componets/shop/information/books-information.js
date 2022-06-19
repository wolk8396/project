import {getUsersWish, dateRating, upDateRating,  basketUser, getBasketBooks} from '../../get date/dateusers';
import {userWishlist, deleteUserWishlist} from '../../aip/aip-handlers';
import {AUTHOR} from "../../shop/shop-products"
import {createTodoComments} from './component/create-todos/create-todos';
import { Header, COUNTMAP} from '../../shared/header/header';
import { PATH, TEXT } from '../../shared/const';
import {getUser1, getLearnMore,  setBooks, getProduct, numbers, getToken} from '../../shared/services/local-storage-service'
import { Modal } from '../../shared/Modal/modal';
import { FUNCTION } from '../../shared/services/function';
import { Confirmation } from '../../shared/confirmation/confirmation window';
import { Footer } from '../../shared/footer/footer';
import { ModalDelete } from '../../shared/Modal_delete/modal-delete';

export const information = async () =>  {
  const wrapper = document.querySelector('.wreaper-learn_more')
  const header = document.querySelector('.header-1');
  const modal_window = document.querySelector('.modal-window-log')
  const picture = document.querySelector('.picture');
  const title = document.querySelector('.book-title');
  const prise = document.querySelector('.block-btn__cost');
  const author = document.querySelector('.book-author');
  const recomendation = document.querySelector('.recommendations');
  const description = document.querySelector('.description');
  const story = document.querySelector('.book-story__about-book');
  const btn_wish = document.querySelector('.block-btn__btn-wish');
  const btn_basket = document.querySelector('.block-btn__btn-add');
  const des = document.querySelector('.des-book__book-story');
  const rating_active = document.querySelector('.rating-active');
  const more = document.querySelector('.des-book__more-less');
  const click_rating = document.querySelector('.click-stars');
  const wrapper_stars = document.querySelectorAll('.wrapper-active__item');
  let number_x = document.querySelector('.rating__value');
  const model_items = document.querySelector('.model-items');
  const spiners = document.querySelector('.float-end');
  const modal_delete = document.querySelector('.modal-delete')
  const status_massage = document.querySelector('.status-query__response');

  const book = getLearnMore();
  const {bookId} =  getLearnMore();
  const {authId} = getUser1();
  const arrayBook = new Map();
  const productBook2 = new Map();

  console.log(book);
  modal_window.append(Confirmation.confirmation(PATH, TEXT));

  const fn_send = number => {
  
    click_rating.onclick  = async() => {
     
      await upDateRating(bookId, number);
      await  upDateDisplay(bookId, click_rating).then(res => {
        if (isNaN(res)) {
          rating_active.style.width = `${0}%`
          number_x.innerHTML = 0;
        } else {
          rating_active.style.width = `${res * 20}%`
          number_x.innerHTML = res.toFixed(2);
        }
      });
    }
  }

  const upDateDisplay = async () =>  await dateRating (bookId, click_rating);

  const numberRating  = await upDateDisplay ();

 (isNaN(numberRating)) ? 
    number_x.innerHTML = 0 :
    number_x.innerHTML = numberRating.toFixed(2);

  rating_active.style.width = `${numberRating * 20}%`;

  [book].forEach(({author}) => productBook2.set('author', author));
 

  const arr = AUTHOR.filter(({author}) => author === productBook2.get('author'));

  arr.forEach(({img}) =>  arrayBook.set('img', img));

  const bookRender = [book].map(item => ({ ...item, photoAuthor: arrayBook.get('img')}));

  const convert = bookRender.reduce((acc, item) => ({...item}), {});
  
console.log(book, 'book');

  picture.src = convert.photo;
  prise.innerHTML = convert.cost +'$';
  title.innerHTML = convert.product;
  author.innerHTML = convert.author;
  recomendation.innerHTML = convert.recommendations;
  description.innerHTML = convert.description;
  story.innerHTML = convert.story;
  btn_wish.innerText = 'ADD TO WISHLIST';
  btn_basket.innerHTML = 'ADD TO CARD';

  model_items.append(
    Modal.modlaWindow(
      model_items,
      convert,
      FUNCTION,
      PATH.basket
    )
  );
 
  const checkStatus = async() => {
    let getDate = [];

    await getUsersWish().then(res =>  getDate = res);

    const findItem =  getDate.find(({bookId}) => bookId === convert.bookId);

    return findItem;
  }

  const setStatus = async () => {
    await checkStatus().then(res => {
      if (res) {
        status_massage.innerText = TEXT.existent;
        btn_wish.innerText = 'delete';
      } else {
        status_massage.innerText = TEXT.Nonexistent;
        btn_wish.innerText = 'ADD TO WISHLIST';
      }
    })
  }

  const check_conditions  = async() => {
    const status = await checkStatus();

    (status) ?
      await deleteUserWishlist(status.id)
      .then(res =>  spiners.style.display = 'none'):
      await userWishlist(convert, authId)
      .then( res =>  spiners.style.display = 'none');

    setStatus();
  }

  btn_wish.onclick = () => {
    spiners.style.display = 'block';

   ( authId && getToken()) ? 
    check_conditions() : Confirmation.showWindow();
  }

  const findItem = () => getProduct().find(item =>item.bookId === convert.bookId);
 
  const checkConditionsBasket = () => {

    console.log(convert);

    (!findItem()) ? btn_basket.innerText = 'ADD TO CART' : 
      btn_basket.innerText ='IN CART';
  }

  const No_registration = () => {
    const checkUndefined = findItem();

    if (!checkUndefined) {
      model_items.style.display = 'block';
      btn_basket.innerText ='IN CART';
      FUNCTION.setValue(convert, getProduct, setBooks);
    } else window.location.pathname = PATH.basket;
  }

  const  exist_registration = () => {
    const checkUndefined = findItem();

    if (!checkUndefined) {
      const set = FUNCTION.setValue(convert, getProduct, setBooks);
      model_items.style.display = 'block';
      btn_basket.innerText ='IN CART';

      basketUser(set)
    } else window.location.pathname = PATH.basket;

  }

  btn_basket.onclick = () => {
    const getBtn = document.querySelector('.btn-danger');

    (getUser1().authId && getToken()) ? exist_registration() : No_registration();

    let number = FUNCTION.countItems();
    getBtn.innerText = `check out items(${number})`

    Header.countItems(number);
  }

  more.onclick = () => {
    if (des.className === 'des-book__book-story') {
      des.classList.add('active');
      more.innerHTML = '...Less';
    } else {
      des.classList.remove('active');
      more.innerHTML = '...MORE';
    }
  }

  const rating_activate = () => {

    wrapper_stars.forEach(item => {
      item.addEventListener('mouseenter', () => {
        rating_active.style.width = `${item.value/0.05}%`;
        number_x.innerHTML = item.value;
        fn_send(item.value);
      })
      item.addEventListener('mouseleave', () => {
        rating_active.style.width = `${numberRating * 20}%`;
      })
    })
  }

  (getToken() && getToken()) ? rating_activate() :
    click_rating.style.display = 'block';


  setStatus();

  checkConditionsBasket();

  await upDateDisplay();

  modal_delete.append(ModalDelete.getModalDelete())

  createTodoComments();

  header.append(Header.getHeader());

  Footer.getFooter( wrapper);
}
