export class Spinner {

  static showSpinner() {
    const body = document.querySelector('.wrapper-learn_more');

    body.insertAdjacentHTML(
        'afterbegin',
        `<div id="spinner" class="spinner">
            <div  class="spinner-block">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
        </div>`
    );
  }

  static hideSpinner() {
    const spinner = document.getElementById('spinner');

    spinner ? spinner.remove() : null;
  }
}
