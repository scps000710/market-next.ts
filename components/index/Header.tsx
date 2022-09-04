import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import Login from '../../components/account/login';
import SearchItem from '../item/searchItem';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logOut, initUser } from '../../store/slice/user';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineAccountCircle, MdBusiness } from 'react-icons/md';
import { verifyToken, searchItems } from '../../utils/agent';
import { itemObject } from '../item';

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: `text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center border-solid border-2 border-[#4c505c] rounded-[0.8rem] hover:border-[#8a939b]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerSearchList: `absolute w-[45%] z-10 left-[25%] xl:left-[15%] xl:w-[67%] top-[60px]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  dropMenuItem: `absolute h-[40px] w-[80px] bg-cyan-500 right-0 z-10 top-[70px] text-white flex justify-center items-center rounded-bl-lg`,
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '25%',
    left: '35%',
    right: '35%',
    transform: 'translate(-0%, -20%)',
  },
};

const Header = () => {
  const userStates = useSelector(selectUser);
  const dispatch = useDispatch();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [searchItemsList, setSearchItemsList] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [totalY, setTotalY] = useState(0);

  const menuButton = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!typingText) return setSearchItemsList([]);
      (async () => {
        const result: any = await searchItems(typingText);
        if (result.status === 200) {
          setSearchItemsList(result.data);
        }
      })();
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [typingText]);

  const logOutOrIn = () => {
    if (userStates.isLogin) {
      dispatch(logOut());
      toast.success(`登出成功`, {
        style: {
          background: '#000000',
          color: '#FFFFFF',
        },
      });
    } else {
      setMenuIsOpen(false);
      setLoginPopup(true);
    }
  };

  // check scroll to show login
  useEffect(() => {
    const scrollEvent = () => {
      setTotalY(totalY + Math.abs(scrollY - window.scrollY));
      setScrollY(window.scrollY);
      if (totalY >= 2000 && !userStates.isLogin) {
        setLoginPopup(true);
      } else {
        setLoginPopup(false);
      }
    };

    window.addEventListener('scroll', () => scrollEvent());

    return () => {
      window.removeEventListener('scroll', () => scrollEvent());
    };
  }, [scrollY, userStates]);

  // check login
  useEffect(() => {
    if (userStates.token) {
      setLoginPopup(false);
    } else {
      const token = localStorage.getItem('Token');
      if (token) {
        (async () => {
          const result: any = await verifyToken(token);
          if (result.status == 200) {
            toast.success(`Welcome back ${result.data.email}`, {
              style: {
                background: '#000000',
                color: '#FFFFFF',
              },
            });
            localStorage.setItem('Token', result.data.token);
            setLoginPopup(false);
            dispatch(initUser(result.data));
          }
        })();
      } else {
      }
    }
  }, [userStates]);

  useEffect(() => {
    const scrollEvent = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (e.pageX / width < 0.9 || e.pageY / height > 0.2) {
        setMenuIsOpen(false);
      }
      if (e.pageX / width < 0.15 || e.pageX / width > 0.85) {
        setSearchItemsList([]);
      }
    };
    window.addEventListener('mousemove', (e) => scrollEvent(e));
    return () => {
      window.removeEventListener('mousemove', (e) => scrollEvent(e));
    };
  }, [userStates]);

  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <div className={style.headerIcon}>
            <MdBusiness />
          </div>
          <div className={style.logoText}>A Test Market</div>
        </div>
      </Link>

      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          onChange={(e) => {
            setTypingText(e.target.value);
          }}
          placeholder="Search"
        />
      </div>
      <div className={style.headerSearchList}>
        {searchItemsList.map((item: itemObject, index) => {
          return <SearchItem key={index} {...item} />;
        })}
      </div>
      <div className={style.headerItems}>
        <Link href="/item/itemlist">
          <div className={style.headerItem}>查看所有商品</div>
        </Link>
        {userStates.isLogin ? (
          <Link href={'/item/create'}>
            <div className={style.headerItem}>販售商品</div>
          </Link>
        ) : null}
        <div className={style.headerIcon} onClick={menuButton}>
          <MdOutlineAccountCircle />
        </div>
      </div>
      {menuIsOpen ? (
        <div className={style.dropMenuItem} onClick={logOutOrIn}>
          {userStates.isLogin ? '登出' : '登入'}
        </div>
      ) : null}

      <Modal isOpen={loginPopup} style={modalStyles}>
        <Login display="popup" />
      </Modal>
      <Toaster />
    </div>
  );
};

export default Header;
