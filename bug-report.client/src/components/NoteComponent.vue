<template>
  <div class="noteComponent col-10 p-3 card">
    <div class="d-flex justify-content-between">
      <h6 class="p-2">
        {{ noteProps.content }}
      </h6>
      <p class="justify-self-end" v-if="noteProps.reportedBy == profile._id">
        &times;
      </p>
    </div>
    <p class="p-2">
      Submitted by: {{ noteProps.creator.name }}
    </p>
  </div>
</template>

<script>
// import { AppState } from '../AppState'
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'NoteComponent',
  props: {
    noteProps: Object
  },
  setup(props) {
    return {
      profile: computed(() => AppState.profile),
      notes: computed(() => props.noteProps)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
