import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function ArticlePage() {
  return (
    <div className="h-full min-h-screen grid grid-rows-[var(--header-height)_1fr_80px]">
      <Header />
      <main className="mt-header-height">
        <div className="p-6">
          <div className="w-full max-w-360 mx-auto">
            <h1>Cards</h1>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
