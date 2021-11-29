import Image from 'next/image';
import * as data from './footer_data';

const Footer = () => (
  <footer className="footer">
    {/* <div className="footer__main wrapper">
      <a
        rel="noopener noreferrer"
        className="footer__logo"
        href="https://openbudgetsindia.org/en/"
      >
        <Image
          src="/assets/obi_footer_square_logo.svg"
          alt="Open budgets India Footer"
          layout="intrinsic"
          width={234}
          height={138}
        />
      </a>

      <div className="footer__links">
        <section className="footer__links-section">
          <p>{data.Dashboards.name}</p>
          {data.Dashboards.links.map((link, index) => (
            <a
              key={`footer_link-1.${index}`}
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
            >
              {link.title}
            </a>
          ))}
        </section>

        <section className="footer__links-section">
          <p>{data.Budget_Datasets.name}</p>
          {data.Budget_Datasets.links.map((link, index) => (
            <a
              key={`footer_link-2.${index}`}
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
            >
              {link.title}
            </a>
          ))}
        </section>

        <section className="footer__links-section">
          <p>{data.OBI_Platform.name}</p>
          {data.OBI_Platform.links.map((link, index) => (
            <a
              key={`footer_link-3.${index}`}
              className="link footer_link"
              rel="noopener noreferrer"
              href={link.value}
            >
              {link.title}
            </a>
          ))}
        </section>
      </div>
    </div> */}

    <div className="attribute">
      <div className="attribute__container wrapper">
       
        <div className="footer_logo_new_container"> 
          <a
            rel="noopener noreferrer"
            className="footer__logo"
            href="https://openbudgetsindia.org/en/"
          >
            <Image
              src="/assets/obi_footer_square_logo.svg"
              alt="Open budgets India Footer"
              layout="intrinsic"
              width={80}
              height={30}
              className="footer_logo_img_new"
            />
          </a>
      </div>

        <div className="attribute__links">
         <p className="footer_text_rights">All Right Reserved 2021 @Open Budgets India</p>
        </div>

        <div className="attribute__social">
          {data.Attr_Social.links.map((link, index) => (
            <a
              key={`attr_social-${index}`}
              rel="nofollow noopener noreferrer"
              href={link.value}
              className="link footer_link"
            >
              <Image
                src={link.src}
                alt={link.alt}
                layout="fixed"
                width={30}
                height={30}
              />
            </a>
          ))}
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
