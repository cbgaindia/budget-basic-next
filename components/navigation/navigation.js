import Link from 'next/link';

const Navigation = ({ back, forward }) => (
  <footer className="navigation">
    <div className="navigation__container wrapper">
      <section className="navigation__section">
        {back != undefined && (
          <Link href={`/${back.slug}`}>
            <a className="navigation__button navigation__button--back">
              <img src="assets/icons/arrowBack.svg" alt="" />
              <span>
                <p>go back to:</p>
                <h2>{back.Title}</h2>
              </span>
            </a>
          </Link>
        )}
      </section>

      <section className="navigation__section">
        {forward != undefined && (
          <>
            <Link href={`/${forward.slug}`}>
              <a className="navigation__button navigation__button--forward">
                <img src="assets/icons/arrowBack.svg" alt="" />
                <span>
                  <p>read next:</p>
                  <h2>{forward.Title}</h2>
                </span>
              </a>
            </Link>
          </>
        )}
      </section>
    </div>
  </footer>
);

export default Navigation;
