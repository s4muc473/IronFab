// Sample transaction data
const transactions = [
    {
        id: 'txn_001',
        customer: 'Maria Santos',
        email: 'maria@empresa.com',
        product: 'TaskFlow Pro',
        status: 'success',
        amount: 49.90,
        date: '2024-01-15T10:30:00Z'
    },
    {
        id: 'txn_002',
        customer: 'João Oliveira',
        email: 'joao@startup.com',
        product: 'Analytics Plus',
        status: 'success',
        amount: 29.90,
        date: '2024-01-15T09:15:00Z'
    },
    {
        id: 'txn_003',
        customer: 'Ana Costa',
        email: 'ana@tech.com',
        product: 'CRM Starter',
        status: 'pending',
        amount: 19.90,
        date: '2024-01-15T08:45:00Z'
    },
    {
        id: 'txn_004',
        customer: 'Pedro Silva',
        email: 'pedro@digital.com',
        product: 'Email Marketing',
        status: 'success',
        amount: 39.90,
        date: '2024-01-14T16:20:00Z'
    },
    {
        id: 'txn_005',
        customer: 'Carla Mendes',
        email: 'carla@inovacao.com',
        product: 'TaskFlow Pro',
        status: 'failed',
        amount: 49.90,
        date: '2024-01-14T14:10:00Z'
    },
    {
        id: 'txn_006',
        customer: 'Roberto Lima',
        email: 'roberto@solucoes.com',
        product: 'Analytics Plus',
        status: 'success',
        amount: 29.90,
        date: '2024-01-14T11:30:00Z'
    }
];

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Get status badge HTML
function getStatusBadge(status) {
    const statusMap = {
        success: { class: 'status-success', text: 'Pago' },
        pending: { class: 'status-pending', text: 'Pendente' },
        failed: { class: 'status-failed', text: 'Falhou' }
    };
    
    const statusInfo = statusMap[status] || statusMap.pending;
    return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

// Populate transactions table
function populateTransactions() {
    const tbody = document.getElementById('transactionsBody');
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div>
                    <div style="font-weight: 500;">${transaction.customer}</div>
                    <div style="color: #6b7280; font-size: 12px;">${transaction.email}</div>
                </div>
            </td>
            <td>${transaction.product}</td>
            <td>${getStatusBadge(transaction.status)}</td>
            <td style="font-weight: 500;">${formatCurrency(transaction.amount)}</td>
            <td style="color: #6b7280;">${formatDate(transaction.date)}</td>
            <td>
                <div class="transaction-actions">
                    <button class="action-btn" title="Ver detalhes">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Mais opções">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Create revenue chart
function createRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    const ctx = canvas.getContext('2d');
    
    // Sample data for the last 30 days
    const days = [];
    const revenues = [];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.getDate());
        
        // Generate random revenue data
        const baseRevenue = 1500;
        const variation = Math.random() * 1000;
        revenues.push(baseRevenue + variation);
    }
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate scales
    const maxRevenue = Math.max(...revenues);
    const minRevenue = Math.min(...revenues);
    const revenueRange = maxRevenue - minRevenue;
    
    // Draw grid lines
    ctx.strokeStyle = '#f6f9fc';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height - 2 * padding) * i / 5;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw revenue line
    ctx.strokeStyle = '#635bff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    revenues.forEach((revenue, index) => {
        const x = padding + (width - 2 * padding) * index / (revenues.length - 1);
        const y = height - padding - ((revenue - minRevenue) / revenueRange) * (height - 2 * padding);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#635bff';
    revenues.forEach((revenue, index) => {
        const x = padding + (width - 2 * padding) * index / (revenues.length - 1);
        const y = height - padding - ((revenue - minRevenue) / revenueRange) * (height - 2 * padding);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
        const value = minRevenue + (revenueRange * (5 - i) / 5);
        const y = padding + (height - 2 * padding) * i / 5;
        ctx.fillText(formatCurrency(value), padding - 10, y + 4);
    }
}

// Animate metrics on load
function animateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(element => {
        const finalValue = element.textContent;
        element.textContent = '0';
        
        // Simple animation for demonstration
        setTimeout(() => {
            element.textContent = finalValue;
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, Math.random() * 500);
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    populateTransactions();
    
    // Wait for canvas to be properly sized
    setTimeout(() => {
        createRevenueChart();
    }, 100);
    
    animateMetrics();
    
    // Handle window resize for chart
    window.addEventListener('resize', () => {
        setTimeout(createRevenueChart, 100);
    });
    
    // Add click handlers for interactive elements
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Action clicked:', this.title);
        });
    });
    
    // Period selector change handler
    document.querySelector('.period-selector').addEventListener('change', function() {
        console.log('Period changed to:', this.value);
        // Here you would typically fetch new data and update the charts
    });
});

// Add some interactivity to the sidebar
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        console.log('Navigation clicked:', this.textContent.trim());
    });
});
