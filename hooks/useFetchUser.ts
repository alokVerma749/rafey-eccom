import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserAccount } from '@/db_services/user';
import { UserAccount } from '@/models/user_model';

export const useFetchUser = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const session = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      const userAccount = await getUserAccount(session.data?.user?.email ?? '');
      const userAccountData = JSON.parse(userAccount);
      setUser(userAccountData);
    };

    fetchUser();
  }, [session.data?.user?.email]);

  return { user, setUser };
};