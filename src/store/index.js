import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://i.kinja-img.com/gawker-media/image/upload/s--z9FtuPyJ--/c_scale,fl_progressive,q_80,w_800/mjtzdwibbf0tvkuj4a77.jpg',
        id: '312321',
        title: 'Meetup in Arkham',
        date: '2019-07-15' },
      { imageUrl: 'https://vignette.wikia.nocookie.net/l5r/images/d/d1/Cultists_of_Ruhmal.jpg',
        id: '312343',
        title: 'Meetup in Ruhmal',
        date: '2019-07-10' }
    ],
    user: {
      id: 321312,
      registeredMeetups: ['32423425']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetipId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetipId
        })
      }
    }
  }
})
