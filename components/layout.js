import Footer from 'components/footer/footer';

export default function Layout({ children }) {
  return (
    <>
      <main className="home">{children}</main>
      <Footer />
    </>
  );
}
