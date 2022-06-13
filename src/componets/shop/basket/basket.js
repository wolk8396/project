// import '../basket/basket.scss'
import '../../shared/const'
import { Header, COUNTMAP} from '../../shared/header/header'
import { displayProduct} from '../basket/basket-product'
import { getToken, getUser1, numbers, setBooks} from '../../shared/services/local-storage-service'
import {getBasketBooks} from '../../get date/dateusers'


// import { reateUserAuthRequest} from '../../aip/aip-handlers'


export const basketPage =  async () => {
    const header = document.querySelector('.header-basket');

    header.append(Header.getHeader());

    if (getUser1().authId && getToken()) {

        await getBasketBooks().then(res => {
            (res === 0 || res === undefined) ? setBooks([]) : setBooks(res);
        })
    }

    
    displayProduct();
}
