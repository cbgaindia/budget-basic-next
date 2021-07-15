import React, { useState, useEffect } from 'react';
import { MeiliSearch } from 'meilisearch';
import Link from 'next/link';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API,
});

const Search = ({ blur, resultClick, onResultClick }) => {
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (document.querySelector('.searchIcon')) {
      document.querySelector('.searchIcon').addEventListener('click', () => {
        setShowSearch(false);
      });
    }
  }, []);

  function inputFocus() {
    if (blur == true) document.querySelector('body').classList.add('addBlur');

    if (query.length > 0) {
      setShowSearch(true);
    }
  }

  function inputBlur() {
    if (!document.hasFocus()) {
      return;
    }
    if (blur == true)
      document.querySelector('body').classList.remove('addBlur');
    window.setTimeout(() => {
      setShowSearch(false);
    }, 200);
  }

  async function onChange(e) {
    setQuery(e);
    if (e.length > 0) {
      await client
        .index('topic')
        .search(e, {
          limit: 4,
        })
        .then((res) => {
          const list = res.hits.map((elm) => ({
            title: elm.Title,
            slug: `${elm.chapter ? elm.chapter.slug : '/'}#${elm.slug}`,
          }));
          setSearch(list);
          setShowSearch(true);
        });
    }
  }

  const onClick = () => {
    setShowSearch(false);
    if (resultClick == true) onResultClick();
  };

  return (
    <>
      <input
        type="text"
        aria-label="Search through site content"
        placeholder="Search your keywords"
        onChange={(e) => onChange(e.target.value)}
        onFocus={inputFocus}
        onBlur={inputBlur}
      />
      {showSearch && (
        <div className="searchResults">
          {search.length > 0 ? (
            <ul>
              {search.map((item, index) => (
                <li key={`search-${index}`}>
                  <Link href={`/${item.slug}`}>
                    <a
                      onKeyUp={onClick}
                      onClick={onClick}
                      role="link"
                      tabIndex="0"
                    >
                      {item.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="noResults">No results found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
