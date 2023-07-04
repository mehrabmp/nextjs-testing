import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();

  useEffect(() => {
    // console.log(session);
  }, [session]);

  return (
    <>
      <h1>Welcome</h1>
      <h2>its a protected route</h2>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  return {
    props: {},
  };
};
