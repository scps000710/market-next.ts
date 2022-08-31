/* eslint-disable @next/next/no-img-element */
import Header from '../../components/index/Header';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slice/user';
import { getItem } from '../../utils/agent';
import { itemObject } from '../../components/item';

const style = {
  headerContainer: `flex flex-col p-10 mx-[16%] mt-10 bg-white rounded-lg`,
  bodyContainer: `relative flex flex-col p-10 mx-[16%] my-4 bg-white rounded-lg`,
  itemContainer: `relative flex flex-row`,
  img: `flex max-w-[400px] max-h-[400px]`,
  detailContainer: `h-full flex flex-col mx-4`,
  titleLabel: `text-[1.6rem] font-semibold`,
  priceLabel: `text-[#2181e2] text-[2.5rem] font-semibold`,
  infoContainer: `flex flex-row items-center mt-4`,
  infoLabel: `text-[#8a939b] text-[1.2rem] mr-4`,
  feeLabel: ``,
  buyButton: `absolute bottom-0 text-lg font-semibold mt-4 px-8 py-3 bg-[#2181e2] rounded-lg text-white hover:bg-[#42a0ff]`,
  authorImage: `h-[80px] w-[80px] rounded-full mr-10`,
  authorName: `font-semibold text-[2rem]`,
  marketButton: `absolute right-0 text-lg font-semibold px-6 py-3 outline outline-[#2181e2] text-[#2181e2] rounded-lg mr-10 hover:bg-gray-200`,
  descriptionContainer: `flex flex-col`,
  itemDescriptionTitle: `text-[1.6rem] font-semibold`,
  itemDescriptionText: `m-4 whitespace-pre-warp`,
};

const ItemPage = () => {
  const [item, setItem] = useState<itemObject>({
    id: '',
    imageSrc: '',
    authorSrc: '',
    title: '',
    username: '',
    price: '',
  });
  const router = useRouter();
  const userStates = useSelector(selectUser);

  useEffect(() => {
    if (!router.isReady) return;
    const itemId = router.query.itemId as string;
    if (!itemId) return;
    (async () => {
      const result = await getItem(itemId);
      if (result.status === 200) {
        setItem(result.data);
      }
    })();
  }, [router.isReady]);

  const onBuyButtonClick = () => {
    if (userStates.isLogin) {
      toast.success(`購買成功`, {
        style: {
          background: '#000000',
          color: '#FFFFFF',
        },
      });
    } else {
      router.push({
        pathname: '/login',
        query: { reDirect: '/item/' + item.id },
      });
    }
  };

  const onMarketButtonClick = () => {
    router.push('/item/itemlist');
  };

  return (
    <div>
      <Header />
      <div className={style.headerContainer}>
        <div className={style.itemContainer}>
          <img src={item.imageSrc} className={style.img} alt="" />
          <div className={style.detailContainer}>
            <label className={style.titleLabel}>{item.title}</label>
            <div className="ml-4 mt-4">
              <label className={style.priceLabel}>${item.price}</label>
              <div>
                <div className={style.infoContainer}>
                  <label className={style.infoLabel}>配送地點</label>
                  <label className={style.feeLabel}>台灣本島</label>
                </div>
                <div className={style.infoContainer}>
                  <label className={style.infoLabel}>運費</label>
                  <label className={style.feeLabel}>$0</label>
                </div>
                <div className={style.infoContainer}>
                  <label className={style.infoLabel}>數量</label>
                  <label className={style.feeLabel}>5</label>
                </div>
              </div>
            </div>
            <button
              onClick={() => onBuyButtonClick()}
              className={style.buyButton}
            >
              立即購買
            </button>
          </div>
        </div>
      </div>
      <div className={style.bodyContainer}>
        <div className="flex flex-row items-center">
          <img className={style.authorImage} src={item.authorSrc} alt="" />
          <div className="flex flex-col">
            <label className={style.authorName}>{item.username}</label>
            <label className={style.infoLabel}>5分鐘前上限</label>
          </div>
          <button
            onClick={() => onMarketButtonClick()}
            className={style.marketButton}
          >
            查看其他商品
          </button>
        </div>
      </div>
      <div className={style.bodyContainer}>
        <div className={style.descriptionContainer}>
          <label className={style.itemDescriptionTitle}>商品介紹</label>
          <div className={style.itemDescriptionText}>
            <p>●本賣場所販賣的主機皆為台灣公司貨，所有主機皆享有一年保固</p>
            <p>
              ●架上有的就是現貨，我們不賣二手，絕對都是全新的，不定期會上架新產品，貨到會直接上架。
            </p>
            <p>●因PS5主機體積較大，超商無法寄送，僅限宅配。</p>
            <p>
              ●如有疑問以及需求可使用聊聊，客服服務時間:10:00-21:00，非營業時間如回覆時間較長請見諒。
            </p>
            <p>●寄送方式:店到店60元、賣家宅配90元。</p>
            <p>●本賣場所有銷售皆開立統一發票，買的安心玩得開心。</p>
            <p>
              ●欲開統編，請下單時備註統編及抬頭，聊聊給統編後台系統不會顯示恕無法受理，發票一經開立恕無法換開。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
