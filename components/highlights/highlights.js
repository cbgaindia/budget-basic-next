import React, { useState, useEffect } from 'react';

const Highlight = ({ data }) => {
  const [pos, setPos] = useState(0);

  function updateHighlight(n) {
    if (n == -1 && pos == 0) return;
    if (n == 1 && pos == data.length - 1) return;

    setPos(pos + n);
  }
  useEffect(() => {
    if (pos == 0) {
      document
        .querySelector('.highlights .highlights__forward')
        .classList.remove('disabled');
      document
        .querySelector('.highlights .highlights__back')
        .classList.add('disabled');
    } else if (pos == data.length - 1) {
      document
        .querySelector('.highlights .highlights__back')
        .classList.remove('disabled');

      document
        .querySelector('.highlights .highlights__forward')
        .classList.add('disabled');
    } else if (document.querySelector('.highlights .disabled'))
      document
        .querySelector('.highlights .disabled')
        .classList.remove('disabled');
  }, [pos, data.length]);

  return (
    <div className="highlights">
      <div className="highlights__container wrapper">
        <span className="highlights__bar" />
        <p className="highlights__text">{data[pos].Text}</p>
        <div className="highlights__controls">
          <button
            type="button"
            className="highlights__back"
            onClick={() => updateHighlight(-1)}
            onKeyPress={() => updateHighlight(-1)}
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
            onKeyPress={() => updateHighlight(1)}
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
