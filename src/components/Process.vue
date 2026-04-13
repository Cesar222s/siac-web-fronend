<template>
  <section id="proceso" class="process">
    <div class="container">
      <div class="process-header animate-fade-up">
        <h2 class="section-title">¿Cómo te <span class="gradient-text">protege</span> SIAC?</h2>
        <p class="section-desc">Un sistema automático diseñado para actuar en segundos.</p>
      </div>

      <div class="process-timeline">
        <div v-for="(step, index) in steps" :key="index" class="process-step" :class="{ 'reverse': index % 2 !== 0 }">
          <div class="step-content animate-fade-up">
            <div class="step-number">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
          <div class="step-visual">
            <div class="step-icon-box glass">
              <span class="step-icon">{{ step.icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: 'Monitoreo Constante',
    desc: 'El sistema analiza de forma continua el comportamiento de conducción y signos de cansancio del conductor.',
    icon: '👁️'
  },
  {
    title: 'Análisis Inteligente',
    desc: 'Nuestros algoritmos de IA procesan la información para identificar patrones de fatiga crítica.',
    icon: '🧠'
  },
  {
    title: 'Alerta Preventiva',
    desc: 'Si se detecta un riesgo, el sistema emite alertas visuales y sonoras para que el conductor recupere la atención.',
    icon: '🔔'
  },
  {
    title: 'Notificación de Emergencia',
    desc: 'En caso de no respuesta, se envía un SMS automático con la ubicación exacta a los contactos de confianza.',
    icon: '📲'
  },
  {
    title: 'Registro de Seguridad',
    desc: 'Todo evento queda registrado para que puedas consultar tu historial y mejorar tus hábitos de seguridad.',
    icon: '📋'
  }
];
</script>

<style scoped>
.process {
  padding: 100px 0;
}

.process-header {
  text-align: center;
  margin-bottom: 5rem;
}

.process-timeline {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.process-timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 2px;
  background: var(--border);
  transform: translateX(-50%);
  display: block;
}

.process-step {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  position: relative;
  z-index: 1;
}

.step-content {
  flex: 1;
  padding: 2.5rem;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  position: relative;
}

.step-number {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px; height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}

.step-visual {
  flex: 0 0 120px;
  display: flex;
  justify-content: center;
}

.step-icon-box {
  width: 100px; height: 100px;
  background: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--background);
}

.step-icon {
  font-size: 2.5rem;
}

.process-step.reverse {
  flex-direction: row-reverse;
}

.process-step.reverse .step-number {
  left: auto;
  right: -15px;
}

@media (max-width: 768px) {
  .process-timeline::before { left: 40px; }
  .process-step { flex-direction: row !important; }
  .process-step .step-content { margin-left: 3rem; }
  .process-step .step-number { left: -15px !important; right: auto !important; }
  .step-visual { display: none; }
}
</style>
