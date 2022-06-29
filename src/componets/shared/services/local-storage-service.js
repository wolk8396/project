export const setToken = token => localStorage.setItem('accessToken', token);

export const getToken = () => localStorage.getItem('accessToken');

export const setUser = user => localStorage.setItem('user', JSON.stringify(user));

export const setLearnMore = element  => localStorage.setItem('learnMore', JSON.stringify(element));

export const setBooks = book  => localStorage.setItem("productsIncCart", JSON.stringify(book));

export const setEmpty = () => localStorage.setItem('user', JSON.stringify([]));

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const getUser1 = () => JSON.parse(localStorage.getItem('user'));

export const clearUser = () => localStorage.removeItem('user');

export const clearToken = () => localStorage.removeItem('accessToken');

export const getLearnMore  = () => JSON.parse(localStorage.getItem('learnMore'));

export const getProduct = () => JSON.parse(localStorage.getItem('productsIncCart'));

export const count = () => {
  const countPrice = localStorage.getItem("productsIncCart");
  const countP = JSON.parse(countPrice);
  const countSum = Object.values(countP).reduce((acc, item) => acc += item.cost * item.count, 0);

  return countSum;
};

export const cartNumbers = () => {
	const countProduct = localStorage.getItem("productsIncCart");
	let count = JSON.parse(countProduct);
	BASKET_COUNT.innerHTML = Object.keys(count).length;
}

export const numbers = element => {
  const countProduct = localStorage.getItem("productsIncCart");
	let count = JSON.parse(countProduct);

	return Object.keys(count).length;
}
