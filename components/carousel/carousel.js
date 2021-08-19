import React, { useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function updateSlider(n) {
  const scrollPos = document.querySelector('.videos').scrollLeft;
  document
    .querySelector('.videos')
    .scrollTo({ left: scrollPos + n * 350, behavior: 'smooth' });
}

function buttonDisable() {
  document.querySelector('.videos').addEventListener(
    'scroll',
    () => {
      const { scrollLeft, scrollWidth, clientWidth } =
        document.querySelector('.videos');
      const scrollLeftMax = scrollWidth - clientWidth;
      if (scrollLeft <= 0) {
        document
          .querySelector('.carousel .carousel__forward')
          .classList.remove('disabled');
        document
          .querySelector('.carousel .carousel__back')
          .classList.add('disabled');
      }
      if (scrollLeft >= scrollLeftMax - 10) {
        document
          .querySelector('.carousel .carousel__back')
          .classList.remove('disabled');

        document
          .querySelector('.carousel .carousel__forward')
          .classList.add('disabled');
      } else if (
        scrollLeft > 10 &&
        scrollLeft < scrollLeftMax &&
        document.querySelector('.carousel .disabled')
      )
        document
          .querySelector('.carousel .disabled')
          .classList.remove('disabled');
    },
    { passive: true }
  );
}

function scrollOnDrag() {
  const slider = document.querySelector('.videos');
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
  if (['embed', 'youtu.be'].some((keyword) => link.includes(keyword))) {
    const splitLink = link.split('/');
    return splitLink[splitLink.length - 1];
  }
  if (link.includes('watch')) {
    const splitLink = link.split('=');
    return splitLink[splitLink.length - 1];
  }
  return link;
}

const Carousel = ({ youtube }) => {
  useEffect(() => {
    if (document.querySelector('.videos').scrollLeft == 0)
      document
        .querySelector('.carousel .carousel__back')
        .classList.add('disabled');

    buttonDisable();
    scrollOnDrag();
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__container wrapper">
        <p className="carousel__heading">Related Videos</p>
        <div className="carousel__controls">
          <button
            type="button"
            className="carousel__back"
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
            className="carousel__forward"
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
        <div className="videos">
          <div className="videos__container">
            {youtube.map((video, index) => (
              <LiteYouTubeEmbed
                key={`carousel-${index}`}
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
