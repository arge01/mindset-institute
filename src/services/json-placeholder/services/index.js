import fetchConfig from '../../../middleware/fetchConfig';

const find = (id) => fetchConfig('get', `todos/${id}`);
const findAll = () => fetchConfig('get', 'todos');
const post = () => {};
const put = () => {};
const patch = () => {};
const del = () => {};

export const services = {
  find,
  findAll,
  post,
  put,
  patch,
  del,
};
