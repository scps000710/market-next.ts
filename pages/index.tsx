import Header from '../components/index/Header';
import Hero from '../components/index/Hero';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slice/user';
import Modal from 'react-modal';
import { getItems } from '../utils/agent';
import ItemList from '../components/item/ItemList';
import Login from '../components/account/login';

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  connectButton: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
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

const Home = () => {
  const userStates = useSelector(selectUser);
  const [scrollY, setScrollY] = useState(0);
  const [totalY, setTotalY] = useState(0);
  const [loginPopup, setLoginPopup] = useState(false);
  const [items, setItems] = useState([]);

  // check scroll
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

  // init items
  useEffect(() => {
    (async () => {
      const result: any = await getItems();
      if (result.status === 200) {
        setItems(result.data);
      }
    })();
  }, []);

  return (
    <div className={style.wrapper}>
      <div>
        <Header />
        <Hero />
        <ItemList items={items} />
      </div>
      <Modal isOpen={loginPopup} style={modalStyles}>
        <Login display="popup" />
      </Modal>
    </div>
  );
};

export default Home;
