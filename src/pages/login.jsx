/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect } from 'react';

import { toast } from 'react-toastify';

import Button from 'component/Button';

import { useInputs } from 'hooks/useInputs';

import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import { login as getLogin, loginControl } from 'services/login';

function Login() {
  const router = useRouter();

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const [input, setInput] = useInputs({ username: '', password: '' });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getLogin(input, (result) => {
        if (!result?.login) {
          toast.error('Kullanıcı bilgileri hatalı.');
        } else {
          router.push('/');
        }
      })
    );
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      dispatch(
        loginControl(sessionStorage.getItem('token'), (result) => {
          if (result?.login) {
            router.push('/login');
          } else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
          }
        })
      );
    }
  }, []);
  return (
    <section className="bg-gray-50 white:bg-gray-700">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:h-screen lg:py-0">
        <div className="w-full rounded-lg border border-[#ccc] bg-white shadow lg:mt-0 xl:max-w-xl xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 lg:space-y-8">
            <h1 className="text-gray-900 white:text-white text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Hesabınıza giriş yapın
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 white:text-white block w-full rounded-lg border border-[#ccc] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  placeholder="E Mail"
                  required
                  onChange={setInput}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Şifre"
                  className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 white:text-white block w-full rounded-lg border border-[#ccc] p-2.5 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  required
                  onChange={setInput}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="border-gray-300 bg-gray-50 focus:ring-3 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 h-4 w-4 rounded border border-[#ccc] focus:ring-primary-300 dark:focus:ring-primary-600"
                      required={false}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Beni hatırla.
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Şifremi unuttum.
                </a>
              </div>
              <Button
                className={`disabled:bg-danger-100 w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                loading={loginState.loading}
              >
                Giriş Yap
              </Button>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
                Yeni hesap.{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  oluştur.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
