import moment from 'moment';

export const PATH = {
    home: '/',
    shop: '/shop.html',
    basket: '/basket.html',
    sign_in: '/sign-in.html',
    inf: '/books-information.html',
    sign_up: '/sign-up.html',
    sign_in:'/sign-in.html',
    account: '/account.html',
    search:'/search.html'
}

export const TEXT = {
    existent:'the book was added to your wishList',
    Nonexistent:'the book has not been added to your wishLis yet',
    notifications:'Please log in or register',
    deleteCart:'Are You are sure ? Do you want to remove this item from your shopping cart',
    deleteWish: 'Are You are sure ? Do you want to remove this item from your wishList',
    deleteComment: 'Are You are sure ? Do you want to remove your comment',
    upDateCart:'your cart has been update successfully'
}


export const time = () => moment().format();


