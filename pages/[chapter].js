import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { fetchAPI } from 'lib/api';
import { sortList, stripTable, tooltipKeyword } from 'utils/helpers';
import useWindowDimensions from 'utils/useWindowDimensions';
import Seo from 'components/seo/seo';
import Header from 'components/header/header';
import Navigation from 'components/navigation/navigation';
import Menu from 'components/menu/menu';
import Sidebar from 'components/sidebar/sidebar';
import useLayoutEffect from 'utils/use-isomorphic-layout-effect';

function goToTopHandler() {
  if (window.scrollY > 600)
    document.querySelector('.back-top').classList.add('active');
  else document.querySelector('.back-top').classList.remove('active');
}

const Chapter = ({ chapter, chapters }) => {
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    const jumpIcon = document.querySelector('.back-top');
    gsap.registerPlugin(ScrollTrigger);

    if (chapter.sections.length > 0) {
      stripTable();
      tooltipKeyword(chapter);
    }

    // go-to-top
    document.addEventListener('scroll', goToTopHandler);
    jumpIcon.addEventListener('click', () => {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('#top-of-site-pixel-anchor').focus({
          preventScroll: true,
        });
      }, 10);
    });
    return () => {
      jumpIcon.removeEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      document.removeEventListener('scroll', goToTopHandler);
    };
  }, [chapter, width]);

  sortList(chapter.sections);
  sortList(chapters);

  const seo = {
    metaTitle: chapter.Title,
    metaDescription: chapter.Desc,
    article: true,
    icon: chapter.icon,
  };

  function headerDesc() {
    return <h2>{chapter.Title}</h2>;
  }

  return (
    <>
      <Seo seo={seo} />

      <Header desc={headerDesc()} color="#29314F" />
      {width < 1025 && chapter.sections.length > 0 && (
        <Menu chapter={chapter} isMobile={width < 1025} />
      )}
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>
      {chapter.sections.length > 0 ? (
        <main id="main" className="chapter wrapper">
          <Sidebar chapter={chapter} />

          <section className="chapter__container">
            {chapter.sections.map((article) => (
              <article className="section" id={article.slug} key={article.id}>
                <div className="section__heading">
                  <span className="section__bar" />
                  <h2>{article.Title}</h2>
                  <a href={`#${article.slug}`} className="section__anchor">
                    <span aria-hidden="true">#</span>
                    <span className="screen-reader-text">
                      {`Section titled ${article.Title}`}
                    </span>
                  </a>
                </div>

                <div
                  className="section__content"
                  dangerouslySetInnerHTML={{ __html: article.Content }}
                />
              </article>
            ))}
          </section>
        </main>
      ) : (
        <div className="no-content">
          <p>To be updated soon</p>
        </div>
      )}

      <Navigation
        back={chapters[chapter.Chapter_No - 2]}
        forward={chapters[chapter.Chapter_No]}
      />
      <a href="#to-top" type="button" className="back-top">
        <span className="screen-reader-text">Back to Top</span>
        <svg width="32" height="32" viewBox="0 0 100 100">
          <path
            d="m50 0c-13.262 0-25.98 5.2695-35.355 14.645s-14.645 22.094-14.645 35.355 
          5.2695 25.98 14.645 35.355 22.094 14.645 35.355 14.645 25.98-5.2695 35.355-14.645 
          14.645-22.094 14.645-35.355-5.2695-25.98-14.645-35.355-22.094-14.645-35.355-14.645zm20.832 
          62.5-20.832-22.457-20.625 22.457c-1.207 0.74219-2.7656 0.57812-3.7891-0.39844-1.0273-0.98047-1.2695-2.5273-0.58594-3.7695l22.918-25c0.60156-0.61328 
          1.4297-0.96094 2.2891-0.96094 0.86328 0 1.6914 0.34766 2.293 0.96094l22.918 25c0.88672 1.2891 0.6875 3.0352-0.47266 4.0898-1.1562 1.0508-2.9141 1.0859-4.1133 0.078125z"
          />
        </svg>
      </a>
    </>
  );
};

export async function getStaticPaths() {
  const chapters = await fetchAPI('/chapters');
  return {
    paths: chapters.map((chapter) => ({
      params: {
        chapter: chapter.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const chapter = await fetchAPI(`/chapters?slug=${params.chapter}`);
  const chapters = await fetchAPI(`/chapters`);

  return {
    props: { chapter: chapter[0], chapters },
    revalidate: 1,
  };
}

export default Chapter;
