import Footer from 'components/footer/footer';
import Skiplink from 'components/skiplink/skiplink';

export default function Layout({ children }) {
  return (
    <>
      <a href="no-link" id="top-of-site-pixel-anchor" tabIndex="-1">
        -
      </a>
      <Skiplink />
      {children}
      <Footer />
    </>
  );
}
