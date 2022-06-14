export class ShoppingCart {
  #element;
  #fn_set;
  #fn_increase;
  #fn_remove;
  #teg_p;
  #fn_fullPrice;


  constructor (element, fn_set, fn_increase ,fn_remove, teg_p, fn_fullPrice, ) {
    this.#element = element,
    this.#fn_set = fn_set,
    this.#fn_increase = fn_increase,
    this.#fn_remove = fn_remove,
    this.#teg_p = teg_p,
    this.#fn_fullPrice = fn_fullPrice
  }

  getCart() {
    const tr = document.createElement('tr');
    const td_btnDelete = document.createElement('td');
    const but_btnDelete = document.createElement('img');
    const td_photo = document.createElement('td');
    const img = document.createElement('img');
    const td_title = document.createElement('td');
    const h4 = document.createElement('h4');
    const td_btn_minus = document.createElement('td');
    const btn_minus = document.createElement('button');
    const td_count = document.createElement('td');
    const p_count = document.createElement('p');
    const td_btn_plus = document.createElement('td');
    const btn_plus = document.createElement('button');
    const td_price = document.createElement('td');
    const price = document.createElement('p');

    td_btnDelete.className = 'btn_delete';
    img.className = 'photo-product';
    h4.className = 'title';
    price.className = 'price';

    td_btnDelete.append(but_btnDelete);
    tr.append(td_btnDelete);
    td_photo.append(img);
    tr.append(td_photo);
    td_title.append(h4);
    tr.append(td_title);
    td_btn_minus.append(btn_minus)
    tr.append(td_btn_minus);
    td_count.append(p_count);
    tr.append(td_count);
    td_btn_plus.append(btn_plus)
    tr.append(td_btn_plus);
    td_price.append(price);
    tr.append(td_price);

    but_btnDelete.src = '../../../picture/trash2-fill (1).svg';
    img.src = this.#element.photo;
    h4.innerText = this.#element.product;
    p_count.innerText = this.#element.count
    price.innerText = this.#element.cost


    const total = () => {
      let sum = 0;
      sum += this.#element.count * this.#element.cost;
      price.innerHTML = sum;
      this.#fn_fullPrice(this.#teg_p)
    }

    const removeBook = () => {
      this.#fn_remove(this.#element.id);
      tr.remove();
      this.#fn_fullPrice(this.#teg_p)
    }

    but_btnDelete.onclick = () => removeBook();
  
    btn_minus.onclick = () => {
      let decrease = --this.#element.count
      this.#fn_increase(this.#element.id, decrease, p_count);

      (decrease === 0) ? removeBook() :  decrease;

      total();
     }

    
     btn_plus.onclick = () => {
     let increase = ++this.#element.count

     this.#fn_increase(this.#element.id, increase, p_count);
    
     total();
    }

   
    total()


    return tr;
  }
}