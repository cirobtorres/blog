// import Image from "next/image";
import { Alert } from "../../Alert";
import { Blockquote, H2, H3, Li, Ol, P, Ul } from "../../Typography";

export default function ArticleContent() {
  return (
    <article className="w-full max-w-article-body my-6">
      <H2>Lorem ipsum dolor sit amet.</H2>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique.
      </P>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique. Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Quam alias aperiam perspiciatis optio
        sequi, eligendi rem nulla nemo animi ipsa, sapiente explicabo numquam
        dolore doloribus rerum neque accusantium tempore qui.
      </P>
      <Alert title="Atenção" variant="alert" className="not-first:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        error ab est minus magnam. Deleniti, illum eius! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.
      </Alert>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Iusto doloremque mollitia et, unde
        consequuntur explicabo?{" "}
        <b className="text-primary/75">
          Cum praesentium doloremque itaque quo corrupti, adipisci dolorum ipsum
          blanditiis maiores
        </b>
        , sunt quibusdam vel. Quaerat? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Distinctio vel nisi repudiandae dolore, nobis ipsam
        dolorum veritatis placeat eveniet minus, minima, earum nihil tempore?
        Perspiciatis a nam sequi veniam. Nisi.
      </P>
      <H2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</H2>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum atque
        eveniet voluptas fugit voluptates, quod officiis aliquam asperiores,
        temporibus neque aspernatur expedita totam, quibusdam iure repellendus
        iste consequuntur. Accusamus, velit minima sapiente, et voluptas
        reprehenderit totam quo, fugit error suscipit voluptatem doloremque
        beatae neque quod fugiat? Esse doloribus accusamus praesentium est quasi
        velit, eius aliquid.
      </P>
      <Alert title="Atenção" className="not-first:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        error ab est minus magnam. Deleniti, illum eius! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Praesentium placeat molestias tenetur
        dolorem, voluptates aliquam culpa repellendus a repellat dignissimos
        minus id?
      </Alert>
      <Blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eaque
        enim eius velit inventore tempore ducimus, a necessitatibus magnam nihil
        cupiditate atque repudiandae labore harum illo beatae! Nemo sit quia
        totam, aliquid omnis iure veniam?
      </Blockquote>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Iusto doloremque mollitia et, unde
        consequuntur explicabo? Cum praesentium doloremque itaque quo corrupti,
        adipisci dolorum ipsum blanditiis maiores, sunt quibusdam vel. Quaerat?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio vel
        nisi repudiandae dolore, nobis ipsam dolorum veritatis placeat eveniet
        minus, minima, earum nihil tempore? Perspiciatis a nam sequi veniam.
        Nisi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
        numquam voluptates optio! Esse, magnam? Placeat cumque eligendi
        veritatis harum sunt voluptatibus est vitae quo corporis, impedit
        tempore et dolor mollitia.
      </P>
      {/* <figure className="not-first:mt-6 w-full flex flex-col">
        <Image
          src="https://placehold.co/1920x1080/000/fff/jpeg"
          alt="Placeholder image example 1"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 1020px"
          width={1920}
          height={1080}
        />
        <figcaption className="text-neutral-900 dark:text-neutral-400 text-start">
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            voluptatem, quia nisi laudantium magnam dicta dolores tempora
            cupiditate suscipit quae ipsa, doloribus eos!
          </small>
        </figcaption>
      </figure> */}
      <figure className="not-first:mt-6 w-full flex flex-col">
        <div className="[background-image:url('https://techgage.com/wp-content/uploads/2023/03/Blender-3.5-Splash-Screen.jpg')] w-full aspect-video bg-contain" />
        <figcaption className="text-neutral-900 dark:text-neutral-400 text-start">
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            voluptatem, quia nisi laudantium magnam dicta dolores tempora
            cupiditate suscipit quae ipsa, doloribus eos!
          </small>
        </figcaption>
      </figure>
      <H3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis?</H3>
      <Ul>
        <Li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          fugit.
        </Li>
        <Li>Lorem ipsum dolor sit amet.</Li>
        <Li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
          possimus aut deleniti dolores, nulla voluptas praesentium harum id
          incidunt ab.
        </Li>
        <Li>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          cupiditate temporibus quasi ipsa eligendi natus, est consequuntur.
          Deserunt suscipit non recusandae hic.
        </Li>
        <Li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati et
          facere ad molestias eos, dolor voluptatum ipsum saepe?{" "}
          <b className="text-primary/75">
            Impedit corporis ab perferendis rerum praesentium
          </b>
          . Saepe aut optio repudiandae accusantium quibusdam.
        </Li>
        <Li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos vel
          similique ea velit beatae quae aperiam, mollitia deleniti saepe.
        </Li>
        <Li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          officia minus nulla sit dignissimos provident.
        </Li>
      </Ul>
      <Alert title="Atenção" variant="success" className="not-first:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        error ab est minus magnam. Deleniti, illum eius! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.
      </Alert>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique.
      </P>
      <P>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
        architecto molestias exercitationem cupiditate! Repellat error assumenda
        maiores officia commodi consectetur aspernatur ex! Libero dicta
        distinctio neque? Sint minus minima similique. Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Dolorum architecto maiores iure
        adipisci iusto perspiciatis quisquam sequi ad, ab impedit natus magni
        blanditiis? Optio sit, pariatur impedit maiores qui aliquid! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Ipsam provident temporibus
        aut. Rerum perspiciatis dicta quis? Adipisci beatae incidunt blanditiis
        ipsum dignissimos dolores tempore nam dolor eveniet, alias est
        laboriosam.
      </P>
      <Alert title="Atenção" variant="info" className="not-first:mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        error ab est minus magnam. Deleniti, illum eius! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.
      </Alert>
      <Ol>
        <Li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum.
        </Li>
        <Li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Li>
        <Li>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
          assumenda illum nobis temporibus accusamus porro quibusdam expedita,
          tempore eos voluptatem ut eum perspiciatis, modi inventore qui officia
          enim culpa.
        </Li>
        <Li>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
          magnam assumenda veniam molestias autem!
        </Li>
        <Li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nulla
          voluptates animi magnam distinctio ratione delectus!
        </Li>
      </Ol>
    </article>
  );
}
