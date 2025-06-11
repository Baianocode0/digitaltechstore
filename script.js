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
  mostrarMensagem("Produto adicionado ao carrinho!");
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

// ----------- Login admin simples -----------

const senhaAdmin = "senha123";

function abrirAdmin() {
  const senha = prompt("Digite a senha de admin:");
  if (senha === senhaAdmin) {
    document.getElementById('adminPanel').classList.remove('hidden');
  } else {
    alert("Senha incorreta!");
  }
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
  mostrarMensagem("Produto adicionado com sucesso!");
}

// ----------- Mensagens e animações -----------

function mostrarMensagem(texto) {
  let msgDiv = document.createElement('div');
  msgDiv.className = 'mensagem-toast';
  msgDiv.textContent = texto;
  document.body.appendChild(msgDiv);

  // Aparecer e sumir suavemente
  setTimeout(() => {
    msgDiv.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    msgDiv.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(msgDiv);
    }, 500);
  }, 3000);
}

renderizarProdutos();
