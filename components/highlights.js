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
        .querySelector('.highlights-container .forward')
        .classList.remove('disabled');
      document
        .querySelector('.highlights-container .back')
        .classList.add('disabled');
    } else if (pos == data.length - 1) {
      document
        .querySelector('.highlights-container .back')
        .classList.remove('disabled');

      document
        .querySelector('.highlights-container .forward')
        .classList.add('disabled');
    } else if (document.querySelector('.highlights-container .disabled'))
      document
        .querySelector('.highlights-container .disabled')
        .classList.remove('disabled');
  }, [pos, data.length]);

  return (
    <div className="highlights-container">
      <div className="wrapper">
        <span />
        <p className="highlight-text">{data[pos].Text}</p>
        <div className="controls">
          <button
            type="button"
            className="back"
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
            className="forward"
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
