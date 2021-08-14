import React, { useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Carousel = ({ youtube }) => {
  function updateSlider(n) {
    document.querySelector('.videos_container').scrollLeft += n * 300;
  }

  function buttonDisable() {
    document.querySelector('.videos_container').addEventListener(
      'scroll',
      () => {
        const { scrollLeft, scrollWidth, clientWidth } =
          document.querySelector('.videos_container');
        const scrollLeftMax = scrollWidth - clientWidth;
        if (scrollLeft <= 0) {
          document
            .querySelector('.footer-carousel .forward')
            .classList.remove('disabled');
          document
            .querySelector('.footer-carousel .back')
            .classList.add('disabled');
        }
        if (scrollLeft >= scrollLeftMax - 10) {
          document
            .querySelector('.footer-carousel .back')
            .classList.remove('disabled');

          document
            .querySelector('.footer-carousel .forward')
            .classList.add('disabled');
        } else if (
          scrollLeft > 10 &&
          scrollLeft < scrollLeftMax &&
          document.querySelector('.footer-carousel .disabled')
        )
          document
            .querySelector('.footer-carousel .disabled')
            .classList.remove('disabled');
      },
      { passive: true }
    );
  }

  function scrollOnDrag() {
    const slider = document.querySelector('.videos_container');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener(
      'mousedown',
      (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      },
      { passive: true }
    );
    slider.addEventListener(
      'mouseleave',
      () => {
        isDown = false;
        slider.classList.remove('active');
      },
      { passive: true }
    );
    slider.addEventListener(
      'mouseup',
      () => {
        isDown = false;
        slider.classList.remove('active');
      },
      { passive: true }
    );
    slider.addEventListener(
      'mousemove',
      (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
      },
      { passive: true }
    );
  }

  function handleVideoLink(link) {
    if (link.includes('embed')) {
      const splitLink = link.split('/');
      return splitLink[splitLink.length - 1];
    }
    if (link.includes('watch')) {
      const splitLink = link.split('=');
      return splitLink[splitLink.length - 1];
    }
    return link;
  }

  useEffect(() => {
    if (document.querySelector('.videos_container').scrollLeft == 0)
      document
        .querySelector('.footer-carousel .back')
        .classList.add('disabled');

    buttonDisable();
    scrollOnDrag();
  }, []);

  return (
    <div className="footer-carousel">
      <div className="wrapper">
        <p className="carousel-heading">Related Videos</p>
        <div className="controls">
          <button
            type="button"
            className="back"
            onClick={() => updateSlider(-1)}
            onKeyPress={() => updateSlider(-1)}
          >
            <img
              width="24"
              height="15"
              src="/assets/icons/header_navigation.png"
              alt="highlight back"
            />
          </button>
          <button
            type="button"
            className="forward"
            onClick={() => updateSlider(1)}
            onKeyPress={() => updateSlider(1)}
          >
            <img
              width="24"
              height="15"
              src="/assets/icons/header_navigation.png"
              alt="highlight forward"
            />
          </button>
        </div>
        <div className="videos_container">
          <div className="videos">
            {youtube.map((video) => (
              <LiteYouTubeEmbed
                id={handleVideoLink(video.link)}
                title={video.title}
                noCookie
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
