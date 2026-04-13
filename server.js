const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;
const publicDir = path.join(__dirname, 'public');

// Simple in-memory database for products
const products = [
  {
    id: '1',
    name: 'Organic Vitamin C Supplement',
    description: 'High-potency vitamin C from organic ascorbic acid. Supports immune system health.',
    price: 24.99,
    category: 'Supplements',
    image: '/images/in1.jpg',
    stock: 50,
    rating: 4.5,
    benefits: ['Immune support', 'Antioxidant', 'Energy boost'],
    ingredients: ['Ascorbic acid', 'Rose hips', 'Bioflavonoids']
  },
  {
    id: '2',
    name: 'Pure Aloe Vera Skincare',
    description: 'Natural aloe vera gel for soothing and moisturizing skin.',
    price: 18.99,
    category: 'Skincare',
    image: '/images/in2.jpg',
    stock: 75,
    rating: 4.8,
    benefits: ['Moisturizing', 'Soothing', 'Anti-inflammatory'],
    ingredients: ['Aloe vera extract', 'Coconut oil', 'Vitamin E']
  },
  {
    id: '3',
    name: 'Turmeric Wellness Capsules',
    description: 'Golden turmeric root capsules for natural wellness and joint support.',
    price: 32.99,
    category: 'Supplements',
    image: '/images/in3.jpg',
    stock: 40,
    rating: 4.6,
    benefits: ['Anti-inflammatory', 'Joint support', 'Antioxidant'],
    ingredients: ['Turmeric root', 'Black pepper', 'Ginger']
  },
  {
    id: '4',
    name: 'Lavender Essential Oil',
    description: 'Premium organic lavender essential oil for relaxation and wellness.',
    price: 22.99,
    category: 'Wellness',
    image: '/images/in4.jpg',
    stock: 60,
    rating: 4.9,
    benefits: ['Relaxation', 'Stress relief', 'Sleep support'],
    ingredients: ['Lavender flower oil']
  },
  {
    id: '5',
    name: 'Natural Face Moisturizer',
    description: 'Lightweight moisturizer with natural ingredients for all skin types.',
    price: 28.99,
    category: 'Skincare',
    image: '/images/in5.jpg',
    stock: 45,
    rating: 4.7,
    benefits: ['Hydration', 'Anti-aging', 'Softening'],
    ingredients: ['Jojoba oil', 'Shea butter', 'Rosehip oil']
  },
  {
    id: '6',
    name: 'Organic Green Tea Extract',
    description: 'Pure green tea extract for metabolism support and antioxidants.',
    price: 19.99,
    category: 'Supplements',
    image: '/images/in6.jpg',
    stock: 80,
    rating: 4.4,
    benefits: ['Antioxidant', 'Metabolism boost', 'Energy'],
    ingredients: ['Green tea extract', 'EGCG']
  },
  {
    id: '7',
    name: 'Organic Honey Face Mask',
    description: 'Nourishing honey-based face mask for radiant, glowing skin.',
    price: 25.99,
    category: 'Beauty',
    image: '/images/in7.jpg',
    stock: 55,
    rating: 4.8,
    benefits: ['Nourishing', 'Brightening', 'Hydrating'],
    ingredients: ['Organic honey', 'Oat extract', 'Yogurt']
  },
  {
    id: '8',
    name: 'Omega-3 Supplement',
    description: 'Plant-based omega-3 from algae for heart and brain health.',
    price: 35.99,
    category: 'Supplements',
    image: '/images/in8    ssh-keygen -t ed25519 -C "ton-email@example.com"    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDNGd09iP4Sz+HsSvvn+hQfIupRTvRBtAU/fqblw7qTB ayadiin275-ui@example.com.jpg',
    stock: 35,
    rating: 4.6,
    benefits: ['Heart health', 'Brain support', 'Anti-inflammatory'],
    ingredients: ['Algae extract', 'DHA', 'EPA']
  },
  {
    id: '9',
    name: 'Organic Probiotic Capsules',
    description: 'Daily probiotic supplement for gut health and digestion.',
    price: 29.99,
    category: 'Supplements',
    image: '/images/in10.jpg',
    stock: 65,
    rating: 4.7,
    benefits: ['Gut health', 'Digestive support', 'Immune boost'],
    ingredients: ['Lactobacillus', 'Bifidobacterium', 'Prebiotics']
  }
];

