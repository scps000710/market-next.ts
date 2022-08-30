import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Item from '../item/item';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slice/user';
import { getRecommendItem } from '../../utils/agent';

const style = {
  wrapper: `relative bg-[url('../assets/heroimg.jpg')]`,
  container: `h-[600px] before:content-[''] before:bg-bg before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0  before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex relative px-4 py-10 justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  exploreButton: `relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  createButton: `relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  itemContainer: `w-[40%]`,
};

const Hero = () => {
  const userStates = useSelector(selectUser);
  const [item, setItem] = useState({
    id: '',
    imageSrc: '',
    authorSrc: '',
    title: '',
    username: '',
    price: '',
  });

  useEffect(() => {
    (async () => {
      const result: any = await getRecommendItem();
      if (result.status === 200) {
        setItem(result.data);
      }
    })();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>全球最大線上交易市集</div>
            <div className={style.description}>最低手續費，最低運費</div>
            <div className={style.ctaContainer}>
              <Link href="/item/itemlist">
                <button className={style.exploreButton}>查看所有商品</button>
              </Link>
              {userStates.isLogin ? (
                <Link href="/item/create">
                  <button className={style.createButton}>販售商品</button>
                </Link>
              ) : null}
            </div>
          </div>
          <div className={style.itemContainer}>
            <Item {...item} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
