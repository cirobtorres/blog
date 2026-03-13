import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-header-height">
        <div className="px-6 my-6">
          <div className="w-full max-w-300 h-full mx-auto">AboutPage</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
