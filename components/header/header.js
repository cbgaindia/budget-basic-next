import React, { useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'pages/_app';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LanguageDropDown = ({isHindi}) => {
  const router = useRouter()
  const onSelectChange = () => {
      const locale = isHindi ? 'en' : 'hn';
      const { chapter } = router.query;
      let url = router.pathname;
    if(locale === 'hn') {
      if(!url.startsWith("/hn")){
        chapter ? router.push(`/hn/${chapter}`) : router.push(`/hn`)
       }
    } else {
      if(url.startsWith("/hn")){
        chapter ? router.push(`/${chapter}`) : router.push(`/`)
       }
    }
  }
  return (
      // <select name="languages" id="language-select" onChange={onSelectChange}>
      //     {['en','hn'].map((language) => (
      //         <option value={language} selected={ ( isHindi && language === 'hn') ? true : false }>
      //             {language === "en" ? "English" : language === "hn" ? "हिन्दी" : null}
      //         </option>
      //     ))}
      // </select>
      <div className="language-div" onClick={onSelectChange}>
        <span> {isHindi ? 'English' : 'हिन्दी' } </span>
      </div>
  )
}

const Header = ({ desc, color, searchPage, isHindi=false }) => {
  const { title } = useContext(GlobalContext);

  return (
    <header className="header" style={{ backgroundColor: color }}>
      <div className="header__container wrapper">
        <section className="branding">
          <Link href="/">
            <a>
              <h1 className="branding__logo">{title}</h1>
            </a>
          </Link>

          <span className="branding__seperator" />

          <a
            className="branding__obi"
            rel="noopener noreferrer"
            href="https://openbudgetsindia.org/"
          >
            <Image
              src="/assets/obi_header.png"
              alt="Open Budgets India"
              layout="fixed"
              width={201}
              height={28}
            />
          </a>
        </section>
        <section className='container-of-search'>
          {!searchPage && (
            <Link href="/search">
              <a className="header__search">
                { isHindi ? 'खोजें' : 'Search' } <span className="screen-reader-text">Page</span>
              </a>
            </Link>
          )}
          <LanguageDropDown isHindi={isHindi} />
        </section>
        {desc && <section className="header__desc">{desc}</section>}
      </div>
    </header>
  );
};

export default Header;
