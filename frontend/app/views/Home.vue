<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>

    <h3>Всего в базе данных:</h3>
    <p>Актёров: {{ this.counts.actors }}</p>
    <p>Спектаклей: {{ this.counts.plays }}</p>
    <p>Постановок: {{ this.counts.shows }}</p>
    <p>Ролей: {{ this.counts.roles }}</p>
  </div>
</template>

<script>
  import api from '../helpers/api';

  export default {
    data() {
      return {
        breadcrumbs: [
          {
            text: 'Главная',
            href: '/',
            active: true
          }
        ],
        counts: {
          actors: 0,
          plays: 0,
          roles: 0,
          shows: 0
        },
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      async loadData(data = {}) {
        this.counts = await api('home/getCounts');
      },
    }
  }
</script>
