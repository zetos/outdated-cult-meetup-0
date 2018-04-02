import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

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
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then(response => {
        const meetups = []
        const dbValues = response.val()
        for (let key in dbValues) {
          meetups.push({
            id: key,
            title: dbValues[key].title,
            description: dbValues[key].description,
            imageUrl: dbValues[key].imageUrl,
            date: dbValues[key].date,
            creatorId: dbValues[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        console.error('loadMeetups error:', error)
      })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
      .then((response) => {
        const key = response.key
        commit('createMeetup', {
          ...meetup,
          id: key
        })
      })
      .catch(error => console.error('createMeetup error:', error))
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.error('signUserUp error:', error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.error('signUserIn error:', error)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
