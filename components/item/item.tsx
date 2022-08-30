/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const style = {
  cardContainer: `rounded-[3rem] mx-5 my-10 hover:shadow-2xl hover:shadow-gray-700`,
  imageContainer: `h-[26rem] w-full flex`,
  cardImage: `w-full rounded-t-lg object-cover flex`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  authorImage: `h-[40px] rounded-full`,
  title: `w-[100px] xl:w-[200px] text-clip overflow-hidden`,
  authorName: `text-[#1868b7]`,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const Item = (props: {
  id: string;
  imageSrc: string;
  authorSrc: string;
  title: string;
  username: string;
  price: string;
}) => {
  return (
    <div className={''}>
      <Link href={`/item/${props.id}`}>
        <a>
          <div className={style.cardContainer}>
            <div className={style.imageContainer}>
              <img
                className={style.cardImage}
                alt=""
                src={`${props.imageSrc}`}
              />
            </div>
            <div className={style.infoContainer}>
              <img
                className={style.authorImage}
                alt=""
                src={`${props.authorSrc}`}
              />
              <div className={style.author}>
                <div className={style.title}>{props.title}</div>
                <div className={style.authorName}>{props.username}</div>
              </div>
              <div className={style.infoIcon}>${props.price}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Item;
