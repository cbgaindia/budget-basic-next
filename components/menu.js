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
      `div[keyid=${article.getAttribute('id')}]`
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
      id: `subheading-mobile-id`,
      trigger: subheading,
      start: 'top 70px',
      endTrigger: () =>
        index == subheadings.length - 1 ? '.footer' : subheadings[index + 1],
      end: () => (index < subheadings.length ? 'top 70px' : 'end 70px'),
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

const Menu = ({ chapter, isMobile }) => {
  function disableScroll() {
    document.querySelector('.menu-dropdown').classList.toggle('active');
    document.querySelector('body').classList.toggle('disable_scroll');
    document.querySelector('.articles').classList.toggle('addBlur');
  }

  function handleContentClick() {
    disableScroll();
    document.querySelector('.mobileContent').classList.toggle('active');
    document.querySelector('.searchIcon').classList.toggle('hide');
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (isMobile) {
      handleMenuAnimation();
      generateSubHeadings();
      handleSubheadingAnimation();

      document.querySelectorAll('.subHeading li').forEach((list) => {
        list.addEventListener('click', handleContentClick, { passive: true });
      });
    }

    return () => {
      if (ScrollTrigger.getById('st-id-mobile')) {
        ScrollTrigger.getById('st-id-mobile').kill();
      }

      document.querySelectorAll('.subHeading li').forEach((list) => {
        list.removeEventListener('click', handleContentClick);
      });
    };
  }, [isMobile, chapter]);

  return (
    <nav className="menu-dropdown" key="menu-dropdown">
      <section className="mobileContent">
        <button type="button" onClick={handleContentClick} className="dropbtn">
          <p>Sections</p>
          <img
            className="menuArrow"
            alt="menu arrow"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOSA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC41OTc4MyA1TDkgMEwwIC0zLjkzNDAyZS0wN0w0LjU5NzgzIDVaIiBmaWxsPSIjNjA0Mjk0Ii8+Cjwvc3ZnPgo="
          />
        </button>
        <ul className="dropdown-content-mobile">
          {chapter.sections.map((article, index) => (
            <div key={`menu-${article.id}`} keyid={article.slug}>
              <li className="menubarLink">
                <a href={`#${article.slug}`} onClick={handleContentClick}>
                  <p>{LocaleString(index + 1)}</p>
                  <p>{article.Title}</p>
                </a>
              </li>

              <ul className="subHeading" />
            </div>
          ))}
        </ul>
      </section>

      <section className="searchMenu" key="searchMenu">
        <Link href="/search">
          <a>
            <img
              className="searchIcon"
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
