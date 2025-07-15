// Global variables
let currentUser = null;
let transactions = [
    { id: 1, description: 'Venda Online', amount: 299.90, status: 'success', date: '2024-01-15' },
    { id: 2, description: 'Assinatura Mensal', amount: 49.90, status: 'success', date: '2024-01-14' },
    { id: 3, description: 'Produto Digital', amount: 199.90, status: 'pending', date: '2024-01-13' },
    { id: 4, description: 'Curso Online', amount: 399.90, status: 'success', date: '2024-01-12' }
];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', handleScroll);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

// Modal functions
function showModal(content) {
    modalContent.innerHTML = content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Authentication functions
function showLogin() {
    const loginForm = `
        <div class="payment-demo">
            <h2>Entrar na Conta</h2>
            <form class="payment-form" onsubmit="handleLogin(event)">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Senha" required>
                <button type="submit" class="btn btn-primary">Entrar</button>
                <p style="text-align: center; margin-top: 1rem;">
                    Não tem conta? <a href="#" onclick="showSignup()" style="color: var(--primary-color);">Cadastre-se</a>
                </p>
            </form>
        </div>
    `;
    showModal(loginForm);
}

function showSignup() {
    const signupForm = `
        <div class="payment-demo">
            <h2>Criar Conta</h2>
            <form class="payment-form" onsubmit="handleSignup(event)">
                <input type="text" placeholder="Nome completo" required>
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Senha" required>
                <input type="password" placeholder="Confirmar senha" required>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                <p style="text-align: center; margin-top: 1rem;">
                    Já tem conta? <a href="#" onclick="showLogin()" style="color: var(--primary-color);">Entre aqui</a>
                </p>
            </form>
        </div>
    `;
    showModal(signupForm);
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate login
    showLoading(form.querySelector('button'));
    
    setTimeout(() => {
        currentUser = { email: email, name: 'João Silva' };
        closeModal();
        showMessage('Login realizado com sucesso!', 'success');
        updateNavigation();
    }, 1500);
}

function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    
    // Simulate signup
    showLoading(form.querySelector('button'));
    
    setTimeout(() => {
        currentUser = { email: email, name: name };
        closeModal();
        showMessage('Conta criada com sucesso!', 'success');
        updateNavigation();
    }, 1500);
}

function updateNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const loginBtn = navMenu.querySelector('.btn-login');
    const signupBtn = navMenu.querySelector('.btn-signup');
    
    if (currentUser) {
        loginBtn.textContent = currentUser.name;
        loginBtn.onclick = showUserMenu;
        signupBtn.style.display = 'none';
    }
}

function showUserMenu() {
    const userMenu = `
        <div class="payment-demo">
            <h2>Minha Conta</h2>
            <div style="text-align: center; margin-bottom: 2rem;">
                <p><strong>${currentUser.name}</strong></p>
                <p style="color: var(--text-light);">${currentUser.email}</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn btn-outline" onclick="showDashboard()">Dashboard</button>
                <button class="btn btn-outline" onclick="showAnalytics()">Relatórios</button>
                <button class="btn btn-outline" onclick="logout()">Sair</button>
            </div>
        </div>
    `;
    showModal(userMenu);
}

function logout() {
    currentUser = null;
    closeModal();
    showMessage('Logout realizado com sucesso!', 'success');
    location.reload();
}

// Payment demo
function showPaymentDemo() {
    const paymentForm = `
        <div class="payment-demo">
            <h2>Demonstração de Pagamento</h2>
            <div class="payment-amount">R$ 99,90</div>
            <form class="payment-form" onsubmit="handlePayment(event)">
                <input type="text" placeholder="Nome no cartão" required>
                <input type="text" placeholder="Número do cartão" maxlength="19" oninput="formatCardNumber(this)" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" placeholder="MM/AA" maxlength="5" oninput="formatExpiry(this)" required>
                    <input type="text" placeholder="CVV" maxlength="3" required>
                </div>
                <input type="email" placeholder="Email" required>
                <button type="submit" class="btn btn-primary">Pagar R$ 99,90</button>
            </form>
            <p style="text-align: center; margin-top: 1rem; color: var(--text-light); font-size: 0.9rem;">
                🔒 Pagamento seguro e criptografado
            </p>
        </div>
    `;
    showModal(paymentForm);
}

