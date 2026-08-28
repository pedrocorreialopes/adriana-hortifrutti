# 🥦 Adriana Hortifrutti — Site Institucional / Loja Virtual

Site institucional profissional para a **Adriana Hortifrutti**, hortifrúti especializado em frutas, verduras, legumes e produtos de granja, com atuação em **Fortaleza - CE - Brasil**.

> Criado e desenvolvido por **Pedro Correia Lopes Filho**, com apoio do Genspark AI Developer.

---

## 🎯 Objetivo do Projeto

Apresentar a marca Adriana Hortifrutti de forma moderna, confiável e persuasiva, direcionando visitantes para o canal de conversão principal: **pedidos via WhatsApp**, além de captar solicitações de orçamento/contato por formulário.

---

## ✅ Funcionalidades Implementadas

- **Design system completo** (paleta de cores, tipografia Inter, espaçamento em grid) em `css/style.css`.
- **5 páginas completas**: Home, Sobre, Produtos e Serviços, Portfólio e Galeria.
- **Header fixo responsivo** com menu hambúrguer acessível (teclado, ARIA, Escape para fechar).
- **Hero section persuasiva** na Home, com proposta de valor, estatísticas e CTAs.
- **Seções de diferenciais, categorias de produtos, depoimentos (Swiper.js) e CTA forte**.
- **Formulário de contato/pedido** integrado à **RESTful Table API** (tabela `pedidos_contato`), com validação em tempo real e feedback visual (loading/sucesso/erro).
- **Botão flutuante do WhatsApp** em todas as páginas + botões de CTA no menu, hero, cards de produtos e banners.
- **Galeria com carrossel Swiper.js**, grid filtrável por categoria e lightbox acessível.
- **Portfólio com filtro por categoria** (frutas, verduras, granja, cestas).
- **Página Sobre** com história, missão, visão e valores.
- **Animações suaves** (fade-up ao rolar, hover em cards/botões) respeitando `prefers-reduced-motion`.
- **SEO completo**: meta tags (title, description, keywords, author, robots), Open Graph, Twitter Cards, Schema.org JSON-LD (GroceryStore/LocalBusiness, WebSite, ItemList, AboutPage), sitemap.xml, robots.txt, URLs amigáveis, hierarquia de headings, alt text descritivo em todas as imagens.
- **Acessibilidade (WCAG 2.1 AA)**: skip link, foco visível, ARIA labels/roles, navegação por teclado, contraste ajustado, semântica HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Performance**: lazy loading em imagens, preconnect de fontes, CSS/JS organizados e comentados, uso de CDN para bibliotecas.
- **Responsividade mobile-first**: testada em 390px (mobile), 768px (tablet) e 1280px+ (desktop/ultra-wide).

---

## 🗂️ Estrutura de Arquivos

```
/
├── index.html          → Home (hero, diferenciais, produtos, sobre resumido, depoimentos, CTA, contato)
├── sobre.html           → História, missão, visão, valores, diferenciais
├── servicos.html        → Catálogo de produtos por categoria + cestas personalizadas + como funciona
├── portfolio.html       → Grid filtrável de trabalhos/entregas realizadas
├── galeria.html         → Carrossel Swiper + grid de fotos filtrável + lightbox
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   └── style.css        → Design system completo (variáveis, componentes, utilitários)
├── js/
│   └── main.js           → Menu mobile, animações, Swiper, filtros, lightbox, formulário (Table API)
└── images/                → Todas as imagens do site (logo, produtos, banners)
```

---

## 🔗 Entry Points / Rotas do Site

| Página | Caminho | Descrição |
|---|---|---|
| Home | `/index.html` | Página principal com hero, produtos, depoimentos e formulário de contato (`#contato`) |
| Sobre | `/sobre.html` | História, missão, visão e valores da marca |
| Produtos e Serviços | `/servicos.html` | Catálogo por categoria: `#frutas`, `#verduras`, `#granja`, `#cestas` |
| Portfólio | `/portfolio.html` | Trabalhos e entregas realizadas, com filtro por categoria |
| Galeria | `/galeria.html` | Carrossel e grid de fotos com lightbox |

---

## 🗄️ Dados e Armazenamento

O site usa a **RESTful Table API** para persistir solicitações enviadas pelo formulário de contato/pedido.

