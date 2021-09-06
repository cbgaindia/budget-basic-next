import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocaleString, generateSubHeadings } from 'utils/helpers';
import useLayoutEffect from 'utils/use-isomorphic-layout-effect';
import useWindowDimensions from 'utils/useWindowDimensions';

function handleSidebarAnimation() {
  const articles = gsap.utils.toArray('article');
  articles.forEach((article) => {
    const sideLink = document.querySelector(
      `[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: `st-id`,
      trigger: article,
      start: 'top 60px',
      end: 'bottom 10px',
      refreshPriority: 1,
      toggleActions: 'restart complete reverse reset',
      onEnter() {
        sideLink.classList.add('content--active');
      },
      onLeave() {
        sideLink.classList.remove('content--active');
      },
      onEnterBack() {
        sideLink.classList.add('content--active');
      },
      onLeaveBack() {
        sideLink.classList.remove('content--active');
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
        index == subheadings.length - 1
          ? subheading.parentElement.parentElement.nextSibling
          : subheadings[index + 1],
      end: () => (index < subheadings.length ? 'top 60px' : 'end 60px'),
      refreshPriority: 1,
      toggleActions: 'restart complete reverse reset',
      onEnter() {
        subLink.classList.add('sub-heading__link--active');
      },
      onLeave() {
        subLink.classList.remove('sub-heading__link--active');
      },
      onEnterBack() {
        subLink.classList.add('sub-heading__link--active');
      },
      onLeaveBack() {
        subLink.classList.remove('sub-heading__link--active');
      },
    });
  });
}

const Sidebar = ({ chapter }) => {
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (chapter.sections.length > 0) {
      if (width >= 768) {
        handleSidebarAnimation();
        generateSubHeadings();
        handleSubheadingAnimation();
      }

      document.querySelectorAll('img').forEach((img) => {
        if (img.complete) {
          ScrollTrigger.refresh();
        } else {
          img.addEventListener('load', () => ScrollTrigger.refresh(), {
            passive: true,
          });
        }
      });
    }

    return () => {
      if (ScrollTrigger.getById('st-id')) {
        ScrollTrigger.getById('st-id').kill();
      }
      if (ScrollTrigger.getById('subheading-id')) {
        ScrollTrigger.getById('subheading-id').kill();
      }
    };
  }, [chapter, width]);

  return (
    <nav className="sidebar">
      <ul className="content">
        {chapter.sections.map((article, index) => (
          <li
            className="content__container content__link"
            key={`sidebar-${article.id}`}
            keyid={article.slug}
          >
            <a href={`#${article.slug}`}>
              <p>{LocaleString(index + 1)}</p>
              <p>{article.Title}</p>
            </a>
            <ul className="sub-heading" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
