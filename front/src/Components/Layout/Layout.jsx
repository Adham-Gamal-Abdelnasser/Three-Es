import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from '../MainNav/MainNav';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <MainNav />
      <div className="layout flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
