import React from 'react';

import Content from '@/components/home/Content';
import Header from '@/components/home/Header';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white">
      <Header />
      <Content />
    </div>
  );
}
