import Footer from 'components/footer/footer';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
