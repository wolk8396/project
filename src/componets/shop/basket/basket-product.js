import { Header, COUNTMAP } from "../../shared/header/header";
import {count} from "../../shared/services/local-storage-service"
import { numbers, getProduct,  setBooks, getUser1, getToken} from "../../shared/services/local-storage-service";
import { basketUser} from '../../get date/dateusers'


export const displayProduct = () => {

  let productContainer = document.querySelector('.product');
  const displayTotal = document.querySelector('.product-total__final');
  const renderProduct = getProduct();


  const render = () => {
    productContainer.innerHTML = null;

    renderProduct.forEach((item ,i) => {
      const container = document.createElement('div');
      const products_delete = document.createElement('div');
      const frame = document.createElement('div');
      const btn_remove = document.createElement('button');
      const img = document.createElement('img');
      const span_product = document.createElement('div');
      const product_book = document.createElement('p');
      const cost_product = document.createElement('p');
      const products_element = document.createElement('div');
      const containerBtn = document.createElement('div');
      const increaseBtn = document.createElement('button');
      const decreaseBtn = document.createElement('button');
      const sumPrice = document.createElement('p');

      container.className = 'products-element';
      btn_remove.className = 'delete';
      img.className = 'photo';
      product_book.className = 'product-book';
      span_product.className = 'products-element__cost';
      cost_product.className = 'cost-book';
      products_element.className = 'products-element__product';
      products_delete.className = 'products-element__btn';
      frame.className = 'products-element__frame';
      containerBtn.className = 'products-element__btns';
      increaseBtn.className = 'btn-operation';
      decreaseBtn.className = 'btn-operation';
      sumPrice.className = 'number';

      container.append( products_delete, frame , products_element, containerBtn, span_product);
      products_delete.append(btn_remove);
      frame.append(img);
      products_element.append(product_book);
      span_product.append(cost_product);
      productContainer.append(container);
      containerBtn.append(decreaseBtn, sumPrice, increaseBtn);

      sumPrice.innerText = item.count;
      product_book.innerHTML = item.product;
      decreaseBtn.innerText = '-';
      increaseBtn.innerText = '+';
      btn_remove.innerText = 'X'
      img.src = item.photo;

      const removeBook = () => {
        const product =  renderProduct.filter((item, index) => index !== i);

        (getUser1().authId && getToken()) ?  basketUser(product) : null;

          setBooks(product)
          COUNTMAP.get('display').innerText = numbers();

          displayProduct();
        }

        btn_remove.onclick = () => removeBook();

        increaseBtn.onclick = () => {
          let increase = ++item.count;

          sumPrice.innerText = item.count

          const plusCount = renderProduct.map(el => (el.id === item.id) ? ({...el, count:increase}) : el);
          
          setBooks(plusCount);
          total();
          COUNTMAP.get('display').innerText = numbers();
        }

        decreaseBtn.onclick = () => {

          let decrease = --item.count;

          sumPrice.innerText = item.count;

          (item.count === 0) ? removeBook() : item;

          const minusCount = renderProduct.map(el => (el.id === item.id) ? ({...el, count:decrease}) : el);

          (item.count >= 1) ? setBooks(minusCount) : null;
            total();

            COUNTMAP.get('display').innerText = numbers();
        }

        const total = () => {
          let sum = 0;
          sum += item.cost * item.count;
          cost_product.innerHTML = sum +'$';
          displayTotal.innerHTML = 'TOTAL:'+ count();
        }
        total()
    });
  }

  render();
}
