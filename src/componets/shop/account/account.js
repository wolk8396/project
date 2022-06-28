import { Header } from "../../shared/header/header";
import { usersWhishes } from "./account_componets/account-wishlist/user-wishlist";
import {getProduct, setBooks, getUser1, setUser} from '../../shared/services/local-storage-service';
import { ModalDelete } from "../../shared/Modal_delete/modal-delete";
import {uploadPhoto, deletePhoto, updateNmeUser} from '../../aip/aip-handlers';
import {findDateuser} from '../../get date/dateusers';
import {Footer } from "../../shared/footer/footer";
import * as moment from 'moment';

export const My_account = async ()  => {
  const header = document.querySelector('.header-account');
  const wrapper = document.querySelector('.wrapper');
  const open_block = document.querySelector('.open-list');
  const svg_el = document.querySelector('.open-list');
  const modal_window = document.querySelector('.modal-window');
  const fullName = document.querySelector('.fullNeme__user_name');
  const regestration = document.querySelector('.additional__date_regestration');
  const birth = document.querySelector('.additional__birth');
  const input_file = document.querySelector('.input_file');
  const remove = document.querySelector('.photo-user__delete');
  const block_inputFile = document.querySelector('.btn-block__form-group');
  const avater = document.querySelector('.photo-user__avatar');
  const block_inputs = document.querySelector('.Change-profile');
  const btn_change = document.querySelector('.change-date');
  const btn = document.getElementById('btn');
  const btn_cancel = document.getElementById('btn-cancel')
  const block_input = document.querySelectorAll('.profile-fullName');

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

  const userDate = await findDateuser();

  const {birt, date, firstName, lastName, photo, authId, idLink} = userDate;

  (getProduct() === null) ? setBooks([]) : null;

  const openFn = element => {
    let flag = false;

    element.style.display = 'none';
    svg_el.src="../../../picture/plus-square-fill.svg";

    open_block.onclick = () =>  {
      if (flag === false ) {
        flag = true;
        element.style.display = 'block';
        svg_el.src="../../../picture/dash-square-fill.svg";
      } else {
        flag = false;
        element.style.display = 'none';
        svg_el.src="../../../picture/plus-square-fill.svg";
      }
    }
  }

  fullName.innerText = `${firstName} ${lastName}`;
  regestration.innerText = `date of regestration : ${date}`;
  birth.innerText = `birth: ${moment(birt).format('YYYY-MM-DD')}`;

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

    await updateNmeUser(changeValue).then(res => setUser(changeValue));
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
      avater.src = '../../../../../picture/avater.png';
      block_inputFile.style.display ='block';
      remove.style.display = 'none';
    } else {
      avater.src = photo;
      block_inputFile.style.display = "none";
      remove.style.display = 'block';
    }
  }

  const getUrl = async url => avater.src  = url;

  input_file.oninput = async (event) => {
    const imgName = input_file.value;

    getUrl();
    await uploadPhoto(event, imgName, userDate, getUrl);

    block_inputFile.style.display = "none";
    remove.style.display = 'block';
  }

  remove.onclick = async () => {
    const userDate = await findDateuser();
    console.log(userDate);

    await deletePhoto(userDate.photo, userDate);

    checkPhoto();

    block_inputFile.style.display = 'block';
    remove.style.display = 'none';
  }

  checkPhoto();

  header.append(Header.getHeader());

  usersWhishes(openFn);

  Footer.getFooter(wrapper);

  modal_window.append( ModalDelete.getModalDelete());
}
