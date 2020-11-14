<template>
  <div class="activeBugPage container-fluid">
    <div class="row justify-content-center p-4">
      <div class="card p-4 col-10">
        <h5 class="p-4 row justify-content-between">
          {{ activeBug.title }}
          <button class="btn btn-sm btn-secondary" v-if="activeBug.closed == false">
            Close
          </button>
          <button class="btn btn-sm btn-secondary" v-else-if="activeBug.closed == true">
            Closed: {{ activeBug.closedDate }}
          </button>
        </h5>
        <hr>
        <p class="col-10">
          {{ activeBug.description }}
        </p>
      </div>
    </div>
    <div class="row">
      <note-component v-for="n in notes" :key="n" :note-props="n" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import noteComponent from '../components/NoteComponent'
export default {
  name: 'ActiveBugPage',
  setup() {
    const route = useRoute()
    onMounted(() => {
      notesService.getNotesByBugId(route.params.bugId)
    })
    return {
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.activeBugNotes)
    }
  },
  components: { noteComponent }
}
</script>

<style lang="scss" scoped>

</style>
