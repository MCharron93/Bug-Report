<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <h3 class="my-5 bg-dark text-light p-3 rounded">
        <span class="mx-2 text-white">Bugs Reported</span>
      </h3>
    </div>
    <div class="row">
      <bug-component v-for="b in bugs" :key="b.title" :bug-prop="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { bugsService } from '../services/BugsService'
import bugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await profileService.getProfile()
      await bugsService.getAllBugs()
    })
    return {
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs)
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
