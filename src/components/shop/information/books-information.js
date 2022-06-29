import {getUsersWish, dateRating, upDateRating, basketUser} from '../../get date/date_users';
import {userWishlist, deleteUserWishlist} from '../../aip/aip-handlers';
import {createTodoComments} from './component/create-todos/create-todos';
import { Header} from '../../shared/header/header';
import { PATH, TEXT } from '../../shared/const';
import {getUser1, getLearnMore,  setBooks, getProduct, getToken} from '../../shared/services/local-storage-service';
import { Modal } from '../../shared/Modal/modal';
import { FUNCTION } from '../../shared/services/function';
import { Confirmation } from '../../shared/confirmation/confirmation window';
import { Footer } from '../../shared/footer/footer';
import { ModalDelete } from '../../shared/Modal_delete/modal-delete';
import { Spinner } from '../../shared/spinner/spinner';

export const information = async () =>  {
  const wrapper = document.querySelector('.wrapper-learn_more');
  const header = document.querySelector('.header-1');
  const modal_window = document.querySelector('.modal-window-log');
  const picture = document.querySelector('.picture');
  const title = document.querySelector('.book-title');
  const prise = document.querySelector('.block-btn__cost');
  const author = document.querySelector('.book-author');
  const recommendations = document.querySelector('.recommendations');
  const description = document.querySelector('.description');
  const story = document.querySelector('.book-story__about-book');
  const btn_wish = document.querySelector('.btn-wish');
  const btn_basket = document.querySelector('.block-btn__btn-add');
  const rating_active = document.querySelector('.rating-active');
  const click_rating = document.querySelector('.click-stars');
  const wrapper_chose = document.querySelector('.wrapper-chose');
  const number_rating =document.querySelector('.number-rating');
  const wrapper_stars = document.querySelectorAll('.wrapper-active__item');
  const model_items = document.querySelector('.model-items');
  const spinners = document.querySelector('.spinner-border-sm');
  const spinner = document.getElementById('cart');
  const modal_delete = document.querySelector('.modal-delete');
  const status_massage = document.querySelector('.status-query__response');
  const btn_reviews = document.getElementById('btn-reviews');
  const wrapper_reviews = document.querySelector('.wrapper-reviews');
  const btn_more = document.querySelector('.more');
  const des_book = document.querySelector('.des-book__book-story');
  const book = getLearnMore();
  const {bookId} =  getLearnMore();
  const {authId} = getUser1();
  let number_x = document.querySelector('.rating__value');

  let isReviews = false;
  let isMore = false;

  const numberRating  = await dateRating (bookId, click_rating);

  const btnMap = new Map ([
    [true, () => {
      status_massage.innerText = TEXT.existent;
      btn_wish.innerHTML = 'delete';
      spinners.style.display = 'none';
    }],
    [false, () => {
      status_massage.innerText = TEXT.Nonexistent;
      btn_wish.innerHTML = 'ADD TO WISHLIST';
      spinners.style.display = 'none';
    }]
  ]);

  const activeRating = number => {
    if (isNaN(number)) {
      rating_active.style.width = `${0}%`;
    } else {
      rating_active.style.width = `${number * 20}%`;
      number_x.innerHTML = number.toFixed(2);
    }
  }

  const fn_sendValueRating = (fn, element) => {
    number_rating.innerText = element;

    fn(element);
  }

  const reviewsFlag = () => {
    if (!isReviews) {
      isReviews = true;
      wrapper_reviews.style.display = 'block';
      btn_reviews.innerText = "HIDE REVIEWS";
    } else {
      isReviews = false;
      wrapper_reviews.style.display = 'none';
      btn_reviews.innerText = "SHOW REVIEWS";
    }
  }

  const isMoreBtn = () => {
    if (!isMore) {
      isMore = true;
      des_book.style.display = 'block';
      btn_more.innerText= '...LESS';
    } else {
      isMore = false;
      des_book.style.display = 'none';
      btn_more.innerText= '...MORE';
    }
  }

  const checkStatus = async() => {
    let getDate = [];

    await getUsersWish().then(res =>  getDate = res);

    const findItem =  getDate.find(({bookId}) => bookId === book.bookId);

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

  picture.src = book.photo;
  prise.innerHTML = book.cost +'$';
  title.innerHTML = book.product;
  author.innerHTML = book.author;
  recommendations.innerHTML = book.recommendations;
  description.innerHTML = book.description;
  story.innerHTML = book.story;

 ( book.story === '') ?
    btn_more.style.display = 'none':
    btn_more.style.display = 'block';

  const statusBtn = res => (res) ? btnMap.get(true)() : btnMap.get(false)();

  model_items.append(Modal.modalWindow(model_items, book, PATH.basket));

  await checkStatus().then(res => statusBtn(res));

  const check_conditions  = async() => {
    const status = await checkStatus();

    spinners.style.display = 'block';

    if (status) {
      await deleteUserWishlist(status.id)
        .then(() => btnMap.get(false)());
    } else {
      await userWishlist(book, authId)
        .then(() =>  btnMap.get(true)());
    }
  }

  btn_wish.onclick = () => {

   ( authId && getToken()) ?
    check_conditions() : Confirmation.showWindow();
  }

  const findItem = () => getProduct().find(item =>item.bookId === book.bookId);

  const checkConditionsBasket = () => {
    (!findItem()) ? btn_basket.innerText = 'ADD TO CART' :
      btn_basket.innerText ='IN CART';
  }

  const No_registration = () => {
    const checkUndefined = findItem();

    if (!checkUndefined) {
      model_items.style.display = 'block';
      btn_basket.innerText ='IN CART';

      FUNCTION.setValue(book, getProduct, setBooks);
    } else window.location.pathname = PATH.basket;
  }

  const  exist_registration = async () => {
    const checkUndefined = findItem();
      spinner.style.display = 'block';

    if (!checkUndefined) {
      const set = FUNCTION.setValue(book, getProduct, setBooks);
      btn_basket.innerText ='IN CART';

     await basketUser(set)
      .then(() => {
        spinner.style.display = 'none';
        model_items.style.display = 'block';
      })

    } else window.location.pathname = PATH.basket;
  }

  btn_basket.onclick = () => {
    const getBtn = document.querySelector('.btn-danger');

    (getUser1() && getToken()) ? exist_registration() : No_registration();

    let number = FUNCTION.countItems();
    getBtn.innerText = `check out items(${number})`;

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

  btn_reviews.onclick = () => reviewsFlag();

  btn_more.onclick = () => isMoreBtn();

  (getUser1() && getToken()) ? rating_activate() :
    wrapper_chose.style.display = 'none';

  checkConditionsBasket();

  modal_delete.append(ModalDelete.getModalDelete())

  createTodoComments();

  header.append(Header.getHeader());

  modal_window.append(Confirmation.confirmation(PATH, TEXT));

  Footer.getFooter( wrapper);

  Spinner.showSpinner();
}
