export class ModalDelete {

static getModalDelete () {
    const main_window = document.createElement('div')
    const wrapper_window = document.createElement('div');
    const container = document.createElement('div');
    const block_massage = document.createElement('div');
    const block_btns = document.createElement('div');
    const text = document.createElement('p');
    const btn_accept = document.createElement('button');
    const btn_cancel = document.createElement('button');

    main_window.className = 'wrapper-delete';
    wrapper_window.className = 'modal-delete';
    container.className = 'container';
    block_massage.className = 'container__massage';
    block_btns.className = 'container__btns';
    text.className = 'test-massage';
    btn_accept.className = 'btn-accept';
    btn_cancel.className = 'btn-cancel';

    btn_accept.innerText = 'OK';
    btn_cancel.innerText ='CANCEL';

    main_window.append( wrapper_window);
    wrapper_window.append(container);
    container.append(block_massage, block_btns);
    block_massage.append(text);
    block_btns.append(btn_accept, btn_cancel);

    return main_window;
  }

  static setDate(removeItem, text) {
    const btn_cancel = document.querySelector('.btn-cancel');
    const btn_accept = document.querySelector('.btn-accept');
    const main_window = document.querySelector('.wrapper-delete');
    const test_massage = document.querySelector('.test-massage');

    main_window.style.display = 'block';

    test_massage.innerText = text;

    btn_cancel.onclick = () => {
      main_window.style.display = 'none';
    }

    btn_accept.onclick = () => {
      main_window.style.display = 'none';
      removeItem();
    }
  }
}
