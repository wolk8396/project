export class Loader {

  static getLoader(element) {

    element.insertAdjacentHTML('beforeend',
    `<div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>`
   )
  }
}
