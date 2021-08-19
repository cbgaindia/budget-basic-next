import React, { useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'pages/_app';

const Header = ({ desc, color, searchPage }) => {
  const { title } = useContext(GlobalContext);

  return (
    <header className="header" style={{ backgroundColor: color }}>
      <div className="header__container wrapper">
        <section className="branding">
          <Link href="/">
            <a>
              <h1 className="branding__logo">{title}</h1>
            </a>
          </Link>

          <span className="branding__seperator" />

          <a
            className="branding__obi"
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
            <a className="header__search">Search</a>
          </Link>
        )}
        {desc && <section className="header__desc">{desc}</section>}
      </div>
    </header>
  );
};

export default Header;
