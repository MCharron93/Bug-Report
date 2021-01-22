<template>
  <div class="bugComponent row my-2 p-3" @click="inspectBug" :style="bugProp.closed?'background-color:#61db94c9':'background-color: #eb5757'">
    <h6 class="col-3">
      {{ bugProp.title }}
    </h6>
    <h6 class="col-3">
      {{ bugProp.creator.name }}
    </h6>
    <h6 class="col-3">
      {{ formattedDate }}
    </h6>
    <h6 class="col-3" v-if="bugProp.closed == false">
      Open
    </h6>
    <h6 class="col-3" v-else-if="bugProp.closed == true">
      Closed
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
      formattedDate: new Date(Date.parse(props.bugProp.createdAt)).toString().substring(0, 24),
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
