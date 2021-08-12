import React, { useState } from 'react';
import { MeiliSearch } from 'meilisearch';
import Header from 'components/header';
import Link from 'next/link';
import { Truncate } from 'utils/helpers';
import Seo from 'components/seo';

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

  return (
    <>
      <Seo seo={seo} />

      <Header desc={<h2>Search</h2>} color="#29314F" searchPage />

      <div className="searchPage wrapper">
        <input
          type="text"
          aria-label="Search through site content"
          placeholder="Search your keywords"
          onChange={(e) => onChange(e.target.value)}
        />

        {showSearch && (
          <div className="searchPageResults">
            <p className="suggested">Top Results</p>
            {search.length > 0 ? (
              <ul>
                {search.map((item, index) => (
                  <li key={`search-${index}`}>
                    <Link href={`/${item.slug}`}>
                      <a role="link" tabIndex="0" className="searchTitle">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Truncate(item.title, 300),
                          }}
                        />
                      </a>
                    </Link>
                    <div className="searchChapter">
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
                      className="searchContent"
                      dangerouslySetInnerHTML={{
                        __html: Truncate(item.content, 300),
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="noResults">No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
