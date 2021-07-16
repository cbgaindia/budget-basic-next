import React from 'react';
import Search from 'components/search';
import Link from 'next/link';

const HomeHeader = ({ suggested }) => (
  <header className="homeHeader">
    <div>
      <section className="branding">
        <Link href="/">
          <a className="logo">
            <h1>Budget Basics</h1>
          </a>
        </Link>

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
        <Search blur suggested={suggested} />
      </section>
    </div>
  </header>
);

export default HomeHeader;
