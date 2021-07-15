import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LocaleString } from 'utils/helpers';

function handleSidebarAnimation() {
  const articles = gsap.utils.toArray('article');
  articles.forEach((article) => {
    const sideLink = document.querySelector(
      `li[keyid=${article.getAttribute('id')}]`
    );
    ScrollTrigger.create({
      id: 'st-id',
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

function sidebarSticky() {
  ScrollTrigger.create({
    trigger: '.articles',
    start: 'top 15px',
    id: 'st-sticky',
    end: (self) =>
      `+=${
        document.querySelector('.articles').offsetHeight - self.pin.offsetHeight
      }`,
    pin: '.sidebar',
    pinSpacing: false,
  });
}

const Sidebar = ({ chapter }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    handleSidebarAnimation();
    sidebarSticky();

    document.querySelectorAll('img').forEach((img) => {
      if (img.complete) {
        ScrollTrigger.refresh();
      } else {
        img.addEventListener('load', () => ScrollTrigger.refresh());
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="sidebar">
      <ul className="dropdown-content">
        {chapter.articles.map((article, index) => (
          <li key={`menu-${article.id}`} keyid={article.slug}>
            <a href={`#${article.slug}`}>
              <p>{LocaleString(index + 1)}</p>
              <p>{article.Title}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
