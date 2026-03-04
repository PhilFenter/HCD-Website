import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import LocalBusinessJsonLd from "./LocalBusinessJsonLd";
import FloatingContactButton from "./FloatingContactButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessJsonLd />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Layout;
