<template>
  <div class="bugComponent row p-3">
    <h6 class="col-3 text-left">
      {{ bugProp.title }}
    </h6>
    <h6 class="col-3 text-left">
      {{ bugProp.creator.name }}
    </h6>
    <h6 class="col-3 text-left">
      Date Closed: {{ bugProp.closedDate }}
    </h6>
    <h6 class="col-3 text-left">
      Status: {{ bugProp.closed }}
    </h6>
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
