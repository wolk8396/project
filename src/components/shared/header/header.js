import {PATH, TEXT} from '../const';
import {numbers, getUser1, clearToken, setUser, getToken, setBooks} from '../services/local-storage-service';
import { Confirmation } from '../confirmation/confirmation window';
import search_img from '../../../asset/images/search (1).svg';
import main from '../../../asset/images/main.svg';
import cart from '../../../asset/images/basket3-fill.svg';

export class Header {

  static getHeader() {

    const container_title =document.createElement('div');
    const title = document.createElement('div');
    const title_top = document.createElement('p');
    const account_p = document.createElement('p');
    const search = document.createElement('div');
    const wrapper_account = document.createElement('div');
    const link = document.createElement('div');
    const exit = document.createElement('img');
    const text_exit = document.createElement('p');
    const container_sign = document.createElement('div');
    const sign_in = document.createElement('div');
    const sign_img = document.createElement('img');
    const basket = document.createElement('div');
    const basket_shop = document.createElement('img');
    const display = document.createElement('div');
    const display_count = document.createElement('p');
    const text_signIp = document.createElement('p');
    const container_sign_up = document.createElement('div');
    const query = document.createElement('div');
    const search_svg = document.createElement('img');
    const signUp_text = document.createElement('p');
    const container_userAccount = document.createElement('div');
    const ul_menu = document.createElement('ul');
    const li_1 = document.createElement('li');
    const li_2 = document.createElement('li');
    const pathname = window.location.pathname;

    let flag = false;

    container_title.className = 'header';
    title.className = 'header__title';
    title_top.className = 'header__title__top';
    search.className ='header__search';
    link.className ='home-link';
    exit.className = 'home-link__home-page';
    text_exit.className = 'home-link__text';
    container_sign.className = 'navigation';
    sign_in.className = 'navigation__sign-in';
    basket.className = 'navigation__basket';
    basket_shop.className = 'basket-shop';
    account_p.className = 'account';
    display.className ='display';
    display_count.className = 'display__count';
    query.className = 'navigation__search-books';
    text_signIp.className = 'text-sign_in';
    sign_img.className = 'sign-in';
    search_svg.className = 'search_btn';
    container_sign_up.className = 'navigation__sign-up';
    signUp_text.className = 'signup-text';
    container_userAccount.className = 'navigation__account';
    wrapper_account.className = 'block-menu';
    ul_menu.className = 'menu';

    container_title.append(title, search);
    title.append(title_top);
    search.append(link, container_sign);
    link.append(exit, text_exit);
    query.append(search_svg);

    container_sign.append(query, container_userAccount, container_sign_up, sign_in, basket);
    container_userAccount.append(wrapper_account);
    wrapper_account.append(account_p, ul_menu);
    ul_menu.append(li_1, li_2);
    container_sign_up.append(signUp_text);
    sign_in.append(text_signIp);
    basket.append(basket_shop, display);
    display.append(display_count);

    display_count.innerText = numbers();
    title_top.innerText = TEXT.title;
    exit.src = main;
    text_exit.innerText = 'GET BACK TO MAIN';
    sign_img.src = '../../../picture/search.png';
    basket_shop.src = cart;
    search_svg.src = search_img;
    signUp_text.innerText = 'SIGN-UP';
    text_signIp.innerText = 'SIGN-IN';
    li_1.innerText = 'My account';
    li_2.innerText = 'Log out';
    account_p.innerText = 'ACCOUNT';

    const openMenuAccount = () => {
      if (!flag) {
        flag = true
        ul_menu.style.display = 'block';
      } else {
        flag = false;
        ul_menu.style.display = 'none';
      }
    }

    (window.location.pathname === PATH.shop) ? text_exit.innerText = '' : null;

    (pathname === PATH.sign_in || pathname === PATH.sign_up) ?
      container_sign.style.display = 'none' : null;

    const check_Registration = () => {
      (getUser1().authId === undefined && !getToken()) ?
        Confirmation.showWindow() : openMenuAccount();
    }

    account_p.onclick = () => check_Registration();

    signUp_text.onclick = () => window.location.pathname = PATH.sign_up;

    text_signIp.onclick = () => window.location.pathname = PATH.sign_in;

    basket_shop.onclick = () => window.location.pathname = PATH.basket;

    search_svg.onclick = () => window.location.pathname = PATH.search;

    li_1.onclick = () => window.location.pathname = PATH.account;

    link.onclick = () => window.location.pathname = PATH.shop;

    li_2.onclick = () => {
      window.location.pathname = PATH.shop;

      setUser([]);
      clearToken();
      setBooks([])
    }

    return container_title;
  }

  static getDisplay() {
    const display = document.querySelector('.display__count');

    display.innerText = numbers();
  }

 static countItems(number) {
    const getCount = document.querySelector('.display__count');
    getCount.innerText = number;
  }
}
