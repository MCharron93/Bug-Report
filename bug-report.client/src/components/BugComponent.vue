<template>
  <div class="bugComponent row p-3" @click="inspectBug">
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
import { useRouter } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
    })
    return {
      state,
      inspectBug() {
        router.push({ name: 'ActiveBugPage', params: { bugId: props.bugProp._id } })
        bugsService.inspectBug(props.bugProp._id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
