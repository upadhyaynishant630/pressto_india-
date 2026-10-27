import SmartImg from './SmartImg.jsx';
import { ArrowRight } from './Icons.jsx';

/** "Roll Out with Freedom" and "What we do best" share this two-card layout. */
export function RollOut({ onPickup }) {
  return (
    <section className="section" id="about">
      <h2 className="heading">Roll Out with Freedom</h2>
      <div className="two-cards">
        <article className="card">
          <SmartImg src="/images/six-col-1.jpg" alt="roll out" label="Roll out" />
          <div className="card-copy">
            <h4>Care Beyond Clean</h4>
            <p>Schedule a free pickup &amp; drop as per your convenience</p>
            <button type="button" className="link" onClick={onPickup}>
              Schedule Now <ArrowRight />
            </button>
          </div>
        </article>
        <article className="card dark">
          <SmartImg src="/images/six-col-2.jpg" alt="roll out with freedom" label="Know all about us" />
          <div className="card-copy">
            <h4>Know all about us</h4>
            <p>A complete guide about Pressto and how we do it!</p>
            <a className="link" href="https://www.presstoindia.com/" target="_blank" rel="noopener noreferrer">
              Discover Pressto <ArrowRight />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export function WhatWeDo({ onPickup }) {
  return (
    <section className="section" id="services">
      <h2 className="heading">What we do best</h2>
      <div className="two-cards">
        <article className="card">
          <SmartImg src="/images/service-tshirt.jpg" alt="Drycleaning & Laundry" label="Drycleaning & Laundry" />
          <div className="card-copy">
            <h4>Drycleaning &amp; Laundry</h4>
            <p>Combined with exquisite care &amp; advanced technology to deliver perfection.</p>
            <button type="button" className="btn btn-outline" onClick={onPickup}>Schedule Pickup</button>
          </div>
        </article>
        <article className="card dark">
          <SmartImg src="/images/service-bag.jpg" alt="Shoe & Bag Care" label="Shoe & Bag Care" />
          <div className="card-copy">
            <h4>Shoe &amp; Bag Care</h4>
            <p>Restoring your shoes and bags with unrivaled precision</p>
            <button type="button" className="btn btn-outline" onClick={onPickup}>Schedule Pickup</button>
          </div>
        </article>
      </div>
    </section>
  );
}
