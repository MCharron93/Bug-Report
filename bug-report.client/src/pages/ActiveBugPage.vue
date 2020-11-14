<template>
  <div class="activeBugPage container-fluid">
    <div class="row justify-content-center p-4">
      <div class="card p-4 col-8">
        <h5>{{ activeBug.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'ActiveBugPage',
  setup() {
    return {
      activeBug: computed(() => AppState.activeBug)
    }
  }
  // components:{}
}
</script>

<style lang="scss" scoped>

</style>
