<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md4>
                <v-card-media
                src="https://i.kinja-img.com/gawker-media/image/upload/s--z9FtuPyJ--/c_scale,fl_progressive,q_80,w_800/mjtzdwibbf0tvkuj4a77.jpg"
                height="130px"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h4 class="white--text mb-0">My Meetup</h4>
                    <div>15th july 2019</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/meetups/1">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
