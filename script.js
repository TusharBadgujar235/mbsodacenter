// Order Management System
const orderState = {
    items: [],
    subtotal: 0,
    total: 0
};

// DOM Elements
const addButtons = document.querySelectorAll('.add-btn');
const orderList = document.getElementById('order-list');
const subtotalDisplay = document.getElementById('subtotal');
const totalDisplay = document.getElementById('total');
const placeOrderBtn = document.getElementById('place-order');
const clearOrderBtn = document.getElementById('clear-order');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModalBtn = document.querySelector('.close-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize Event Listeners
function init() {
    // Add to order buttons
    addButtons.forEach(btn => {
        btn.addEventListener('click', addToOrder);
    });

    // Order management buttons
    placeOrderBtn.addEventListener('click', placeOrder);
    clearOrderBtn.addEventListener('click', clearOrder);
    closeModalBtn.addEventListener('click', closeModal);

    // Mobile menu
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeModal();
        }
    });

    loadOrderFromStorage();
}

// Toggle mobile menu
function toggleMenu() {
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
}

// Add item to order
function addToOrder(e) {
    const btn = e.target;
    const flavour = btn.dataset.flavour;
    const price = parseInt(btn.dataset.price);

    // Check if item already exists
    const existingItem = orderState.items.find(item => item.flavour === flavour);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderState.items.push({
            id: Date.now(),
            flavour: flavour,
            price: price,
            quantity: 1
        });
    }

    updateUI();
    showFeedback(btn);
    saveOrderToStorage();
}

// Show feedback when item is added
function showFeedback(btn) {
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#4caf50';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
}

// Update UI
function updateUI() {
    if (orderState.items.length === 0) {
        orderList.innerHTML = '<p class="empty-order">No items added yet. Start by adding your favorite flavours!</p>';
    } else {
        orderList.innerHTML = orderState.items.map(item => `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-name">${item.flavour}</div>
                    <div class="order-item-qty">Quantity: ${item.quantity}</div>
                </div>
                <div class="order-item-price">₹${item.price * item.quantity}</div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromOrder(${item.id})">Remove</button>
            </div>
        `).join('');
    }

    calculateTotal();
}

// Increase quantity
function increaseQuantity(id) {
    const item = orderState.items.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
        updateUI();
        saveOrderToStorage();
    }
}

// Decrease quantity
function decreaseQuantity(id) {
    const item = orderState.items.find(i => i.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromOrder(id);
            return;
        }
        updateUI();
        saveOrderToStorage();
    }
}

// Remove item from order
function removeFromOrder(id) {
    orderState.items = orderState.items.filter(item => item.id !== id);
    updateUI();
    saveOrderToStorage();
}

// Clear all orders
function clearOrder() {
    if (orderState.items.length === 0) {
        alert('Your cart is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear all items?')) {
        orderState.items = [];
        updateUI();
        saveOrderToStorage();
    }
}

// Calculate total
function calculateTotal() {
    orderState.subtotal = orderState.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // No tax system as per requirement
    orderState.total = orderState.subtotal;

    subtotalDisplay.textContent = `₹${orderState.subtotal}`;
    totalDisplay.textContent = `₹${orderState.total}`;
}

// Validate customer details
function validateCustomerDetails() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();

    const errors = [];

    if (!name) errors.push('Please enter your full name');
    if (!phone) {
        errors.push('Please enter your phone number');
    } else if (!isValidPhone(phone)) {
        errors.push('Please enter a valid phone number');
    }
    if (!address) errors.push('Please enter your delivery address');

    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }

    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Place order
function placeOrder() {
    // Validate order items
    if (orderState.items.length === 0) {
        alert('Please add items to your order before placing it!');
        return;
    }

    // Validate customer details
    if (!validateCustomerDetails()) {
        return;
    }

    // Prepare order data
    const deliveryElement = document.querySelector('input[name="delivery"]:checked');
    const delivery = deliveryElement ? deliveryElement.value : 'pickup'; // Default to pickup if not selected
    const orderData = {
        id: 'ORD-' + Date.now(),
        timestamp: new Date().toLocaleString(),
        customer: {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('customer-address').value,
            deliveryType: delivery
        },
        items: orderState.items,
        subtotal: orderState.subtotal,
        total: orderState.total
    };

    // Save order to storage
    saveOrderToDatabase(orderData);

    // Show confirmation
    showConfirmation(orderData);

    // Clear form
    clearForm();
}

