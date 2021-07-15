import { fetchAPI } from 'lib/api';
import Seo from 'components/seo';
import Card from 'components/card';
import { sortList } from 'utils/helpers';
import HomeHeader from 'components/headers/homeHeader';
import Link from 'next/link';

export default function Home({ homepage, chapters }) {
  sortList(chapters);
  const bgColorIndex = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <HomeHeader />
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
            };
            bgColorIndex.push(bgColorIndex[index]);
            return (
              <Link key={index} href={`/${chapter.slug}`}>
                <a className="card" bgcolor={bgColorIndex[index]}>
                  <Card chapter={chapterDetails} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
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
