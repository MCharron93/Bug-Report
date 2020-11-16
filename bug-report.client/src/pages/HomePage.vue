<template>
  <div class="home container-fluid">
    <div class="my-2 d-flex justify-content-end">
      <!-- Modal Button Trigger -->
      <button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#bugFormModal">
        Report?
      </button>
    </div>
    <div class="row justify-content-center">
      <h3 class="my-4 bg-dark p-3 rounded">
        <span class="mx-2 text-info">Bugs Reported</span>
      </h3>
    </div>
    <div class="row justify-content-around mx-3">
      <div class="col-2">
        Title
      </div>
      <div class="col-2">
        User
      </div>
      <div class="col-2">
        Created
      </div>
      <div class="col-2">
        Status
      </div>
    </div>
    <hr>
    <div>
      <bug-component v-for="b in bugs" :key="b.title" :bug-prop="b" />
    </div>

    <!-- Bug Modal Form -->
    <div class="modal fade"
         id="bugFormModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="bugFormModalTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form action="">
            <div class="modal-header">
              <h5 class="modal-title" id="bugFormModalTitle">
                <input type="text" placeholder="Bug Report Title" v-model="state.newBugReport.title">
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <textarea placeholder="Description" cols="50" rows="10" v-model="state.newBugReport.description"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="createBug">
                Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import bugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBugReport: {}
    })
    onMounted(async() => {
      await profileService.getProfile()
      await bugsService.getAllBugs()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs),
      createBug() {
        bugsService.createBug(state.newBugReport)
      }
    }
  },
  components: { bugComponent }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
}
</style>
