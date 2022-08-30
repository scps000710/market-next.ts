import { useState } from 'react';
import SsoButton from './ssoButton';
import Input from './input';
import { useDispatch } from 'react-redux';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { userLogin } from '../../utils/agent';
import toast from 'react-hot-toast';
import { initUser } from '../../store/slice/user';

const style = {
  wrapper: `w-full px-[1.2rem] py-[0.8rem] flex flex-col`,
  headerText: 'text-white mx-auto',
  horizontalLine: `w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5`,
  horizontalText: `text-center font-semibold mx-4 mb-0`,
  formContainer: `w-full text-center justify-center`,
  loginButton: `px-10 py-3 bg-blue-600 text-white leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer`,
};
const Login = (props: { display: string }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const result: any = await userLogin(email, password);
      if (result.status === 200) {
        toast.success(`Welcome back ${result.data.email}`, {
          style: {
            background: '#000000',
            color: '#FFFFFF',
          },
        });
        localStorage.setItem('Token', result.data.token);
        dispatch(initUser(result.data));
      }
    })();
  };

  switch (props.display) {
    case 'popup':
      return (
        <div className={style.wrapper}>
          <header className={style.headerText}>
            <div>請先登入 或 註冊</div>
          </header>
          <div>
            <SsoButton icon={BsFacebook} text={'Facebook 註冊 / 登入'} />
            <SsoButton icon={BsTwitter} text={'Twitter 註冊 / 登入'} />
          </div>
          <div className={style.horizontalLine}>
            <p className={style.horizontalText}>Or</p>
          </div>
          <div>
            <form
              className={style.formContainer}
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <Input
                title="電子郵件"
                type="email"
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target?.value)
                }
              />
              <Input
                title="密碼"
                type="password"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target?.value)
                }
              />
              .
              <input type="submit" className={style.loginButton} value="登入" />
            </form>
          </div>
        </div>
      );
      break;

    default:
      return (
        <div className={style.wrapper}>
          <header className={style.headerText}>
            <div>請先登入 或 註冊</div>
          </header>
          <div>
            <SsoButton icon={BsFacebook} text={'Facebook 註冊 / 登入'} />
            <SsoButton icon={BsTwitter} text={'Twitter 註冊 / 登入'} />
          </div>
          <div className={style.horizontalLine}>
            <p className={style.horizontalText}>Or</p>
          </div>
          <div>
            <form
              className={style.formContainer}
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <Input
                title="電子郵件"
                type="email"
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target?.value)
                }
              />
              <Input
                title="密碼"
                type="password"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target?.value)
                }
              />
              .
              <input type="submit" className={style.loginButton} value="登入" />
            </form>
          </div>
        </div>
      );
      break;
  }
};

export default Login;
