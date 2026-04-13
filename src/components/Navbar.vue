<template>
  <nav class="navbar glass" :class="{ 'scrolled': isScrolled }">
    <div class="container nav-content">
      <router-link to="/info" class="logo">
        <img src="/pwa-icons/pwa-512x512.png" alt="SIAC" />
        <span class="logo-text">SIAC</span>
      </router-link>
      
      <!-- Solo mostrar enlaces si NO estamos en Login o Registro -->
      <template v-if="!['/', '/login', '/register'].includes($route.path)">
        <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
          <router-link :to="{ path: '/info', hash: '#inicio' }" @click="closeMenu">
            <span class="nav-icon">🏠</span> Inicio
          </router-link>
          <router-link :to="{ path: '/info', hash: '#nosotros' }" @click="closeMenu">
            <span class="nav-icon">ℹ️</span> Sobre Nosotros
          </router-link>
          <router-link :to="{ path: '/info', hash: '#servicios' }" @click="closeMenu">
            <span class="nav-icon">⚙️</span> Servicios
          </router-link>
          <router-link :to="{ path: '/info', hash: '#contacto' }" @click="closeMenu">
            <span class="nav-icon">✉️</span> Contacto
          </router-link>
        </div>

        <div class="nav-actions">
          <template v-if="!user">
            <router-link to="/login" class="login-link" @click="closeMenu">Login</router-link>
            <router-link to="/register" class="btn-nav-primary" @click="closeMenu">Registro</router-link>
          </template>
          <template v-else>
            <div class="user-info">
              <span class="user-name">Hola, {{ user.nombre }}</span>
              <button @click="handleLogout" class="btn-logout">Salir</button>
            </div>
          </template>
        </div>
      </template>

      <div v-if="!['/', '/login', '/register'].includes($route.path)" class="menu-toggle" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const user = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const checkAuth = () => {
  const savedUser = localStorage.getItem('siac_user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  } else {
    user.value = null;
  }
};

const handleLogout = () => {
  localStorage.clear(); // Limpieza TOTAL de caché del sitio
  user.value = null;
  window.location.href = '/'; // Redirección física para resetear la app por completo
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  checkAuth();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  height: 70px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: var(--shadow-sm);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo img {
  height: 42px;
  width: 42px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: rotate(-5deg) scale(1.05);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--primary), #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  font-weight: 500;
  color: var(--text-light);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0;
  position: relative;
}

.nav-icon {
  font-size: 0.85rem;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.login-link {
  font-weight: 600;
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  transition: all 0.3s ease;
}

.login-link:hover {
  background-color: var(--surface-alt);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--primary);
  background: var(--primary-light);
  padding: 0.4rem 0.8rem;
  border-radius: 100px;
}

.btn-logout {
  background: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ef4444;
  padding: 0.4rem 0.8rem;
  border: 1.5px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius);
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.05);
  border-color: #ef4444;
  transform: translateY(-1px);
}

.btn-nav-primary {
  background: linear-gradient(135deg, var(--primary), #3b82f6);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.25);
  transition: all 0.3s ease;
}

.btn-nav-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
}

/* Mobile Hamburger */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;
}

.menu-toggle span {
  width: 24px;
  height: 2px;
  background-color: var(--text);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}
.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 90px;
}

.mobile-menu {
  width: 90%;
  max-width: 400px;
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mobile-menu a {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
}

.mobile-menu a:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

.mobile-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: 0.5rem;
}

.mobile-actions .login-link,
.mobile-actions .btn-nav-primary {
  flex: 1;
  text-align: center;
}

/* Mobile Menu Transition */
.mobile-menu-enter-active { transition: all 0.3s ease; }
.mobile-menu-leave-active { transition: all 0.2s ease; }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; }

@media (max-width: 968px) {
  .nav-links,
  .nav-actions {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
}
</style>
