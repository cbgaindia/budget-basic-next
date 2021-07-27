import React, { useEffect } from 'react';

const Carousel = () => {
  function updateSlider(n) {
    document.querySelector('.videos_container').scrollLeft += n * 300;
  }

  function buttonDisable() {
    document
      .querySelector('.videos_container')
      .addEventListener('scroll', () => {
        const { scrollLeft, scrollLeftMax } =
          document.querySelector('.videos_container');
        if (scrollLeft == 0) {
          document
            .querySelector('.footer-carousel .forward')
            .classList.remove('disabled');
          document
            .querySelector('.footer-carousel .back')
            .classList.add('disabled');
        }
        if (scrollLeft >= scrollLeftMax) {
          document
            .querySelector('.footer-carousel .back')
            .classList.remove('disabled');

          document
            .querySelector('.footer-carousel .forward')
            .classList.add('disabled');
        } else if (
          scrollLeft > 0 &&
          scrollLeft < scrollLeftMax &&
          document.querySelector('.footer-carousel .disabled')
        )
          document
            .querySelector('.footer-carousel .disabled')
            .classList.remove('disabled');
      });
  }

  function scrollOnDrag() {
    const slider = document.querySelector('.videos_container');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  useEffect(() => {
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
              src="/assets/icons/header_navigation.png"
              alt="highlight forward"
            />
          </button>
        </div>
        <div className="videos_container">
          <div className="videos">
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
            <div>
              <span>
                <img alt="" src="/assets/icons/play.png" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
