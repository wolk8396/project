import {getUsersWish, dateRating, upDateRating,  basketUser, getBasketBooks} from '../../get date/dateusers';
import {userWishlist, deleteUserWishlist} from '../../aip/aip-handlers';
import {AUTHOR} from "../../shop/shop-products"
import {createTodoComments} from './component/create-todos/create-todos';
import { Header} from '../../shared/header/header';
import { PATH, TEXT } from '../../shared/const';
import {getUser1, getLearnMore,  setBooks, getProduct, getToken} from '../../shared/services/local-storage-service'
import { Modal } from '../../shared/Modal/modal';
import { FUNCTION } from '../../shared/services/function';
import { Confirmation } from '../../shared/confirmation/confirmation window';
import { Footer } from '../../shared/footer/footer';
import { ModalDelete } from '../../shared/Modal_delete/modal-delete';
import { Spinner } from '../../shared/spiner/spiner';

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
  const btn_wish = document.querySelector('.btn-wish');
  const btn_basket = document.querySelector('.block-btn__btn-add');
  const des = document.querySelector('.des-book__book-story');
  const rating_active = document.querySelector('.rating-active');
  const more = document.querySelector('.des-book__more-less');
  const click_rating = document.querySelector('.click-stars');
  const number_rating =document.querySelector('.number-rating');
  const wrapper_stars = document.querySelectorAll('.wrapper-active__item');
  let number_x = document.querySelector('.rating__value');
  const model_items = document.querySelector('.model-items');
  const spiners = document.querySelector('.spinner-border-sm');
  const spinner = document.getElementById('cart');
  const modal_delete = document.querySelector('.modal-delete')
  const status_massage = document.querySelector('.status-query__response');
 
  const book = getLearnMore();
  const {bookId} =  getLearnMore();
  const {authId} = getUser1();
  const arrayBook = new Map();
  const productBook2 = new Map();

  const numberRating  = await dateRating (bookId, click_rating);

  const btnMap = new Map ([
    [true, () => {
      status_massage.innerText = TEXT.existent;
      btn_wish.innerHTML = 'delete';
      spiners.style.display = 'none';
    }],
    [false, () => {
      status_massage.innerText = TEXT.Nonexistent;
      btn_wish.innerHTML = 'ADD TO WISHLIST';
      spiners.style.display = 'none';
    }]
  ]);

  const activeRating = number => {
    if (isNaN(number)) {
      rating_active.style.width = `${0}%` 
    } else {
      rating_active.style.width = `${number * 20}%`;
      number_x.innerHTML = number.toFixed(2);
    }
  }

  const fn_sendValueRating = (fn, element) => {
    number_rating.innerText = element;
    fn(element);
  }

  const openMore = () => {
    if (des.className === 'des-book__book-story') {
      des.classList.add('active');
      more.innerHTML = '...Less';
    } else {
      des.classList.remove('active');
      more.innerHTML = '...MORE';
    }
  }

  const checkStatus = async() => {
    let getDate = [];

    await getUsersWish().then(res =>  getDate = res);

    const findItem =  getDate.find(({bookId}) => bookId === convert.bookId);

    return findItem;
  }

  const fn_send = number => {

    click_rating.onclick  = async() => {
      number_rating.innerText = 0;

      await upDateRating(bookId, number);

      await dateRating(bookId, click_rating).then(res =>  activeRating(res));
    }
  }

 (isNaN(numberRating)) ?
    number_x.innerHTML = 0 :
    number_x.innerHTML = numberRating.toFixed(2);

  rating_active.style.width = `${numberRating * 20}%`;

  [book].forEach(({author}) => productBook2.set('author', author));
 
  const arr = AUTHOR.filter(({author}) => author === productBook2.get('author'));

  arr.forEach(({img}) =>  arrayBook.set('img', img));

  const bookRender = [book].map(item => ({ ...item, photoAuthor: arrayBook.get('img')}));

  const convert = bookRender.reduce((acc, item) => ({...item}), {});

  
    picture.src = convert.photo;
    prise.innerHTML = convert.cost +'$';
    title.innerHTML = convert.product;
    author.innerHTML = convert.author;
    recomendation.innerHTML = convert.recommendations;
    description.innerHTML = convert.description;
    story.innerHTML = convert.story;
  
  

  const statusBtn = res => (res) ? btnMap.get(true)() : btnMap.get(false)();

  model_items.append(
    Modal.modlaWindow(
      model_items,
      convert,
      FUNCTION,
      PATH.basket
    )
  );

  await checkStatus().then(res => statusBtn(res));

  const check_conditions  = async() => {
    const status = await checkStatus();

    spiners.style.display = 'block';

    if (status) {
      await deleteUserWishlist(status.id)
        .then(res => btnMap.get(false)());
    } else {
      await userWishlist(convert, authId)
        .then( res =>  btnMap.get(true)());
    }
  }

  btn_wish.onclick = () => {

   ( authId && getToken()) ? 
    check_conditions() : Confirmation.showWindow();
  }

  const findItem = () => getProduct().find(item =>item.bookId === convert.bookId);
 
  const checkConditionsBasket = () => {
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
      spinner.style.display = 'block'

    if (!checkUndefined) {
      const set = FUNCTION.setValue(convert, getProduct, setBooks);
      btn_basket.innerText ='IN CART';

      basketUser(set, spinner, model_items)
    } else window.location.pathname = PATH.basket;

  }

  btn_basket.onclick = () => {
    const getBtn = document.querySelector('.btn-danger');

    (getUser1().authId && getToken()) ? exist_registration() : No_registration();

    let number = FUNCTION.countItems();
    getBtn.innerText = `check out items(${number})`

    Header.countItems(number);
  }

  const rating_activate = () => {

    wrapper_stars.forEach(item => {
      item.addEventListener('mouseenter', () => {

        rating_active.style.width = `${item.value/0.05}%`;
        number_x.innerHTML = item.value;

        fn_sendValueRating(fn_send, item.value);
      })

      item.addEventListener('mouseleave', () => activeRating(numberRating));
  
      item.onclick = () => fn_sendValueRating(fn_send, item.value);
    })

    fn_send();
  }

  (getToken() && getToken()) ? rating_activate() :
    click_rating.style.display = 'block';

  more.onclick = () => openMore();




  checkConditionsBasket();

  modal_delete.append(ModalDelete.getModalDelete())


  createTodoComments();

 
  header.append(Header.getHeader());

  modal_window.append(Confirmation.confirmation(PATH, TEXT));

  Footer.getFooter( wrapper);

  Spinner.showSpinner();

}

