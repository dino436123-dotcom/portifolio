# Como adicionar ou substituir um projeto

Os projetos da página são montados a partir de `window.PORTFOLIO_PROJECTS`, em [`../js/projects.js`](../js/projects.js). Cada item da lista vira uma peça da galeria e abre uma janela de detalhes acessível.

## 1. Coloque a imagem na pasta

Copie a captura de tela final para `images/projects/`. Use um nome simples, por exemplo `site-da-marca.webp`. JPG, PNG, WebP e SVG são aceitos pelo navegador. Prefira imagens otimizadas para a web; a galeria mantém a proporção da captura sem distorcê-la.

## 2. Cadastre o trabalho

Adicione um objeto ao array em `js/projects.js` ou edite um conceito existente:

```js
{
  title: "Nome do projeto",
  category: "Categoria · Tipo de site",
  description: "Resumo breve do trabalho e do que foi feito.",
  year: "2026",
  image: "images/projects/site-da-marca.webp",
  alt: "Descrição objetiva do que aparece na imagem.",
  liveUrl: "https://exemplo.com",
  featured: false
}
```

Inclua uma vírgula entre os objetos. Se o projeto não tiver uma página publicada, deixe `liveUrl: ""`: clicar na peça abre os detalhes em uma janela. Com uma URL `http` ou `https` válida, clicar na peça abre o site em outra aba e a janela de detalhes também oferece o link.

`featured` serve para identificar o trabalho principal na configuração. `title`, `category`, `description`, `image` e `alt` devem ser preenchidos; ano e URL podem ficar vazios.

## 3. Confira no navegador

Atualize a página e confira o corte em desktop e celular. A imagem pode ter qualquer proporção; o enquadramento é feito sem esticar o arquivo. Ajuste o texto alternativo para que a imagem faça sentido para quem navega com leitor de tela.

## Identidade e contato

No início de `js/projects.js`, altere `name` e `email`. O e-mail vazio é mostrado como pendente até que um endereço válido seja informado.

A logo usada no cabeçalho e no rodapé está em [`../images/nova-studio-logo.png`](../images/nova-studio-logo.png). Para substituí-la, mantenha o mesmo nome de arquivo ou atualize os dois caminhos de imagem em [`../index.html`](../index.html).

Configure `whatsapp` com DDI, DDD e número, usando somente dígitos. O botão não abre link enquanto o número não tiver entre 10 e 15 dígitos. O WhatsApp informado já está configurado neste projeto; substitua-o se quiser trocar o contato público. O e-mail continua vazio até ser configurado.
