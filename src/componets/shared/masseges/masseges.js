export class Massage  {

  static setMassage(element, text) {
    element.insertAdjacentHTML('beforeend', 
    `<div class = 'wrapper-massage'>
        <div class = 'massage'>
          <p class="text">${text}</p>
        </div>
    </div> `
    )
  }

  static getElement () {
    const element = document.querySelector('.wrapper-massage');
    element.style.display = 'block';

    setTimeout(() => {
      element.style.display = 'none';
    }, 4000);
  }
}