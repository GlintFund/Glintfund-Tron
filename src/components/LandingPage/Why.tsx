import React from 'react';
// import Image from '../assets/img/why-img.png'

const Why = () => {
  return(
  <section className=''>
    <div className='container mx-auto'>
      <div className='flex flex-col items-center gap-x-8
      lg:flex-row mb-10 py-14'>
        {/* image */}
        <div className='order-2 lg:order-1 w-full'>
        {/* // data-aos='fade-right'
        // data-aos-offset='400' */}
          <img src={'/img/why-img.png'} className=''/>
        </div>
          {/* text */}
        <div className='w-full'>
          <h2 className='section-title'>Why you should choose GLINT</h2>
          <p className='section-subtitle'>Unlock limitless fundraising potential with GLINT—no borders, no hidden fees, just seamless transactions and real results.
          </p>
          <a
          href="https://medium.com/@glintfund"
          target="_blank"
          rel="GlintFund Medium"
        >
          <button className='btn px-6'>Learn more</button>
        </a>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Why;