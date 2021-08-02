import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { fetchAPI } from 'lib/api';
import { sortList, LocaleString, generateSubHeadings } from 'utils/helpers';
import useWindowDimensions from 'utils/useWindowDimensions';
import Seo from 'components/seo';
import Header from 'components/header';
import ArticleFooter from 'components/footers/articlefooter';
import Article from 'components/article';
import Menu from 'components/menu';
import useLayoutEffect from 'utils/use-isomorphic-layout-effect';

function handleSidebarAnimation() {
  const articles = gsap.utils.toArray('article');
  articles.forEach((article) => {
    const sideLink = document.querySelector(
      `div[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: `st-id`,
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
  subheadings.forEach((subheading, index) => {
    const subLink = document.querySelector(
      `li[subid=${subheading.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: `subheading-id`,
      trigger: subheading,
      start: 'top 60px',
      endTrigger: () =>
        index == subheadings.length - 1 ? '.footer' : subheadings[index + 1],
      end: () => (index < subheadings.length ? 'top 60px' : 'end 60px'),
      refreshPriority: 1,
      toggleActions: 'restart complete reverse reset',
      onEnter() {
        subLink.classList.add('activeSubLink');
      },
      onLeave() {
        subLink.classList.remove('activeSubLink');
      },
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

function stripTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach((table) => {
    let check = 1;
    const rows = table.querySelectorAll('tr');
    let rowspan = 0;
    let isRowspan = false;

    rows.forEach((tr) => {
      const tds = tr.querySelectorAll('td');
      tds.forEach((td) => {
        const rowLength = td.getAttribute('rowspan');
        if (rowLength) {
          isRowspan = true;
          rowspan = Number(rowLength);
        }
      });
      if (!isRowspan && check == 1) {
        tr.classList.add('solitude');
        check *= -1;
      } else if (isRowspan && check == 1) {
        tr.classList.add('solitude');
        rowspan -= 1;
        if (rowspan == 0) {
          isRowspan = false;
          check *= -1;
          tr.classList.add('sol_border');
        }
      } else if (isRowspan && check == -1) {
        rowspan -= 1;
        if (rowspan == 0) {
          isRowspan = false;
          check *= -1;
          tr.classList.add('sol_border');
        }
      } else {
        check *= -1;
        tr.classList.add('sol_border');
      }
    });
  });
}

const Chapter = ({ chapter, chapters }) => {
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (chapter.articles.length > 0) {
      if (width >= 1001) {
        sidebarSticky();
        handleSidebarAnimation();
        generateSubHeadings();
        handleSubheadingAnimation();
      }

      stripTable();

      document.querySelectorAll('img').forEach((img) => {
        if (img.complete) {
          ScrollTrigger.refresh();
        } else {
          img.addEventListener('load', () => ScrollTrigger.refresh(), {
            passive: true,
          });
        }
      });

      const tooltipKeywords = document.querySelectorAll('p a[href="#"]');
      tooltipKeywords.forEach((keyword, index) => {
        const tooltip = chapter.tooltips.find(
          (obj) => obj.keyword.toLowerCase() == keyword.innerText.toLowerCase()
        );
        keyword.addEventListener('click', (e) => {
          e.preventDefault();
        });
        keyword.setAttribute(
          'aria-describedby',
          `${chapter.slug}-tooltip-${index}`
        );
        keyword.setAttribute('class', 'tooltip-wrapper');

        if (tooltip) {
          const span = document.createElement('span');
          span.setAttribute('role', 'tooltip');
          span.setAttribute('class', 'tooltip');
          span.setAttribute('id', `${chapter.slug}-tooltip-${index}`);
          span.innerText = tooltip.desc;
          keyword.appendChild(span);
        }
      });
    }
    return () => {
      if (ScrollTrigger.getById('st-id')) {
        ScrollTrigger.getById('st-sticky-id').kill();
        ScrollTrigger.getById('st-id').kill();
      }
      if (ScrollTrigger.getById('subheading-id')) {
        ScrollTrigger.getById('subheading-id').kill();
      }
    };
  }, [chapter, width]);

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
      {width < 1000 && chapter.articles.length > 0 && (
        <Menu chapter={chapter} key="mobilemenu" isMobile={width < 1000} />
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
