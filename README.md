# MB Soda Center - Business Website

A modern, fully responsive business website for MB Soda Center, a premium cold drinks brand. Features a complete order management system for customers without any tax system.

## 🎯 Features

### 1. **Modern Design**
- Gradient color schemes with professional branding
- Smooth animations and transitions
- Glass-morphism effects
- Modern typography and spacing

### 2. **Responsive Layout**
- Fully responsive on all devices (Mobile, Tablet, Desktop)
- Mobile-first design approach
- Hamburger menu for mobile navigation
- Adaptive grid layouts

### 3. **Flavours Showcase**
Seven premium flavours with beautiful cards:
- **Jira** - Refreshing herbal blend (₹30)
- **Orange** - Citrus burst (₹35)
- **Pineapple** - Tropical sweetness (₹35)
- **Guava** - Natural fruity goodness (₹30)
- **Pudina** - Cool minty freshness (₹28)
- **Limbu Soda** - Zesty lime sparkle (₹32)
- **Fuljar Soda** - Traditional effervescent (₹30)

### 4. **Complete Order Management System**
- **Add to Cart**: Click "Add to Order" button on any flavour
- **Quantity Management**: Increase/decrease quantities with +/- buttons
- **Remove Items**: Remove individual items from cart
- **Clear Cart**: Clear all items at once
- **Price Calculation**: Automatic subtotal and total calculation
- **No Tax System**: Direct pricing without any additional taxes

### 5. **Customer Details Collection**
- Full Name validation
- Email validation
- Phone number validation
- Delivery address collection
- Delivery type selection (Pickup or Home Delivery)

### 6. **Order Management**
- Real-time order total updates
- Order confirmation with Order ID
- Order storage in browser's local storage
- Admin console commands for order management
- CSV export functionality

### 7. **User Experience**
- Smooth scrolling navigation
- Interactive feedback on actions
- Loading states for buttons
- Modal confirmation for orders
- Form validation with error messages
- Persistent cart (saved in browser)

## 📁 File Structure

```
MB Soda Center New/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Order management and functionality
└── README.md           # This file
```

## 🚀 How to Use

### 1. **Opening the Website**
- Simply open `index.html` in any modern web browser
- No server or installation required
- Works offline

### 2. **Adding Items to Order**
1. Scroll to "Our Delicious Flavours" section
2. Click "Add to Order" button on desired flavour
3. Item will be added to your cart automatically
4. Button shows confirmation feedback

### 3. **Managing Cart**
- Use +/- buttons to adjust quantities
- Click "Remove" to delete an item
- Click "Clear All" to empty entire cart

### 4. **Placing an Order**
1. Fill in customer details:
   - Full Name
   - Email Address
   - Phone Number
   - Delivery Address
2. Select delivery type (Pickup or Home Delivery)
3. Click "Place Order"
4. Confirmation modal will appear with Order ID
5. Order is saved in browser storage

### 5. **Admin Functions** (Access via Browser Console)
Open browser console (F12 or Right-click → Inspect → Console) and use:

```javascript
// View all orders as table
viewAllOrders()

// Get number of orders
viewAllOrders().length

// Export orders to CSV file
exportOrdersAsCSV()

// Clear all orders (with confirmation)
clearAllOrders()
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b35;      /* Orange */
    --secondary-color: #f7931e;    /* Dark Orange */
    --accent-color: #004e89;       /* Blue */
    --dark-color: #1a1a1a;         /* Dark */
    --light-color: #f5f5f5;        /* Light Gray */
    --text-color: #333;            /* Text */
}
```

### Add New Flavours
In `index.html`, duplicate a flavour card in the flavours section:
```html
<div class="flavour-card">
    <div class="flavour-icon YOUR-CLASS">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Flavour Name</h3>
    <p>Description text</p>
    <button class="add-btn" data-flavour="Flavour Name" data-price="30">Add to Order</button>
</div>
```

Add custom color in CSS:
```css
.flavour-icon.YOUR-CLASS {
    background: linear-gradient(135deg, #color1, #color2);
}
```

### Update Prices
Change the `data-price` attribute in add buttons:
```html
<button class="add-btn" data-flavour="Orange" data-price="40">Add to Order</button>
```

### Modify Contact Information
Edit the contact section in `index.html`:
```html
<div class="contact-info">
    <i class="fas fa-phone"></i>
    <h4>Phone</h4>
    <p>+977 1 XXXX XXXX<br>Your Number Here</p>
</div>
```

## 💾 Data Storage

### Order Data Storage
- Orders are stored in browser's LocalStorage
- Data persists across browser sessions
- No database required
- CSV export available for backup

### Cart Persistence
- Current cart saved automatically
- Survives browser refresh
- Cleared after order placement

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox
- **Vanilla JavaScript** - No dependencies
- **Font Awesome Icons** - Icon library
- **LocalStorage API** - Data persistence

## 📊 Features Details

### Order Validation
- Requires at least one item in cart
- Validates customer name (not empty)
- Email format validation
- Phone number validation
- Address validation

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Admin Features

Monitor orders through browser console:

1. **View All Orders**
   ```javascript
   viewAllOrders()
   ```
   Returns array of all orders with complete details

2. **Export Orders**
   ```javascript
   exportOrdersAsCSV()
   ```
   Downloads CSV file with all orders and customer details

3. **Order Count**
   ```javascript
   viewAllOrders().length
   ```
   Shows total number of orders received

## 🔐 Security Notes

- Form validation on client-side for UX
- No sensitive data transmission (local storage only)
- Suitable for small-scale operations
- For production, implement server-side validation and security

## 📝 Order Information Collected

Each order includes:
- Unique Order ID (timestamp-based)
- Order timestamp
- Customer name, email, phone, address
- Delivery type preference
- All ordered items with quantities
- Order total amount

## 🌟 Highlights

✨ **No Dependencies** - Pure HTML, CSS, JavaScript
⚡ **Fast Loading** - Optimized for speed
📱 **Mobile First** - Perfect on any device
🎨 **Beautiful Design** - Modern and professional
🛒 **Complete System** - Everything needed for orders
💾 **Data Persistence** - Cart and orders saved
📊 **Admin Tools** - Console-based management
🎯 **Easy to Use** - Intuitive interface

## 📞 Contact Information

**MB Soda Center**
- Location: Kathmandu, Nepal
- Phone: +977 1 XXXX XXXX
- Email: info@mbsodacenter.com
- Hours: Mon - Sun: 8:00 AM - 10:00 PM

## 📄 License

This website is created for MB Soda Center. All rights reserved.

## 🚀 Future Enhancements

- Integration with payment gateway
- Customer accounts and order history
- Ratings and reviews system
- Promotional discounts and coupons
- Real-time order tracking
- Backend database integration
- Email/SMS notifications

---

**Version**: 1.0
**Last Updated**: December 2025
**Created for**: MB Soda Center - Premium Cold Drinks
