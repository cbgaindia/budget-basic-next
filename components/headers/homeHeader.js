import React from 'react';
// import Image from 'next/image';
import Search from 'components/search';

const HomeHeader = () => (
  <header className="homeHeader">
    <div>
      <section className="branding">
        <a href="/" className="logo">
          <h1>Budget Basics</h1>
        </a>

        <span className="icon-seperator" />

        <a
          className="obiHeader"
          rel="noopener noreferrer"
          href="https://openbudgetsindia.org/"
          target="_blank"
        >
          <img
            src="/assets/obi_header.png"
            alt="Open Budgets India Logo"
            width={201}
            height={28}
          />
        </a>
      </section>

      <section className="headerContent">
        <p className="headerText">How can we help you?</p>
        <Search blur />
      </section>
    </div>
  </header>
);

export default HomeHeader;
