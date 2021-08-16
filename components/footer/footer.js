import Image from 'next/image';
import * as data from './footer_data';

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
          <p>{data.Dashboards.name}</p>
          {data.Dashboards.links.map((link) => (
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
          <p>{data.Budget_Datasets.name}</p>
          {data.Budget_Datasets.links.map((link) => (
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
          <p>{data.OBI_Platform.name}</p>
          {data.OBI_Platform.links.map((link) => (
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
          {data.Attr_Links.links.map((link) => (
            <a
              rel="noopener noreferrer"
              href={link.value}
              target="_blank"
              className="link footer_link"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="footer__attr__logos">
          {data.Attr_Logos.links.map((link) => (
            <a
              rel="nofollow noopener noreferrer"
              href={link.value}
              target="_blank"
              className="link footer_link"
            >
              <Image
                src={link.src}
                alt={link.alt}
                layout="fixed"
                width={67}
                height={23}
              />
            </a>
          ))}
        </div>

        <div className="footer__attr__social">
          {data.Attr_Social.links.map((link) => (
            <a
              rel="nofollow noopener noreferrer"
              href={link.value}
              target="_blank"
              className="link footer_link"
            >
              <Image
                src={link.src}
                alt={link.alt}
                layout="fixed"
                width={23}
                height={23}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
