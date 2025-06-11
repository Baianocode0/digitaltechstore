<<<<<<< HEAD
const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const container = document.getElementById('produtosContainer');

function renderizarProdutos() {
  container.innerHTML = '';
  produtos.forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
    `;

    container.appendChild(card);
  });
  atualizarQuantidadeCarrinho();
}

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarQuantidadeCarrinho();
}

function atualizarQuantidadeCarrinho() {
  document.getElementById('quantidadeCarrinho').textContent = carrinho.length;
}

function abrirCarrinho() {
  document.getElementById('carrinhoModal').classList.remove('hidden');
  const itensContainer = document.getElementById('itensCarrinho');
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  document.getElementById('totalCarrinho').textContent = total.toFixed(2);

  itensContainer.innerHTML = carrinho.map(item =>
    `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`
  ).join('');
}

function fecharCarrinho() {
  document.getElementById('carrinhoModal').classList.add('hidden');
}

function finalizarPedido() {
  alert("Pedido finalizado! Agora você pode comprar manualmente no Mercado Livre com os dados do cliente.");
  localStorage.removeItem('carrinho');
  window.location.reload();
}

// Painel admin
function abrirAdmin() {
  document.getElementById('adminPanel').classList.remove('hidden');
}

function fecharAdmin() {
  document.getElementById('adminPanel').classList.add('hidden');
}

function salvarProduto() {
  const nome = document.getElementById('nomeProduto').value.trim();
  const preco = parseFloat(document.getElementById('precoProduto').value);
  const imagem = document.getElementById('imagemProduto').value.trim();

  if (!nome || isNaN(preco) || !imagem) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  produtos.push({ nome, preco, imagem });
  localStorage.setItem('produtos', JSON.stringify(produtos));
  fecharAdmin();
  renderizarProdutos();
}

renderizarProdutos();
=======
const produtos = [
  {
    nome: "Steam Deck Oled / Com 512gb Cor Preto",
    preco: 5800.00,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_961904-MLA81058208245_112024-O.webp"
  },
  {
    nome: "bunda do jessé",
    preco: 229.00,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_786582-MLA49525026784_032022-F.webp"
  },
  {
    nome: "bunda do gelinn",
    preco: 199.99,
    imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_912354-MLB54018602976_022023-F.webp"
  }
];

const container = document.getElementById('produtosContainer');
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarProdutos() {
  produtos.forEach((produto, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar</button>
    `;

    container.appendChild(card);
  });
  atualizarQuantidadeCarrinho();
}

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarQuantidadeCarrinho();
}

function atualizarQuantidadeCarrinho() {
  document.getElementById('quantidadeCarrinho').textContent = carrinho.length;
}

function abrirCarrinho() {
  document.getElementById('carrinhoModal').classList.remove('hidden');
  const itensContainer = document.getElementById('itensCarrinho');
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  document.getElementById('totalCarrinho').textContent = total.toFixed(2);

  itensContainer.innerHTML = carrinho.map(item =>
    `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`
  ).join('');
}

function fecharCarrinho() {
  document.getElementById('carrinhoModal').classList.add('hidden');
}

function finalizarPedido() {
  alert("Pedido finalizado! Agora você pode comprar manualmente no Mercado Livre com os dados do cliente.");
  localStorage.removeItem('carrinho');
  window.location.reload();
}

renderizarProdutos();
>>>>>>> 0974a40c5cb94d94645eea4fcfa06ea48092afbd