// Simple in-memory database for users
const users = [];
let currentUser = null;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Serve static public files
  if (pathname.startsWith('/images/')) {
    const filePath = path.join(publicDir, pathname);
    if (!filePath.startsWith(publicDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif'
      };

      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
    return;
  }
  
  // JSON API endpoint for products
  if (pathname === '/api/products' && req.method === 'GET') {
    const category = parsedUrl.query.category;
    let filtered = products;
    
    if (category) {
      filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filtered));
    return;
  }
  
  // Get single product
  if (pathname.startsWith('/api/products/') && req.method === 'GET') {
    const id = pathname.split('/')[3];
    const product = products.find(p => p.id === id);
    
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Product not found' }));
    }
    return;
  }

  if (pathname === '/login') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getLoginPage());
    return;
  }

  if (pathname === '/signup') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getSignupPage());
    return;
  }

  if (pathname === '/profile') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getProfilePage());
    return;
  }
  
  // Serve main HTML page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(getMainPage());
});

function getLoginPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Naturel Shop</title>
  <style>
    body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #edf2f7; color: #2d3748; }
    .page-container { max-width: 480px; margin: 4rem auto; padding: 2rem; background: white; border-radius: 20px; box-shadow: 0 20px 45px rgba(15,23,42,0.12); }
    h1 { margin-bottom: 1rem; color: #1a202c; }
    p { margin-bottom: 1.5rem; color: #4a5568; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 700; }
    input { width: 100%; padding: 0.95rem 1rem; border: 1px solid #cbd5e0; border-radius: 0.85rem; margin-bottom: 1rem; }
    button { width: 100%; padding: 0.95rem 1rem; border: none; border-radius: 999px; background: #38a169; color: white; font-weight: 700; cursor: pointer; }
    button:hover { background: #2f855a; }
    .link { display: block; margin-top: 1rem; text-align: center; color: #38a169; text-decoration: none; }
    .message { margin-top: 1rem; padding: 1rem; background: #e6fffa; border: 1px solid #9ae6b4; color: #22543d; border-radius: 1rem; }
  </style>
</head>
<body>
  <div class="page-container">
    <h1>Login</h1>
    <p>Entrez votre email et mot de passe pour vous connecter.</p>
    <form id="login-form">
      <label for="login-email">Email</label>
      <input id="login-email" type="email" placeholder="you@example.com" required>
      <label for="login-password">Mot de passe</label>
      <input id="login-password" type="password" placeholder="Password" required>
      <button type="submit">Se connecter</button>
    </form>
    <a class="link" href="/signup">Créer un compte</a>
    <a class="link" href="/">Retour à la boutique</a>
    <div id="login-message" class="message hidden"></div>
  </div>
  <script>
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const name = email.split('@')[0] || 'Utilisateur';
      localStorage.setItem('naturel_user', JSON.stringify({ name, email }));
      loginMessage.textContent = 'Connexion réussie ! Bienvenue ' + name + '.';
      loginMessage.classList.remove('hidden');
      setTimeout(() => { window.location.href = '/profile'; }, 1200);
    });
  </script>
</body>
</html>
`;
}

function getSignupPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up - Naturel Shop</title>
  <style>
    body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #edf2f7; color: #2d3748; }
    .page-container { max-width: 480px; margin: 4rem auto; padding: 2rem; background: white; border-radius: 20px; box-shadow: 0 20px 45px rgba(15,23,42,0.12); }
    h1 { margin-bottom: 1rem; color: #1a202c; }
    p { margin-bottom: 1.5rem; color: #4a5568; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 700; }
    input { width: 100%; padding: 0.95rem 1rem; border: 1px solid #cbd5e0; border-radius: 0.85rem; margin-bottom: 1rem; }
    button { width: 100%; padding: 0.95rem 1rem; border: none; border-radius: 999px; background: #38a169; color: white; font-weight: 700; cursor: pointer; }
    button:hover { background: #2f855a; }
    .link { display: block; margin-top: 1rem; text-align: center; color: #38a169; text-decoration: none; }
    .message { margin-top: 1rem; padding: 1rem; background: #e6fffa; border: 1px solid #9ae6b4; color: #22543d; border-radius: 1rem; }
  </style>
</head>
<body>
  <div class="page-container">
    <h1>Sign Up</h1>
    <p>Créez un compte pour commencer à acheter.</p>
    <form id="signup-form">
      <label for="signup-name">Nom</label>
      <input id="signup-name" type="text" placeholder="Votre nom" required>
      <label for="signup-email">Email</label>
      <input id="signup-email" type="email" placeholder="you@example.com" required>
      <label for="signup-password">Mot de passe</label>
      <input id="signup-password" type="password" placeholder="Password" required>
      <button type="submit">Créer un compte</button>
    </form>
    <a class="link" href="/login">J'ai déjà un compte</a>
    <a class="link" href="/">Retour à la boutique</a>
    <div id="signup-message" class="message hidden"></div>
  </div>
  <script>
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');

    signupForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('signup-name').value.trim() || 'Utilisateur';
      const email = document.getElementById('signup-email').value.trim();
      localStorage.setItem('naturel_user', JSON.stringify({ name, email }));
      signupMessage.textContent = 'Inscription réussie ! Bienvenue ' + name + '.';
      signupMessage.classList.remove('hidden');
      setTimeout(() => { window.location.href = '/profile'; }, 1200);
    });
  </script>
</body>
</html>
`;
}

function getProfilePage() {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Profil - Naturel Shop</title>
  <style>
    body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1e293b; }
    .page-container { max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; }
    .profile-header { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-bottom: 2rem; }
    .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #38a169, #2f855a); display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; font-weight: bold; }
    .profile-info h1 { margin: 0; font-size: 2rem; color: #1e293b; }
    .profile-info p { margin: 0.5rem 0; color: #64748b; }
    .button { padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s; background: #38a169; color: white; }
    .button:hover { background: #2f855a; }
    .button-secondary { background: #e2e8f0; color: #475569; margin-left: 1rem; }
    .button-secondary:hover { background: #cbd5e0; }
    .profile-actions { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
    .notice { margin: 1rem 0; padding: 1rem; border-radius: 8px; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .hidden { display: none; }
    a { color: #38a169; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="profile-header">
      <div class="profile-avatar" id="profile-avatar">U</div>
      <div class="profile-info">
        <h1 id="profile-name">Mon Profil</h1>
        <p id="profile-email">Connectez-vous pour voir vos informations</p>
      </div>
    </div>

    <div id="profile-status" class="notice hidden"></div>

    <div class="profile-actions">
      <button class="button" id="logout-button" type="button">Se déconnecter</button>
      <a class="button-secondary" href="/">Retour à la boutique</a>
    </div>
  </div>
  <script>
    const user = JSON.parse(localStorage.getItem('naturel_user') || 'null');
    const profileStatus = document.getElementById('profile-status');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');
    const logoutButton = document.getElementById('logout-button');

    function showProfile() {
      if (!user) {
        profileName.textContent = 'Mon Profil';
        profileEmail.textContent = 'Connectez-vous pour voir votre profil.';
        profileStatus.textContent = 'Vous n\'êtes pas connecté. Vous pouvez vous connecter ou créer un compte.';
        profileStatus.classList.remove('hidden');
        if (logoutButton) logoutButton.style.display = 'none';
        profileAvatar.textContent = 'U';
        return;
      }

      profileStatus.classList.add('hidden');
      if (logoutButton) logoutButton.style.display = 'inline-flex';
      profileName.textContent = 'Bienvenue, ' + user.name;
      profileEmail.textContent = '';
      profileAvatar.textContent = user.name.charAt(0).toUpperCase();
    }

    function logout() {
      localStorage.removeItem('naturel_user');
      window.location.href = '/';
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }

    showProfile();
  </script>
</body>
</html>
`;
}

function getMainPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naturel Shop - Premium Natural Products</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      min-height: 100vh;
    }
    
    header {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 50%, #22543d 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    header h1 { 
      font-size: 1.8rem; 
      font-weight: 700;
      background: linear-gradient(45deg, #68d391, #9ae6b4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    nav a,
    nav button.nav-btn {
      color: white;
      text-decoration: none;
      margin: 0 1.2rem;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      background: transparent;
      border: none;
      cursor: pointer;
      font: inherit;
      padding: 0;
    }
    
    nav a:hover,
    nav button.nav-btn:hover {
      color: #68d391;
      transform: translateY(-2px);
    }
    
    nav a::after,
    nav button.nav-btn::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 50%;
      background: #68d391;
      transition: all 0.3s ease;
    }
    
    nav a:hover::after,
    nav button.nav-btn:hover::after {
      width: 100%;
      left: 0;
    }
    
    .hero {
      background: linear-gradient(135deg, #38a169 0%, #2f855a 50%, #22543d 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
      opacity: 0.3;
    }
    
    .hero h2 { 
      font-size: 3rem; 
      margin-bottom: 1rem; 
      font-weight: 800;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      animation: fadeInUp 1s ease-out;
    }
    
    .hero p { 
      font-size: 1.3rem; 
      margin-bottom: 2rem; 
      opacity: 0.95;
      animation: fadeInUp 1s ease-out 0.2s both;
    }
    
    .button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, #68d391 0%, #48bb78 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-size: 1.1rem;
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
      transition: all 0.3s ease;
      animation: fadeInUp 1s ease-out 0.4s both;
    }
    
    .button:hover { 
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .product-card {
      background: white;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      transition: all 0.3s ease;
      position: relative;
      border: 1px solid #e2e8f0;
    }

    .auth-section {
      background: #f7fafc;
      padding: 2rem 2rem 1rem;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      margin: 2rem 0;
    }

    .auth-box {
      max-width: 700px;
      margin: 0 auto;
      display: grid;
      gap: 1.25rem;
    }

    .auth-tabs {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .auth-tab {
      flex: 1;
      padding: 0.9rem 1rem;
      border-radius: 999px;
      border: 1px solid #cbd5e0;
      background: white;
      color: #2d3748;
      cursor: pointer;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .auth-tab.active,
    .auth-tab:hover {
      background: #38a169;
      color: white;
      border-color: #38a169;
    }

    .auth-content {
      background: white;
      border-radius: 18px;
      padding: 1.75rem;
      box-shadow: 0 10px 24px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }

    .auth-content h3 {
      margin-bottom: 1rem;
    }

    .auth-content label {
      font-weight: 700;
      display: block;
      margin-bottom: 0.35rem;
      color: #2d3748;
    }

    .auth-content input {
      width: 100%;
      padding: 0.95rem 1rem;
      border: 1px solid #cbd5e0;
      border-radius: 0.85rem;
      margin-bottom: 1rem;
      background: #f8fafc;
    }

    .auth-message,
    .auth-welcome {
      background: #e6fffa;
      color: #22543d;
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      border: 1px solid #9ae6b4;
      text-align: center;
      font-weight: 700;
    }
    
    .product-card:hover { 
      transform: translateY(-10px);
      box-shadow: 0 18px 40px rgba(0,0,0,0.18);
    }
    
    .product-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #38a169, #68d391, #9ae6b4);
    }
    
    .product-image {
      width: 100%;
      height: 240px;
      background: #f8faf8;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      padding: 1rem;
    }
    
    .product-image img {
      width: auto;
      height: 100%;
      max-width: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
      border-radius: 12px;
      box-shadow: inset 0 0 0 rgba(0,0,0,0.08);
    }
    
    .product-card:hover .product-image img {
      transform: scale(1.05);
    }
    
    .product-info {
      padding: 1.5rem;
    }
    
    .product-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #2d3748;
      line-height: 1.4;
    }
    
    .product-desc {
      font-size: 0.95rem;
      color: #718096;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }
    
    .product-price {
      font-size: 1.6rem;
      font-weight: 800;
      color: #38a169;
      background: linear-gradient(135deg, #38a169, #48bb78);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .product-rating {
      color: #fbbf24;
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .add-to-cart {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(56, 161, 105, 0.3);
    }
    
    .add-to-cart:hover { 
      background: linear-gradient(135deg, #2f855a 0%, #38a169 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(56, 161, 105, 0.4);
    }
    
    footer {
      background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      margin-top: 4rem;
      position: relative;
    }
    
    footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #38a169, #68d391, #9ae6b4);
    }
    
    h2 { 
      font-size: 2.5rem; 
      margin-bottom: 1.5rem; 
      font-weight: 700;
      color: #2d3748;
    }
    
    footer h2 {
      color: white;
      margin-bottom: 1rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
    }
    
    .feature {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.8);
      position: relative;
      overflow: hidden;
    }
    
    .feature::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #38a169, #68d391);
    }
    
    .feature:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    
    .feature-icon { 
      font-size: 3rem; 
      margin-bottom: 1rem;
      display: block;
    }
    
    .feature h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2d3748;
    }
    
    .feature p {
      color: #718096;
      line-height: 1.6;
    }

    .cart-panel {
      display: grid;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .cart-empty {
      background: #f0fff4;
      color: #22543d;
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px dashed #68d391;
      text-align: center;
      font-weight: 600;
    }

    .cart-items {
      display: grid;
      gap: 1rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1rem;
      align-items: center;
      background: white;
      padding: 1rem;
      border-radius: 1rem;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    }

    .cart-item-image {
      width: 80px;
      height: 80px;
      border-radius: 1rem;
      overflow: hidden;
      background: #edf2f7;
    }

    .cart-item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cart-item-details {
      display: grid;
      gap: 0.25rem;
    }

    .cart-item-title {
      font-weight: 700;
      color: #2d3748;
    }

    .cart-item-price {
      color: #38a169;
      font-weight: 700;
    }

    .cart-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .quantity-button,
    .remove-button {
      border: none;
      cursor: pointer;
      padding: 0.6rem 0.8rem;
      border-radius: 0.75rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .quantity-button {
      background: #edf2f7;
      color: #2d3748;
    }

    .quantity-button:hover {
      background: #e2e8f0;
    }

    .remove-button {
      background: #fed7d7;
      color: #9b2c2c;
    }

    .remove-button:hover {
      background: #fbb6b6;
    }

    .cart-summary {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
      display: grid;
      gap: 1rem;
      justify-items: end;
    }

    .checkout-form-wrapper {
      background: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
      display: grid;
      gap: 1rem;
      margin-top: 1rem;
    }

    .checkout-form {
      display: grid;
      gap: 1rem;
    }

    .checkout-form label {
      font-weight: 700;
      color: #2d3748;
    }

    .checkout-form input,
    .checkout-form textarea {
      width: 100%;
      padding: 0.95rem 1rem;
      border: 1px solid #cbd5e0;
      border-radius: 0.85rem;
      background: #f8fafc;
      color: #2d3748;
      font-size: 0.95rem;
    }

    .checkout-form input:focus,
    .checkout-form textarea:focus {
      outline: none;
      border-color: #38a169;
      box-shadow: 0 0 0 4px rgba(56,161,105,0.12);
    }

    .order-confirmation {
      padding: 1.5rem;
      border-radius: 1rem;
      background: #ecfdf5;
      color: #22543d;
      border: 1px solid #9ae6b4;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: 700;
      color: #2d3748;
    }

    .hidden { display: none; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero h2 { font-size: 2rem; }
      .hero p { font-size: 1rem; }
      .products-grid { grid-template-columns: 1fr; }
      .features { grid-template-columns: 1fr; }
      header { flex-direction: column; gap: 1rem; }
      nav { display: flex; flex-wrap: wrap; justify-content: center; }
      .cart-item { grid-template-columns: 1fr; }
      .cart-controls { justify-content: flex-start; }
      .cart-summary { justify-items: stretch; }
    }
  </style>
</head>
<body>
  <header>
    <h1>🌿 Naturel Shop</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#cart">Cart (<span id="cart-count">0</span>)</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="/profile">Profil</a>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    </nav>
  </header>
  
  <div class="hero" id="home">
    <h2>Welcome to Naturel Shop</h2>
    <p>Discover the power of nature with our premium selection of organic and natural products</p>
    <button class="button" onclick="document.getElementById('products').scrollIntoView()">Shop Now</button>
  </div>
  
  
  <div class="container">
    <h2>Why Choose Naturel Shop?</h2>
    <div class="features">
      <div class="feature">
        <div class="feature-icon">🌍</div>
        <h3>Eco-Friendly</h3>
        <p>All products are sourced sustainably and packaged with the environment in mind.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">✅</div>
        <h3>Quality Certified</h3>
        <p>Every product is certified organic and tested for purity and safety.</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🚚</div>
        <h3>Fast Delivery</h3>
        <p>Free shipping on orders over 50 DT. Delivered within 3-5 business days.</p>
      </div>
    </div>
  </div>
  
  <div class="container" id="products">
    <h2>Our Products</h2>
    <div class="products-grid" id="products-grid"></div>
  </div>
  
  <div class="container" id="cart">
    <h2>Your Cart</h2>
    <div class="cart-panel">
      <div id="cart-empty" class="cart-empty">Votre panier est vide. Ajoutez des produits pour commencer.</div>
      <div id="cart-items" class="cart-items"></div>
      <div id="cart-summary" class="cart-summary hidden">
        <div class="summary-row">
          <span>Sous-total</span>
          <span id="cart-total">DT 0.00</span>
        </div>
        <button class="button" id="checkout-button">Passer à la caisse</button>
      </div>
      <div id="checkout-form-wrapper" class="checkout-form-wrapper hidden">
        <h3>Finaliser votre commande</h3>
        <form id="checkout-form" class="checkout-form">
          <label for="fullName">Nom complet</label>
          <input id="fullName" name="fullName" type="text" placeholder="Votre nom" required>

          <label for="email">Email</label>
          <input id="email" name="email" type="email" placeholder="exemple@domaine.com" required>

          <label for="address">Adresse</label>
          <textarea id="address" name="address" rows="3" placeholder="Rue, ville, pays" required></textarea>

          <button type="submit" class="button">Confirmer la commande</button>
        </form>
        <div id="order-confirmation" class="order-confirmation hidden"></div>
      </div>
    </div>
  </div>
  
  <footer id="about">
    <h2>About Naturel Shop</h2>
    <p>Your trusted source for natural, organic, and eco-friendly products for a healthier lifestyle.</p>
    <hr style="margin: 1rem 0; opacity: 0.3;">
    <p>&copy; 2026 Naturel Shop. All rights reserved. | Email: info@naturel.tn | Phone: +216 71 123 456</p>
  </footer>
  
  <script>
    let productsCache = [];

    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        productsCache = products;
        
        const grid = document.getElementById('products-grid');
        grid.innerHTML = products.map(p => \`
          <div class="product-card">
            <div class="product-image">
              <img src="\${p.image}" alt="\${p.name}">
            </div>
            <div class="product-info">
              <div class="product-title">\${p.name}</div>
              <div class="product-desc">\${p.description}</div>
              <div class="product-footer">
                <span class="product-price">DT \${p.price.toFixed(2)}</span>
                <span class="product-rating">⭐ \${p.rating}</span>
              </div>
              <button class="add-to-cart" onclick="addToCart('\${p.id}')">Ajouter au panier</button>
            </div>
          </div>
        \`).join('');
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
    
    loadProducts();

    function updateAuthUI() {
      const authSection = document.getElementById('auth-section');
      const authMessage = document.getElementById('auth-message');
      const authWelcome = document.getElementById('auth-welcome');
      const loginTab = document.getElementById('login-tab');
      const signupTab = document.getElementById('signup-tab');

      if (currentUser) {
        authSection.classList.remove('hidden');
        authMessage.classList.add('hidden');
        authWelcome.classList.remove('hidden');
        authWelcome.innerHTML = \`Bienvenue, <strong>\${currentUser.name}</strong> ! Votre session est active. <button class="button auth-logout" onclick="logout()">Se déconnecter</button>\`;
        loginTab.classList.add('hidden');
        signupTab.classList.add('hidden');
      } else {
        authWelcome.classList.add('hidden');
        loginTab.classList.remove('hidden');
        signupTab.classList.remove('hidden');
      }
    }

    function switchAuthTab(tab) {
      const loginForm = document.getElementById('login-form');
      const signupForm = document.getElementById('signup-form');
      const loginTab = document.getElementById('login-tab');
      const signupTab = document.getElementById('signup-tab');
      const authMessage = document.getElementById('auth-message');

      authMessage.classList.add('hidden');
      if (tab === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
      } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
      }
    }

    function showAuthSection(tab) {
      const authSection = document.getElementById('auth-section');
      authSection.classList.remove('hidden');
      switchAuthTab(tab);
      authSection.scrollIntoView({ behavior: 'smooth' });
    }

    function handleLogin(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      const authMessage = document.getElementById('auth-message');

      currentUser = { name: email.split('@')[0] || 'Utilisateur', email };
      localStorage.setItem(authKey, JSON.stringify(currentUser));
      authMessage.textContent = 'Connexion réussie ! Bienvenue.';
      authMessage.classList.remove('hidden');
      updateAuthUI();
    }

    function handleSignup(event) {
      event.preventDefault();
      const name = document.getElementById('signup-name').value.trim() || 'Nouvel Utilisateur';
      const email = document.getElementById('signup-email').value.trim();
      const authMessage = document.getElementById('auth-message');

      currentUser = { name, email };
      localStorage.setItem(authKey, JSON.stringify(currentUser));
      authMessage.textContent = 'Inscription réussie ! Vous êtes connecté.';
      authMessage.classList.remove('hidden');
      updateAuthUI();
    }

    function logout() {
      currentUser = null;
      localStorage.removeItem(authKey);
      updateAuthUI();
      document.getElementById('auth-message').classList.add('hidden');
    }

    document.addEventListener('DOMContentLoaded', () => {
      const checkoutButton = document.getElementById('checkout-button');
      if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
          showCheckoutForm();
        });
      }

      const checkoutForm = document.getElementById('checkout-form');
      if (checkoutForm) {
        checkoutForm.addEventListener('submit', event => {
          event.preventDefault();
          const form = event.target;
          const fullName = form.fullName.value.trim();
          const email = form.email.value.trim();
          const address = form.address.value.trim();

          if (!fullName || !email || !address) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
          }

          const orderConfirmation = document.getElementById('order-confirmation');
          if (orderConfirmation) {
            orderConfirmation.innerHTML = \`
              <h3>Merci \${fullName} !</h3>
              <p>Votre commande de \${cart.reduce((sum, item) => sum + item.quantity, 0)} article(s) pour <strong>DT \${getCartTotal().toFixed(2)}</strong> a bien été prise en compte.</p>
              <p>Un email de confirmation a été envoyé à <strong>\${email}</strong>.</p>
            \`;
            orderConfirmation.classList.remove('hidden');
          }

          clearCart();
          form.reset();
        });
      }
    });
  </script>
  <script>
    const cartKey = 'naturel_cart';
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    function saveCart() {
      localStorage.setItem(cartKey, JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }

    function updateCartCount() {
      const countElement = document.getElementById('cart-count');
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      countElement.textContent = totalCount;
    }

    function getProductById(productId) {
      return productsCache.find(p => p.id === productId);
    }

    function addToCart(productId) {
      const product = getProductById(productId);
      if (!product) return;

      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      saveCart();
    }

    function updateQuantity(productId, change) {
      const item = cart.find(item => item.id === productId);
      if (!item) return;
      item.quantity += change;
      if (item.quantity < 1) {
        cart = cart.filter(i => i.id !== productId);
      }
      saveCart();
    }

    function removeCartItem(productId) {
      cart = cart.filter(item => item.id !== productId);
      saveCart();
    }

    function getCartTotal() {
      return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function renderCart() {
      const cartItemsEl = document.getElementById('cart-items');
      const cartEmptyEl = document.getElementById('cart-empty');
      const summaryEl = document.getElementById('cart-summary');
      const cartTotalEl = document.getElementById('cart-total');

      if (!cartItemsEl || !cartEmptyEl || !summaryEl || !cartTotalEl) return;

      if (cart.length === 0) {
        cartItemsEl.innerHTML = '';
        cartEmptyEl.classList.remove('hidden');
        summaryEl.classList.add('hidden');
        cartTotalEl.textContent = 'DT 0.00';
        return;
      }

      cartEmptyEl.classList.add('hidden');
      summaryEl.classList.remove('hidden');
      cartTotalEl.textContent = \`DT \${getCartTotal().toFixed(2)}\`;

      cartItemsEl.innerHTML = cart.map(item => \`
        <div class="cart-item">
          <div class="cart-item-image"><img src="\${item.image}" alt="\${item.name}"></div>
          <div class="cart-item-details">
            <div class="cart-item-title">\${item.name}</div>
            <div class="cart-item-price">DT \${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-controls">
            <button class="quantity-button" onclick="updateQuantity('\${item.id}', -1)">-</button>
            <span>\${item.quantity}</span>
            <button class="quantity-button" onclick="updateQuantity('\${item.id}', 1)">+</button>
            <button class="remove-button" onclick="removeCartItem('\${item.id}')">Supprimer</button>
          </div>
        </div>
      \`).join('');
    }

    function showCheckoutForm() {
      const checkoutWrapper = document.getElementById('checkout-form-wrapper');
      if (!checkoutWrapper) return;
      checkoutWrapper.classList.remove('hidden');
      checkoutWrapper.scrollIntoView({ behavior: 'smooth' });
    }

    function clearCart() {
      cart = [];
      saveCart();
    }

    document.addEventListener('DOMContentLoaded', () => {
      updateCartCount();
      renderCart();
      const checkoutButton = document.getElementById('checkout-button');
      if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
          showCheckoutForm();
        });
      }

      const checkoutForm = document.getElementById('checkout-form');
      if (checkoutForm) {
        checkoutForm.addEventListener('submit', event => {
          event.preventDefault();
          const form = event.target;
          const fullName = form.fullName.value.trim();
          const email = form.email.value.trim();
          const address = form.address.value.trim();

          if (!fullName || !email || !address) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
          }

          const orderConfirmation = document.getElementById('order-confirmation');
          if (orderConfirmation) {
            orderConfirmation.innerHTML = \`
              <h3>Merci \${fullName} !</h3>
              <p>Votre commande de \${cart.reduce((sum, item) => sum + item.quantity, 0)} article(s) pour <strong>DT \${getCartTotal().toFixed(2)}</strong> a bien été prise en compte.</p>
              <p>Un email de confirmation a été envoyé à <strong>\${email}</strong>.</p>
            \`;
            orderConfirmation.classList.remove('hidden');
          }

          clearCart();
          form.reset();
        });
      }
    });
  </script>
</body>
</html>
  `;
}

server.listen(PORT, () => {
  console.log('🌿 Naturel Shop is running!');
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
  console.log('🛑 Press Ctrl+C to stop the server');
});
