import Content from '@/components/home/Content';
import Header from '@/components/home/Header';
import React from 'react';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white">
     <Header/>
     <Content/>
    </div>
  );
}
