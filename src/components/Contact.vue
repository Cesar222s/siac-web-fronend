<template>
  <section id="contacto" class="contact">
    <div class="container">
      <div class="section-header animate-fade-up">
        <span class="section-label">
          <span>💬</span> Contacto
        </span>
        <h2>¿Tienes preguntas?</h2>
        <p>Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-card animate-fade-up delay-1">
          <div class="contact-icon">📧</div>
          <h4>Correo Electrónico</h4>
          <p>soporte@siac-app.com</p>
        </div>
        <div class="contact-card animate-fade-up delay-2">
          <div class="contact-icon">📱</div>
          <h4>WhatsApp / Teléfono</h4>
          <p>+52 33 1065 6952</p>
        </div>
        <div class="contact-card animate-fade-up delay-3">
          <div class="contact-icon">📍</div>
          <h4>Ubicación</h4>
          <p>Carretera Santa Cruz-San Isidro Km. 4.5, 45644 Santa Cruz de las Flores, Jal.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--surface);
  position: relative;
}

.contact::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.contact-card {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--background);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  transition: all 0.4s ease;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-glow);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.contact-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.contact-card p {
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
