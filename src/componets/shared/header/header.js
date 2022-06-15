import {PATH} from '../../../componets/shared/const'
import {numbers, getUser1, clearUser, clearToken, setUser, getToken, } from '../services/local-storage-service';
export const COUNTMAP =  new Map ();
import { Confirmation } from '../confirmation/confirmation window';

export class Header {
  static getHeader() {
    const contener_title =document.createElement('div');
    const title = document.createElement('div');
    const title_top = document.createElement('p');
    const search = document.createElement('div');
    const contener_exit = document.createElement('div');
    const contener_exit_element = document.createElement('div');
    const element_exit = document.createElement('div');
    const exit = document.createElement('img');
    const text_exit = document.createElement('p');
    const contener_sign = document.createElement('div');
    const sign_in = document.createElement('div');
    const sign_img = document.createElement('img');
    const basket = document.createElement('div');
    const basket_shop = document.createElement('img');
    const display = document.createElement('div');
    const display_count = document.createElement('p');
    const contener_search = document.createElement('div'); 
    const status = document.createElement('p'); 
    const text_signIp = document.createElement('p'); 
    const container_sign_up = document.createElement('div'); 
    const signUp_img = document.createElement('img');
    const signUp_text = document.createElement('spam'); 
    const container_userAccount = document.createElement('div');
    const userAccount = document.createElement('img');
    const btn_account = document.createElement('button');
    const ul_menu = document.createElement('ul');
    const li_1 = document.createElement('li');
    const li_2 = document.createElement('li');
    const li_3 = document.createElement('li');
    const pathname = window.location.pathname;
   
    
    let flag = false;

    contener_title.className = 'header';
    title.className = 'header__title';
    title_top.className = 'header__title__top';
    search.className ='header__search'
    contener_exit.className ='header__search__contener-exit';
    contener_exit_element.className ='header__search__contener-exit__element';
    element_exit.className ='header__search__contener-exit__element__contener-exit';
    exit.className = 'exit';
    text_exit.className = 'text-exit';
    contener_sign.className = 'header__search__contener-sign';
    sign_in.className = 'header__search__contener-sign__sign';
    basket.className = 'header__search__contener-sign__basket';
    basket_shop.className = 'basket-shop';
    display.className ='display';
    display_count.className = 'display__count';
    contener_search.className ='header__search__contener-search';
    status.className = 'status';
    text_signIp.className = 'text-sign_in';
    sign_img.className = 'sign-in';
    container_sign_up.className = 'header__search__contener-sign__sign-up'
    signUp_text.className = 'signup-text';
    signUp_img.className = 'sign-up';
    container_userAccount.className = 'header__search__contener-sign__account'
    userAccount.className = 'btn_account';
    ul_menu.className = 'menu';

    display_count.innerText = numbers();

    COUNTMAP.set('display',  display_count)

    contener_title.append(title, search);
    title.append(title_top);
    search.append(contener_exit, contener_search, contener_sign);
    contener_exit.append(contener_exit_element);
    contener_exit_element.append(element_exit);
    element_exit.append(exit, text_exit);
    contener_sign.append(container_userAccount, container_sign_up, sign_in, basket);
    container_userAccount.append(userAccount, ul_menu);
    ul_menu.append(li_1, li_2, li_3);
    container_sign_up.append(signUp_img, signUp_text);
    sign_in.append(sign_img, text_signIp);
    basket.append(basket_shop, display);
    display.append(display_count);
    contener_search.append(status);

    title_top.innerText = ' A Better Way to Buy Books Online. Every Purchase Supports Local Bookstores!';
    exit.src = '../../../picture/icons8-главная-50.jpg';
    text_exit.innerText = 'GET BACK TO MAIN';
    sign_img.src ='../../../picture/icons8-форма-регистрации-пароль-48.jpg';
    basket_shop.src = '../../../picture/icons8-собранная-корзина-покупок-96.jpg';
    signUp_img.src = '../../../picture/sign-up.jpg';
    userAccount.src ='../../../picture/person-circle.svg';
    signUp_text.innerText = 'SIGN-UP';
    text_signIp.innerText = 'SIGN-IN';
    li_1.innerText = 'My account';
    li_2.innerText ='My Wishlists';
    li_3.innerText = 'Log out';


    const openMenuAccount = () => {
      if (!flag) {
        flag = true
        ul_menu.style.display = 'block'
      } else {
        flag = false;
        ul_menu.style.display = 'none';
      }
    }


    (pathname === PATH.sign_in || pathname === PATH.sign_up) ?
      contener_sign.style.display = 'none' : null


    const check_Registration = () => {
      (getUser1().authId === undefined && !getToken()) ? 
        Confirmation.showWindow() : openMenuAccount();
    }

    userAccount.onclick = () => check_Registration();
   

    signUp_img.onclick = () => window.location.pathname = PATH.sign_up;

    sign_img.onclick = () => window.location.pathname = PATH.sign_in;

    basket_shop.onclick = () => window.location.pathname = PATH.basket;

    li_1.onclick = () => window.location.pathname = PATH.account;

    contener_exit_element.onclick = () => window.location.pathname = PATH.shop;

    li_3.onclick = () => {
      window.location.pathname = PATH.shop;

      setUser([]);
      clearToken();
    }
  
    return contener_title;

  }

  static getDisplay() {
    const display = document.querySelector('.display__count');

    display.innerText = numbers();
    
  }

 static countItems(number) {
    const getCount = document.querySelector('.display__count');
    getCount.innerText = number
  }

}
