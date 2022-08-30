import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  username?: string;
  email?: string;
  token?: string;
  message?: string;
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
  const { email } = req.body;
  res.status(200).json({
    username: 'username',
    email: email,
    token: 'FakeToken',
  });
}
