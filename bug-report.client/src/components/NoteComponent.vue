<template>
  <div class="noteComponent">
    <h6>{{ noteProps.content }}</h6>
    <!-- Check this again for new created info -->
    <!-- <p>{{ noteProps.creator.name }}</p> -->
  </div>
</template>

<script>
// import { AppState } from '../AppState'
import { computed } from 'vue'

export default {
  name: 'NoteComponent',
  props: {
    noteProps: Object
  },
  setup(props) {
    return {
      notes: computed(() => props.noteProps)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
