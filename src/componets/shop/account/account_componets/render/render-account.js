import {getUser1} from '../../../../shared/services/local-storage-service';
import {uploadPhoto, deletePhoto} from '../../../../aip/aip-handlers';
import {findDateuser} from '../../../../get date/dateusers';

export const renderInformationUser = async () => {
  const fullName = document.querySelector('.fullNeme__user_name');
  const regestration = document.querySelector('.additional__date_regestration');
  const birth = document.querySelector('.additional__birth');
  const input_file = document.querySelector('.input_file');
  const remove = document.querySelector('.photo-user__delete');
  const block_inputFile = document.querySelector('.btn-block__form-group');

  const userDate = await findDateuser();

  const avater = document.querySelector('.photo-user__avatar');
  const {birt, date, firstName, lastName, photo, authId, idLink} = userDate;

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
      
      checkPhoto();
      await deletePhoto(userDate.photo, userDate);

      block_inputFile.style.display = 'block';
      remove.style.display = 'none';
    }
    checkPhoto();
}

