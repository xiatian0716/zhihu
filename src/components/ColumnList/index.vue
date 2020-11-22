<template>
  <div class="row">
    <div v-for="column in list" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="card-img-top" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">ColumnList组件</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
