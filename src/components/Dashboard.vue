<template>
  <section class="dashboard container animate-fade-in">
    <div class="dashboard-header">
      <div>
        <h1>Bienvenido, {{ user?.nombre }}</h1>
        <p>Tu sistema de monitoreo SIAC está activo y protegiéndote.</p>
      </div>
      <div class="live-status">
        <span class="status-dot pulsing"></span>
        <span>Sincronizando con Smartwatch...</span>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card glass">
        <div class="metric-label">Ritmo Cardíaco</div>
        <div class="metric-value">
          <span class="num">{{ currentHbpm }}</span>
          <span class="unit">bpm</span>
        </div>
        <div class="metric-trend good">Ideal - Estabale</div>
      </div>
      <div class="metric-card glass">
        <div class="metric-label">Nivel de Alerta</div>
        <div class="metric-value">
          <span class="num">Óptimo</span>
        </div>
        <div class="metric-progress">
          <div class="progress-bar" style="width: 95%"></div>
        </div>
      </div>
      <div class="metric-card glass">
        <div class="metric-label">Fatiga Detectada</div>
        <div class="metric-value">
          <span class="num">0.2</span>
          <span class="unit">%</span>
        </div>
        <div class="metric-trend good">Riesgo Bajo</div>
      </div>
    </div>

    <div class="dashboard-main">
      <div class="history-card glass">
        <div class="card-header">
          <h3>Historial de Alertas Recientes</h3>
          <button class="btn-refresh">Ver todo</button>
        </div>
        <div class="history-list">
          <div v-for="i in 3" :key="i" class="history-item">
            <div class="history-icon">🚨</div>
            <div class="history-info">
              <span class="type">Alerta de Seguridad</span>
              <span class="time">Hace {{ i * 2 }} horas</span>
            </div>
            <div class="history-status resolved">Resuelto</div>
          </div>
          <div v-if="history.length === 0" class="empty-state">
            No hay alertas recientes. ¡Buen viaje!
          </div>
        </div>
      </div>

      <div class="map-card glass">
        <div class="map-placeholder">
          <div class="map-icon">📍</div>
          <span>Localizador Satelital Activo</span>
          <p>Compartiendo ubicación con tus contactos de emergencia.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  user: Object
});

const currentHbpm = ref(72);
const history = ref([]);

let timer;

onMounted(() => {
  timer = setInterval(() => {
    // Simulate heart rate fluctuation
    currentHbpm.value = Math.floor(Math.random() * (78 - 68 + 1)) + 68;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.dashboard {
  padding-top: 100px;
  padding-bottom: 5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.live-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.85rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
}

.pulsing {
  box-shadow: 0 0 0 rgba(37, 99, 235, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.metric-label {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 1rem;
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.metric-value .num {
  font-size: 2.5rem;
  font-weight: 800;
}

.metric-value .unit {
  font-size: 1rem;
  color: var(--text-light);
  font-weight: 600;
}

.metric-trend {
  font-size: 0.8rem;
  font-weight: 700;
}

.metric-trend.good {
  color: #16a34a;
}

.progress-bar {
  height: 8px;
  background: var(--primary);
  border-radius: 4px;
}

.metric-progress {
  height: 8px;
  width: 100%;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.dashboard-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.history-card, .map-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  min-height: 350px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-alt);
  border-radius: var(--radius);
}

.history-icon {
  font-size: 1.5rem;
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-info .type {
  font-weight: 700;
  font-size: 0.9rem;
}

.history-info .time {
  font-size: 0.75rem;
  color: var(--text-light);
}

.history-status {
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
}

.history-status.resolved {
  background: #f0fdf4;
  color: #16a34a;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: var(--radius);
}

.map-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 968px) {
  .metrics-grid, .dashboard-main {
    grid-template-columns: 1fr;
  }
}
</style>
