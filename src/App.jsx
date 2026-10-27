import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import { RollOut, WhatWeDo } from './components/TwoCards.jsx';
import { Expertise, Prestige, BrandRecognition } from './components/Sliders.jsx';
import Stories from './components/Stories.jsx';
import { Spotlight, Luxury } from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import PickupModal from './components/PickupModal.jsx';
import { Chevron } from './components/Icons.jsx';

export default function App() {
  const [pickupOpen, setPickupOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [showTop, setShowTop] = useState(false);

  const openPickup = useCallback(() => setPickupOpen(true), []);
  const closePickup = useCallback(() => setPickupOpen(false), []);
  const notify = useCallback((msg) => setToast(msg), []);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header onPickup={openPickup} />
      <main>
        <Hero onPickup={openPickup} />
        <Stats />
        <RollOut onPickup={openPickup} />
        <Expertise />
        <WhatWeDo onPickup={openPickup} />
        <Stories />
        <Spotlight onGallery={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
        <Prestige />
        <Luxury onMore={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} />
        <BrandRecognition />
      </main>
      <Footer onToast={notify} />

      <PickupModal open={pickupOpen} onClose={closePickup} onToast={notify} />

      {toast && <div className="toast" role="status">{toast}</div>}
      {showTop && (
        <button type="button" className="to-top" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Chevron dir="up" size={22} />
        </button>
      )}
    </>
  );
}
