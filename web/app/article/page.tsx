import { WebGrid } from "../../components/Display";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { H1 } from "../../components/Typography/H";

export default function ArticlePage() {
  return (
    <WebGrid>
      <Header />
      <main className="mt-header-height">
        <div className="p-6">
          <div className="w-full max-w-360 mx-auto">
            <H1>Cards</H1>
          </div>
        </div>
      </main>
      <Footer />
    </WebGrid>
  );
}
