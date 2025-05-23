// src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke halaman login
    router.push('/login');
  }, [router]);

  return null; // Tidak perlu menampilkan UI apa pun
};

export default HomePage;
