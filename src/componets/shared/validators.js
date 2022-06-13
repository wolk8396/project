import { REGEX } from './regex';

const errorsMessages = new Map([
  ['email', 'Please enter a valid email.'],
  ['first-name', 'Please enter a valid name'],
  ['lastName', 'Please enter a valid last name'],
  ['required', 'This field is required.'],
  ['passwords', 'Both passwords must be the same.']
]);

const massage_advance = {
  uppercase: 'your password must contain at least one uppercase letter',
  lowercase: 'your password must contain at least one letter in lowercase',
  numbers: 'your password must contain at least one number',
  characters: 'your password must contain at least 8 symbols',
  completed: 'Password verification completed successfully'
}

///your password must comtain at least one letter in Uppercase

const showErrorTag = (id, message) => {
  const error_tag = document.getElementById(id);

  error_tag.style.display = 'block';
  error_tag.innerText = message;
}

const hideErrorTag = id => {
  const error_tag = document.getElementById(id);

  error_tag.style.display = 'none';
}

const errorTagsHandlers = new Map([
  ['email_show', id => showErrorTag(id, errorsMessages.get('email'))],
  ['email_hide', id => hideErrorTag(id)],
  ['required_show', id => showErrorTag(id, errorsMessages.get('required'))],
  ['required_hide', id => hideErrorTag(id)],
  ['first-name_show', id => showErrorTag(id, errorsMessages.get('first-name'))],
  ['first-name_hide', id => hideErrorTag(id)],  
  ['lastName_show', id => showErrorTag(id, errorsMessages.get('lastName'))],
  ['lastName_hide', id => hideErrorTag(id)],  
  ['passwords_show', id => showErrorTag(id, errorsMessages.get('passwords'))],
  ['passwords_hide', id => hideErrorTag(id)]
]);

export const errorTagsIds = new Map([
  ['email', 'emailInputError'],
  ['required_email', 'requiredEmailInputError'],
  ['first_name', 'firstNameInputError'],
  ['last_name', 'lastNameInputError'],
  ['birth', 'birthInputError'],
  ['pass_1', 'passInputError1'],
  ['pass_2', 'passInputError2']
]);

export const emailValidator = email => REGEX.email.test(email);

export const showErrorMessage = (error_type, id) => {
  errorTagsHandlers.get(error_type)(id);
}

export const hideErrorMessage = (error_type, id) => {
  errorTagsHandlers.get(error_type)(id);
}


export const lowerCase = (password,element ) => {
  const result = REGEX.lower_case.test(password);

  !result ? element.innerHTML= massage_advance.lowercase : null;
  
  return REGEX.lower_case.test(password);

}


const upperCase = (password, element ) => {
  const result = REGEX.upper_case.test(password);

  !result ? element.innerHTML= massage_advance.uppercase : null;

  return result;
}


const number = (password, element ) => {
  const result = REGEX.numbers.test(password);

  !result ? element.innerHTML= massage_advance.numbers : null;

  return result;
}

const eightCharactersCheck = (password, element)=> {
  const result = REGEX.EIGHT_CHARACTERS.test(password);

  !result ? element.innerHTML= massage_advance.characters : null;

  return result;
}

export const password_verification = (password, element, input, fn_setColor, fn_remove) => {

  const passwordStrengthNum =
    lowerCase(password, element) +
    upperCase(password, element) +
    number(password, element) +
    eightCharactersCheck(password, element);

  
    if (passwordStrengthNum === 4) {
      element.innerText = massage_advance.completed
      fn_setColor(input);
    } else fn_remove(input);
  

    (password === '') ?  element.innerHTML = '' : null;

    const SET_MASSAGE =  new Map([
      [1, item => item.style.color = 'red'],
      [2, item => item.style.color = '#e87c03'],
      [3, item => item.style.color = 'blue'],
      [4, item => item.style.color = 'green'],
      [0, item => item.style.color = '#ced4da']
    ])

    SET_MASSAGE.get(passwordStrengthNum)(element)

  return  passwordStrengthNum === 4
} 