function showCheckoutDemo() {
    const checkoutForm = `
        <div class="payment-demo">
            <h2>Checkout Personalizado</h2>
            <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Produto Digital</span>
                    <span>R$ 199,90</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Taxa de processamento</span>
                    <span>R$ 5,80</span>
                </div>
                <hr style="margin: 0.5rem 0;">
                <div style="display: flex; justify-content: space-between; font-weight: bold;">
                    <span>Total</span>
                    <span>R$ 205,70</span>
                </div>
            </div>
            <form class="payment-form" onsubmit="handleCheckout(event)">
                <input type="text" placeholder="Nome completo" required>
                <input type="email" placeholder="Email" required>
                <input type="text" placeholder="Número do cartão" maxlength="19" oninput="formatCardNumber(this)" required>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" placeholder="MM/AA" maxlength="5" oninput="formatExpiry(this)" required>
                    <input type="text" placeholder="CVV" maxlength="3" required>
                </div>
                <button type="submit" class="btn btn-primary">Finalizar Compra</button>
            </form>
        </div>
    `;
    showModal(checkoutForm);
}

function handlePayment(event) {
    event.preventDefault();
    const button = event.target.querySelector('button');
    
    showLoading(button);
    
    setTimeout(() => {
        closeModal();
        showPaymentSuccess();
    }, 2000);
}

function handleCheckout(event) {
    event.preventDefault();
    const button = event.target.querySelector('button');
    
    showLoading(button);
    
    setTimeout(() => {
        closeModal();
        showPaymentSuccess();
        
        // Add transaction to list
        const newTransaction = {
            id: transactions.length + 1,
            description: 'Produto Digital',
            amount: 205.70,
            status: 'success',
            date: new Date().toISOString().split('T')[0]
        };
        transactions.unshift(newTransaction);
    }, 2000);
}

function showPaymentSuccess() {
    const successMessage = `
        <div class="payment-demo" style="text-align: center;">
            <div style="font-size: 4rem; color: var(--secondary-color); margin-bottom: 1rem;">✓</div>
            <h2>Pagamento Aprovado!</h2>
            <p style="color: var(--text-light); margin: 1rem 0;">
                Sua transação foi processada com sucesso.
            </p>
            <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>ID da Transação:</strong> #${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p><strong>Valor:</strong> R$ 99,90</p>
                <p><strong>Status:</strong> Aprovado</p>
            </div>
            <button class="btn btn-primary" onclick="closeModal()">Fechar</button>
        </div>
    `;
    showModal(successMessage);
}

// Dashboard
function showDashboard() {
    if (!currentUser) {
        showLogin();
        return;
    }

    const totalRevenue = transactions
        .filter(t => t.status === 'success')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingAmount = transactions
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

    const dashboard = `
        <div class="dashboard">
            <h2>Dashboard</h2>
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-value">R$ ${totalRevenue.toFixed(2)}</div>
                    <div class="stat-label">Receita Total</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${transactions.filter(t => t.status === 'success').length}</div>
                    <div class="stat-label">Transações Aprovadas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">R$ ${pendingAmount.toFixed(2)}</div>
                    <div class="stat-label">Pendente</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">2.4%</div>
                    <div class="stat-label">Taxa Média</div>
                </div>
            </div>
            
            <h3 style="margin-bottom: 1rem;">Transações Recentes</h3>
            <div class="transactions-list">
                ${transactions.map(transaction => `
                    <div class="transaction-item">
                        <div>
                            <div style="font-weight: 500;">${transaction.description}</div>
                            <div style="color: var(--text-light); font-size: 0.9rem;">${formatDate(transaction.date)}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 500;">R$ ${transaction.amount.toFixed(2)}</div>
                            <div class="transaction-status status-${transaction.status}">
                                ${transaction.status === 'success' ? 'Aprovado' : 'Pendente'}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    showModal(dashboard);
}

// Analytics
function showAnalytics() {
    if (!currentUser) {
        showLogin();
        return;
    }

    const analytics = `
        <div class="analytics">
            <h2>Relatórios e Analytics</h2>
            
            <div class="chart-container">
                <h3>Vendas por Dia</h3>
                <div class="chart-placeholder">
                    📊 Gráfico de vendas dos últimos 30 dias
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Métodos de Pagamento</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-color);">65%</div>
                        <div>Cartão de Crédito</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: var(--secondary-color);">25%</div>
                        <div>PIX</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; color: #f59e0b);">10%</div>
                        <div>Boleto</div>
                    </div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Performance Mensal</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold;">R$ 12.450</div>
                        <div style="color: var(--text-light);">Janeiro</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold;">R$ 15.230</div>
                        <div style="color: var(--text-light);">Fevereiro</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold;">R$ 18.900</div>
                        <div style="color: var(--text-light);">Março</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(analytics);
}

// Contact form
function handleContactForm(event) {
    event.preventDefault();
    const button = event.target.querySelector('button');
    
    showLoading(button);
    
    setTimeout(() => {
        button.innerHTML = 'Enviar Mensagem';
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        event.target.reset();
    }, 1500);
}

// Utility functions
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Processando...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
