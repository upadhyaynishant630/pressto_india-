import SmartImg from './SmartImg.jsx';

export function Spotlight({ onGallery }) {
  return (
    <section className="section" id="blog">
      <h2 className="heading">In the Spotlight</h2>
      <div className="spotlight">
        <div className="tile big"><SmartImg src="/images/7.jpg" alt="Showcase 1" label="Showcase" /></div>
        <div className="tile big hide-md"><SmartImg src="/images/sp-2.jpg" alt="Showcase 2" label="Showcase" /></div>
        <div className="tile collage hide-md">
          <p className="kicker">In the Spotlight</p>
          <p className="info">
            At Pressto, every Presstodian brings our motto - Free Pickup &amp; Drop; to life with heartfelt care,
            sharp skill, and an eye for detail. It&rsquo;s not just what we do, it&rsquo;s how we do it, with quiet
            precision and pride in every fold
          </p>
          <div className="mini-grid">
            <SmartImg src="/images/sp-3.jpg" alt="Spotlight Collage 1" label="Spotlight" />
            <SmartImg src="/images/sp-4.jpg" alt="Spotlight Collage 2" label="Spotlight" />
          </div>
          <button type="button" className="btn btn-outline" onClick={onGallery}>View Gallery</button>
        </div>
      </div>
    </section>
  );
}

export function Luxury({ onMore }) {
  return (
    <section className="section" id="gallery">
      <h2 className="heading">Luxury Experience Indeed</h2>
      <div className="luxury">
        <div className="tile"><SmartImg src="/images/exp-1.jpg" alt="Luxury Experience 1" label="Luxury" /></div>
        <div className="tile"><SmartImg src="/images/exp-2.jpg" alt="Luxury Experience 2" label="Luxury" /></div>
        <div className="tile collage">
          <div className="lux-grid">
            <SmartImg src="/images/exp-3.jpg" alt="Luxury Experience 3" label="Luxury" />
            <SmartImg src="/images/exp-4.jpg" alt="Luxury Experience 4" label="Luxury" />
            <SmartImg src="/images/exp-5.jpg" alt="Luxury Experience 5" label="Luxury" />
            <div className="lux-copy">
              <h4>About Us</h4>
              <p>Best in Class Dry Cleaning for Luxury and Branded Clothes, You know who has been the face of the town.</p>
              <button type="button" className="btn btn-outline" onClick={onMore}>Know More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
