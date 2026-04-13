<template>
  <section id="inicio" class="hero">
    <!-- Background Decorations -->
    <div class="hero-bg">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="container hero-grid">
      <div class="hero-content">
        <span class="badge animate-fade-up">
          <span class="badge-dot"></span>
          Monitoreo Inteligente de Seguridad
        </span>
        <h1 class="animate-fade-up delay-1">
          La tecnología que cuida de ti en
          <span class="gradient-text">cada kilómetro</span>
        </h1>
        <p class="hero-desc animate-fade-up delay-2">
          SIAC es la solución definitiva para la prevención de accidentes por fatiga. 
          Nuestro sistema analiza patrones de conducción en tiempo real para alertarte 
          antes de que el cansancio se convierta en un riesgo.
        </p>
        <div class="hero-btns animate-fade-up delay-3">
          <a href="#proceso" class="btn-primary">
            ¿Cómo funciona?
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#nosotros" class="btn-secondary">
            Conoce los beneficios
          </a>
        </div>
        <div class="hero-trust animate-fade-up delay-4">
          <div class="trust-text">
            <strong>Protección 24/7</strong> para transporte privado y de carga.
          </div>
        </div>
      </div>

      <div class="hero-visual animate-fade-right delay-2">
        <!-- Safety Status Card (No Watch) -->
        <div class="safety-card glass">
          <div class="card-header">
            <div class="status-badge">
              <span class="status-dot live"></span>
              <span>SISTEMA ACTIVO</span>
            </div>
            <span class="card-date">{{ currentTime }}</span>
          </div>

          <div class="card-hero-content">
            <div class="main-alert-status">
              <div class="shield-icon">🛡️</div>
              <div class="status-info">
                <span class="status-label">Nivel de Seguridad</span>
                <span class="status-value">Protección Máxima</span>
              </div>
            </div>

            <div class="features-mini">
              <div class="f-item">
                <span class="f-icon">🧠</span>
                <span class="f-name">Detección de Fatiga</span>
                <span class="f-stat">Automática</span>
              </div>
              <div class="f-item">
                <span class="f-icon">🚨</span>
                <span class="f-name">Alertas en Tiempo Real</span>
                <span class="f-stat">Activadas</span>
              </div>
              <div class="f-item">
                <span class="f-icon">📲</span>
                <span class="f-name">Notificación Familiar</span>
                <span class="f-stat">Pausa Activa</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="safety-bar">
              <div class="bar-fill" style="width: 100%"></div>
            </div>
            <span class="bar-label">Estado de Alerta del Conductor: Óptimo</span>
          </div>
        </div>

        <!-- Floating Info Badges -->
        <div class="info-badge badge-1">
          <span class="i-icon">👥</span>
          <span>Contactos avisados</span>
        </div>
        <div class="info-badge badge-2">
          <span class="i-icon">📍</span>
          <span>Ubicación GPS enviada</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
let timer;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000 * 60);
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.hero {
  min-height: 90vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: var(--background);
}

.hero-bg {
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
}

.bg-circle-1 {
  width: 600px; height: 600px;
  background: var(--primary);
  top: -100px; right: -200px;
}

.bg-circle-2 {
  width: 400px; height: 400px;
  background: var(--accent);
  bottom: -50px; left: -100px;
}

.bg-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.4;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.25rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.badge-dot {
  width: 8px; height: 8px;
  background: var(--primary);
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -2px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 3rem;
  max-width: 550px;
  line-height: 1.7;
}

.hero-btns {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 4rem;
}

.trust-text {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.trust-text strong {
  color: var(--text);
}

/* Safety Card Visual */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.safety-card {
  width: 400px;
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-2xl);
  animation: float 6s ease-in-out infinite;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--accent);
}

.status-dot.live {
  width: 10px; height: 10px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
  animation: pulse-ring 2s infinite;
}

.card-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.main-alert-status {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--surface-alt);
  border-radius: var(--radius-lg);
}

.shield-icon {
  font-size: 3rem;
}

.status-info {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.status-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text);
}

.features-mini {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.f-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.f-icon { font-size: 1.25rem; }

.f-name {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 600;
}

.f-stat {
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 700;
}

.card-footer {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.safety-bar {
  height: 10px;
  background: var(--border);
  border-radius: 5px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #34d399);
}

.bar-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-light);
}

/* Floating Info Badges */
.info-badge {
  position: absolute;
  padding: 0.75rem 1.25rem;
  background: white;
  border-radius: 100px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 0.85rem;
  animation: float 5s ease-in-out infinite;
}

.badge-1 { top: 10%; right: -30px; animation-delay: -1s; }
.badge-2 { bottom: 15%; left: -40px; animation-delay: -3s; }

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-visual { display: none; }
  h1 { font-size: 3rem; }
}
</style>
