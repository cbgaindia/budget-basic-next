import React from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
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
import Carousel from 'components/carousel/carousel';
import { useRouter } from 'next/router';

function goToTopHandler() {
  if (window.scrollY > 600)
    document.querySelector('.back-top').classList.add('active');
  else document.querySelector('.back-top').classList.remove('active');
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

const Chapter = ({ homepage,chapter, chapters }) => {
  chapter.sections = chapter.sections.map(ele => {
    ele.Title = ele.TitleHindi ? ele.TitleHindi : ele.Title;
    ele.Content = ele.ContentHindi ? ele.ContentHindi : ele.Content;
    return ele;
  })
  const { width } = useWindowDimensions();
  const router = useRouter();
  useLayoutEffect(() => {
    const jumpIcon = document.querySelector('.back-top');
    gsap.registerPlugin(ScrollTrigger);

    if (chapter.sections.length > 0) {
      stripTable();
      tooltipKeyword(chapter);
    }
    let url = router.pathname;
    if(url.includes('#')){
      let idPresent = url.split('#').pop();
      let element =  document.querySelector(`#${idPresent}`);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }

    // go-to-top
    document.addEventListener('scroll', goToTopHandler);
    jumpIcon.addEventListener('click', (e) => {
      e.preventDefault();
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
    metaTitle: chapter.TitleHindi,
    metaDescription: chapter.DescHindi,
    article: true,
    icon: chapter.icon,
  };

  function headerDesc() {
    return <h2>{chapter.Title}</h2>;
  }

  return (
    <>
      <Seo seo={seo} />

      <Header color="#212142" />
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
          <div className="chapter_heading_image">
                    <div className="chapter_page_roam">
                      <p>{romanizeNumber(chapter.Chapter_No)}</p>
                    </div>
                    <picture className="chapter_heading_img">
                      <source
                        srcSet={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chapter.chapter_head_image? chapter.chapter_head_image[0]?.url : ""}`}
                        media="(min-width: 100px)"
                      />

                      <img
                        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        alt=""
                        width="150"
                        height="120"
                      />
                    </picture>
                  </div>
                  <div className="chapter_head_heading_new">
                    <h1>{chapter.Title}</h1>
                    </div>
            {chapter.sections.map((article, index) => (
              <article className="section chapter-content-container" id={article.slug} key={article.id}>
                 <div className="chapter_body_padding"> 
                  <div className="section__heading">
                    <h2 className="section_number_chap">{index+1}.</h2>
                    <span className="section__bar" />
                    <h2>{article.Title}</h2>
                    <a href={`#${article.slug}`} className="section__anchor">
                      <span aria-hidden="true">
                        {/* # */}
                      </span>
                      <span className="screen-reader-text">
                        {`Section titled ${article.Title}`}
                      </span>
                    </a>
                  </div>

                  <div
                    className="section__content"
                    dangerouslySetInnerHTML={{ __html: article.Content }}
                  />
                </div>
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
        currentchapter={chapter.Chapter_No}
        isHindi={true}
      />
    <section className="seggestion-section-chapter-page">
      <div className="wrapper">
          <div className="suggestion_head">
            <h2>You may also like</h2>
          </div>
          <div className="card_suggestion_container">
          <ul className="card_suggestion_ul">
          {chapters.map((chap, index) => {
            if(chapter.Chapter_No !== chap.Chapter_No && index < 9)
            return (
              <li className="suggestion_card">
                <Link key={chap.index} href={`/hn/${chap.slug}`}>
                  <a>
                <div className="suggestion_img_container">
                  <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chap.icon.url}`} />
                  <div className="text_suggestion_container">
                  <div className="suggestion_roam">
                    <p>{romanizeNumber(chap.Chapter_No)}</p>
                  </div>
                  <div className="chapter_suggestion_head">
                    <h4>{chap.TitleHindi}</h4>
                  </div>
                </div>
                </div>
                </a>
              </Link>
              </li>
            );
          }
          
          )}
        </ul>
          </div>
        <div className="suggesstion_card_container">

        </div>
      </div>   
    </section>
      <Carousel youtube={homepage.youtube} />

      <a href="#top-of-site-pixel-anchor" type="button" className="back-top">
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
  const homepage = await fetchAPI('/homepage');
  const chapter = await fetchAPI(`/chapters?slug=${params.chapter}`);
  const chapters = await fetchAPI(`/chapters`);

  return {
    props: { homepage,chapter: chapter[0], chapters },
    revalidate: 1,
  };
}

export default Chapter;
