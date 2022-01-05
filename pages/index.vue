<template>
  <div class="arrest-table">
      <table>
        <tr>
          <td>ID Arrest</td>
          <td>Arrest Title</td>
          <td>oui</td>
        </tr>
        <tr v-for="arrest in arrests" :key="arrest.id">
          <td>{{arrest.id}}</td>
          <td>{{arrest.title}}</td>
        </tr>
      </table>
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
    axios.get("/api/drafts").then(response => this.arrests = response.data);
    console.log('arrest : ' + this.arrests);
  },
}
</script>
