# Portfólio — design e desenvolvimento web

Site estático em HTML, CSS e JavaScript, sem etapa de build ou dependências externas. A página está em português e funciona com os arquivos locais deste projeto.

## Abrir localmente

Você pode abrir `index.html` diretamente no navegador. Para conferir os caminhos como em uma hospedagem, abra um terminal nesta pasta e execute:

```powershell
py -m http.server 8000
```

Depois, acesse <http://localhost:8000>. Encerre o servidor com `Ctrl+C`.

## Personalizar o portfólio

- Altere o nome da marca, o e-mail e o WhatsApp em `js/projects.js`.
- A logo da marca exibida no cabeçalho e no rodapé está em `images/nova-studio-logo.png`.
- Cadastre ou atualize trabalhos no array `PORTFOLIO_PROJECTS`, no mesmo arquivo.
- Guarde as imagens dos trabalhos em `images/projects/`.
- Consulte o passo a passo em [`docs/adicionar-projetos.md`](docs/adicionar-projetos.md).
- Altere os textos e dados de busca e compartilhamento no `<head>` de `index.html`; personalize também `images/social-card.svg` para a prévia das redes sociais.
- Antes de publicar, troque `og:image` em `index.html` pelo endereço absoluto da imagem social no domínio final.

## Conferir no celular e as animações

Redimensione a janela do navegador até uma largura móvel (por exemplo, 390 px) e teste o menu, a galeria e os detalhes do projeto. Para conferir o modo sem movimento, ative “Reduzir movimento” nas configurações de acessibilidade do sistema ou do navegador.

O layout responde ao tamanho da tela e respeita `prefers-reduced-motion`. Os três trabalhos incluídos são estudos visuais autorais identificados como conceitos fictícios; substitua-os por projetos reais antes de publicar.
