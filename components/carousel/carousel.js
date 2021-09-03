import React, { useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function updateSlider(n) {
  const scrollPos = document.querySelector('.videos').scrollLeft;
  document
    .querySelector('.videos')
    .scrollTo({ left: scrollPos + n * 350, behavior: 'smooth' });
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
    scrollOnDrag();

    document.querySelectorAll('.lty-playbtn').forEach((playButton) => {
      playButton.setAttribute('role', 'tab');
    });
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__container wrapper">
        <p className="carousel__heading">Related Videos</p>
        <div className="carousel__controls">
          <button
            type="button"
            tabIndex="-1"
            className="carousel__back"
            onClick={() => updateSlider(-1)}
          >
            <span className="screen-reader-text">Previous Carousel Video</span>

            <svg
              width="24"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#ffffff"
            >
              <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
            </svg>
          </button>
          <button
            type="button"
            tabIndex="-1"
            className="carousel__forward"
            onClick={() => updateSlider(1)}
          >
            <span className="screen-reader-text">Next Carousel Video</span>

            <svg
              width="24"
              height="22"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#ffffff"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </button>
        </div>
        <ul className="videos" role="tablist">
          {youtube.map((video, index) => (
            <li
              key={`youtube-${index}`}
              role="presentation"
              title={video.title}
            >
              <LiteYouTubeEmbed
                key={`carousel-${index}`}
                id={handleVideoLink(video.link)}
                title={video.title}
                params="disablekb=1"
                noCookie
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
