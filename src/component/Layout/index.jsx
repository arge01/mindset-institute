/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import Footer from './Footer';

import Head from './Head';

import Header from './Header';

import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

import { loginControl } from 'services/login';

function Layout({ children, title, className }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      if (!loginState.login) {
        dispatch(
          loginControl(
            sessionStorage.getItem('token'),
            (result) => {
              if (!result?.login) {
                router.push('/login');
              }
            },
            () => {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('user');
              router.push('/login');
            }
          )
        );
      }
    } else {
      router.push('/login');
    }
  }, []);
  return (
    <>
      <Head title={title} />
      <Header />
      <main
        className={`${
          typeof className !== 'undefined' ? 'main ' + className : 'main'
        }`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
