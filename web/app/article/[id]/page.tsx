import { Main } from "../../../components/Main";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Grid } from "../../../components/Display";
import { H1 } from "../../../components/Typography/H";

export default function ArticlePageId() {
  return (
    <Grid>
      <Header />
      <Main>
        <H1>Article</H1>
      </Main>
      <Footer />
    </Grid>
  );
}
