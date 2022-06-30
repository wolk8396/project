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
    upDateCart:'your cart has been update successfully',
    type:'your file is incorrect. Pleas use files .png, .jpeg, .jpg, jpeg',
    title:'A Better Way to Buy Books Online. Every Purchase Supports Local Bookstores!',
}

export const time = () => moment().format();

export const URL_photo = 'https://firebasestorage.googleapis.com/v0/b/bookstore-67dde.appspot.com/o/author%2Fmarrio.png?alt=media&token=8fa2c9a2-3416-49af-8ce6-672ee9859ab2';

export const FILE_TYPE = ['image/png','image/jpg','image/peg','image/jpeg'];
