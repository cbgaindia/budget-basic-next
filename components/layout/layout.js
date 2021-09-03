import Footer from 'components/footer/footer';
import Skiplink from 'components/skiplink/skiplink';

export default function Layout({ children }) {
  return (
    <>
      <Skiplink />
      {children}
      <Footer />
    </>
  );
}
