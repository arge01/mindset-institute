import '../../styles/globals.scss';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { useStore } from 'redux/store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer autoClose={2000} />
    </Provider>
  );
}

export default MyApp;
