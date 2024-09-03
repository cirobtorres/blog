"use client";

import Link from "@tiptap/extension-link";
import {
  EditorContent as ArticleEditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CustomImage from "../CustomImage";
import Loading from "../../Loading";
import ArticleEditorButtons from "../ArticleEditorButtons";

const content = `
  <h3>O fim-fim é uma ave passeriforme da família Fringillidae.</h3>
  <p>Também conhecido como vim-vim (Maranhão e Piauí), fi-fi-verdadeiro, vem-vem (Natal/Rio Grande do Norte e no Ceará), guriatã-de-coleira (Bahia), vi-vi e puvi (interior de São Paulo), gaturamo-miudinho (Descourtilz). <a href="/">No Nordeste recebe a denominação de vem-vem</a>, gaturamo-fifi ou guriatã. E aparece na música Cantiga de vem-vem, composta por José Marcolino e Panta imortalizada na voz de Luiz Gonzaga.</p>
  <ul>
  <li>Hello world 1</li>
  <li>Hello world 2</li>
  <li>Hello world 3</li>
  </ul>
  <img src="https://res.cloudinary.com/dvgmoabul/image/upload/v1688338324/samples/balloons.jpg" contenteditable="false" draggable="true" class="ProseMirror-selectednode">
  <h3>Nome Científico</h3>
  <p>Seu nome científico significa: do (grego) euphonia, euphony = excelência do tom; e do (grego) khlörotës, khlöritis = de cor verde, esmeralda. ⇒ (Pássaro) verde com excelência do tom ou (ave) cantora verde. Khlörotes faz referência à forma juvenil ou da fêmea desta espécie que possui a cor verde. “Tangara noir et jaune de Cayenne” de Brisson (1760) (Euphonia).</p>
  <h3>Lorem ipsum dolor sit amet consectetur.</h3>
  <pre>
  <code>for(let i = 0; i < 10; i++) {
    console.log(i);
  }</code></pre>
  <h3>Características</h3>
  <p>Mede 9,5 centímetros de comprimento e pesa cerca de 8 gramas (macho). <b>É uma das espécies mais conhecidas do gênero Euphonia. Além do colorido do macho, outra característica marcante nessa ave é o canto assobiado, usado para contato entre o grupo e origem dos nomes comuns.</b> Sua voz pode ser facilmente reconhecida: “di-di”, “vi-vi”, “vem-vem” ou “fi-fi” (chamada de ambos os sexos). O canto é fraco, chilreado rápido, podendo lembrar o de um pintassilgo. Também imita outras aves. Macho e fêmea chamam-se nas andanças pela mata. À distância, pode ser confundido com um dos chamados do risadinha, quando faz fi-fi. A fêmea é verde-olivácea, de fronte amarelada e ventre esbranquiçado. É interessante notar que a fêmea possui um canto elaborado também, além do “fi-fi”.</p>
  <p>São cinco subespécies reconhecidas:</p>
  <ol>
  <li><b>cynophora</b> (Oberholser, 1918) - Sudoeste da Venezuela, sudeste da Colômbia e, provavelmente, Roraima. Dinstingue-se por possuir a coroa amarela um pouco mais extensa que a forma nominal e por ter a cabeça com mais violeta.</li>
  <li><b>chlorotica</b> (Linnaeus, 1766) - Guianas, Amapá, sul do rio Amazonas, norte do Mato Grosso, Goiás, Tocantins, norte de Minas Gerais, Região Nordeste e Espírito Santo. Distingue-se por ter a coroa amarela se estendendo até um pouco atrás dos olhos. amazonica (Parkes, 1969) - Ambas as margens do rio Amazonas, Pará (Santarém), extremo nordeste do Peru. Bico e asas menores que a forma nominal.</li> 
  <li><b>taczanowskii</b> (P. L. Sclater, 1886) - <a href="/">Norte e sudeste do Peru e Bolívia</a>. Difere das outras subespécies por possuir as partes superiores mais arroxeadas, barriga e coroa de um amarelo bem mais pálido. Coberteiras caudais e uropígio mais azulados que as costas.</li>
  <li><b>serrirostris</b> (d'Orbigny & Lafresnaye, 1837) - Sudeste da Bolívia, sul do Mato Grosso, sul de Goiás, sudeste e sul do Brasil até o Uruguai e norte e centro da Argentina e Paraguai. Distingue-se da forma nominal por ter a coroa amarela um pouco menor que chlorotica, estendendo-se apenas até os olhos (não os ultrapassando).</li>
  </ol>
  <h3>Alimentação</h3>
  <p>Mede 9,5 centímetros de comprimento e pesa cerca de 8 gramas (macho). <b>É uma das espécies mais conhecidas do gênero Euphonia. Além do colorido do macho, outra característica marcante nessa ave é o canto assobiado, usado para contato entre o grupo e origem dos nomes comuns.</b> Sua voz pode ser facilmente reconhecida: “di-di”, “vi-vi”, “vem-vem” ou “fi-fi” (chamada de ambos os sexos). O canto é fraco, chilreado rápido, podendo lembrar o de um pintassilgo. Também imita outras aves. Macho e fêmea chamam-se nas andanças pela mata. À distância, pode ser confundido com um dos chamados do risadinha, quando faz fi-fi. A fêmea é verde-olivácea, de fronte amarelada e ventre esbranquiçado. É interessante notar que a fêmea possui um canto elaborado também, além do “fi-fi”.</p>
  <p>São cinco subespécies reconhecidas:</p>
  <blockquote>Frugívoro. <b>Geralmente pousa ao lado de um cacho de frutos e os ingere um após o outro. As sementes ingeridas passam intactas pelo tubo digestivo e, quando eliminadas junto com as fezes, muitas vezes aderem a um tronco de árvore ou caem no solo onde germinam.</b> Dessa forma, esta e outras espécies de Euphonia são consideradas excelentes dispersoras de sementes. Apreciam muito as frutinhas das ervas-de-passarinho, plantas das famílias lorantáceas e viscaceae; neste último caso, ingerem a polpa dos frutos e a semente, deixando cair a casca. Em geral, as sementes são defecadas na forma de um “colar de contas” nos galhos, mas algumas vezes podem cair no solo, onde não se desenvolvem. Existe uma particularidade anatômica que muito singulariza esta ave, que é a não existência de moela, sendo o próprio papo bastante atrofiado. Tal simplicidade do aparelho digestivo revela claramente o regime frugívoro levado ao extremo.</blockquote>
  <h3>Reprodução</h3>
  <p>Mede 9,5 centímetros de comprimento e pesa cerca de 8 gramas (macho). <b>É uma das espécies mais conhecidas do gênero Euphonia. Além do colorido do macho, outra característica marcante nessa ave é o canto assobiado, usado para contato entre o grupo e origem dos nomes comuns.</b> Sua voz pode ser facilmente reconhecida: “di-di”, “vi-vi”, “vem-vem” ou “fi-fi” (chamada de ambos os sexos). O canto é fraco, chilreado rápido, podendo lembrar o de um pintassilgo. Também imita outras aves. Macho e fêmea chamam-se nas andanças pela mata. À distância, pode ser confundido com um dos chamados do risadinha, quando faz fi-fi. A fêmea é verde-olivácea, de fronte amarelada e ventre esbranquiçado. É interessante notar que a fêmea possui um canto elaborado também, além do “fi-fi”.</p>
  <p>São cinco subespécies reconhecidas:</p>
  <p>Atinge a maturidade sexual com cerca de 12 meses. Cada ninhada geralmente tem entre 2 e 5 ovos, tendo de 2 a 3 ninhadas por temporada. Os filhotes nascem após 15 dias. No período reprodutivo o macho costuma ficar cantando nas horas mais quentes do dia, pousado sob a copa. Nessas cantorias, usa um canto próprio, elaborado, às vezes mesclado com imitações.</p>
`;

const ArticleEditor = ({ onChange }: { onChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "w-full mb-4 text-base-neutral dark:text-dark-base-neutral",
          },
        },
        heading: {
          HTMLAttributes: {
            class:
              "w-full font-extrabold uppercase mb-4 text-base-neutral dark:text-dark-base-neutral",
          },
          levels: [3],
        },
        bold: {
          HTMLAttributes: {
            class: "font-extrabold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class:
              "w-full pl-6 mb-4 [&_li]:pl-4 list-disc [&_li]:marker:text-base-green dark:[&_li]:marker:text-dark-base-green text-base-neutral dark:text-dark-base-neutral",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class:
              "w-full pl-6 mb-4 [&_li]:pl-4 list-decimal [&_li]:marker:text-base-green dark:[&_li]:marker:text-dark-base-green text-base-neutral dark:text-dark-base-neutral",
          },
        },
        codeBlock: {
          defaultLanguage: "javascript",
          HTMLAttributes: {
            class:
              "text-wrap w-full max-w-5xl p-4 mb-4 text-dark-base-neutral bg-dark-base-300",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: `relative italic mb-4 font-semibold pl-10 [&_p]:indent-10 [&_p]:mb-0 
              [&_p]:before:absolute [&_p]:before:top-0 [&_p]:before:left-0 [&_p]:before:font-serif [&_p]:before:content-['“'] [&_p]:before:text-5xl [&_p]:before:text-base-green dark:[&_p]:before:text-dark-base-green 
              [&_p]:after:absolute [&_p]:after:bottom-0 [&_p]:after:indent-2 [&_p]:after:font-serif [&_p]:after:content-['”'] [&_p]:after:text-5xl [&_p]:after:leading-[0.25rem] [&_p]:after:text-base-green dark:[&_p]:after:text-dark-base-green`,
          },
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class:
            "cursor-pointer font-extrabold underline text-base-green hover:text-dark-base-green",
        },
        openOnClick: false,
        autolink: false,
        defaultProtocol: "https",
      }),
      CustomImage,
      Highlight.configure({
        HTMLAttributes: {
          class: "font-semibold bg-dark-base-green p-1 rounded-xl",
        },
      }),
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[500px] w-full p-2 flex flex-col justify-start items-start overflow-x-hidden bg-base-100 dark:bg-dark-base-200 scrollbar dark:dark-scrollbar outline-none outline-2 outline-transparent outline-offset-0 focus:outline-blue-500", // max-h-[600px]
      },
    },
    // content,
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <Loading size={30} />; // TODO: change this loading to a skeleton loading
  }

  return (
    editor && (
      <div className="relative w-full flex flex-col border border-base-200 dark:border-dark-base-border bg-base-100 dark:bg-dark-base-200">
        <div className="p-2 flex flex-wrap gap-0.5 border-b border-base-200 dark:border-dark-base-border bg-base-200 dark:bg-dark-base-300">
          <ArticleEditorButtons editor={editor} />
        </div>
        <ArticleEditorContent editor={editor} className="m-1" />
      </div>
    )
  );
};

export default ArticleEditor;
