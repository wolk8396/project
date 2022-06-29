import './style.scss';
import { main_page } from './components/shop/main_page/shop';
import { PATH } from './components/shared/const';
import {basketPage} from '../src/components/shop/basket/basket';
import {information} from '../src/components/shop/information/books-information';
import {sign_up} from '../src/components/sign-up/sign-up';
import {signInHandler} from '../src/components/sign-in/sign-in';
import {My_account} from '../src/components/shop/account/account';
import {getUser1, getToken} from '../src/components/shared/services/local-storage-service';
import {searchBooks} from '../src/components/shop/search-products/search';

const routs = new Map([
	[PATH.home, () =>  window.location.pathname = PATH.shop],
	[PATH.shop, () => main_page()],
	[PATH.basket, () =>  basketPage()],
	[PATH.inf, () => information()],
	[PATH.sign_in, () => signInHandler()],
	[PATH.sign_up, () => sign_up()],
	[PATH.search, () => searchBooks()],
	[PATH.account, () => {
		(!getToken() && !getUser1().authId) ?
				window.location.pathname = PATH.shop : My_account()
	}]
])

window.onload = () => {
	const pathname = window.location.pathname;

	routs.get(pathname)();
}
