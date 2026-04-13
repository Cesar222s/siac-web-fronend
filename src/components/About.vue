<template>
  <section id="nosotros" class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-image animate-fade-left">
          <div class="image-stack">
            <div class="main-img glass">
              <span class="img-icon">🛡️</span>
              <h3>Protección Inteligente</h3>
              <p>Monitoreo constante para prevenir accidentes fatales.</p>
            </div>
            <div class="deco-box"></div>
          </div>
        </div>
        
        <div class="about-content animate-fade-up">
          <h2 class="section-title">Sobre <span class="gradient-text">SIAC</span></h2>
          <p class="section-desc">
            Somos la solución tecnológica pionera en la prevención de accidentes viales relacionados con el cansancio. 
            Nuestra misión es salvar vidas mediante un sistema que actúa cuando el conductor más lo necesita.
          </p>

          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🧠</div>
              <h4>Detección Predictiva</h4>
              <p>Algoritmos avanzados que identifican signos de fatiga antes de que sea tarde.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">⚡</div>
              <h4>Acción Inmediata</h4>
              <p>Alertas sonoras y visuales diseñadas para recuperar la atención del conductor.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📲</div>
              <h4>Red de Seguridad</h4>
              <p>Notificación automática a familiares o centrales de monitoreo con ubicación GPS.</p>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">📊</div>
              <h4>Historial de Seguridad</h4>
              <p>Registro completo de eventos para mejorar hábitos de conducción.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="about-stats">
        <div v-for="(stat, index) in stats" :key="index" class="stat-item animate-fade-up" :style="`animation-delay: ${index * 0.1}s`">
          <span class="stat-num">{{ stat.num }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { num: '24/7', label: 'Monitoreo' },
  { num: '98%', label: 'Efectividad' },
  { num: '0', label: 'Costo de Registro' },
  { num: '100%', label: 'Privacidad' }
];
</script>

<style scoped>
.about {
  padding: 100px 0;
  background-color: var(--surface);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 6rem;
  align-items: center;
  margin-bottom: 6rem;
}

.image-stack {
  position: relative;
  padding: 2rem;
}

.main-img {
  padding: 3rem;
  text-align: center;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  position: relative;
  z-index: 2;
  background: white;
}

.img-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: block;
}

.main-img h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.main-img p {
  color: var(--text-light);
}

.deco-box {
  position: absolute;
  top: 0; left: 0;
  width: 80%;
  height: 80%;
  background: var(--primary-light);
  border-radius: var(--radius-xl);
  z-index: 1;
  transform: translate(-20px, -20px);
}

.section-title {
  font-size: 2.75rem;
  margin-bottom: 1.5rem;
}

.section-desc {
  font-size: 1.15rem;
  color: var(--text-light);
  margin-bottom: 3rem;
  line-height: 1.8;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.benefit-card h4 {
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem;
}

.benefit-card p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.benefit-icon {
  font-size: 2rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem;
  background: var(--surface-alt);
  border-radius: var(--radius-2xl);
  text-align: center;
}

.stat-num {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary);
  display: block;
}

.stat-label {
  font-weight: 700;
  color: var(--text-light);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

@media (max-width: 968px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .about-image { display: none; }
  .about-stats { grid-template-columns: 1fr 1fr; }
}
</style>
