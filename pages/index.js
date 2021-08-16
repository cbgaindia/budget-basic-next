import Link from 'next/link';
import { fetchAPI } from 'lib/api';
import Seo from 'components/seo';
import Card from 'components/card';
import { sortList } from 'utils/helpers';
import Header from 'components/header';
import Highlight from 'components/highlights';
import Carousel from 'components/carousel/carousel';

export default function Home({ homepage, chapters }) {
  sortList(chapters);
  const bgColorIndex = [1, 2, 3, 4, 5, 6];
  function headerDesc() {
    return <p>{homepage.heading}</p>;
  }

  return (
    <>
      <Header desc={headerDesc()} color="#101524" />
      {homepage.highlight.length > 0 && <Highlight data={homepage.highlight} />}

      <section className="searchMenu homeSearch" key="searchMenu">
        <Link href="/search">
          <a>Search</a>
        </Link>
      </section>
      <div className="home-wrapper">
        <Seo seo={homepage.seo} />
        <div className="homeCards">
          {chapters.map((chapter, index) => {
            const chapterDetails = {
              number: chapter.Chapter_No,
              title: chapter.Title,
              slug: chapter.slug,
              totalArticles: chapter.sections.length,
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
