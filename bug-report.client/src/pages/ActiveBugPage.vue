<template>
  <div class="activeBugPage container-fluid">
    <div class="row justify-content-center p-4">
      <div class="card p-4 col-10">
        <h4 class="p-4 row justify-content-between">
          {{ activeBug.title }}
          <div class="d-flex justify-content-end">
            <button class="btn btn-info"
                    v-if="profile._id == activeBug.reportedBy && activeBug.closed == false"
                    type="button"
                    data-toggle="modal"
                    data-target="#editBugForm"
            >
              Edit
            </button>
            <button class="btn btn-sm btn-secondary" v-if="activeBug.closed == false" @click="closeBug">
              Close?
            </button>
            <button class="btn btn-sm btn-secondary" v-else-if="activeBug.closed">
              Closed
            </button>
          </div>
        </h4>

        <!-- Insert Modal to Edit Bug -->
        <div class="modal fade"
             id="editBugForm"
             tabindex="-1"
             role="dialog"
             aria-labelledby="editBugFormLabel"
             aria-hidden="true"
        >
          <form @submit.prevent="editBug">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="editBugFormLabel">
                    <input type="text" :placeholder="activeBug.title" v-model="state.edittedBug.title">
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <textarea :placeholder="activeBug.description" cols="60" rows="10" v-model="state.edittedBug.description"></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <hr>
        <p class="col-10 p-2">
          {{ activeBug.description }}
        </p>
        <p v-if="date.length > 0">
          Last updated on: {{ date }}
        </p>
      </div>
    </div>
    <div class="row justify-content-between">
      <h5 class="offset-1 col-8 px-5">
        Recommendations:
      </h5>
      <i class="material-icons col-2"
         data-toggle="collapse"
         data-target="#collapseNoteForm"
         aria-expanded="false"
         aria-controls="collapseNoteForm"
      >note_add</i>
    </div>

    <div class="collapse row justify-content-center p-2" id="collapseNoteForm">
      <form @submit.prevent="createNote" class="col-10 form-reset">
        <div class=" card p-3">
          <textarea cols="60" rows="8" placeholder="Create note details..." v-model="state.newNote.content"></textarea>
          <div class="d-flex justify-content-end p-3">
            <button type="submit" class="btn btn-sm btn-info fit-content">
              Create Note
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="row justify-content-center p-4">
      <note-component v-for="n in notes" :key="n._id" :note-props="n" />
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
      newNote: {
        bugId: route.params.bugId
      },
      edittedBug: {
        bugId: route.params.bugId
      }
    })
    onMounted(async() => {
      await bugsService.inspectBug(route.params.bugId)
      await notesService.getNotesByBugId(route.params.bugId)
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      activeBug: computed(() => AppState.activeBug),
      date: computed(() => new Date(Date.parse(AppState.activeBug.updatedAt)).toString().substring(0, 24)),
      notes: computed(() => AppState.activeBugNotes),
      createNote() {
        notesService.createNote(state.newNote)
        // document.querySelector('.form-reset').reset()
        this.state.newNote.content = ''
      },
      // convertDate() {
      // const date = new Date(AppState.activeBug.updatedAt)
      // return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear()
      // return AppState.activeBug.updatedAt.slice(0, 10)
      // },
      editBug() {
        bugsService.editBug(state.edittedBug)
      },
      closeBug() {
        bugsService.closeBug(route.params.bugId)
      }
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
