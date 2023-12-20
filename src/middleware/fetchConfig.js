import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const rest_url = `${
  isDev ? process.env.NEXT_PUBLIC_HOST_NAME : process.env.NEXT_PUBLIC_HOST_NAME
}`;

const fetchConfig = (method, url, data, prep, header = {}) => {
  const config = {
    method,
    url: `${rest_url}/${url}${data ? data : ''}`,
    headers: {
      'Content-Type': 'application/json',
      ...header,
    },
    withCredentials: true,
    data: prep && JSON.stringify(prep),
  };
  return axios(config);
};

export default fetchConfig;
