import { Grid } from "../../components/Display";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { H1 } from "../../components/Typography/H";

export default function ArticlePage() {
  return (
    <Grid>
      <Header />
      <Main>
        <H1>Cards</H1>
      </Main>
      <Footer />
    </Grid>
  );
}
