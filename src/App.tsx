import './index.css'
import './assets/fonts/icomoon/style.css'

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./libs/react-query";
import { WalletLayout } from './layouts/wallet-layout';

const elRoot = document.getElementById("root");

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return null;
}


if (elRoot) {
  const root = createRoot(elRoot);

  root.render(
    <div className='centralize'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />

          <WalletLayout>
            <Routes>
              {/* <Route path="/" element={<Home />} />

            <Route path={Path.About} element={<Home />} /> */}
            </Routes>
          </WalletLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}