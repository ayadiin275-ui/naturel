# Naturel Shop - E-commerce Platform for Natural Products

Welcome to Naturel Shop! A modern, full-featured e-commerce platform for selling natural and organic products.

## 🌿 Features

### Customer Features
- 🛒 **Product Catalog** - Browse natural products by category
- 🔍 **Search & Filter** - Find products easily with advanced filtering
- 🛍️ **Shopping Cart** - Add/remove items and manage quantities
- 💳 **Checkout** - Secure order management (Stripe ready)
- 👤 **User Accounts** - Registration, login, and order history
- ⭐ **Product Reviews** - Rate and review products
- 📧 **Newsletter** - Subscribe for exclusive offers

### Admin Features
- ➕ **Product Management** - Add, edit, and delete products
- 📊 **Order Management** - Track and update order status
- 👥 **User Management** - View customer information
- 📈 **Analytics Ready** - Dashboard structure for sales metrics

### Technical Features
- ⚡ **Next.js 14** - Modern React framework with App Router
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 🗄️ **MongoDB** - NoSQL database for scalability
- 🔐 **JWT Authentication** - Secure user authentication
- 🛡️ **Password Hashing** - Bcrypt for secure passwords
- 📱 **Responsive** - Works on all devices
- ♿ **Accessible** - WCAG compliant

## 📋 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── products/          # Products pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── about/             # Info pages
│   ├── contact/
│   ├── order-confirmation/
│   └── api/               # API routes
│       ├── products/      # Product endpoints
│       ├── orders/        # Order endpoints
│       └── auth/          # Authentication
├── components/            # Reusable components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── models/               # MongoDB schemas
│   ├── Product.ts
│   ├── User.ts
│   ├── Order.ts
│   └── Category.ts
├── store/               # State management (Zustand)
│   └── cartStore.ts
├── types/              # TypeScript types
│   └── index.ts
└── utils/             # Utility functions
    ├── dbConnect.ts
    └── auth.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB (local or Atlas cloud)
- Stripe account (optional, for payments)

### Installation

1. **Clone the repository**
   ```bash
   cd naturel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # API
   NEXT_PUBLIC_API_URL=http://localhost:3000

   # Database
   MONGODB_URI=mongodb://localhost:27017/naturel-shop
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/naturel-shop

   # Stripe (optional)
   NEXT_PUBLIC_STRIPE_KEY=pk_test_your_public_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

4. **Install MongoDB locally (optional)**
   - On Windows: Download from https://www.mongodb.com/try/download/community
   - On Mac: `brew install mongodb-community`
   - On Linux: Follow MongoDB documentation

5. **Start MongoDB**
   ```bash
   # Windows: mongod.exe in MongoDB bin directory
   # Mac: brew services start mongodb-community
   # Linux: systemctl start mongod
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 API Documentation

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=supplements` - Get products by category
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 🎨 Customization

### Colors
Edit theme colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#10b981',      // Main green
  secondary: '#065f46',    // Dark green
}
```

### Branding
- Update logo/name in [Navbar.tsx](src/components/Navbar.tsx) and [Footer.tsx](src/components/Footer.tsx)
- Change site metadata in [layout.tsx](src/app/layout.tsx)

### Adding Products
Use the API endpoint or MongoDB directly:
```javascript
{
  name: "Product Name",
  description: "Product description",
  price: 29.99,
  category: "Supplements",
  image: "https://...",
  stock: 100,
  benefits: ["Benefit 1", "Benefit 2"],
  ingredients: ["Ingredient 1", "Ingredient 2"]
}
```

## 🔧 Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 💳 Payment Integration

To enable Stripe payments:

1. Get API keys from https://stripe.com
2. Add keys to `.env.local`
3. Update checkout page with Stripe integration
4. Install Stripe React library: `npm install @stripe/react-js @stripe/js`

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Netlify: Connect GitHub repo
- Heroku: Push to Heroku remote
- AWS/Google Cloud: Use their deployment guides

## 🔐 Security Considerations

- Change JWT_SECRET in production
- Use strong MongoDB passwords
- Enable HTTPS
- Validate all inputs on backend
- Use environment variables for secrets
- Regular security audits

## 📝 Database Setup

### Seed Sample Products
Create `scripts/seed.js`:
```javascript
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect(process.env.MONGODB_URI);

const products = [
  { name: "Vitamin C", price: 15.99, category: "Supplements", ... },
  // Add more products
];

Product.insertMany(products);
```

Run: `node scripts/seed.js`

## 🐛 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env.local
- Verify network access for Atlas

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found
```bash
npm install
rm -rf node_modules .next
npm run dev
```

##✨ Next Steps

1. **Add more products** to MongoDB
2. **Complete Stripe integration** for real payments
3. **Set up email notifications** with SendGrid/Mailgun
4. **Add admin dashboard** for product/order management
5. **Implement inventory management**
6. **Set up CI/CD pipeline** with GitHub Actions
7. **Add analytics** with Google Analytics or Mixpanel

## 📞 Support

For issues or questions:
- Check documentation
- Review code comments
- Check MongoDB/Next.js docs
- File issues on GitHub

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Thank You

Built with ❤️ for natural product lovers everywhere.

---

**Happy Coding! 🌿**
