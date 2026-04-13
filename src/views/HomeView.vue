<template>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Process />
    <Contact />
    <RegisterForm id="registro" />
  </main>
  <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Process from '../components/Process.vue'
import Contact from '../components/Contact.vue'
import RegisterForm from '../components/RegisterForm.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
main {
  width: 100%;
}
</style>
