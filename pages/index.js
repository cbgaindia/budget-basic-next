import { fetchAPI } from 'lib/api';
import Seo from 'components/seo';
import Card from 'components/card';
import { sortList } from 'utils/helpers';
import Header from 'components/header';
import Highlight from 'components/highlights';
import Carousel from 'components/carousel';
import Link from 'next/link';
import Search from 'components/search';
import useWindowDimensions from 'utils/useWindowDimensions';

export default function Home({ homepage, chapters }) {
  const { width } = useWindowDimensions();

  sortList(chapters);
  const bgColorIndex = [1, 2, 3, 4, 5, 6];
  function headerDesc() {
    return <p>{homepage.heading}</p>;
  }

  return (
    <>
      <Header desc={headerDesc()} color="#101524" />
      <Highlight data={homepage.highlight} />

      {width < 1001 && (
        <section className="searchMenu homeSearch" key="searchMenu">
          <Search />
          <img
            className="menuSearch"
            alt="menu arrow"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuOTMzMzMgMEMzLjEwNDE2IDAgMCAzLjEwNDE2IDAgNi45MzMzM0MwIDEwLjc2MjUgMy4xMDQxNiAxMy44NjY3IDYuOTMzMzMgMTMuODY2N0M4LjY1NTk0IDEzLjg2NjcgMTAuMjMxOCAxMy4yMzg1IDExLjQ0NDQgMTIuMTk4NkwxNS4wODk1IDE1Ljg0MzhMMTUuODQzOCAxNS4wODk1TDEyLjE5ODYgMTEuNDQ0NEMxMy4yMzg1IDEwLjIzMTggMTMuODY2NyA4LjY1NTk0IDEzLjg2NjcgNi45MzMzM0MxMy44NjY3IDMuMTA0MTYgMTAuNzYyNSAwIDYuOTMzMzMgMFoiIGZpbGw9IiM0QjQ3OTciLz4KPC9zdmc+Cg=="
          />
        </section>
      )}
      <div className="home-wrapper">
        <Seo seo={homepage.seo} />
        <div className="homeCards">
          {chapters.map((chapter, index) => {
            const chapterDetails = {
              number: chapter.Chapter_No,
              title: chapter.Title,
              slug: chapter.slug,
              totalArticles: chapter.articles.length,
              icon: chapter.icon,
              Desc: chapter.Desc,
            };
            bgColorIndex.push(bgColorIndex[index]);
            return (
              <Link key={index} href={`/${chapter.slug}`}>
                <a
                  className={chapter.Desc ? 'card card-desc' : 'card'}
                  bgcolor={bgColorIndex[index]}
                >
                  <Card chapter={chapterDetails} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <Carousel youtube={homepage.youtube} />
    </>
  );
}

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');
  const chapters = await fetchAPI('/chapters');

  return {
    props: { homepage, chapters },
    revalidate: 1,
  };
}
