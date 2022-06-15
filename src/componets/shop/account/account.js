import { Header } from "../../shared/header/header";
import { usersWhishes } from "./account_componets/account-wishlist/user-wishlist";
import {getProduct, setBooks, getUser1} from '../../shared/services/local-storage-service';
import { ModalDelete } from "../../shared/Modal_delete/modal-delete";
import {uploadPhoto, deletePhoto} from '../../aip/aip-handlers';
import {findDateuser} from '../../get date/dateusers';

export const My_account = async ()  => {
  const header = document.querySelector('.header-account');
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
        element.style.display = 'none'
        svg_el.src="../../../picture/plus-square-fill.svg";
      }
    }
  }

  fullName.innerText = `${firstName} ${lastName}`;
  regestration.innerText = `date of regestration : ${date}`;
  birth.innerText = `birth:${birt}`;

  const checkPhoto = () => {
    if (photo === 'none') {
      avater.src = '../../../../../picture/avater.png';
      block_inputFile.style.display = 'block';
      remove.style.display = 'none';
    } else {
      avater.src = photo
      block_inputFile.style.display = "none";
      remove.style.display = 'block';
    }
  }

  const getUrl = async (url) => avater.src  = url;

  input_file.oninput = async (event) => {
    const imgName = input_file.value;

    getUrl();
    await uploadPhoto(event, imgName, userDate, getUrl);

    block_inputFile.style.display = "none";
    remove.style.display = 'block';
  }

  remove.onclick = async () => {
    const userDate = await findDateuser();

    await deletePhoto(userDate.photo, userDate);

    checkPhoto();

    block_inputFile.style.display = 'block';
    remove.style.display = 'none';
  }

  checkPhoto();

  header.append(Header.getHeader());

  usersWhishes(openFn);

  modal_window.append( ModalDelete.getModalDelete());
}
