import { createUserAuthRequest,  createUserDataRequest, signInRequest, getUser } from '../aip/aip-handlers'
import { PATH,time} from '../shared/const';
import { setToken, setUser } from '../shared/services/local-storage-service';
import { emailValidator, showErrorMessage, hideErrorMessage, errorTagsIds,  password_verification } from '../shared/validators';
import { Spinner } from '../shared/spinner/spinner';
import moment from 'moment';
import { Header } from "../shared/header/header";
import { Footer } from '../shared/footer/footer';

export const sign_up = () => {
  const body = document.getElementsByTagName('body')[0];
  const firstNameInput = document.getElementById('firstNameInput');
  const lastNameInput = document.getElementById('lastNameInput');
  const birthInput = document.getElementById('birthInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput1 = document.getElementById('passwordInput1');
  const passwordInput2 = document.getElementById('passwordInput2');
  const signUpBtn = document.getElementById('signUpBtn');
  const header_signUp = document.querySelector('.sign-up-header');
  const display_massages =document.querySelector('.display-massages');

  const userData = {
    firstName: '',
    lastName: '',
    birth: '',
    email: '',
    password_1: '',
    password_2: ''
  };

  let time = moment().format();

  const removeColor = input => {
    input.style.backgroundColor = '#333';
    input.style.color = '#fff';
  }

  const setColor = input => {
    input.style.backgroundColor = '#e8f0fe';
    input.style.color = '#333';
  }

  firstNameInput.oninput = () => {
    userData.firstName = firstNameInput.value;
    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
  }

	firstNameInput.onblur = () => {
    if (!firstNameInput.value) {
      removeColor(firstNameInput);
      firstNameInput.classList.add('invalid-input');
      showErrorMessage('first-name_show', errorTagsIds.get('first_name'));
    } else {
      setColor(firstNameInput);
      firstNameInput.classList.remove('invalid-input');
      hideErrorMessage('first-name_hide', errorTagsIds.get('first_name'));
    }
	}

  lastNameInput.oninput = () => {
    userData.lastName = lastNameInput.value;
    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('first_name'));
  }

  lastNameInput.onblur = () => {
    if (!lastNameInput.value) {
      lastNameInput.classList.add('invalid-input');
      removeColor(lastNameInput);
      showErrorMessage('lastName_show', errorTagsIds.get('last_name'));
    } else {
      lastNameInput.classList.remove('invalid-input');
      setColor(lastNameInput);
      hideErrorMessage('lastName_hide', errorTagsIds.get('last_name'));
    }
	}

  birthInput.oninput = () => {
    userData.birth = birthInput.value;
    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('birth'));
  }

	birthInput.onblur = () => {
		if (!birthInput.value) {
      birthInput.classList.add('invalid-input');
      removeColor(birthInput);
      showErrorMessage('required_show', errorTagsIds.get('birth'));
		} else {
      birthInput.style.backgroundColor = '#e8f0fe';
      setColor(birthInput);
			hideErrorMessage('required_hide', errorTagsIds.get('birth'));
		}
	}

  emailInput.oninput = () => {
    userData.email = emailInput.value;
    checkFormValid();
		hideErrorMessage('email_hide', errorTagsIds.get('email'));
    hideErrorMessage('required_hide', errorTagsIds.get('required_email'));
  }

	emailInput.onblur = () => {
		if (!emailInput.value) {
      removeColor(emailInput);
      showErrorMessage('email_show', errorTagsIds.get('required_email'));
      hideErrorMessage('email_hide', errorTagsIds.get('email'));
			emailInput.classList.add('invalid-input');
		} else if (!emailValidator(emailInput.value)) {
      emailInput.classList.add('invalid-input');
      removeColor(emailInput);
      hideErrorMessage('email_hide', errorTagsIds.get('required_email'));
      showErrorMessage('email_show', errorTagsIds.get('email'));
		} else {
      setColor(emailInput)
			emailInput.classList.remove('invalid-input');
			hideErrorMessage('email_hide', errorTagsIds.get('email'));
			hideErrorMessage('email_hide', errorTagsIds.get('required_email'));
		}
	}

  passwordInput1.oninput = () => {
    userData.password_1 = passwordInput1.value;
    checkFormValid();
    hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
  }

	passwordInput1.onblur = () => {
		if (!passwordInput1.value) {
			passwordInput1.classList.add('invalid-input');
			showErrorMessage('required_show', errorTagsIds.get('pass_1'));
		} else {
			passwordInput1.classList.remove('invalid-input');
			hideErrorMessage('required_hide', errorTagsIds.get('pass_1'));
		}
	}

  passwordInput2.oninput = () => {
    userData.password_2 = passwordInput2.value;
    checkFormValid();
    hideErrorMessage('passwords_hide', errorTagsIds.get('pass_2'));
  }

	passwordInput2.onblur = () => {
		if (passwordInput2.value !== passwordInput1.value) {
			passwordInput2.classList.add('invalid-input');
      removeColor(passwordInput2)
			showErrorMessage('passwords_show', errorTagsIds.get('pass_2'));
		} else {
			passwordInput2.classList.remove('invalid-input');
      setColor(passwordInput2)
			hideErrorMessage('passwords_hide', errorTagsIds.get('pass_2'));
		}
	}

  signUpBtn.onclick = async () => {
    const { email, password_1: password } = userData;

    let authId = '';
    let userId = '';
    let requestCount = 0;

    Spinner.showSpinner();

    await createUserAuthRequest(userData)
        .then(response => {
          authId = response.user.uid
          requestCount++;
        })
    await createUserDataRequest({...userData, authId, date:time, photo:'none'})
        .then(res => {
          userId = res.name;
          requestCount++;
        });
    await signInRequest({email, password})
        .then(({ user: { accessToken } }) => {
          setToken(accessToken);
          requestCount++;
        })
        .catch(err => console.log('Invalid credentials'));
    await getUser(userId).then(res => {
        setUser(res);
        requestCount++;
        Spinner.hideSpinner();
      });

    if (requestCount === 4) {
      window.location.href =  PATH.shop;
    }
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(userData).every(value => !!value);
    const isPasswordsEqual = userData.password_1 === userData.password_2;
    const check = password_verification(userData.password_1, display_massages, passwordInput1, setColor,  removeColor);

    isFormValid && isPasswordsEqual && check ?
      signUpBtn.removeAttribute('disabled') :
      signUpBtn.setAttribute('disabled', true);
  }

  Footer.getFooter(body);
  header_signUp.append(Header.getHeader());
}
