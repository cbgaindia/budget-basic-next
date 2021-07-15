const ArticleFooter = ({ back, forward }) => (
  <footer className="footer articleFooter">
    <div className="wrapper">
      <section className="back">
        {back != undefined && (
          <a className="back" href={`/${back.slug}`}>
            <img
              src="assets/icons/arrowBack.svg"
              alt="back arrow budget basics"
            />
            <span>
              <p>go back to</p>
              <h2>{back.Title}</h2>
            </span>
          </a>
        )}
      </section>

      <section className="forward">
        {forward != undefined && (
          <>
            <a className="forward" href={`/${forward.slug}`}>
              <img
                src="assets/icons/arrowBack.svg"
                alt="back arrow budget basics"
              />
              <span>
                <p>read next</p>
                <h2>{forward.Title}</h2>
              </span>
            </a>
          </>
        )}
      </section>
    </div>
  </footer>
);

export default ArticleFooter;
