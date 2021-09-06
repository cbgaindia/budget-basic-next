import React, { useEffect } from 'react';
import Link from 'next/link';

const Highlight = ({ data }) => {
  let pos = 0;

  function updateHighlight(n) {
    if (n == -1 && pos == 0) pos = data.length - 1;
    else if (n == 1 && pos == data.length - 1) pos = 0;
    else pos += n;

    document
      .querySelector(`.news__item--current`)
      .classList.remove('news__item--current');
    document
      .querySelector(`#highlight-${pos}`)
      .classList.add('news__item--current');
  }
  useEffect(() => {
    document.querySelector('#highlight-0').classList.add('news__item--current');
  }, []);

  return (
    <div className="highlights">
      <div className="highlights__container wrapper">
        <span className="highlights__bar" />

        <ul className="news" aria-live="polite">
          {data.map((highlight, index) => (
            <li
              key={`highlight-${index}`}
              id={`highlight-${index}`}
              className="news__item"
            >
              <span className="screen-reader-text">New Highlight:</span>
              {highlight.Link ? (
                <Link href={`${highlight.Link}`}>
                  <a className="highlights__text">{highlight.Text}</a>
                </Link>
              ) : (
                <p className="highlights__text">{highlight.Text}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="highlights__controls">
          <button
            type="button"
            className="highlights__back"
            onClick={() => updateHighlight(-1)}
          >
            <span className="screen-reader-text">Previous Highlight</span>
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
            className="highlights__forward"
            onClick={() => updateHighlight(1)}
          >
            <span className="screen-reader-text">Next Highlight</span>
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
      </div>
    </div>
  );
};

export default Highlight;
