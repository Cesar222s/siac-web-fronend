<template>
  <div class="register-view-wrapper">
    <Navbar />
    <main>
      <RegisterForm />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import RegisterForm from '../components/RegisterForm.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.register-view-wrapper {
  width: 100%;
}
</style>
