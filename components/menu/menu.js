import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocaleString, generateSubHeadings } from 'utils/helpers';
import useIsomorphicLayoutEffect from 'utils/use-isomorphic-layout-effect';
import Link from 'next/link';

function handleMenuAnimation() {
  const articles = gsap.utils.toArray('article');

  articles.forEach((article, index) => {
    const sideLink = document.querySelector(
      `[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: `st-id-${index}`,
      trigger: article,
      start: 'top 100px',
      endTrigger: () =>
        index == articles.length - 1 ? '.footer' : articles[index + 1],
      end: () => (index < articles.length ? 'top 100px' : 'end 100px'),
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
      id: `subheading-mobile-id`,
      trigger: subheading,
      start: 'top 70px',
      endTrigger: () =>
        index == subheadings.length - 1 ? '.footer' : subheadings[index + 1],
      end: () => (index < subheadings.length ? 'top 70px' : 'end 70px'),
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

const Menu = ({ chapter, isMobile }) => {
  function disableScroll() {
    document.querySelector('.menu').classList.toggle('menu--active');
    document.querySelector('body').classList.toggle('scroll--disable');
    document.querySelector('.chapter').classList.toggle('chapter--blur');
  }

  function handleContentClick(e) {
    e.stopPropagation();
    disableScroll();
    document
      .querySelector('.menu__dropdown')
      .classList.toggle('menu__dropdown--active');
    document
      .querySelector('.menu__search-icon')
      .classList.toggle('menu__search-icon--hide');
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (isMobile) {
      handleMenuAnimation();
      generateSubHeadings();
      handleSubheadingAnimation();

      document.querySelectorAll('.menu__dropdown li').forEach((list) => {
        list.addEventListener('click', handleContentClick);
      });
    }

    return () => {
      if (ScrollTrigger.getById('st-id-mobile')) {
        ScrollTrigger.getById('st-id-mobile').kill();
      }

      document.querySelectorAll('.menu__dropdown li').forEach((list) => {
        list.removeEventListener('click', handleContentClick);
      });
    };
  }, [isMobile, chapter]);

  return (
    <nav className="menu">
      <section className="menu__dropdown">
        <button
          type="button"
          onClick={handleContentClick}
          className="menu__button"
        >
          <p>Sections</p>
          <img
            className="menu__content-icon"
            alt="menu content arrow"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOSA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC41OTc4MyA1TDkgMEwwIC0zLjkzNDAyZS0wN0w0LjU5NzgzIDVaIiBmaWxsPSIjNjA0Mjk0Ii8+Cjwvc3ZnPgo="
          />
        </button>
        <ul className="content">
          {chapter.sections.map((article, index) => (
            <li
              className="content__container content__link"
              key={`menu-${article.id}`}
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
      </section>

      <section className="menu__search">
        <Link href="/search">
          <a>
            <img
              className="menu__search-icon"
              alt="menu arrow"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuOTMzMzMgMEMzLjEwNDE2IDAgMCAzLjEwNDE2IDAgNi45MzMzM0MwIDEwLjc2MjUgMy4xMDQxNiAxMy44NjY3IDYuOTMzMzMgMTMuODY2N0M4LjY1NTk0IDEzLjg2NjcgMTAuMjMxOCAxMy4yMzg1IDExLjQ0NDQgMTIuMTk4NkwxNS4wODk1IDE1Ljg0MzhMMTUuODQzOCAxNS4wODk1TDEyLjE5ODYgMTEuNDQ0NEMxMy4yMzg1IDEwLjIzMTggMTMuODY2NyA4LjY1NTk0IDEzLjg2NjcgNi45MzMzM0MxMy44NjY3IDMuMTA0MTYgMTAuNzYyNSAwIDYuOTMzMzMgMFoiIGZpbGw9IiM0QjQ3OTciLz4KPC9zdmc+Cg=="
            />
          </a>
        </Link>
      </section>
    </nav>
  );
};

export default Menu;
