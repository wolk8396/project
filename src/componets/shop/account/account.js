import { Header } from "../../shared/header/header";
import { usersWhishes } from "./account_componets/account-wishlist/user-wishlist";
import {renderInformationUser} from "../../shop/account/account_componets/render/render-account";
import {getProduct, setBooks} from '../../shared/services/local-storage-service';
import {Confirmation} from "../../shared/confirmation/confirmation window";
import { ModalDelete } from "../../shared/Modal_delete/modal-delete";


export const My_account = async ()  => {
  const header = document.querySelector('.header-account');
  const open_block = document.querySelector('.open-list');
  const svg_el = document.querySelector('.open-list');
  const modal_window = document.querySelector('.modal-window');

  (getProduct() === null) ? setBooks([]) : null

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


  header.append(Header.getHeader());


  usersWhishes(openFn);



  renderInformationUser();

  modal_window.append( ModalDelete.getModalDelete());
}