import { getUsers, signInRequest } from '../../componets/aip/aip-handlers';
import { PATH } from '../shared/const';
import { setToken, setUser } from '../../componets/shared/services/local-storage-service';
import { 
    emailValidator, 
    showErrorMessage, 
    hideErrorMessage,
    errorTagsIds 
} from '../shared/validators';
import { Footer } from '../shared/footer/footer';
import { Header } from '../shared/header/header';

export const signInHandler = () => {
  const body = document.getElementsByTagName('body')[0];
  const signInBtn = document.getElementById('signInBtn');
  const passwordInput = document.getElementById('passwordInput');
  const emailInput = document.getElementById('emailInput');
  const header_signIn = document.querySelector('.header-sign-in');
  let massage_error =document.querySelector('.massage-error');


  const userData = {
      email: '',
      password: ''
  }

  passwordInput.oninput = () => {
      userData.password = passwordInput.value;
      checkFormValid();
      hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
  }

  passwordInput.onblur = () => {
    if (!passwordInput.value) {
        passwordInput.classList.add('invalid-input');
        showErrorMessage('required_show', errorTagsIds.get('pass_1'));
    } else {
        passwordInput.classList.remove('invalid-input');
        hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
    }
}

  emailInput.oninput = () => {
      userData.email = emailInput.value;
      hideErrorMessage('email_hide', errorTagsIds.get('email'));
      hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
      checkFormValid();
  }


  emailInput.onblur = () => {
    if (!emailInput.value) {
			emailInput.classList.add('invalid-input');
			showErrorMessage('required_show', errorTagsIds.get('required_email'));
			hideErrorMessage('email_hide', errorTagsIds.get('email'));
    } else if (!emailValidator(emailInput.value)) {
			emailInput.classList.add('invalid-input');
			hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
			showErrorMessage('email_show', errorTagsIds.get('email'));
    } else {
			emailInput.classList.remove('invalid-input');
			hideErrorMessage('email_hide', errorTagsIds.get('email'));
			hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
    }
}

  signInBtn.onclick = async () => {
      let userId = '';
      const { email, password } = userData;
			let requestCounter = 0;

      await signInRequest({email, password})
				.then(({ user: { accessToken, uid} }) => {
						setToken(accessToken);
						userId = uid; 
						requestCounter++; 
				})
				.catch(err => {
          massage_error.innerText = 'email or password is incorrect'
        });
  
      await getUsers()
				.then(response => {
					const users =
						Object.keys(response)
								.map(userId => ({ ...response[userId], userId }));
					const user = users.find(user => user.authId === userId);
          requestCounter++; 
          (user) ? setUser(user) : null;
				
         
				});

				if (requestCounter === 2) {
					window.location.href = PATH.shop; 
				}
  }


  const checkFormValid = () => {
      const isFormValid = Object.values(userData).every(value => !!value);
      massage_error.innerText = '';

      isFormValid ?
				signInBtn.removeAttribute('disabled') :
				signInBtn.setAttribute('disabled', true);
  }

  Footer.getFooter(body);
  header_signIn.append(Header.getHeader());
}