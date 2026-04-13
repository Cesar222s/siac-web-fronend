<template>
  <Transition name="fade">
    <div v-if="show" class="splash-screen">
      <div class="splash-bg">
        <div class="bg-circle bg-1"></div>
        <div class="bg-circle bg-2"></div>
      </div>
      
      <div class="splash-content">
        <div class="logo-container">
          <div class="pulse-ring"></div>
          <img src="/pwa-icons/pwa-512x512.png" alt="SIAC" class="splash-logo" />
        </div>
        
        <h1 class="splash-title">SIAC</h1>
        <p class="splash-subtitle">Protección inteligente para conductores</p>
        
        <div class="loader-wrap">
          <div class="loader-bar"></div>
        </div>
      </div>

      <div class="splash-footer">
        <span class="version">v2.0.0</span>
        <span class="divider">|</span>
        <span>Premium Security Edition</span>
        <span class="divider">|</span>
        <span>Jalisco, México</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean
});
</script>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  background-color: #ffffff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
}

.bg-1 {
  width: 400px; height: 400px;
  background: var(--primary);
  top: -100px; left: -100px;
}

.bg-2 {
  width: 300px; height: 300px;
  background: var(--accent);
  bottom: -50px; right: -100px;
}

.splash-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.logo-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.splash-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: var(--shadow-xl);
  position: relative;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  top: -10px; left: -10px; right: -10px; bottom: -10px;
  border-radius: 40px;
  background: var(--primary-light);
  z-index: 1;
  animation: pulse-grow 2s infinite ease-out;
}

@keyframes pulse-grow {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.splash-title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -2px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.splash-subtitle {
  font-size: 1rem;
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 3rem;
}

.loader-wrap {
  width: 200px;
  height: 4px;
  background-color: var(--surface-alt);
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
}

.loader-bar {
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 10px;
  animation: loader-slide 2s infinite ease-in-out;
}

@keyframes loader-slide {
  0% { transform: translateX(-100%); width: 20%; }
  50% { width: 50%; }
  100% { transform: translateX(250%); width: 20%; }
}

.splash-footer {
  position: absolute;
  bottom: 3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.divider {
  opacity: 0.3;
}

/* Transición de salida */
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease-in;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
