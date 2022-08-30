import { useEffect, useState } from 'react';
import Header from '../../components/index/Header';
import ItemList from '../../components/item/ItemList';
import { getItems } from '../../utils/agent';

const ItemListPage = () => {
  const [items, setItems] = useState([]);

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
    <div>
      <Header />
      <ItemList items={items} />
    </div>
  );
};

export default ItemListPage;
