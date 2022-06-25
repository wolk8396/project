export class ListBooks {
  #element;
  #fn_add_wish;
  #link;
  #setLearnMore;
  #rating;
  #getItem;
  #setItem;
  #fn;
  #fn_basket;
  #fn_remove

  constructor (
    element,
    fn_add_wish,
    link,
    setLearnMore,
    rating,
    getItem,
    setItem,
    fn, fn_basket,
    fn_remove,
  ) {
    this.#element = element,
    this.#fn_add_wish = fn_add_wish,
    this.#link = link,
    this.#setLearnMore = setLearnMore,
    this.#rating = rating,
    this.#getItem = getItem,
    this.#setItem = setItem,
    this.#fn = fn,
    this.#fn_basket = fn_basket,
    this.#fn_remove = fn_remove
  }

  getList () {
    const container_product = document.createElement('div');
    const block_photo = document.createElement('div');
    const btn_wrapper = document.createElement('div');
    const block_inf = document.createElement('div');
    const product_book = document.createElement('p');
    const author_book = document.createElement('p');
    const wrapper_input = document.createElement('div');
    const cost_book = document.createElement('p');
    const block_btns = document.createElement('div');
    const block_rating = document.createElement('div');
    const add_btn = document.createElement('button');
    const delete_book = document.createElement('button');
    const photo_book = document.createElement('img');
    const input_number = document.createElement('input');
    const input_label = document.createElement('label');
    const display = document.querySelector('.display__count');
    const massage = document.createElement('p');
    const btn_trash = document.createElement('img');
    const test = document.createElement('samp')
    const spinner_cart = document.createElement('span');
    const spinner_wish = document.createElement('span');

    const btn_massages = {
      in:"IN CART",
      add:"ADD TO CART"
    }
  
    container_product.className = 'container_product__book';
    block_photo.className = 'photo-book';
    photo_book.className = 'photo-book__frame';
    block_inf.className = 'block-imformation';
    product_book.className = 'block-imformation__product';
    block_rating.className ='block-imformation__rating';
    author_book.className = 'block-imformation__author';
    cost_book.className = 'block-imformation__cost';
    block_btns.className = 'block_btns';
    wrapper_input.className = 'block-quantity'
    add_btn.id = this.#element.bookId;
    add_btn.className = 'btn btn-primary';
    btn_trash.className = 'btn-trash'
    delete_book.className = 'btn btn-danger';
    input_number.className = 'items-quantity';
    input_label.className = 'input_label';
    massage.className = 'massage';
    input_number.type = 'number';
    input_number.name = 'quantity';
    btn_wrapper.className = 'btns';
    spinner_cart.className = 'spinner-border';
    spinner_wish.className = 'spinner-border';
    spinner_wish.id = 'spinner-wish'

    photo_book.src = this.#element.photo;
    author_book.innerText = this.#element.author;
    product_book.innerText = this.#element.product;
    cost_book.innerText = this.#element.cost + '$';
    btn_trash.src = '../../../picture/trash2-fill (1).svg';
    add_btn.innerText = 'ADD TO CARD';
    input_label.innerText = 'quantity'
    delete_book.innerText = 'DELETE';
    input_number.value = 1;

    container_product.append(block_photo, block_inf, wrapper_input, block_btns);
    wrapper_input.append(input_number, input_label);
    block_photo.append(photo_book);
    block_inf.append(block_rating, product_book, author_book, cost_book);
    btn_wrapper.append(add_btn, spinner_cart,  delete_book, spinner_wish);
    block_btns.append(btn_wrapper, btn_trash);
    block_rating.append(this.#rating(this.#element.rating));

    const removeItem = () => {
      const getBooks =  this.#getItem();

      const productRemove = getBooks.filter((item) => item.bookId !== this.#element.bookId);

      this.#setItem(productRemove);

      this.#element.basketExist = false;
      display.innerHTML = this.#fn.countItems();

      spinner_cart.style.display = 'block';

      this.#fn_basket(productRemove, spinner_cart, add_btn, btn_massages.add);
    }

    const wishMap = new Map([
      [true, () => {
        massage.innerText = 'was added to ';
        delete_book.innerText = 'DELETE';
      }],
      [false, () => {
        delete_book.innerText = 'add to wish';
        massage.innerText = 'has not been added';
      }]
    ])

    const locationMap = new Map([
      [this.#link.account, () => delete_book.innerText = 'DELETE'],
      [this.#link.search, () =>  wishMap.get(this.#element.exist)()],
    ])

    const checkStatus = () => {
      (window.location.pathname === this.#link.account) ?
      container_product.remove() : null;
    }

    delete_book.onclick = () => {
     this.#fn_add_wish(this.#element, spinner_wish, delete_book, checkStatus);
    }
   
    product_book.onclick = () => {
      window.location.pathname = this.#link.inf;
      this.#setLearnMore(this.#element);
    }

    (this.#element.basketExist === true) ?
      add_btn.innerText = 'IN CART':
      add_btn.innerText = 'ADD TO CART';

    const check_conditions = (get_Fn) => {
      
      if (this.#element.basketExist  === false) {
        this.#element.basketExist = true;
        const productItems = this.#fn.setValue(this.#element, this.#getItem, this.#setItem);

        spinner_cart.style.display = 'block';
        get_Fn(productItems, spinner_cart, add_btn, btn_massages.in);

      } else {
        window.location.pathname = this.#link.basket;
      } 
    }

    add_btn.onclick = () => {
      check_conditions(this.#fn_basket);

      display.innerHTML = this.#fn.countItems();
    }

    btn_trash.onclick = () => {
      spinner_cart.display = 'block'
      this.#fn_remove(removeItem);
    } 

    input_number.oninput = () => {
      const getNumber  = (+input_number.value);

      (getNumber === 1 || getNumber <=0) ?
        input_number.value = 1 : null

      this.#element.count = input_number.value;
    }

    locationMap.get(window.location.pathname)();

    return container_product;
  }
}
