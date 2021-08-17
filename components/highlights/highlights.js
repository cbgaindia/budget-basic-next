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
            <img
              width="24"
              height="15"
              src="/assets/icons/header_navigation.png"
              alt="highlight back"
            />
          </button>
          <button
            type="button"
            className="highlights__forward"
            onClick={() => updateHighlight(1)}
            onKeyPress={() => updateHighlight(1)}
          >
            <img
              width="24"
              height="15"
              src="/assets/icons/header_navigation.png"
              alt="highlight forward"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Highlight;