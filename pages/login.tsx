/* eslint-disable @next/next/no-img-element */
import Header from '../components/index/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slice/user';
import Login from '../components/account/login';

const style = {
  container: `flex flex-col w-full items-center`,
};

const LoginPage = () => {
  const router = useRouter();
  const userStates = useSelector(selectUser);

  useEffect(() => {
    if (!router.isReady) return;
    const reDirect = router.query.reDirect as string;
    if (userStates.isLogin && reDirect) {
      router.push(`${reDirect}`);
    } else if (userStates.isLogin) {
      router.push(`/`);
    }
  }, [router.isReady, userStates]);

  return (
    <div>
      <Header />
      <div className={style.container}>
        <Login display="normal" />
      </div>
    </div>
  );
};

export default LoginPage;
