
export class Confirmation {

  static confirmation (pash, text) {
    const main_window = document.createElement('div');
    const wrapper_confirmation = document.createElement('div');
    const block = document.createElement('div');
    const container_text = document.createElement('div');
    const container_btns = document.createElement('div');
    const text_massage = document.createElement('p');
    const link_sign_in = document.createElement('button');
    const link_sign_up = document.createElement('button');
    const cancel = document.createElement('button');

    main_window.className = 'main-window';
    wrapper_confirmation.className = 'main-window__confirmation';
    block.className = 'block-window';
    container_text.className = 'block-window__container-text';
    container_btns.className = 'blocks-btns';
    link_sign_in.className = 'blocks-btns__link_sign_in';
    link_sign_up.className = 'blocks-btns__link_sign_up';
    cancel.className = 'blocks-btns__cancel';
    text_massage.className = 'massage-text';

    cancel.innerText = 'CANCEL';

    link_sign_in.innerText = 'SIGN-IN';
    link_sign_up.innerText = 'SIGN-UP';
    text_massage.innerText = text.notifications;

    main_window.append(wrapper_confirmation);

    wrapper_confirmation.append(block);
    block.append(container_text, container_btns);
    container_text.append(text_massage);
    container_btns.append(link_sign_in, link_sign_up, cancel);

    link_sign_up.onclick = () => window.location.pathname = pash.sign_up;

    link_sign_in.onclick = () => window.location.pathname = pash.sign_in;

    cancel.onclick = () => main_window.style.display = 'none';

    return main_window
  }

  static showWindow () {
    const main_window = document.querySelector('.main-window');

    main_window.style.display = 'block';
  }
}
