export class Footer {

  static getFooter (element) {

    element.insertAdjacentHTML('beforeend',
      `
      <div class = 'footer'> 
        <div class='top'>
          <a  class ='top__link 'href="#">Questions? Contact us.</a>
        </div>
        <div class="links">
          <a class ='link-footer'  href="#">FAQ</a>
          <a class ='link-footer' href="#">Help Center</a>
          <a class ='link-footer' href="#">Terms of Use</a>
          <a class ='link-footer' href="#">Privacy</a>
          <a class ='link-footer' href="#">Cookie Preference</a>
          <a class ='link-footer' href="#">Corporate Information</a>
        </div> 
      </div>`
     )
  }
}
