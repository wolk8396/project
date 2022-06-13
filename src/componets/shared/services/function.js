export class FUNCTION {

  static createDate(getArray) {
    let storageArray = [];

    (getArray === null) ? [] :
      storageArray = Object.keys(getArray).map(element => ({...getArray[element], id: element }));

   return  storageArray;
  }

  static findUserDate (array, authId) {
    return array.map(item => item.userid).find(item => item === authId);
  }

  static removeLink(array, authId) {
    return array.map(item => authId === item.userid ?  item.id : null).join('');
  }

  static setValue (element, fn_get, fn_set) {
    let listProduct = fn_get()
	
		const addProdcut  = [...listProduct, element];

		fn_set(addProdcut);

   return addProdcut
  }

  static countItems(){
    const countProduct = localStorage.getItem("productsIncCart");
	  let count = JSON.parse(countProduct);
  
	return Object.keys(count).length;
  }

  static pagination (number, array) {
    const pagesCreate = array.reduce((acc, item, i, product) => {
      return !(i % number) ? acc.concat([product.slice(i, i + number)]) : acc
    }, []);
    
    return  pagesCreate
  }

  static checkUserExist () {
    let flag = false;
    (!getToken() &&  !getUser1().authId) ? flag = true : flag = false;

    return flag
  }
  

}