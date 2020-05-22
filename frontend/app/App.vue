<template>
  <div>
    <Menu />
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>
 
<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>