// Save order to local storage
function saveOrderToDatabase(orderData) {
    let orders = JSON.parse(localStorage.getItem('mbSodaOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('mbSodaOrders', JSON.stringify(orders));

    // Also log to console for admin viewing
    console.log('Order placed:', orderData);
}

// Show confirmation modal
function showConfirmation(orderData) {
    const itemsList = orderData.items
        .map(item => `${item.flavour} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`)
        .join('<br>');

    const orderDetails = `
        <strong>Order ID:</strong> ${orderData.id}<br>
        <strong>Name:</strong> ${orderData.customer.name}<br>
        <strong>Phone:</strong> ${orderData.customer.phone}<br>
        <strong>Delivery:</strong> ${orderData.customer.deliveryType.charAt(0).toUpperCase() + orderData.customer.deliveryType.slice(1)}<br><br>
        <strong>Items:</strong><br>${itemsList}<br><br>
        <strong>Total Amount:</strong> ₹${orderData.total}<br><br>
        We will confirm your order shortly. Thank you for choosing MB Soda Center!
    `;

    document.getElementById('order-details').innerHTML = orderDetails;
    confirmationModal.classList.add('show');

    // Show thank you popup
    showThankYouPopup(orderData);

    // Reset cart
    orderState.items = [];
    updateUI();
    clearStorage();
}

// Show thank you popup
function showThankYouPopup(orderData) {
    const thankYouModal = document.getElementById('thank-you-modal');
    const thankYouDetails = document.getElementById('thank-you-details');
    
    const detailsHTML = `
        <p><strong>Order ID:</strong> ${orderData.id}</p>
        <p><strong>Customer Name:</strong> ${orderData.customer.name}</p>
        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
        <p><strong>Total Amount:</strong> ₹${orderData.total}</p>
    `;
    
    thankYouDetails.innerHTML = detailsHTML;
    thankYouModal.classList.add('show');
}

// Close thank you popup
function closeThankYouModal() {
    const thankYouModal = document.getElementById('thank-you-modal');
    thankYouModal.classList.remove('show');
    location.reload();
}

// Close modal
function closeModal() {
    confirmationModal.classList.remove('show');
}

// Clear form
function clearForm() {
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    document.querySelector('input[name="delivery"][value="pickup"]').checked = true;
}

// Local Storage Functions
function saveOrderToStorage() {
    localStorage.setItem('mbSodaCart', JSON.stringify(orderState));
}

function loadOrderFromStorage() {
    const saved = localStorage.getItem('mbSodaCart');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            orderState.items = data.items || [];
            orderState.subtotal = data.subtotal || 0;
            orderState.total = data.total || 0;
            updateUI();
        } catch (e) {
            console.error('Error loading cart:', e);
        }
    }
}

function clearStorage() {
    localStorage.removeItem('mbSodaCart');
}

// Admin Dashboard Function (accessible via console)
function viewAllOrders() {
    const orders = JSON.parse(localStorage.getItem('mbSodaOrders')) || [];
    console.table(orders);
    return orders;
}

function clearAllOrders() {
    if (confirm('Are you sure you want to clear all orders? This cannot be undone.')) {
        localStorage.removeItem('mbSodaOrders');
        console.log('All orders cleared');
    }
}

// Export order as CSV
function exportOrdersAsCSV() {
    const orders = JSON.parse(localStorage.getItem('mbSodaOrders')) || [];
    if (orders.length === 0) {
        alert('No orders to export');
        return;
    }

    let csv = 'Order ID,Timestamp,Customer Name,Email,Phone,Address,Delivery Type,Items,Subtotal,Total\n';
    
    orders.forEach(order => {
        const items = order.items.map(i => `${i.flavour}(x${i.quantity})`).join('; ');
        const row = [
            order.id,
            order.timestamp,
            order.customer.name,
            order.customer.email,
            order.customer.phone,
            order.customer.address,
            order.customer.deliveryType,
            items,
            order.subtotal,
            order.total
        ].map(val => `"${val}"`).join(',');
        csv += row + '\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mb-soda-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Console Commands Reference
console.log(`
╔════════════════════════════════════════════════════════════╗
║         MB SODA CENTER - Admin Commands                    ║
╠════════════════════════════════════════════════════════════╣
║ viewAllOrders()          - View all orders                 ║
║ clearAllOrders()         - Clear all orders (with confirm) ║
║ exportOrdersAsCSV()      - Export orders as CSV file       ║
║ viewAllOrders().length   - Get total number of orders      ║
╚════════════════════════════════════════════════════════════╝
`);
