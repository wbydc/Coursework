<template>
    <b-navbar toggleable="lg" type="dark" variant="info">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <b-link :to="{ path: '/' }" exact><b-icon-house /> Главная</b-link>
        </b-nav-item>
        <b-nav-item>
          <b-link :to="{ path: '/coursework/actors' }" exact><b-icon-people /> Актёры</b-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: 'Menu'
  }
</script>

<style scoped>
  a:not(.router-link-active) {
    color: #fff;
  }
</style>
