import Header from '../../components/index/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getItem } from '../../utils/agent';
import { itemObject } from '../../components/item';

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

  useEffect(() => {
    const itemId = router.query.itemId as string;
    if (!itemId) return;
    (async () => {
      const result = await getItem(itemId);
      if (result.status === 200) {
        setItem(result.data);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <div>{item.title}</div>
    </div>
  );
};

export default ItemPage;
