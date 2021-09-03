import React, { useState, useMemo } from 'react';
import { MeiliSearch } from 'meilisearch';
import Header from 'components/header/header';
import Link from 'next/link';
import { Truncate, debounce } from 'utils/helpers';
import Seo from 'components/seo/seo';
import Skiplink from 'components/skiplink/skiplink';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API,
});

const Search = () => {
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

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
            title: elm._formatted.Title,
            slug: `${elm.chapter ? elm.chapter.slug : '/'}#${elm.slug}`,
            content: formatContent(elm._formatted.formattedContent),
            chapter_Title: elm.chapter.Title,
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
      <Skiplink />

      <Header desc={<h2>Search</h2>} color="#29314F" searchPage />

      <div className="search wrapper">
        <input
          className="search__input"
          type="text"
          aria-label="Search through site content"
          placeholder="Search your keywords"
          onChange={(e) => debouncedOnChange(e.target.value)}
        />

        {showSearch && (
          <div className="search__results">
            <p className="search__headline">Top Results</p>
            {search.length > 0 ? (
              <ul>
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
              </ul>
            ) : (
              <p className="search__no-results">No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
