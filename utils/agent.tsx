import axios from './Axios';

/******************************************************
                        帳號
*******************************************************/

const userLogin = async (email: string, password: string) => {
  return axios.post(`/Account/login`, {
    email: email,
    password: password,
  });
};

const userSignUp = async (
  username: string,
  password: string,
  email: string
) => {
  return axios.post(`/Account/signUp`, {
    username: username,
    password: password,
    email: email,
  });
};

/******************************************************
                        Token
*******************************************************/
const verifyToken = async (token: string) => {
  return axios.post(`/Token/verify`, {
    token: token,
  });
};

/******************************************************
                        商品
*******************************************************/

const getRecommendItem = async () => {
  return axios.get(`/Item/recommend`);
};

const getItems = async () => {
  return axios.get(`/Item/`);
};

const getItem = async (itemId: string) => {
  return axios.get(`/Item/${itemId}`);
};

const searchItems = async (title: string) => {
  return axios.get(`/Item/search`, { params: { title: title } });
};

const createItem = async (title: string, price: string) => {
  return axios.post(`/Item/create/item`, {
    title: title,
    price: price,
  });
};

const createImage = async (formData: any) => {
  return axios.post(`/Item/create/image`, formData);
};

//帳號
export { userLogin, userSignUp };

//Token
export { verifyToken };

//商品
export {
  getRecommendItem,
  getItem,
  getItems,
  searchItems,
  createItem,
  createImage,
};
