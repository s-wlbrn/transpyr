import React, { useState } from 'react';

import './HomepageHero.styles.scss';

export const HomepageHero = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="homepage-hero-unit">
      <div className="homepage-hero-overlay">
        <span className="homepage-hero-text">It's happening now.</span>
        <span className="homepage-hero-credit">Photo: Josh Sorenson</span>
      </div>

      <img
        srcSet="
        img/pexels-josh-sorenson-768.jpg 768w,
        img/pexels-josh-sorenson-1024.jpg 1024w,
        img/pexels-josh-sorenson-1080p.jpg 1920w,
        img/pexels-josh-sorenson-1440p.jpg 2560w,
        img/pexels-josh-sorenson-4k.jpg 3840w
      "
        sizes="
        (max-width: 768px) 768w,
        (max-width: 1024px) 1024w,
        (max-width: 1920px) 1920w,
        (max-width: 2560px) 2560w,
        3840w
      "
        alt="Transpyr"
        className={`homepage-hero-image ${loaded && 'loaded'}`}
        onLoad={() => setLoaded(true)}
      />
    </section>
  );
};
