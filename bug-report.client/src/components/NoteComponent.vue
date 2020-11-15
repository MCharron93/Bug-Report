<template>
  <div class="noteComponent col-10 p-3 card">
    <div class="d-flex justify-content-between">
      <h5 class="p-2">
        {{ noteProps.content }}
      </h5>
      <p class="justify-self-end red" v-if="noteProps.reportedBy == profile._id" @click="deleteNote">
        &times;
      </p>
    </div>
    <p class="p-2">
      Submitted by: {{ noteProps.creator.name }}
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'

export default {
  name: 'NoteComponent',
  props: {
    noteProps: Object
  },
  setup(props) {
    return {
      profile: computed(() => AppState.profile),
      notes: computed(() => props.noteProp),
      deleteNote() {
        notesService.deleteNote(props.noteProps)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.red{
  color: red
}
</style>
