<template>
  <v-app dark>
    <v-navigation-drawer fixed v-model='sideNav'>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>CultMeetup</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" >
      <v-toolbar-side-icon @click.native.stop='sideNav = !sideNav'
      class='hidden-sm-and-up' ></v-toolbar-side-icon>
      <v-toolbar-title>CultMeetup</v-toolbar-title>
      <v-spacer></v-spacer>  
      <v-toolbar-items class='hidden-xs-only' >
        <v-btn flat>
        <v-icon left>supervisor_account</v-icon>
          Meetups
        </v-btn>
        <v-btn flat>
          New Meetup
        </v-btn>
        <v-btn flat>
          Profile
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main></main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>
