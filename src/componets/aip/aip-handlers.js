import {initializeApp} from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'firebase/auth';

import { getStorage, ref, uploadBytes,  getDownloadURL,  getMetadata, deleteObject} from "firebase/storage";

import { getUser1, getLearnMore} from '../shared/services/local-storage-service';
import { FIREBASE_CONFIG, AUTH_URL, DB_URL } from './aip-config';


const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const createUserAuthRequest = ({ email, password_1 }) => {
  return createUserWithEmailAndPassword(auth, email, password_1);
}

export const createUserDataRequest = user => {
  return fetch(
      `${DB_URL}/users.json`,
      {
          method: 'POST',
          body: JSON.stringify(user)
      }
  ).then(res => res.json());
}

export const createTodo = (addDescription, time) => {
  return  fetch(
      `${DB_URL}/todos.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          idBook: getLearnMore().id,
          idUsers:getUser1().authId,
          description:addDescription,
          count:0,
          time:time
          })
        }
      )
      .then(response => response.json())
  }

export const deleteTodo = id => {
  return fetch(
    `${DB_URL}/todos/${id}.json`,
      {
        method: 'DELETE'
      }
    );
}

export const updateTodo = (description, id, time) => {
 return fetch(
    `${DB_URL}/todos/${id}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          idBook: getLearnMore().id,
          idUsers:getUser1().authId,
          description: description,
          time:time
          })
      }
    );
}


export const createTodoLike = id => {
  return  fetch(
    `${DB_URL}/likes.json`,
    {
      method: 'POST',
      body: JSON.stringify({
        idComment:id,
        count:1,
        userid:getUser1().authId,
        })
      }
    )
    .then(response => response.json())
}

export const updateTodoLikes= (idUpdate, id, like) => {
 return fetch(
    `${DB_URL}/likes/${idUpdate}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          idComment:id,
          count:like,
          userid:getUser1().authId,
          // time:moment().format()
          })
      }
    );
}

export const deleteTodolike = idUpdate => {
 return fetch(
    `${DB_URL}/likes/${idUpdate}.json`,
      {
        method: 'DELETE'
      }
    );
}


export const uploadPhoto = async (event, imgName, userDate, getUrl) => {
  const storage = getStorage();
  const storageRef = ref(storage, `/${imgName}`);
  let url =''
 
  await uploadBytes(storageRef, event.target.files[0]).then(res => console.log(res))
  await  getDownloadURL(storageRef).then(res => {
    url = res
  });

  await fetch(
    `${DB_URL}/users/${userDate.id}.json`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...userDate,
        photo:url,
        })
      }
    )
    .then(response => response.json())
    
  getUrl(url)

 console.log(url);
}

export const deletePhoto = async (photo, userDate) => {
  const storage = getStorage();

  const desertRef = ref(storage, photo);

  await deleteObject(desertRef).then(() => {

  }).catch((error) => {
    console.log('Uh-oh, an error occurred!');
  });

  await fetch(
    `${DB_URL}/users/${userDate.idLink}.json`,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...userDate,
        photo:'none',
        })
      }
    )
    .then(response => response.json())

}

export const userWishlist = (product, user) => {
  return  fetch(
    `${DB_URL}/users-wishlist.json`,
    {
      method: 'POST',
      body: JSON.stringify({
          ...product,
          idUser:user,
          bookId:product.bookId
        })
      }
    )
    .then(response => response.json())
}


export const deleteUserWishlist = id => {
  return fetch(
    `${DB_URL}/users-wishlist/${id}.json`,
      {
        method: 'DELETE'
      }
    );
}


export const createRating = (number, id) => {
  return  fetch(
    `${DB_URL}/rating.json`,
    {
      method: 'POST',
      body: JSON.stringify({
        bookId:id,
        rating:number,
        userid:getUser1().authId,
        })
      }
    )
    .then(response => response.json())
}


export const createBasket = (product) => {
  console.log(product);
  return  fetch(
    `${DB_URL}/basket.json`,
    {
      method: 'POST',
      body: JSON.stringify({
        goods:product,
        userid:getUser1().authId,
        })
      }
    )
    .then(response => response.json())
}

export const updatBasket= (product, id) => {
  return fetch(
     `${DB_URL}/basket/${id}.json`,
       {
         method: 'PUT',
         body: JSON.stringify({
          goods:product,
           userid:getUser1().authId,
           // time:moment().format()
           })
       }
     );
 }


export const clearRating = id => {
  return fetch(
    `${DB_URL}/rating/${id}.json`,
      {
        method: 'DELETE'
      }
    );
}

export const getUsers = () => fetch(`${DB_URL}/users.json`).then(response => response.json());

export const getUser = id => fetch(`${DB_URL}/users/${id}.json`).then(response => response.json());

export const getTodos = () => fetch(`${DB_URL}/todos.json`).then(res => res.json());

export const getLike = () => fetch(`${DB_URL}/likes.json`).then(res => res.json()); 

export const getPhoto = () => fetch(`${DB_URL}/photo-users.json`).then(res => res.json()); 

export const getWishList = () => fetch(`${DB_URL}/users-wishlist.json`).then(res => res.json());

export const getRating = () => fetch(`${DB_URL}/rating.json`).then(res => res.json());

export const getBasket = () => fetch(`${DB_URL}/basket/.json`).then(res => res.json());



