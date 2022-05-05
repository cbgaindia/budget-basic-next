import React, { useState, useMemo, useEffect } from 'react';
import { MeiliSearch } from 'meilisearch';
import Header from 'components/header/header';
import Link from 'next/link';
import { Truncate, debounce } from 'utils/helpers';
import Seo from 'components/seo/seo';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API,
});

const Search = () => {
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.search__form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    return () => {
      form.removeEventListener('submit', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const seo = {
    metaTitle: 'Search',
  };

  function formatContent(content) {
    if (!content.endsWith('...')) return `... ${content} ...`;
    return `... ${content}`;
  }

  async function onChange(e) {
    if (e.length > 0) {
      const index = client.index('sections');

      await index
        .search(e, {
          limit: 10,
          attributesToCrop: ['formattedContent'],
          cropLength: 170,
          attributesToHighlight: ['formattedContent', 'Title'],
        })
        .then((res) => {
          const list = res.hits.map((elm) => ({
            title: elm._formatted.TitleHindi,
            slug: `${elm.chapter ? elm.chapter.slug : '/'}#${elm.slug}`,
            content: formatContent(elm._formatted.formattedContentHindi),
            chapter_Title: elm.chapter.TitleHindi,
            chapter_Slug: elm.chapter.slug,
          }));
          setSearch(list);
          setShowSearch(true);
        });
    } else {
      setSearch([]);
      setShowSearch(false);
    }
  }

  const debouncedOnChange = useMemo(() => debounce(onChange, 150), []);

  return (
    <>
      <Seo seo={seo} />

      <Header desc={<h2>Search</h2>} color="#29314F" searchPage isHindi={true}/>

      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>

      <main id="main" className="search wrapper">
        <form className="search__form" autoComplete="off" role="search">
          <div role="search">
            <label className="search__label" htmlFor="search">
              <span className="search__text">बजट दस्तावेज़ खोजें</span>
              <input
                id="search"
                className="search__input"
                type="search"
                autoComplete="off"
                inputMode="search"
                placeholder="खोजें..."
                onChange={(e) => debouncedOnChange(e.target.value)}
              />
            </label>
          </div>
        </form>

        {showSearch && (
          <div className="search__results">
            <p className="search__headline">शीर्ष परिणाम</p>
            {search.length > 0 ? (
              <ol>
                {search.map((item, index) => (
                  <li key={`search-${index}`}>
                    <Link href={`/${item.slug}`}>
                      <a role="link" tabIndex="0" className="search__title">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Truncate(item.title, 300),
                          }}
                        />
                      </a>
                    </Link>
                    <div className="search__chapter">
                      <Link href={`/${item.chapter_Slug}`}>
                        <a role="link">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: Truncate(item.chapter_Title, 300),
                            }}
                          />
                        </a>
                      </Link>
                    </div>

                    <div
                      className="search__content"
                      dangerouslySetInnerHTML={{
                        __html: Truncate(item.content, 300),
                      }}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <p className="search__no-results">कोई परिणाम नहीं मिला</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
