// Sort the chapters/sections based on their No.
export function sortList(list) {
  list.sort((a, b) => {
    let first;
    let second;
    if (a.Chapter_No) {
      first = Number(a.Chapter_No);
      second = Number(b.Chapter_No);
    } else {
      first = Number(a.Section_No);
      second = Number(b.Section_No);
    }
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
  return list;
}

// Generate LocaleString
export function LocaleString(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

// Truncate String
export function Truncate(str, length) {
  if (str.length <= length) return str;
  return `${str.substring(0, length)} ...`;
}

function generateAlphabets() {
  const alpha = Array.from(Array(26)).map((e, i) => i + 97);
  const alphabets = alpha.map((x) => String.fromCharCode(x));
  return alphabets;
}

// Generate subheading for Sidebar/Menu
export function generateSubHeadings() {
  // adding ids to h3 tags (subheadings)
  const allHeadings = document.querySelectorAll('h3');
  allHeadings.forEach((heading) => {
    const text = heading.childNodes[0].innerText;
    const id = text.toLowerCase().replace(/\W/g, '-');
    heading.setAttribute('id', id);
    heading.setAttribute('class', 'section__sub-heading');
  });

  // adding subheadings to the sidebar for each article
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    const subHeadings = article.querySelectorAll('h3');
    if (subHeadings.length > 0) {
      const sideLink = document.querySelector(
        `[keyid=${article.getAttribute('id')}]`
      );
      const subHeadingList = sideLink.querySelector('.sub-heading');

      // if list is already populated, return
      if (subHeadingList.childNodes.length > 0) return;

      // else populate
      const alphabets = generateAlphabets();
      subHeadings.forEach((subHeading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const alpha = document.createElement('p');
        const text = document.createElement('p');
        alpha.innerHTML = `${alphabets[index]}.`;
        a.appendChild(alpha);
        text.innerHTML = subHeading.childNodes[0].innerText;
        a.appendChild(text);
        a.setAttribute('href', `#${subHeading.id}`);
        li.setAttribute('subid', subHeading.id);
        li.setAttribute('class', 'sub-heading__link');
        li.appendChild(a);
        subHeadingList.appendChild(li);
      });
    }
  });
}

function addTableHead(table, row) {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  row.querySelectorAll('td').forEach((td) => {
    const th = document.createElement('th');
    th.innerHTML = td.innerHTML;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  return thead;
}

// Zebra strip table
export function stripTable() {
  const tables = document.querySelectorAll('table');
  tables.forEach((table) => {
    let check = 1;
    const rows = table.querySelectorAll('tr');
    let rowspan = 0;
    let isRowspan = false;

    if (!table.tHead) {
      const thead = addTableHead(table, rows[0]);
      table.insertBefore(thead, table.children[0]);
      table.children[1].children[0].remove();
    }

    rows.forEach((tr, index) => {
      const tds = tr.querySelectorAll('td');
      tds.forEach((td) => {
        const rowLength = td.getAttribute('rowspan');
        if (rowLength) {
          isRowspan = true;
          rowspan = Number(rowLength);
        }
        if (index == 0) {
          td.setAttribute('role', 'columnheader');
        }
      });
      if (!isRowspan && check == 1) {
        tr.classList.add('solitude');
        check *= -1;
      } else if (isRowspan && check == 1) {
        tr.classList.add('solitude');
        rowspan -= 1;
        if (rowspan == 0) {
          isRowspan = false;
          check *= -1;
          tr.classList.add('sol_border');
        }
      } else if (isRowspan && check == -1) {
        rowspan -= 1;
        if (rowspan == 0) {
          isRowspan = false;
          check *= -1;
          tr.classList.add('sol_border');
        }
      } else {
        check *= -1;
        tr.classList.add('sol_border');
      }
    });
  });
}

// adds the tooltip over links with href="#"
export function tooltipKeyword(chapter) {
  const tooltipKeywords = document.querySelectorAll('a[href="#"]');
  tooltipKeywords.forEach((keyword, index) => {
    const tooltip = chapter.tooltips.find(
      (obj) => obj.keyword.toLowerCase() == keyword.innerText.toLowerCase()
    );
    keyword.addEventListener('click', (e) => {
      e.preventDefault();
    });
    keyword.setAttribute(
      'aria-describedby',
      `${chapter.slug}-tooltip-${index}`
    );
    keyword.setAttribute('class', 'tooltip-wrapper');

    if (tooltip) {
      const span = document.createElement('span');
      span.setAttribute('role', 'tooltip');
      span.setAttribute('class', 'tooltip');
      span.setAttribute('id', `${chapter.slug}-tooltip-${index}`);
      span.innerText = tooltip.desc;
      keyword.appendChild(span);
    }
  });
}

// Debounce Function
export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
