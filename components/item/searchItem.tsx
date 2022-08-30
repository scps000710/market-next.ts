/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const style = {
  cardContainer: `rounded-[3rem] mx-5`,
  infoContainer: `h-20 bg-[#313338] p-4 flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  image: `h-[40px] rounded`,
  title: `w-[200px] xl:w-[500px] text-clip overflow-hidden`,
  authorName: `text-[#1868b7]`,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const SearchItem = (props: {
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
            <div className={style.infoContainer}>
              <img className={style.image} alt="" src={`${props.imageSrc}`} />
              <div className={style.author}>
                <div className={style.title}>{props.title}</div>
              </div>
              <div className={style.infoIcon}>${props.price}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SearchItem;
