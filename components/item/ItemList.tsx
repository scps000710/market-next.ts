import { AiOutlineSortDescending } from 'react-icons/ai';
import Item from './item';
import { itemObject } from '.';

const style = {
  itemListContainer: `w-full px-10 flex flex-row flex-wrap`,
  itemContainer: `w-[33%] flex justify-center`,
};

const ItemList = (props: { items: Array<itemObject> }) => {
  return (
    <div className={style.itemListContainer}>
      {props.items.map((item, index) => {
        return (
          <div className={style.itemContainer} key={index}>
            <Item {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
