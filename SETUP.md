# Quick Start Guide - Naturel Shop

Get your e-commerce site up and running in 5 minutes! 🚀

## Step 1: Install Dependencies (2 minutes)

```bash
cd c:\Users\inesa\naturel
npm install
```

This will install all required packages including Next.js, MongoDB, Tailwind CSS, and more.

## Step 2: Set Up MongoDB (2 minutes)

### Option A: Use MongoDB Atlas (Cloud) - Recommended for beginners
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Get your connection string
5. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/naturel-shop
```

### Option B: Use Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Update `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/naturel-shop
```

## Step 3: Configure Environment Variables (1 minute)

Edit `.env.local` file:
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/naturel-shop

# JWT (change this to something random!)
JWT_SECRET=your-super-secret-key-12345

# Stripe (optional, leave for now)
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

## Step 4: Seed Sample Data (30 seconds)

Add sample products to your database:
```bash
node scripts/seed.js
```

You should see: ✓ Successfully inserted 8 products

## Step 5: Start Development Server (1 minute)

```bash
npm run dev
```

Open your browser and go to: http://localhost:3000

## ✅ You're Done! 

Your e-commerce site is now live locally! 

### What to try:
1. Browse products at `/products`
2. Add items to cart
3. View cart
4. Try checkout (just the form for now)
5. Register an account at `/register`
6. Login at `/login`

## 🎯 Next Steps

### Add Real Products
1. Open MongoDB Atlas/Compass
2. Navigate to `naturel-shop` database
3. Add products to `products` collection
4. Or modify `scripts/seed.js` and run again

### Enable Payments (Optional)
1. Get Stripe API keys from https://stripe.com
2. Add to `.env.local`
3. Install Stripe React: `npm install @stripe/react-js @stripe/js`
4. Update checkout page with Stripe form

### Deploy to Production
```bash
npm run build
# Then deploy to Vercel, Netlify, or your server
```

## 📁 Important Files to Edit

- **Homepage**: `src/app/page.tsx`
- **Navigation**: `src/components/Navbar.tsx`
- **Footer**: `src/components/Footer.tsx`
- **Colors**: `tailwind.config.js`
- **Database Models**: `src/models/`

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check MongoDB is running
# Or update MONGODB_URI in .env.local
```

### "Port 3000 already in use"
```bash
# Kill the process
npx kill-port 3000
# Try again
npm run dev
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

## 📚 Common Features to Add

### 1. Categories Page
Already built! Go to `/categories`

### 2. Search Products
Search bar in products page filters in real-time

### 3. User Dashboard
Create `src/app/dashboard/page.tsx` for user orders

### 4. Admin Panel
Create `src/app/admin/` folder for product management

### 5. Email Notifications
Integrate SendGrid or Mailgun for order confirmations

## 🚀 Performance Tips

- Images are optimized with Next.js Image component
- Database queries are efficient
- Tailwind CSS is tree-shaken in production
- API routes are serverless functions

## 🔐 Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT for authentication
- ✅ Environment variables for secrets
- ⚠️ TODO: HTTPS in production
- ⚠️ TODO: API rate limiting
- ⚠️ TODO: CORS configuration

## 📞 Help

If you get stuck:
1. Check the README.md for full documentation
2. Review code comments in the files
3. Check Next.js documentation: https://nextjs.org
4. Check MongoDB docs: https://docs.mongodb.com

---

**Happy selling! 🌿💚**

Questions? Check the README.md for more info!
