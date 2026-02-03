import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen grid grid-rows-[60px_1fr_80px] font-sans bg-zinc-50 dark:bg-black">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
