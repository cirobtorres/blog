import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function ContactPage() {
  return (
    <div className="h-full min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header />
      <main className="px-6 my-6">
        <div className="w-full max-w-300 h-full mx-auto">Contact</div>
      </main>
      <Footer />
    </div>
  );
}
