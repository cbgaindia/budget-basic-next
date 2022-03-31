import React from 'react';
import Link from 'next/link';
import { fetchAPI } from 'lib/api';
import Seo from 'components/seo/seo';
import Card from 'components/card/card';
import { sortList } from 'utils/helpers';
import Header from 'components/header/header';
import Highlight from 'components/highlights/highlights';
import Carousel from 'components/carousel/carousel';

export default function Home({ homepage, chapters }) {
  sortList(chapters);
  
  function HeaderDesc() {
    return (
      <div className="homepage_heading_new_container wrapper">
         <h1 className="homepage_heading_new">{homepage.headingHindi}</h1>
      </div>
    )
  }

  function romanizeNumber (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

  return (
    <>
      <Seo seo={homepage.seo} />

      <Header color="#212142" isHindi={true} />
      {/* {homepage.highlight.length > 0 && <Highlight data={homepage.highlight} />} */}

      <section className="home__mobile-search">
        <Link href="/search">
          <a>Search</a>
        </Link>
      </section>
      <section className="homepage_heading_new_sec">
        <HeaderDesc />
      </section>
      
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>
      <main id="main" tabIndex="-1" className="wrapper no_focus">
        <ul className="new_home__cards">
          {chapters.map((chapter, index) => {
            const chapterDetails = {
              title: chapter.TitleHindi,
              slug: `hn/${chapter.slug}`,
              icon: chapter.icon,
              Desc: chapter.DescHindi,
              totalArticles: chapter.sections.length,
              index,
              chapterNumber:romanizeNumber(chapter.Chapter_No)
            };
            return (
              <React.Fragment key={index}>
                <Card chapter={chapterDetails} isHindi={true} />
              </React.Fragment>
            );
          })}
        </ul>
      </main>
      <Carousel youtube={homepage.youtube} isHindi={true} />
    </>
  );
}

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');
  const chapters = await fetchAPI('/chapters');
  homepage.seo.metaTitle = homepage.seo.metaTitleHindi;
  homepage.seo.metaDescription = homepage.seo.metaDescriptionHindi;
  return {
    props: { homepage, chapters },
    revalidate: 1,
  };
}
