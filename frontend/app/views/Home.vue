<template>
  <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
</template>

<script>
  export default {
    data() {
      return {
        breadcrumbs: [
          {
            text: 'Home',
            href: '/',
            active: true
          }
        ]
      }
    }
  }
</script>
