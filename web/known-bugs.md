<ol>
    <li style="font-size:18px">
        As imagens dos blocos de imagens dos artigos são salvos por meio de <span style="color:dodgerblue">selectImages</span> em <span style="color:dodgerblue">/blog/web/zustand-store/article-state.tsx</span>. Isso significa que a tabela <span style="color:dodgerblue">articles</span> armazena um estado diferente dos <span style="color:dodgerblue">files</span> em relação ao que está armazenado na tabela <span style="color:dodgerblue">media</span>. Se eu modificar o caption ou o alt dessas imagens, o article continua com o estado antigo.
    </li>
</ol>
