<template>
  <div class="activeBugPage container-fluid">
    <div class="row justify-content-center p-4">
      <div class="card p-4 col-8">
        <h5 class="p-1">
          {{ activeBug.title }}
        </h5>
        <div class="d-flex justify-content-end">
          <h6>Status: Here the status will toggle to open or closed based on bool</h6>
          <button class="btn btn-secondary">
            change status w/ @click to change bool stats
          </button>
        </div>
        <hr>
        <div class="row">
          <p class="col-10">
            {{ activeBug.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      Notes will go here, col-10 w/ some padding and centering
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
