<template>
  <div class="login-view-wrapper">
    <div class="login-page">
      <!-- Background Decorations -->
      <div class="login-bg">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
        <div class="bg-grid"></div>
      </div>

      <div class="login-container">
        <!-- Left Panel - Branding -->
        <div class="login-branding animate-fade-left">
          <router-link to="/info" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Ver información SIAC
          </router-link>

          <div class="brand-content">
            <img src="/pwa-icons/pwa-512x512.png" alt="SIAC" class="brand-logo" />
            <h1>SIAC</h1>
            <p>Sistema Inteligente de Alerta al Conductor</p>
            
            <div class="brand-features">
              <div class="brand-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Monitoreo 24/7</span>
              </div>
              <div class="brand-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <span>SMS Automáticos</span>
              </div>
              <div class="brand-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Ubicación en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Form -->
        <div class="login-form-panel animate-fade-right delay-1">
          <div class="login-card glass">
            <div class="lock-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </div>

            <h2>Bienvenido de nuevo</h2>
            <p class="subtitle">Ingresa tus credenciales para continuar</p>

            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="login-email">Correo electrónico</label>
                <input id="login-email" v-model="form.email" type="email" placeholder="tu@correo.com" required />
              </div>

              <div class="form-group">
                <label for="login-password">Contraseña</label>
                <div class="password-wrap">
                  <input id="login-password" v-model="form.password" :type="showPass ? 'text' : 'password'"
                         placeholder="Tu contraseña" required />
                  <button type="button" class="toggle-pass" @click="showPass = !showPass" tabindex="-1">
                    <svg v-if="!showPass" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  </button>
                </div>
              </div>

              <button type="submit" class="btn-submit" :disabled="loading">
                <span v-if="loading" class="spinner"></span>
                <span v-if="loading">Verificando...</span>
                <span v-else>Iniciar sesión</span>
              </button>
            </form>

            <div v-if="message" :class="['message', messageType]">
              {{ message }}
            </div>

            <p class="register-redirect">
              ¿No tienes cuenta? <router-link to="/register">Regístrate gratis</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPass = ref(false);

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const message = ref('');
const messageType = ref('');

const handleLogin = async () => {
  loading.value = true;
  message.value = '';

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('siac_token', data.token);
      localStorage.setItem('siac_user', JSON.stringify(data.user));
      message.value = '¡Bienvenido! Redirigiendo...';
      messageType.value = 'success';
      setTimeout(() => router.push('/info'), 1500);
    } else {
      message.value = data.error || 'Credenciales incorrectas.';
      messageType.value = 'error';
    }
  } catch (error) {
    message.value = 'Error al conectar con el servidor.';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-view-wrapper {
  width: 100%;
}

.login-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-bg {
  position: absolute; inset: 0;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.bg-circle-1 {
  width: 500px; height: 500px;
  background: rgba(37, 99, 235, 0.2);
  top: -100px; left: -100px;
}

.bg-circle-2 {
  width: 400px; height: 400px;
  background: rgba(16, 185, 129, 0.15);
  bottom: -50px; right: -100px;
}

.bg-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0);
  background-size: 40px 40px;
}

.login-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 1;
}

/* Left Panel */
.login-branding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 4rem;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: var(--primary);
  transform: translateX(-5px);
}

.brand-content {
  max-width: 400px;
}

.brand-logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-lg);
}

.brand-content h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary), #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-content > p {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 3rem;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.brand-feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  color: var(--text);
}

.brand-feature svg {
  color: var(--primary);
  flex-shrink: 0;
}

/* Right Panel */
.login-form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 440px;
  padding: 3rem;
  border-radius: var(--radius-xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.lock-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e0f2fe, #dbeafe);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary);
}

.lock-icon svg {
  width: 28px;
  height: 28px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text);
}

input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  background-color: var(--surface);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  color: var(--text);
}

input::placeholder {
  color: var(--text-muted);
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.password-wrap {
  position: relative;
}

.password-wrap input {
  padding-right: 3rem;
}

.toggle-pass {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: var(--text-muted);
  padding: 0.25rem;
}

.toggle-pass:hover {
  color: var(--primary);
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, var(--primary), #3b82f6);
  color: white;
  padding: 1rem;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0.5rem;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 0.9rem;
}

.success {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.error {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.register-redirect {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.register-redirect a {
  color: var(--primary);
  font-weight: 600;
}

.register-redirect a:hover {
  text-decoration: underline;
}

@media (max-width: 968px) {
  .login-container {
    grid-template-columns: 1fr;
  }
  
  .login-branding {
    display: none;
  }
  
  .login-card {
    padding: 2rem;
  }
}
</style>
