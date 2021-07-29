import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocaleString } from 'utils/helpers';
import Search from 'components/search';
import useIsomorphicLayoutEffect from 'utils/use-isomorphic-layout-effect';

function handleMenuAnimation() {
  const articles = gsap.utils.toArray('article');

  articles.forEach((article) => {
    const sideLink = document.querySelector(
      `li[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: 'st-id-mobile',
      trigger: article,
      start: 'top 22%',
      end: 'bottom 18%',
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

function menuSticky() {
  ScrollTrigger.create({
    trigger: '.menu-dropdown',
    start: 'top top',
    id: 'st-sticky-mobile',
    refreshPriority: 1,
    end: (self) =>
      `+=${
        document.querySelector('.articles').offsetHeight - self.pin.offsetHeight
      }`,
    pin: '.menu-dropdown',
    pinSpacing: false,
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
  function handleSearchClick() {
    disableScroll();
    document.querySelector('.searchMenu').classList.toggle('active');
    document.querySelector('.dropbtn').classList.toggle('hide');
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ syncInterval: 999999999 });
    menuSticky();
    handleMenuAnimation();

    return () => {
      if (ScrollTrigger.getById('st-id-mobile')) {
        ScrollTrigger.getById('st-sticky-mobile').kill();
        ScrollTrigger.getById('st-id-mobile').kill();
      }
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
          {chapter.articles.map((article, index) => (
            <li key={`menu-${article.id}`} keyid={article.slug}>
              <a href={`#${article.slug}`} onClick={handleContentClick}>
                <p>{LocaleString(index + 1)}</p>
                <p>{article.Title}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="searchMenu" key="searchMenu">
        <Search resultClick onResultClick={handleSearchClick} />
        <button
          type="button"
          onClick={handleSearchClick}
          className="searchIcon"
        >
          <img
            className="menuSearch"
            alt="menu arrow"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuOTMzMzMgMEMzLjEwNDE2IDAgMCAzLjEwNDE2IDAgNi45MzMzM0MwIDEwLjc2MjUgMy4xMDQxNiAxMy44NjY3IDYuOTMzMzMgMTMuODY2N0M4LjY1NTk0IDEzLjg2NjcgMTAuMjMxOCAxMy4yMzg1IDExLjQ0NDQgMTIuMTk4NkwxNS4wODk1IDE1Ljg0MzhMMTUuODQzOCAxNS4wODk1TDEyLjE5ODYgMTEuNDQ0NEMxMy4yMzg1IDEwLjIzMTggMTMuODY2NyA4LjY1NTk0IDEzLjg2NjcgNi45MzMzM0MxMy44NjY3IDMuMTA0MTYgMTAuNzYyNSAwIDYuOTMzMzMgMFoiIGZpbGw9IiM0QjQ3OTciLz4KPC9zdmc+Cg=="
          />
        </button>
      </section>
    </nav>
  );
};

export default Menu;
