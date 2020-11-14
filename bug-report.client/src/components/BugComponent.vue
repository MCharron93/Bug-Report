<template>
  <div class="bugComponent col-12">
    <h5>{{ bugProp.title }}</h5><p>{{ bugProp.creator.name }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'BugComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    const state = reactive({
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
