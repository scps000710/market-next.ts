import Item from './item';
import { itemObject } from '.';
import { useEffect, useState } from 'react';
import { getItems } from '../../utils/agent';

const style = {
  itemListContainer: `w-full px-10 flex flex-row flex-wrap`,
  itemContainer: `w-[33%] flex justify-center`,
};

const ItemList = () => {
  const [items, setItems] = useState<itemObject[]>([]);

  useEffect(() => {
    (async () => {
      const result: any = await getItems();
      if (result.status === 200) {
        setItems(result.data);
      }
    })();
  }, []);

  return (
    <div className={style.itemListContainer}>
      {items.map((item, index) => {
        return (
          <div className={style.itemContainer} key={index}>
            <Item {...item} tie={true} />
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