### Tabela: `pedidos_contato`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | text | Identificador único (gerado automaticamente) |
| `nome` | text | Nome completo do cliente |
| `telefone` | text | Telefone/WhatsApp do cliente |
| `email` | text | E-mail do cliente (opcional) |
| `bairro` | text | Bairro em Fortaleza para entrega |
| `tipo_solicitacao` | text (options) | Pedido de Compra / Orçamento / Cesta Personalizada / Dúvida / Outro |
| `mensagem` | rich_text | Detalhes da solicitação |
| `status` | text (options) | novo / em_andamento / concluido |

> Endpoint usado pelo formulário: `POST tables/pedidos_contato`

**Observação importante**: o armazenamento de dados via Table API funciona tanto no preview do editor quanto — após a publicação — como base de dados própria do site publicado (Hosted Deploy). Esses dois ambientes de dados não são sincronizados automaticamente entre si.

---

## 🧩 Tecnologias Utilizadas

- **HTML5** semântico
- **CSS3** (design system próprio via variáveis CSS, sem framework)
- **JavaScript** vanilla (ES5+)
- **Swiper.js** (carrosséis de depoimentos e galeria)
- **Font Awesome 6** (ícones)
- **Google Fonts (Inter)**
- **RESTful Table API** (armazenamento do formulário de contato)

> ⚠️ **Nota sobre o briefing original**: o projeto solicitava backend em **Node.js** e banco de dados **Firebase**. Como este ambiente produz **sites estáticos front-end**, não é possível implementar um servidor Node.js nem conectar diretamente a um banco Firebase. Para cobrir a necessidade de captação/persistência de pedidos, foi utilizada a **RESTful Table API** nativa da plataforma, que oferece funcionalidade equivalente (armazenamento e consulta de registros) sem necessidade de backend próprio. A conversão principal continua sendo o **WhatsApp**, conforme solicitado.

---

## 🚧 Funcionalidades Não Implementadas (fora do escopo de um site estático)

- Backend Node.js dedicado / API própria.
- Integração real com Firebase (Firestore/Realtime Database/Auth).
- Carrinho de compras com checkout e pagamento online (exigiria backend + gateway de pagamento).
- Painel administrativo autenticado para gestão de pedidos (autenticação segura exige backend).
- Envio automático de e-mails/notificações push.

---

## 🔮 Próximos Passos Recomendados

1. **Publicar o site** pela aba **Publish** para obter a URL definitiva.
2. Substituir o número de WhatsApp placeholder (`5585900000000`) pelo número real da Adriana Hortifrutti em todas as páginas.
3. Substituir e-mail, endereço completo e redes sociais placeholder no rodapé.
4. Se desejar gestão de pedidos mais robusta (carrinho, pagamento, painel admin autenticado), avaliar uma solução com backend real (fora do escopo deste site estático).
5. Adicionar fotos reais da loja/produtos da Adriana Hortifrutti para reforçar autenticidade (as imagens atuais são fotos de banco de imagens com licença CC/PD e uma imagem de logotipo gerada por IA).
6. Configurar domínio próprio (ex: adrianahortifrutti.com.br) e atualizar as URLs canônicas/Open Graph no código.
7. Conectar Google Business Profile e Google Analytics/Search Console após publicação.

---

## 🖌️ Identidade Visual

- **Cores**: Verde fresco (`#22c55e` / `#4bec89`), Amarelo cítrico (`#f7f25f`), Coral (`#f28c8c`), neutros em tons de verde-cinza.
- **Tipografia**: Inter (Google Fonts), com hierarquia clara de H1 a H6.
- **Logotipo**: sugestão criada com IA — ícone de cesta de frutas com folha, em tons de verde/coral/amarelo, disponível em `images/logo-adriana-hortifrutti.png` (versão completa) e `images/favicon-icon.png` (ícone/favicon).

---

## 📱 Contato e Conversão

- **WhatsApp**: botão flutuante fixo + CTAs em todas as seções estratégicas.
- **Formulário de contato/pedido**: seção `#contato` na Home, com validação e feedback em tempo real.

---

## 🌐 Publicação

Para publicar o site e obter uma URL pública, utilize a aba **Publish** do editor — ela cuidará de todo o processo de deploy automaticamente.
