import React from 'react';
import Search from 'components/search';

const ArticleHeader = ({ chapter }) => (
  <header className="articleHeader" bgcolor={chapter.number % 6}>
    <div className="wrapper">
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
      <Search />
      <section className="chapterDetails">
        <h2>{chapter.title}</h2>
      </section>
    </div>
  </header>
);

export default ArticleHeader;
