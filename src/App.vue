<template>
  <the-header></the-header>
    <main>

      <router-view></router-view>
      <message v-if="message" :text="message.text" :title="message.title" :type="message.type"></message>

  </main>
</template>
<script>
import Message from './components/Message.vue'
import TheHeader from './components/TheHeader.vue'
export default {
  computed: {
    message() {
      return this.$store.getters.message;
    }
  },
  components: {TheHeader, Message}
}
</script>
