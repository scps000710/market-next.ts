import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
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
  const { image } = req.body;
  res.status(200).json({ message: 'success' });
}
