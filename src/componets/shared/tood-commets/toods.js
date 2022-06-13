export class CommentUsers {
  #element;
  #getUser;
  #fn_delete;
  #fn_update;
  #time;
  #fn_likes;
  #colorBtn

  constructor(element, getUser, fn_delete, fn_update, time, fn_likes, colorBtn) {
    this.#element = element,
    this.#getUser = getUser,
    this.#fn_delete = fn_delete,
    this.#fn_update = fn_update,
    this.#time = time,
    this.#fn_likes = fn_likes,
    this.#colorBtn = colorBtn
  }

  getTodo() {
    const block_comment = document.createElement('div');
    const wrapperFullName = document.createElement('div'); 
    const btns_container = document.createElement('div');
    const current_time = document.createElement('p');
    const textarea = document.createElement('textarea'); 
    const wrapper_description = document.createElement('div'); 
    const fullName = document.createElement('p');
    const description = document.createElement('p');
    const container_textarea = document.createElement('div'); 
    const block_btn_likes = document.createElement('div');
    const btn_remove_comment = document.createElement('button');
    const btn_update = document.createElement('button');
    const btn_sendUpdate = document.createElement('button');
    const block_likes = document.createElement('div');
    const btn_likes = document.createElement('button');
    const container_display = document.createElement('div');
    const displayLikes = document.createElement('p');
    const sign_like = document.createElement('img');
    const avater = document.createElement('img');
    const time_comment = document.createElement('p');
    const time_local= document.createElement('p');
  
    wrapperFullName.className = 'comments-todo__fullName';
    wrapper_description.className = 'comments-todo__description';
    btns_container.className = 'block'
    btn_update.className = 'block__btn_update';
    current_time.className = 'block__time-comment';
    btn_remove_comment.className = 'block__remove_comment';
    block_comment.className = 'comments-todo';
    container_textarea.className = 'container-comment';
    time_local.className = 'container-comment__time';
    textarea.className = 'container-comment__input_text';
    fullName.className ='user-name';
    block_btn_likes.className = 'block-btns';
    description.className ='description';
    btn_sendUpdate.className = 'block__send_update';
    block_likes.className = 'block-likes';
    btn_likes.className = "btn btn btn-danger";
    btn_likes.id = this.#element.id
    container_display.className = 'btn btn btn-danger__wrapper-btns';
    sign_like.className = "bi-hand-thumbs-up";
    displayLikes.className = 'btn btn btn-danger__number';
    avater.className ='user-photo';


    time_comment.innerText = this.#element.time;
    fullName.innerText = `${this.#element.firstName} ${this.#element.lastName}`;
    textarea.innerText = this.#element.description;
    sign_like.src = '../../../../../picture/hand-thumbs-up.svg';
    time_comment.innerText =this.#element.time;
    time_local.innerText = this.#time;
    time_local.style.display = 'none';

    btn_remove_comment.innerText = 'DELETE COMMENT';
    btn_update.innerText ='RENEW COMMENT';
    btn_sendUpdate.innerText = 'SEND COMMENT';
    btn_likes.innerText = 'LIKE';


    wrapperFullName.append(avater, fullName, time_comment);
    block_likes.append(btn_likes);
    btn_likes.append(sign_like, container_display);
    container_display.append(displayLikes);
    wrapper_description.append(container_textarea, block_btn_likes);
    container_textarea.append(time_local, textarea);
    block_btn_likes.append( btns_container, block_likes);
    block_comment.append(wrapperFullName, wrapper_description);

    textarea.setAttribute('disabled', true);

    (this.#element.photo === 'none') ?
      avater.src = '../../../../../picture/avater.png' : 
      avater.src = this.#element.photo;


    if (this.#element.idUsers === this.#getUser().authId) {
      btns_container.append(btn_remove_comment, btn_update, btn_sendUpdate)
    }

    (this.#element.likesCount === undefined) ?
      displayLikes.textContent = 0:
      displayLikes.textContent = this.#element.likesCount;

    (this.#colorBtn.get(this.#element.id) === btn_likes.id) ?
      btn_likes.className = 'btn btn-primary' : null ;

    textarea.oninput = () => {
      this.#element.description = textarea.value;
    }

    btn_remove_comment.onclick = () => {
      this.#fn_delete(this.#element.id, block_comment);
    }

    btn_likes.onclick = async() => {
      this.#fn_likes(this.#element.id, btn_likes,  displayLikes);
    }


      btn_sendUpdate.onclick = () => {
       this.#fn_update(textarea.value, this.#element.id);
      
        time_comment.innerText = this.#time;
        textarea.setAttribute('disabled', true);
        btn_update.style.display = 'block';
        btn_sendUpdate.style.display = 'none';
        time_local.style.display = 'none';
      }


      btn_update.onclick = () => {
        textarea.removeAttribute('disabled');
        btn_update.style.display = 'none';
        btn_sendUpdate.style.display = 'block';
        time_local.style.display = 'block';
      }


    return block_comment
  }
}