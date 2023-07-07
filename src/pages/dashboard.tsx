import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
  return (
    <div className="p-4">
      <h2>its a protected route</h2>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
