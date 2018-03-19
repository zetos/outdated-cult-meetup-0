<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetups/new" class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click.native="onLoadMeetup(meetup.id)">
              <div class="title">
                {{ meetup.title }}
              </div>
            </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome cults!</p>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup (meetupId) {
      this.$router.push(`/meetups/${meetupId}`)
    }
  }
}
</script>

<style scoped>
 .title {
   position: absolute;
   bottom: 50px;
   background-color: rgba(0,0,0,0.5);
   color: white;
   font-size: 2em !important;
   padding: 20px;
   right: 10%;
   left: 10%;
   text-align: center;
 }
</style>

