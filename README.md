# Agenda Querida

Landing page mobile-first da **Agenda Querida**, serviço de secretariado virtual que atende clientes, organiza agendas e dá suporte à rotina de negócios e consultórios. O protótipo foi criado para apresentar a identidade da marca e validar a experiência de navegação com a cliente.

## Como executar

Com **Node.js 22.12 ou superior** e npm instalados, abra um terminal na pasta que contém o arquivo `package.json` e execute os comandos abaixo.

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://127.0.0.1:5173`. Para testar em um celular na mesma rede Wi-Fi, inicie o servidor com `npm run dev -- --host 0.0.0.0` e abra no aparelho o endereço indicado em **Network**.

## O que explorar

- **Navegação no celular.** O menu compacto leva às seções da página. A primeira tela apresenta o atendimento humano e dá acesso direto ao WhatsApp da Agenda Querida.
- **Serviços.** A página apresenta o atendimento por WhatsApp, telefone e e-mail, o acompanhamento de contatos e o suporte administrativo. A seção de consultórios detalha o agendamento, a confirmação e a remarcação de consultas.
- **Avaliações demonstrativas.** Os depoimentos estão identificados como exemplos. O visitante pode preencher o nome, escolher de uma a cinco estrelas e escrever um comentário. Ao concluir, o formulário exibe um aviso e limpa os campos. Os dados ficam apenas na memória da página durante o preenchimento.

## Apresentar ou publicar

O primeiro comando gera a versão de produção. O segundo permite conferi-la no navegador.

```sh
npm run build
npm run preview
```

O Vite grava os arquivos em `dist/`. Essa pasta pode ser publicada em uma hospedagem estática na raiz de um domínio.

Depois de `npm run build`, use o comando abaixo para criar uma cópia de apresentação offline.

```sh
node scripts/apresentacao.mjs
```

O script cria **Agenda Querida.html** na pasta acima do projeto. Abra esse arquivo diretamente no navegador ou envie uma cópia à cliente. Ele inclui a página, as fontes e as imagens. Os links para WhatsApp e Instagram precisam de internet.

## Onde editar

| Conteúdo | Arquivo ou pasta |
| --- | --- |
| Cabeçalho, primeira tela, diferencial e rodapé | `src/App.jsx` |
| Serviços, consultórios, depoimentos e formulário | `src/Sections.jsx` |
| Marca e ícone de WhatsApp | `src/Brand.jsx` |
| Layout, cores e estilos responsivos | `src/index.css` e `src/sections.css` |
| Fotografias ilustrativas e fontes locais | `public/images/` e `public/fonts/` |

O frontend usa **React**, **Vite** e **Tailwind CSS**. Os ícones da interface vêm do Lucide, e o símbolo do WhatsApp vem da coleção Font Awesome 6 da biblioteca React Icons. O projeto funciona inteiramente no navegador, sem backend.
