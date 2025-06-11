import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_O2PEk5EP3LJ2qKQtA78Unuacyho6Sz0",
  authDomain: "digitaltechstore-46232.firebaseapp.com",
  projectId: "digitaltechstore-46232",
  storageBucket: "digitaltechstore-46232.appspot.com",
  messagingSenderId: "893245553237",
  appId: "1:893245553237:web:e47e84bd8a7f4b7b40b2dc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarProdutos(produtos) {
  const container = document.getElementById('produtosContainer');
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
  window.produtosAtuais = produtos;
  atualizarQuantidadeCarrinho();
}

function adicionarAoCarrinho(index) {
  const produto = window.produtosAtuais[index];
  carrinho.push(produto);
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
  itensContainer.innerHTML = carrinho.map(item => `<p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>`).join('');
}

function fecharCarrinho() {
  document.getElementById('carrinhoModal').classList.add('hidden');
}

function finalizarPedido() {
  alert("Pedido finalizado! Agora você pode comprar manualmente no Mercado Livre com os dados do cliente.");
  localStorage.removeItem('carrinho');
  window.location.reload();
}

function abrirLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function verificarSenha() {
  const senha = document.getElementById('senhaAdmin').value;
  if (senha === "admin123") {
    document.getElementById('loginModal').classList.add('hidden');
    abrirAdmin();
  } else {
    alert("Senha incorreta.");
  }
}

function abrirAdmin() {
  document.getElementById('adminPanel').classList.remove('hidden');
}

function fecharAdmin() {
  document.getElementById('adminPanel').classList.add('hidden');
}

async function salvarProduto() {
  const nome = document.getElementById('nomeProduto').value.trim();
  const preco = parseFloat(document.getElementById('precoProduto').value);
  const imagem = document.getElementById('imagemProduto').value.trim();

  if (!nome || isNaN(preco) || !imagem) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  try {
    await addDoc(collection(db, "produtos"), { nome, preco, imagem });
    alert("Produto adicionado com sucesso!");
    fecharAdmin();
  } catch (e) {
    console.error("Erro ao adicionar produto:", e);
    alert("Erro ao salvar produto.");
  }
}

// Carregamento em tempo real dos produtos
onSnapshot(collection(db, "produtos"), (snapshot) => {
  const produtos = [];
  snapshot.forEach((doc) => {
    produtos.push(doc.data());
  });
  renderizarProdutos(produtos);
});

// Tornar funções acessíveis ao HTML
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.abrirCarrinho = abrirCarrinho;
window.fecharCarrinho = fecharCarrinho;
window.finalizarPedido = finalizarPedido;
window.salvarProduto = salvarProduto;
window.abrirLogin = abrirLogin;
window.verificarSenha = verificarSenha;
window.fecharAdmin = fecharAdmin;
