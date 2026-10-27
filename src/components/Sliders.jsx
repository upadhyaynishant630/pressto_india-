import Carousel from './Carousel.jsx';
import SmartImg from './SmartImg.jsx';
import { ExpertiseIcon } from './Icons.jsx';
import { EXPERTISE, BRANDS, PRESS } from '../data/content.js';

export function Expertise() {
  return (
    <section className="section band">
      <h2 className="heading">Timeless Care, Unmatched Expertise</h2>
      <Carousel
        items={EXPERTISE}
        perView={{ sm: 1, md: 2, lg: 4 }}
        autoplay={4000}
        renderItem={(it) => (
          <div className="expertise-item">
            <div className="expertise-icon"><ExpertiseIcon name={it.icon} /></div>
            <h5>{it.title}</h5>
            <p>{it.text}</p>
          </div>
        )}
      />
    </section>
  );
}

export function Prestige() {
  return (
    <section className="section band">
      <h2 className="heading">The Prestige We&apos;ve Pressed</h2>
      <Carousel
        items={BRANDS}
        perView={{ sm: 2, md: 3, lg: 5 }}
        autoplay={2800}
        renderItem={(b) => (
          <div className="logo-item">
            <SmartImg src={b.src} alt={b.name} label={b.name} />
          </div>
        )}
      />
    </section>
  );
}

export function BrandRecognition() {
  return (
    <section className="section band">
      <h2 className="heading">Brand Recognition</h2>
      <Carousel
        items={PRESS}
        perView={{ sm: 2, md: 4, lg: 6 }}
        autoplay={2500}
        renderItem={(b) => (
          <div className="logo-item">
            <SmartImg src={b.src} alt={b.name} label={b.name} />
          </div>
        )}
      />
    </section>
  );
}
