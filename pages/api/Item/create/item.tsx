import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  itemId?: string;
  message: string;
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const { title, price } = req.body;
  res.status(200).json({ itemId: '1', message: 'success' });
}
