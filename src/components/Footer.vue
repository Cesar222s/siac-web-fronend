<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/pwa-icons/pwa-512x512.png" alt="SIAC" />
            <span>SIAC</span>
          </div>
          <p>Protección inteligente para conductores. Tecnología que salva vidas en cada kilómetro.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-links-grid">
          <div class="link-group">
            <h4>Explorar</h4>
            <router-link to="/info#inicio">Inicio</router-link>
            <router-link to="/info#nosotros">Nosotros</router-link>
            <router-link to="/info#servicios">Servicios</router-link>
            <router-link to="/info#contacto">Contacto</router-link>
          </div>
          <div class="link-group">
            <h4>Producto</h4>
            <a href="#">App Android</a>
            <a href="#">Wear OS</a>
            <a href="#">Documentación</a>
          </div>
          <div class="link-group">
            <h4>Legal</h4>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; 2026 SIAC - Todos los derechos reservados.</p>
        <p class="made-with">Hecho con ❤️ en Jalisco, México</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--text);
  color: rgba(255,255,255,0.7);
  padding-top: 5rem;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.footer-logo img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.footer-logo span {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
}

.footer-brand p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-link svg {
  width: 18px;
  height: 18px;
  color: rgba(255,255,255,0.6);
}

.social-link:hover {
  background: var(--primary);
  transform: translateY(-3px);
}

.social-link:hover svg {
  color: white;
}

.footer-links-grid {
  display: flex;
  justify-content: flex-end;
  gap: 5rem;
}

.link-group h4 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-group a {
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.link-group a:hover {
  color: white;
  transform: translateX(3px);
}

.footer-bottom {
  padding: 2rem 0;
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.35);
}

.made-with {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer-links-grid {
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  
  .footer-bottom-inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
