import './index.css'
import './assets/fonts/icomoon/style.css'

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home, Messages } from './pages';
// import { PagesLayout } from './layouts/pages-layout'
import { Path } from './constants';
import { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./libs/react-query";
import { WalletLayout } from './layouts/wallet-layout';
import { Payment } from './pages/Payment';
// import { AccountGenerator } from './pages/AccountGenerator';

const elRoot = document.getElementById("root");

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return null;
}


if (elRoot) {
  const root = createRoot(elRoot);

  root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />

        <WalletLayout>
          <Routes>
            <Route path={Path.Account} element={<Home />} />
            <Route path={Path.Transaction} element={<Payment />} />
            <Route path={Path.Message} element={<Messages />} />

            <Route path='*' element={<Home />} />
          </Routes>
        </WalletLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
