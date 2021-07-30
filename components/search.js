import React, { useState, useEffect, useContext } from 'react';
import { MeiliSearch } from 'meilisearch';
import Link from 'next/link';
import { GlobalContext } from 'pages/_app';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API,
});

const Search = ({ blur, resultClick, onResultClick }) => {
  const { articles } = useContext(GlobalContext);

  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (document.querySelector('.searchIcon')) {
      document.querySelector('.searchIcon').addEventListener(
        'click',
        () => {
          setShowSearch(false);
        },
        { passive: true }
      );
    }
  }, []);

  function inputFocus() {
    if (blur == true) document.querySelector('body').classList.add('addBlur');
    if (query.length > 0) {
      setShowSearch(true);
      setShowPlaceholder(false);
    } else if (articles != undefined) setShowPlaceholder(true);
  }

  function inputBlur() {
    if (!document.hasFocus()) {
      return;
    }
    if (blur == true)
      document.querySelector('body').classList.remove('addBlur');
    window.setTimeout(() => {
      setShowSearch(false);
      setShowPlaceholder(false);
    }, 200);
  }

  async function onChange(e) {
    setQuery(e);
    if (e.length > 0) {
      setShowPlaceholder(false);
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
    } else {
      setShowSearch(false);
      if (articles != undefined) setShowPlaceholder(true);
    }
  }

  const onClick = () => {
    setShowPlaceholder(false);
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
      {showPlaceholder && (
        <div className="searchResults">
          <p className="suggested">Suggested Articles</p>
          <ul>
            {articles.map((item, index) => (
              <li key={`suggested-${index}`}>
                <Link
                  href={`/${item.chapter ? item.chapter.slug : '/'}#${
                    item.slug
                  }`}
                >
                  <a
                    onKeyUp={onClick}
                    onClick={onClick}
                    role="link"
                    tabIndex="0"
                  >
                    {item.Title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
