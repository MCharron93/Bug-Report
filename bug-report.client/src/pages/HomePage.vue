<template>
  <div class="home container-fluid">
    <div class="my-1 d-flex justify-content-end">
      <!-- Modal Button Trigger -->
      <button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#bugFormModal">
        Report?
      </button>
    </div>
    <div class="row justify-content-center">
      <h4 class="my-4 bg-dark p-2 rounded">
        <span class="mx-2 text-info">Bugs Reported</span>
      </h4>
    </div>
    <div class="row justify-content-around mx-3">
      <div class="col-3">
        Title:
      </div>
      <div class="col-3">
        User:
      </div>
      <div class="col-3">
        Created:
      </div>
      <div class="text-right col-2">
        Status: &nbsp;&nbsp;
      </div>
      <div @click="sortByStatus" class="col-1">
        <i class="material-icons">sort</i>
      </div>
    </div>
    <hr>
    <div>
      <bug-component v-for="b in bugs" :key="b.title" :bug-prop="b" />
    </div>

    <!-- Bug Modal Form -->
    <form>
      <div class="modal fade"
           id="bugFormModal"
           tabindex="-1"
           role="dialog"
           aria-labelledby="bugFormModalTitle"
           aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
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
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import bugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import $ from 'jquery'
import { logger } from '../utils/Logger'
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
        $('#bugFormModal').modal('toggle')
        $('.modal-backdrop').remove()
        this.state.newBugReportmat = ''
      },
      sortByStatus() {
        // Sort by closed status
        const bugs = AppState.bugs
        bugs.sort(function(x, y) {
          return y.closed - x.closed
        })
        logger.log(bugs)
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
