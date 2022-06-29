import { createTodo, deleteTodo, updateTodo, getLike} from "../../../../aip/aip-handlers";
import {findDateUser} from '../../../../get date/date_users';
import {getDateUsers, gteUserLikes} from '../../../../get date/date_users';
import { getUser1, getToken} from "../../../../shared/services/local-storage-service";
import { time } from "../../../../shared/const";
import { Spinner } from "../../../../shared/spinner/spinner";
import { Confirmation } from "../../../../shared/confirmation/confirmation window";
import { CommentUsers } from "../../../../shared/tood-commets/toods";
import { ModalDelete } from "../../../../shared/Modal_delete/modal-delete";
import { TEXT } from "../../../../shared/const";
import { FUNCTION } from "../../../../shared/services/function";
import * as moment from 'moment';

export const createTodoComments = async() => {
  const block_comments = document.querySelector('.get-comments');
  const inputText = document.querySelector('.form-control');
  const commentsBtn = document.querySelector('.btn');
  const photoUser = document.querySelector('.photo');
  const user_name =document.querySelector('.fullName');
  const time_comment = document.querySelector('.time');
  const colorBtn = new Map();
  const user = await findDateUser();
  const getDateLikes = await getLike();

  let current_time = time();

  if (user === undefined) {
    photoUser.src = '../../../../../picture/avater.png';
    user_name.innerText = '-------';
  } else  {
    photoUser.src = user.photo;
    user_name.innerText = `${user.firstName} ${user.lastName}`;

    (user.photo === 'none') ?
      photoUser.src = '../../../../../picture/avater.png' :
      photoUser.src = user.photo;
  }

  time_comment.innerText = current_time;

  const addDescription = {
    description: '',
  };

  inputText.oninput = () => {
    addDescription.description = inputText.value;
  }

  const findCommentUser =  FUNCTION.createDate(getDateLikes)
    .filter(item => item.userid ===getUser1().authId)
    .map(item => item.idComment);

  findCommentUser.forEach(id => colorBtn.set(id, id));

  const deleteComment = (id, element) => {

    const confirmOperation = async () => {
      await deleteTodo(id).then(() => {
        element.remove();
      })
    }

    ModalDelete.setDate(confirmOperation, TEXT.deleteComment);
  }

  const upDateComment = async(massage_text, id) => {
    await updateTodo(massage_text, id, current_time);
  }

  const getLikes = async (id, btn, display) => {

    (getUser1().authId && getToken()) ?
      await gteUserLikes (id, btn, display):
      Confirmation.showWindow();
  }

  const renderTodo = async () => {
    const todo_container = document.createElement('div');
    let usersComments = [];

    block_comments.append(todo_container);
    todo_container.className = 'todo';

    await getDateUsers().then(res => usersComments = res);

    usersComments.forEach(item => {
      todo_container.append(
        new CommentUsers(
          item,
          getUser1,
          deleteComment,
          upDateComment,
          current_time,
          getLikes,
          colorBtn
        ).getTodo())
    });

    Spinner.hideSpinner();
  }

  commentsBtn.onclick = async () => {
    const block = document.querySelector('.todo')
    const {description} = addDescription;
    inputText.value = '';

    if (getToken() && getUser1()) {
      Spinner.showSpinner();

      (block === undefined) ? null :block.remove();

      await createTodo(addDescription.description, current_time)
        .then(() => { Spinner.hideSpinner()});

        renderTodo()
    } else Confirmation.showWindow();
  }

  renderTodo();
}
