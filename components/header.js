import React, { useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'pages/_app';

const Header = ({ desc, color, searchPage }) => {
  const { title } = useContext(GlobalContext);

  return (
    <header className="header" style={{ backgroundColor: color }}>
      <div className="wrapper">
        <section className="branding">
          <Link href="/">
            <a className="logo">
              <h1>{title}</h1>
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
        {!searchPage && (
          <Link href="/search">
            <a className="searchLink">Search</a>
          </Link>
        )}
        <section className="headerDesc">{desc}</section>
      </div>
    </header>
  );
};

export default Header;
