<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>

    <h2>Hello Home!</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadcrumbs: [
          {
            text: 'Главная',
            href: '/',
            active: true
          }
        ]
      }
    }
  }
</script>
