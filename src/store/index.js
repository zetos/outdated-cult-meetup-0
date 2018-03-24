import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://i.kinja-img.com/gawker-media/image/upload/s--z9FtuPyJ--/c_scale,fl_progressive,q_80,w_800/mjtzdwibbf0tvkuj4a77.jpg',
        id: '312321',
        title: 'Meetup in Arkham',
        date: new Date(),
        location: 'Arkham',
        description: 'Sinless description..' },
      { imageUrl: 'https://vignette.wikia.nocookie.net/l5r/images/d/d1/Cultists_of_Ruhmal.jpg',
        id: '312343',
        title: 'Meetup in Ruhmal',
        date: new Date(),
        location: 'Ruhmal',
        description: 'Sinless description..' }
    ],
    user: {
      id: 321312,
      registeredMeetups: ['32423425']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '1234324'
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    }
  },
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
