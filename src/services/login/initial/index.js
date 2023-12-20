export const user = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  token: undefined,
};

export const model = {
  isSuccess: false,
  ipV4: undefined,
  socketIp: undefined,
  network: {},
  getIp: undefined,
  user,
};

export const initialState = {
  loading: false,
  user: model.user,
  token: model.user.token,
  login: false,
  isSuccess: false,
  error: undefined,
};
