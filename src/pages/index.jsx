import Layout from 'component/Layout';

import { ProfileCard } from 'component/Profile';

import { logout } from 'services/login';

function Home() {
  return (
    <Layout className="flex min-h-screen flex-wrap content-center items-center justify-center">
      <ProfileCard />
      <section className="flex w-screen items-center justify-center">
        <button onClick={logout} className="w-100">
          {' '}
          Çıkış Yap{' '}
        </button>
      </section>
    </Layout>
  );
}

export default Home;
