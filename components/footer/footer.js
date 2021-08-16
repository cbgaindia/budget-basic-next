import Image from 'next/image';

const Dashboards = {
  name: 'Dashboards',
  links: [
    {
      title: 'Union Budget Explorer 2021-22',
      value: 'https://union.openbudgetsindia.org/en/',
    },
    {
      title: 'Union Budget Explorer 2020-21',
      value: 'https://union2020.openbudgetsindia.org/en/',
    },
    {
      title: 'Union Budget Explorer 2019-20',
      value: 'https://union2019.openbudgetsindia.org/en/',
    },
    {
      title: 'Union Budget Explorer 2019-20 (I)',
      value: 'https://union2019i.openbudgetsindia.org/en/',
    },
    {
      title: 'Union Budget Explorer 2018-19',
      value: 'https://union2018.openbudgetsindia.org/en/',
    },
    {
      title: 'Himachal Pradesh Fiscal Data Explorer',
      value: 'https://hp.openbudgetsindia.org/',
    },
    {
      title: 'Assam Budget Explorer 2020-21',
      value: 'https://assam2020.openbudgetsindia.org/en/',
    },
    {
      title: 'Assam Budget Explorer 2019-20',
      value: 'https://assam2019.openbudgetsindia.org/en/',
    },
    {
      title: 'Balasore District Treasury',
      value:
        'https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true',
    },
    {
      title: 'Krishna District Treasury',
      value:
        'https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true',
    },
    {
      title: 'Schemes Dashboard',
      value: 'https://schemes.openbudgetsindia.org',
    },
    {
      title: 'Story Generator',
      value: 'https://cbgaindia.github.io/story-generator',
    },
  ],
};

const Budget_Datasets = {
  name: 'Budget Datasets',
  links: [
    {
      title: 'Government-wise Budget Data',
      value: 'https://openbudgetsindia.org/organization',
    },
    {
      title: 'Sector-wise Budget Data',
      value: 'https://openbudgetsindia.org/group',
    },
    {
      title: 'All Datasets',
      value: 'https://openbudgetsindia.org/dataset',
    },
  ],
};

const OBI_Platform = {
  name: 'OBI Platform',
  links: [
    {
      title: 'How to use the OBI Platform',
      value: 'https://openbudgetsindia.org/pages/how-to-use-the-portal',
    },
    {
      title: 'FAQs on the Platform',
      value: 'https://openbudgetsindia.org/pages/faqs',
    },
    {
      title: 'About OBI Platform',
      value: 'https://openbudgetsindia.org/about',
    },
    {
      title: 'Video: OBI Platform',
      value: 'https://youtu.be/xKjzH1ZB3c4',
    },
    {
      title: 'Video: Budget Basics',
      value: 'https://youtu.be/fGxNh5Xfn2I',
    },
    {
      title: 'Video: Budget Basics (Hindi)',
      value: 'https://www.youtube.com/watch?v=TovrkaW5HZY',
    },
  ],
};

const Footer = () => (
  <footer className="footer">
    <div className="footer__main footer__wrapper">
      <a
        rel="noopener noreferrer"
        className="footer__logo"
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

      <div className="footer__links">
        <section className="footer__links__section">
          <p>{Dashboards.name}</p>
          {Dashboards.links.map((link) => (
            <a
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </section>

        <section className="footer__links__section">
          <p>{Budget_Datasets.name}</p>
          {Budget_Datasets.links.map((link) => (
            <a
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </section>

        <section className="footer__links__section">
          <p>{OBI_Platform.name}</p>
          {OBI_Platform.links.map((link) => (
            <a
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </section>
      </div>
    </div>

    <div className="footer__attr">
      <div className="footer__attr__wrapper footer__wrapper">
        <div className="footer__attr__links">
          <a
            rel="noopener noreferrer"
            href="https://openbudgetsindia.org/pages/disclaimers"
            target="_blank"
            className="link footer_link"
          >
            Disclaimer
          </a>
          <a
            rel="noopener noreferrer"
            className="link footer_link"
            href="https://openbudgetsindia.org/pages/license"
            target="_blank"
          >
            License
          </a>
          <a
            rel="noopener noreferrer"
            className="link footer_link"
            href="https://openbudgetsindia.org/contact"
            target="_blank"
          >
            Contact Us
          </a>
        </div>

        <div className="footer__attr__logos">
          <a
            rel="nofollow noopener noreferrer"
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            className="link footer_link"
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
            className="link footer_link"
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

        <div className="footer__attr__social">
          <a
            rel="nofollow noopener noreferrer"
            className="link footer_link"
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
            className="link footer_link"
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
            className="link footer_link"
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
