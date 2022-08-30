import type { NextApiRequest, NextApiResponse } from 'next';
import ItemSource from './ItemSource';

type Data = {
  id?: string;
  imageSrc?: string;
  authorSrc?: string;
  title?: string;
  username?: string;
  price?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }
  const itemId = req.query.itemId as string;

  for (const i in ItemSource) {
    if (itemId === ItemSource[i].id) {
      res.status(200).json(ItemSource[i]);
    }
  }
  res.status(404).json({ message: 'Not Found' });
}
