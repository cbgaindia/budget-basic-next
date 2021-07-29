import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { fetchAPI } from 'lib/api';
import { sortList, LocaleString } from 'utils/helpers';
import Seo from 'components/seo';
import Header from 'components/header';
import ArticleFooter from 'components/footers/articlefooter';
import Article from 'components/article';
import Menu from 'components/menu';
import { useMediaQuery } from 'react-responsive';
import useLayoutEffect from 'utils/use-isomorphic-layout-effect';

function handleSidebarAnimation() {
  const articles = gsap.utils.toArray('article');
  articles.forEach((article) => {
    const sideLink = document.querySelector(
      `div[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: 'st-id',
      trigger: article,
      start: 'top 60px',
      end: 'bottom 10px',
      refreshPriority: 1,
      toggleActions: 'restart complete reverse reset',
      onEnter() {
        sideLink.classList.add('activeSidebar');
      },
      onLeave() {
        sideLink.classList.remove('activeSidebar');
      },
      onEnterBack() {
        sideLink.classList.add('activeSidebar');
      },
      onLeaveBack() {
        sideLink.classList.remove('activeSidebar');
      },
    });
  });
}

function handleSubheadingAnimation() {
  const subheadings = gsap.utils.toArray('h3');
  subheadings.forEach((subheading) => {
    const subLink = document.querySelector(
      `li[subid=${subheading.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: 'subheading-id',
      trigger: subheading,
      start: 'top 60px',
      end: 'bottom 10px',
      refreshPriority: 1,
      toggleActions: 'restart complete reverse reset',
      onEnter() {
        if (document.querySelector('.activeSubLink'))
          document
            .querySelector('.activeSubLink')
            .classList.remove('activeSubLink');
        subLink.classList.add('activeSubLink');
      },
      // onLeave() {
      //   subLink.classList.remove('activeSidebar');
      // },
      onEnterBack() {
        subLink.classList.add('activeSubLink');
      },
      onLeaveBack() {
        subLink.classList.remove('activeSubLink');
      },
    });
  });
}

function sidebarSticky() {
  ScrollTrigger.create({
    trigger: '.sidebar',
    id: 'st-sticky-id',
    start: 'top 15px',
    end: (self) =>
      `+=${
        document.querySelector('.articles').offsetHeight - self.pin.offsetHeight
      }`,
    pin: '.dropdown-content',
  });
}

function generateSubHeadings() {
  // adding ids to h3 tags (subheadings)
  const allHeadings = document.querySelectorAll('h3');
  allHeadings.forEach((heading) => {
    const text = heading.childNodes[0].innerText;
    const id = text.toLowerCase().replace(/\W/g, '-');
    heading.setAttribute('id', id);
  });

  // adding subheadings to the sidebar for each article
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    const subHeadings = article.querySelectorAll('h3');
    if (subHeadings.length > 0) {
      const sideLink = document.querySelector(
        `div[keyid=${article.getAttribute('id')}]`
      );
      const subHeadingList = sideLink.querySelector('ul');
      subHeadings.forEach((subHeading) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerHTML = subHeading.childNodes[0].innerText;
        a.setAttribute('href', `#${subHeading.id}`);
        li.setAttribute('subid', subHeading.id);
        li.appendChild(a);
        subHeadingList.appendChild(li);
      });
    }
  });
}

const Chapter = ({ chapter, chapters }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 1001px)` });

  useEffect(() => {
    generateSubHeadings();
    handleSubheadingAnimation();
    return () => {
      if (ScrollTrigger.getById('subheading-id')) {
        ScrollTrigger.getById('subheading-id').kill();
      }
    };
  }, []);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (chapter.articles.length > 0) {
      handleSidebarAnimation();
      sidebarSticky();

      document.querySelectorAll('img').forEach((img) => {
        if (img.complete) {
          ScrollTrigger.refresh();
        } else {
          img.addEventListener('load', () => ScrollTrigger.refresh());
        }
      });
    }
    return () => {
      if (ScrollTrigger.getById('st-id')) {
        ScrollTrigger.getById('st-sticky-id').kill();
        ScrollTrigger.getById('st-id').kill();
      }
    };
  }, [isMobile, chapter]);

  sortList(chapter.articles);
  sortList(chapters);

  const seo = {
    metaTitle: chapter.Title,
    metaDescription: chapter.Desc,
    article: true,
  };

  function headerDesc() {
    return <h2>{chapter.Title}</h2>;
  }

  return (
    <div>
      <Seo seo={seo} />

      <Header desc={headerDesc()} color="#29314F" />
      {isMobile && chapter.articles.length > 0 && (
        <Menu chapter={chapter} key="mobilemenu" isMobile={isMobile} />
      )}
      {chapter.articles.length > 0 ? (
        <div className="content wrapper">
          <div className="sidebarPlaceholder">
            <section className="sidebar" key="desktopSidebar">
              <ul className="dropdown-content">
                {chapter.articles.map((article, index) => (
                  <div key={`menu-${article.id}`} keyid={article.slug}>
                    <li className="sidebarLink">
                      <a href={`#${article.slug}`}>
                        <p>{LocaleString(index + 1)}</p>
                        <p>{article.Title}</p>
                      </a>
                    </li>

                    <ul className="subHeading" />
                  </div>
                ))}
              </ul>
            </section>
          </div>

          <section className="articles">
            {chapter.articles.map((article) => (
              <article id={article.slug} key={article.id}>
                <div className="article_heading">
                  <span />
                  <h2>
                    {article.Title}
                    <a href={`#${article.slug}`} className="header-anchor">
                      #
                    </a>
                  </h2>
                </div>

                <Article article={article.Content} />
              </article>
            ))}
          </section>
        </div>
      ) : (
        <div className="noContent">
          <p>To be updated soon</p>
        </div>
      )}

      <ArticleFooter
        back={chapters[chapter.Chapter_No - 2]}
        forward={chapters[chapter.Chapter_No]}
      />
    </div>
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
