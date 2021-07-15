import Image from 'next/image';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-links-container">
      <a
        rel="noopener noreferrer"
        className="site-logo"
        href="https://openbudgetsindia.org/en/"
        target="_blank"
      >
        <Image
          src="/assets/obi_footer_square_logo.svg"
          alt="Open budgets India logo"
          layout="intrinsic"
          width={234}
          height={138}
        />
      </a>

      <div className="footer-links">
        <section className="links-container">
          <p>Dashboards</p>
          <div className="links dashboard-links">
            <a
              rel="noopener noreferrer"
              href="https://union.openbudgetsindia.org/en/"
              target="_blank"
            >
              Union Budget Explorer 2021-22
            </a>
            <a
              rel="noopener noreferrer"
              href="https://union2020.openbudgetsindia.org/en/"
              target="_blank"
            >
              Union Budget Explorer 2020-21
            </a>
            <a
              rel="noopener noreferrer"
              href="https://union2019.openbudgetsindia.org/en/"
              target="_blank"
            >
              Union Budget Explorer 2019-20
            </a>
            <a
              rel="noopener noreferrer"
              href="https://union2019i.openbudgetsindia.org/en/"
              target="_blank"
            >
              Union Budget Explorer 2019-20 (I)
            </a>
            <a
              rel="noopener noreferrer"
              href="https://union2018.openbudgetsindia.org/en/"
              target="_blank"
            >
              Union Budget Explorer 2018-19
            </a>
            <a
              rel="noopener noreferrer"
              href="https://hp.openbudgetsindia.org/"
              target="_blank"
            >
              Himachal Pradesh Fiscal Data Explorer
            </a>
            <a
              rel="noopener noreferrer"
              href="https://assam2020.openbudgetsindia.org/en/"
              target="_blank"
            >
              Assam Budget Explorer 2020-21
            </a>
            <a
              rel="noopener noreferrer"
              href="https://assam2019.openbudgetsindia.org/en/"
              target="_blank"
            >
              Assam Budget Explorer 2019-20
            </a>
            <a
              rel="noopener noreferrer"
              href="https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true"
              target="_blank"
            >
              Balasore District Treasury
            </a>
            <a
              rel="noopener noreferrer"
              href="https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true"
              target="_blank"
            >
              Krishna District Treasury
            </a>
            <a
              rel="noopener noreferrer"
              href="https://schemes.openbudgetsindia.org/"
              target="_blank"
            >
              Schemes Dashboard
            </a>
            <a
              rel="noopener noreferrer"
              href="https://cbgaindia.github.io/story-generator/"
              target="_blank"
            >
              Story Generator
            </a>
          </div>
        </section>
        <section className="links-container">
          <p>Budget Datasets</p>
          <div className="links">
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/organization"
              target="_blank"
            >
              Government-wise Budget Data
            </a>
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/group"
              target="_blank"
            >
              Sector-wise Budget Data
            </a>
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/dataset"
              target="_blank"
            >
              All Datasets
            </a>
          </div>
        </section>
        <section className="links-container">
          <p>OBI Platform</p>
          <div className="links">
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/pages/how-to-use-the-portal"
              target="_blank"
            >
              How to use the OBI Platform
            </a>
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/pages/faqs"
              target="_blank"
            >
              FAQs on the Platform
            </a>
            <a
              rel="noopener noreferrer"
              href="https://openbudgetsindia.org/about"
              target="_blank"
            >
              About OBI Platform
            </a>
            <a
              rel="noopener noreferrer"
              href="https://youtu.be/xKjzH1ZB3c4"
              target="_blank"
            >
              Video: OBI Platform
            </a>
            <a
              rel="noopener noreferrer"
              href="https://youtu.be/fGxNh5Xfn2I"
              target="_blank"
            >
              Video: Budget Basics
            </a>
            <a
              rel="noopener noreferrer"
              href="https://www.youtube.com/watch?v=TovrkaW5HZY"
              target="_blank"
            >
              Video: Budget Basics (Hindi)
            </a>
          </div>
        </section>
      </div>
    </div>

    <div className="attribution-container">
      <div className="wrapper">
        <div className="links-container">
          <a
            rel="noopener noreferrer"
            href="https://openbudgetsindia.org/pages/disclaimers"
            target="_blank"
          >
            Disclaimer
          </a>
          <a
            rel="noopener noreferrer"
            className="ml-24"
            href="https://openbudgetsindia.org/pages/license"
            target="_blank"
          >
            License
          </a>
          <a
            rel="noopener noreferrer"
            className="ml-24"
            href="https://openbudgetsindia.org/contact"
            target="_blank"
          >
            Contact Us
          </a>
        </div>
        <div className="attribution-logos">
          <a
            rel="nofollow noopener noreferrer"
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
          >
            <Image
              src="/assets/icons/cc-by-logo.svg"
              alt="cc logo obi"
              layout="fixed"
              width={67}
              height={23}
            />
          </a>
          <a
            rel="nofollow noopener noreferrer"
            href="https://opendefinition.org/od/2.1/en/"
            target="_blank"
          >
            <Image
              src="/assets/icons/open_data_logo.png"
              alt="open data logo obi"
              className="card-link-container"
              layout="fixed"
              width={80}
              height={15}
            />
          </a>
        </div>
        <div className="social-media-links">
          <a
            rel="nofollow noopener noreferrer"
            className="link github"
            href="https://github.com/cbgaindia"
            target="_blank"
          >
            <Image
              src="/assets/icons/github-icon.svg"
              alt="github logo obi"
              layout="fixed"
              width={23}
              height={23}
            />
          </a>
          <a
            rel="nofollow noopener noreferrer"
            className="link twitter ml-24"
            href="https://twitter.com/OpenBudgetsIn"
            target="_blank"
          >
            <Image
              src="/assets/icons/twitter-icon.svg"
              alt="twitter logo obi"
              layout="fixed"
              width={23}
              height={23}
            />
          </a>
          <a
            rel="nofollow noopener noreferrer"
            className="link facebook ml-24"
            href="https://www.facebook.com/OpenBudgetsIndia"
            target="_blank"
          >
            <Image
              src="/assets/icons/facebook-icon.svg"
              alt="facebook logo obi"
              layout="fixed"
              width={23}
              height={23}
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
