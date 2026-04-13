<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SplashScreen from './components/SplashScreen.vue';

const showSplash = ref(true);
const isOnline = ref(true);

const checkInternetReal = async () => {
  // Primero revisamos el sensor básico del sistema
  if (!navigator.onLine) {
    isOnline.value = false;
    return;
  }

  // Si el sistema dice que hay internet, hacemos un "Ping de Verdad" a Google
  // Esto detecta si el Wi-Fi está prendido pero no hay señal real
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    
    // Este fetch a Google con 'no-cors' es la prueba definitiva de internet
    await fetch('https://www.google.com/favicon.ico', { 
      mode: 'no-cors', 
      signal: controller.signal,
      cache: 'no-store'
    });
    
    isOnline.value = true;
    clearTimeout(id);
  } catch (err) {
    // Si falla el ping a Google, estamos efectivamente Offline
    isOnline.value = false;
  }
};

let heartBeat = null;

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  }, 2000);

  // Verificación inicial
  checkInternetReal();

  // Escuchamos los cambios del sistema
  window.addEventListener('online', checkInternetReal);
  window.addEventListener('offline', () => isOnline.value = false);

  // Corazón del sistema: Verificar internet real cada 5 segundos
  heartBeat = setInterval(checkInternetReal, 5000);
});

onUnmounted(() => {
  window.removeEventListener('online', checkInternetReal);
  window.removeEventListener('offline', () => isOnline.value = false);
  if (heartBeat) clearInterval(heartBeat);
});
</script>

<template>
  <div id="siac-app-root">
    <main class="app-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <SplashScreen :show="showSplash" />

    <!-- BANNER DE EMERGENCIA TOTAL SIAC (TELEPORT) -->
    <Teleport to="body">
      <div v-if="!isOnline" class="final-crash-banner">
        <div class="banner-inner">
          <span class="warning-alert">⚠️</span>
          <div class="warning-text">
            <strong>INTERNET DESCONECTADO</strong>
            <p>Se ha perdido la navegación. SIAC está resguardando tus datos localmente.</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
/* DISEÑO DE EMERGENCIA MÁXIMA */
.final-crash-banner {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 90px !important;
  background: #b91c1c !important; /* Rojo Sangre Intenso */
  border-top: 5px solid #ffffff !important;
  color: #ffffff !important;
  z-index: 2147483647 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  box-shadow: 0 -10px 50px rgba(0,0,0,0.7) !important;
}

.banner-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 90%;
  max-width: 700px;
}

.warning-alert {
  font-size: 2.5rem;
  animation: banner-vibrate 0.1s infinite;
}

.warning-text strong {
  display: block;
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 1px;
}

.warning-text p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

@keyframes banner-vibrate {
  0% { transform: translate(0); }
  50% { transform: translate(-2px, 2px); }
  100% { transform: translate(0); }
}

#siac-app-root { min-height: 100vh; }
.app-content { width: 100%; }
.page-enter-active, .page-leave-active { transition: opacity 0.3s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
</style>
