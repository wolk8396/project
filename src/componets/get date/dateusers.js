import { getTodos, getLike, getWishList} from "../aip/aip-handlers";
import { getUser1, getLearnMore} from '../shared/services/local-storage-service'

import { FUNCTION } from "../shared/services/function"; 
import { PRODUCT } from "../shop/shop-products";
import { PATH } from "../shared/const";

import { 
  getUsers, 
  deleteTodolike, 
  createTodoLike,  
  getRating,  
  createRating, 
  clearRating, 
  getBasket,
  createBasket,
  updatBasket
        } from "../aip/aip-handlers";


export const getDateUsers = async () => {
  const usersDate = await getUsers();
  const result = await getTodos();
  const likesDate =  await getLike();

  let todos = FUNCTION.createDate(result);
  let getDatelikes = FUNCTION.createDate(likesDate);

  const {bookId} = getLearnMore();
  const userMap = new Map();
  const likeUser = new Map();
  const userLikes  =new Map();
  const {authId} = getUser1();

  const users = Object.keys(usersDate).map(user => ({...usersDate[user], idLink:user}));

  const  countId = getDatelikes.map(item => item.idComment);

  const count =  countId.reduce((acc, idComment, i)  => {
    acc[idComment] = (acc[idComment] || 0) + 1;
    return acc
  }, {});

  const findComment = todos.filter(item => item.idBook === bookId);

  users.forEach(({authId, firstName, lastName, photo, idLink}, i) => {
    userMap.set(authId, {firstName, lastName, authId, photo, idLink });
  });

  Object.entries(count).forEach(item => userLikes.set(item[0], item[1]));
  
  const joinArr = findComment.map(item => {

    return {
      ...item,
        firstName:userMap.get(item.idUsers).firstName,
        lastName: userMap.get(item.idUsers).lastName,
        linkid: userMap.get(item.idUsers).idLink,
        photo:userMap.get(item.idUsers).photo,
        likesCount: userLikes.get(item.id),
        existLike:likeUser.get(item.id) === item.id
      }
    });

    return joinArr
}

export const gteUserLikes = async (id, btn, display) => {
  const likesDate = await getLike();
  const {authId} = getUser1();
 
  let getDatelikes = FUNCTION.createDate(likesDate).filter(item => item.idComment === id);

  const linkRemove = FUNCTION.removeLink(getDatelikes, authId);

  const findUser = FUNCTION.findUserDate(getDatelikes, authId);
  let sum = display.textContent;

    const checkStatus = (res) => {
      if (!res) {
        display.innerText = (+sum) - 1;
        btn.className = "btn btn btn-danger";
      } else {
        display.innerText = (+sum) + 1;
        btn.className = 'btn btn-primary';
      }
    }

    (findUser) ? 
      await deleteTodolike (linkRemove).then(res =>  checkStatus(res.name)):
      await createTodoLike (id).then(res =>  checkStatus(res.name));
  }


export  const findDateuser = async () => {
  const usersDate = await getUsers();
  const {authId} = getUser1();

  let getCurrentUser = FUNCTION.createDate(usersDate).find(item => item.authId === authId);

  return getCurrentUser;
}

export const getUsersWish = async () => {
  const books = await getWishList();
  const {authId} = getUser1();

  let productBook = FUNCTION.createDate(books).filter(item => item.idUser === authId);

  return productBook;
}

export  const dateRating= async(id, item) => {
  const getRatingItem = await getRating ();
  const {authId} = getUser1();

  let getRatingBook = FUNCTION.createDate(getRatingItem).filter(({bookId}) => bookId === id);

  const countRating = getRatingBook.reduce((acc, item) =>  acc + (+item.rating),0)/getRatingBook.length;

  (!FUNCTION.findUserDate(getRatingBook, authId)) ?
    item.innerText ='add' : item.innerText = 'clear';

  return countRating;
}

export  const upDateRating= async(id, number) => {
  const getRatingItem = await getRating ();
  const {authId} = getUser1();

  let getRatingBook = FUNCTION.createDate(getRatingItem).filter(({bookId}) => bookId === id);

  const removeRating = FUNCTION.removeLink(getRatingBook, authId);

  (FUNCTION.findUserDate(getRatingBook, authId)) ? 
    await  clearRating(removeRating) :
    await createRating(number, id);
}

export const getAllBookRating = async() => {
  const getRatingItem = await getRating ();
  const getNumber = new Map();

  let play = FUNCTION.createDate(getRatingItem);
  
  const count =  play.reduce((acc, item, i)  => {

    acc[item.bookId] = (acc[item.bookId] || 0) + (+item.rating);
    return acc
  }, {});

  const countRepeat  = play.reduce((acc, item, i)  => {
    acc[item.bookId] = (acc[item.bookId] || 0) + 1;
    return acc
  }, {});
  
  Object.entries(countRepeat).forEach(item => {
    getNumber.set(item[0], item[1]);
  })

  const getDateRating = Object.entries(count).map(item => {
    return {
      bookId: item[0],
      rating:item[1]/getNumber.get(item[0])
    }
  });

  return getDateRating
}


export const basketUser = async(items) => {
  const getBasketUser = await getBasket();

  let productDate = FUNCTION.createDate(getBasketUser);

  const checkStatus = productDate.find(item => item.userid === getUser1().authId);



  if (!checkStatus) {
   await createBasket (items)
    .then(res => {
      // model_items.style.display = 'block'
      // spinner.style.display = 'none'
    })
  } else {
    await updatBasket(items, checkStatus.id)
    .then(res => {
      // model_items.style.display = 'block'
      // spinner.style.display = 'none'
    })
  }
}


export const getBasketBooks = async() => {
  const getBasketUser = await getBasket();

  let productDate = FUNCTION.createDate(getBasketUser);

  const goods = productDate.reduce((acc, item) => {
    if (item.userid === getUser1().authId) {
     return acc = item.goods
    }
   return  acc
  }, []);

  return goods;

}

