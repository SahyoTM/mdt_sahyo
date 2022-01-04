<template>
  <div class="arrest-table">
    <div v-for="arrest in arrests" :key="arrest.id">
      <p>{{arrest.id}}</p>
      <p>{{arrest.title}}</p>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      arrests: [],
    }
  },
  mounted(){
    axios.get("/drafts").then(response =>
      this.arrests = response.data    );
    console.log(this.arrests);
  },
}
</script>
