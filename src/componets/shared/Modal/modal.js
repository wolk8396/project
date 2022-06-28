export class Modal {

  static modlaWindow(element, elements, fn_count, basket) {

    const wrapper_modal = document.createElement('div');
    const container = document.createElement('div');
    const information = document.createElement('div');
    const block_btns =  document.createElement('div');
    const frame = document.createElement('div');
    const about_item = document.createElement('div');
    const title_block = document.createElement('div');
    const footer_model = document.createElement('div');
    const title_item = document.createElement('p');
    const prise_item = document.createElement('p');
    const massage = document.createElement('p');
    const keep_shopping = document.createElement('button');
    const check_out = document.createElement('button');
    const item_photo = document.createElement('img');

    wrapper_modal.className = 'model';
    container.className ='container-model';
    information.className = 'container-model__information';
    frame.className ='frame';
    item_photo.className = 'frame__item_img';
    title_item.className ='title-item';
    prise_item.className = 'prise-item';
    massage.className = 'massage';
    about_item.className ='container-model__information__about';
    footer_model.className = 'container-model__additional';
    block_btns.className = 'container-model__block_btns';
    check_out.className = 'btn-danger';
    keep_shopping.className = 'btn-outline-danger';

    item_photo.src =  elements.photo;
    title_item.innerText = elements.product;
    prise_item.innerText =  `${elements.cost} $`;
    massage.innerText = 'Is now in your cart';
    keep_shopping.innerText = 'keep shopping';

    wrapper_modal.append(container);
    information.append(frame, about_item);
    about_item.append(title_item);
    frame.append(item_photo);
    container.append(information, footer_model, block_btns);
    footer_model.append(prise_item,  massage);
    block_btns.append(keep_shopping, check_out);

    keep_shopping.onclick =() => element.style.display = 'none';

    check_out.onclick =() => window.location.pathname = basket;

    return wrapper_modal;
  }
}
