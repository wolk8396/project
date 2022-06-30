import { Header } from "../../shared/header/header";
import { usersWhishes } from "./account_components/account-wishlist/user-wishlist";
import {getProduct, setBooks, setUser} from '../../shared/services/local-storage-service';
import { ModalDelete } from "../../shared/Modal_delete/modal-delete";
import {uploadPhoto, deletePhoto, updateNmeUser} from '../../aip/aip-handlers';
import {findDateUser} from '../../get date/date_users';
import {Footer } from "../../shared/footer/footer";
import {URL_photo, FILE_TYPE, TEXT} from "../../shared/const";
import { Massage } from "../../shared/messages/messages";
import * as moment from 'moment';
import plus from '../../../asset/images/plus-square-fill.svg';
import minus from '../../../asset/images/dash-square-fill.svg';
import pen from '../../../asset/images/pen-fill.svg';
import x_circle from '../../../asset/images/x-circle.svg'

export const My_account = async ()  => {
  const header = document.querySelector('.header-account');
  const wrapper = document.querySelector('.wrapper');
  const open_block = document.querySelector('.open-list');
  const svg_el = document.querySelector('.open-list');
  const modal_window = document.querySelector('.modal-window');
  const fullName = document.querySelector('.fullName__user_name');
  const registration = document.querySelector('.additional__date_registration');
  const birthday = document.querySelector('.additional__birth');
  const input_file = document.querySelector('.input_file');
  const remove = document.querySelector('.photo-user__delete');
  const block_inputFile = document.querySelector('.btn-block__form-group');
  const avatar = document.querySelector('.photo-user__avatar');
  const block_inputs = document.querySelector('.Change-profile');
  const btn_change = document.querySelector('.change-date');
  const btn = document.getElementById('btn');
  const btn_cancel = document.getElementById('btn-cancel');
  const block_input = document.querySelectorAll('.profile-fullName');
  const massage = document.querySelector('.additional');
  const change_date = document.querySelector('.change-date');

  change_date.src = pen;
  remove.src = x_circle;

  const name_Map = new Map ([
    ['first-name', value =>  fullNameUser.firstName = value],
    ['last-name', value => fullNameUser.lastName = value ]
  ]);

  const flag_Map = new Map([
    [false, ()  => {
      isFlag_input = true;
      block_inputs.style.display = 'block';
      run_inputs();
    }],
    [true, () => {
      isFlag_input = false;
      block_inputs.style.display = 'none';
    }]
  ]);

  const fullNameUser = {
    firstName:'',
    lastName :''
  }

  let isFlag_input = false;

  const userDate = await findDateUser();

  const {birth, date, firstName, lastName, photo, authId, idLink} = userDate;

  (getProduct() === null) ? setBooks([]) : null;

  const openFn = element => {
    let flag = false;

    element.style.display = 'none';
    svg_el.src = plus;

    open_block.onclick = () =>  {
      if (flag === false ) {
        flag = true;
        element.style.display = 'block';
        svg_el.src = minus;
      } else {
        flag = false;
        element.style.display = 'none';
        svg_el.src = plus;
      }
    }
  }

  fullName.innerText = `${firstName} ${lastName}`;
  registration.innerText = `date of registration : ${date}`;
  birthday.innerText = `birth: ${moment(birth).format('YYYY-MM-DD')}`;

  const check_fullName = () => {
    if (fullNameUser.firstName === '') {
      fullNameUser.firstName = firstName;
    } else if (fullNameUser.lastName === '') {
      fullNameUser.lastName = lastName;
    }
  }

  btn.onclick =  async () => {
    const {firstName, lastName} = fullNameUser;

    fullName.innerText = `${firstName} ${lastName}`;

    const changeValue =
      {
        ...userDate ,
        firstName:firstName,
        lastName:lastName
      }

    await updateNmeUser(changeValue)
      .then(() => {
        block_inputs.style.display = 'none';
        setUser(changeValue);
      })
  }

  const run_inputs = () => {

    block_input.forEach(input => {
      block_input[0].value = firstName;
      block_input[1].value = lastName;

      input.oninput = () => {
        name_Map.get(input.id)(input.value);
        check_fullName();
      }
    })
  }

  btn_cancel.onclick = () => block_inputs.style.display = 'none';

  btn_change.onclick = () => flag_Map.get(isFlag_input)();

  const checkPhoto = () => {
    if (photo === 'none') {
      avatar.src = URL_photo;
      block_inputFile.style.display ='block';
      remove.style.display = 'none';
    } else {
      avatar.src = photo;
      block_inputFile.style.display = "none";
      remove.style.display = 'block';
    }
  }

  const getUrl = async url => avatar.src  = url;

  const checkTypePhoto =  async (event, imgName) => {
    const files = event.target.files[0];
    const {type} = files;

    if (FILE_TYPE.includes(type)) {

      await uploadPhoto(files, imgName, userDate, getUrl).then(() => {
        block_inputFile.style.display = "none";
        remove.style.display = 'block';
      });

    } else Massage.getElement();

  }

  input_file.oninput = async event => {
    const imgName = input_file.value;

    checkTypePhoto(event, imgName);
  }

  remove.onclick = async () => {
    const userDate = await findDateUser();

    await deletePhoto(userDate.photo, userDate)
      .then(() => {
        avatar.src = URL_photo
        block_inputFile.style.display = 'block';
        remove.style.display = 'none';
      });
  }

  checkPhoto();

  header.append(Header.getHeader());

  usersWhishes(openFn);

  Massage.setMassage(massage, TEXT.type);

  Footer.getFooter(wrapper);

  modal_window.append( ModalDelete.getModalDelete());
}
