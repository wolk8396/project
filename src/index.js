import './style.scss';
import { my } from './componets/shop/shop';
import { PATH } from './componets/shared/const';
import {basketPage} from '../src/componets/shop/basket/basket';
import {information} from '../src/componets/shop/information/books-information';
import {sign_up} from '../src/componets/sign-up/sign-up';
import {signInHandler} from '../src/componets/sign-in/sign-in';
import {My_account} from '../src/componets/shop/account/account';
import {getUser1, getToken} from '../src/componets/shared/services/local-storage-service';
import {searchBooks} from '../src/componets/shop/search-products/search';

const routs = new Map([
	[PATH.home, () =>  window.location.pathname = PATH.shop],
	[PATH.shop, () => my()],
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
