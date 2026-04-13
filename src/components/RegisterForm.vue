<template>
  <section id="registro" class="register">
    <div class="container">
      <div class="register-card glass animate-fade-up">
        <div class="lock-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="5" y="11" width="14" height="11" rx="2" stroke="currentColor" stroke-width="2"/>
            <path d="M12 15V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <h2>Crear cuenta</h2>
        <p class="subtitle">Únete a la red de protección inteligente</p>

        <!-- Offline Alert Banner -->
        <Transition name="fade">
          <div v-if="!isOnline" class="offline-banner">
            <span class="pulse-dot"></span>
            Modo Offline Activo: Tu registro se sincronizará al volver la señal.
          </div>
        </Transition>

        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label for="reg-nombre">Nombre(s)</label>
              <input id="reg-nombre" v-model="form.nombre" type="text" placeholder="Ej: Juan" required />
            </div>
            <div class="form-group">
              <label for="reg-apellidos">Apellidos</label>
              <input id="reg-apellidos" v-model="form.apellidos" type="text" placeholder="Ej: Pérez" required />
            </div>
          </div>

          <div class="form-group">
            <label for="reg-email">Correo electrónico</label>
            <input id="reg-email" v-model="form.email" type="email" placeholder="tu@correo.com" required />
          </div>

          <div class="form-group">
            <label for="reg-password">Contraseña</label>
            <div class="password-wrap">
              <input id="reg-password" v-model="form.password" :type="showPass ? 'text' : 'password'"
                     placeholder="Mínimo 6 caracteres" required minlength="6" />
              <button type="button" class="toggle-pass" @click="showPass = !showPass" tabindex="-1">
                <svg v-if="!showPass" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <template v-if="loading">
              <span class="spinner"></span>
              <span>Procesando...</span>
            </template>
            <template v-else-if="!isOnline">
              <span>Guardar en cola Offline</span>
            </template>
            <template v-else>
              <span>Crear cuenta</span>
            </template>
          </button>
        </form>

        <div v-if="message" :class="['message', messageType]">
          {{ message }}
        </div>

        <p class="login-redirect">
          ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPass = ref(false);
const isOnline = ref(true);

const form = ref({
  nombre: '',
  apellidos: '',
  email: '',
  password: ''
});

const loading = ref(false);
const message = ref('');
const messageType = ref('');

// Mismo sensor que App.vue: Ping a Google para detectar internet real
const checkInternetReal = async () => {
  if (!navigator.onLine) {
    isOnline.value = false;
    return;
  }
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    await fetch('https://www.google.com/favicon.ico', {
      mode: 'no-cors', signal: controller.signal, cache: 'no-store'
    });
    isOnline.value = true;
    clearTimeout(id);
  } catch {
    isOnline.value = false;
  }
};

// Auto-sincronizar cuando vuelve el internet
watch(isOnline, (online) => {
  if (online) syncPendingRegistrations();
});

const handleRegister = async () => {
  // Si no hay internet, guardar directamente sin intentar el servidor
  if (!isOnline.value) {
    saveOffline();
    return;
  }

  loading.value = true;
  message.value = '';
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (response.ok) {
      message.value = '¡Registro exitoso! Redirigiendo...';
      messageType.value = 'success';
      form.value = { nombre: '', apellidos: '', email: '', password: '' };
      setTimeout(() => router.push('/'), 1500);
    } else {
      message.value = data.error || 'Error al completar el registro.';
      messageType.value = 'error';
    }
  } catch (error) {
    // Si el fetch falla por red (TypeError), guardar offline en silencio
    if (error instanceof TypeError) {
      isOnline.value = false;
      saveOffline();
    } else {
      message.value = 'Error inesperado. Intenta de nuevo.';
      messageType.value = 'error';
    }
  } finally {
    loading.value = false;
  }
};

const saveOffline = () => {
  const pending = JSON.parse(localStorage.getItem('siac_pending_regs') || '[]');
  pending.push({ ...form.value, id: Date.now() });
  localStorage.setItem('siac_pending_regs', JSON.stringify(pending));
  
  message.value = '⚠️ Conexión no disponible. Tus datos se han guardado y se enviarán automáticamente al detectar señal.';
  messageType.value = 'info';
  
  // Limpiar formulario para dar sensación de éxito parcial
  form.value = { nombre: '', apellidos: '', email: '', password: '' };
};

const syncPendingRegistrations = async () => {
  const pending = JSON.parse(localStorage.getItem('siac_pending_regs') || '[]');
  if (pending.length === 0) return;

  console.log('Detectada conexión: Sincronizando registros pendientes...');
  
  for (const reg of pending) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg)
      });
      
      if (response.ok) {
        // Eliminar este registro de la cola
        const currentQueue = JSON.parse(localStorage.getItem('siac_pending_regs') || '[]');
        const updatedQueue = currentQueue.filter(item => item.id !== reg.id);
        localStorage.setItem('siac_pending_regs', JSON.stringify(updatedQueue));
      }
    } catch (e) {
      console.error('Error al sincronizar registro offline:', e);
    }
  }

  message.value = '✅ ¡Sincronización exitosa! Tus registros pendientes se han enviado al servidor.';
  messageType.value = 'success';
};

let heartBeat = null;

onMounted(() => {
  checkInternetReal();
  window.addEventListener('online', checkInternetReal);
  window.addEventListener('offline', () => { isOnline.value = false; });
  // Mismo intervalo que App.vue para coherencia
  heartBeat = setInterval(checkInternetReal, 5000);
});

onUnmounted(() => {
  window.removeEventListener('online', checkInternetReal);
  window.removeEventListener('offline', () => { isOnline.value = false; });
  if (heartBeat) clearInterval(heartBeat);
});
</script>

<style scoped>
.register {
  padding: 8rem 0;
  min-height: 100vh;
  background-color: var(--background);
}

.offline-banner {
  background: #fffbeb;
  color: #92400e;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #fde68a;
}

.pulse-dot {
  width: 8px; height: 8px;
  background: #f59e0b;
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
}

.register-card {
  max-width: 580px;
  margin: 0 auto;
  padding: 3.5rem;
  border-radius: var(--radius-xl);
  text-align: center;
}

.lock-icon {
  width: 60px; height: 60px;
  background: var(--primary-light);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary);
}

.lock-icon svg { width: 28px; height: 28px; }

h2 { font-size: 2.25rem; margin-bottom: 0.5rem; }

.subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group { text-align: left; margin-bottom: 1.25rem; }

.form-group label {
  display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;
}

input {
  width: 100%; padding: 0.9rem 1rem; border-radius: var(--radius);
  border: 1.5px solid var(--border); background: var(--surface);
  transition: all 0.3s ease;
}

input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-light); outline: none; }

.password-wrap { position: relative; }

.toggle-pass {
  position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
  background: none; color: var(--text-muted); padding: 0.25rem;
}

.btn-submit {
  width: 100%; background: linear-gradient(135deg, var(--primary), #3b82f6);
  color: white; padding: 1rem; border-radius: var(--radius);
  font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
}

.btn-submit:disabled { opacity: 0.7; }

.message {
  margin-top: 1.5rem; padding: 1rem; border-radius: var(--radius); font-size: 0.9rem;
}

.success { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }

.login-redirect { margin-top: 2rem; font-size: 0.9rem; color: var(--text-light); }
.login-redirect a { color: var(--primary); font-weight: 600; }

@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
  .register-card { padding: 2rem; }
}
</style>
