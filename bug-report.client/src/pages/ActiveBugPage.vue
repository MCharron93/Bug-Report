<template>
  <div class="activeBugPage container-fluid">
    <div class="row justify-content-center p-4">
      <div class="card p-4 col-10">
        <h4 class="p-4 row justify-content-between">
          {{ activeBug.title }}
          <button class="btn btn-sm btn-secondary" v-if="activeBug.closed == false">
            Close
          </button>
          <button class="btn btn-sm btn-secondary" v-else-if="activeBug.closed == true">
            Closed: {{ activeBug.closedDate }}
          </button>
        </h4>
        <hr>
        <p class="col-10 p-2">
          {{ activeBug.description }}
        </p>
      </div>
    </div>
    <div class="row justify-content-between">
      <h5 class="offset-1 col-8 p-4">
        Recommendations:
      </h5>
      <i class="material-icons p-4 col-2"
         data-toggle="collapse"
         data-target="#collapseNoteForm"
         aria-expanded="false"
         aria-controls="collapseNoteForm"
      >note_add</i>
    </div>

    <div class="collapse row justify-content-center p-3" id="collapseNoteForm">
      <form @submit="createNote" class="col-10">
        <div class=" card p-3">
          <p>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </p>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-sm btn-info fit-content">
              Create Note
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="row justify-content-center">
      <note-component v-for="n in notes" :key="n" :note-props="n" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import noteComponent from '../components/NoteComponent'
import { bugsService } from '../services/BugsService'
export default {
  name: 'ActiveBugPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {}
    })
    onMounted(() => {
      bugsService.inspectBug(route.params.bugId)
      notesService.getNotesByBugId(route.params.bugId)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.activeBugNotes)
    }
  },
  components: { noteComponent }
}
</script>

<style lang="scss" scoped>
.material-icons{
  color: #27AE60;
}
</style>
