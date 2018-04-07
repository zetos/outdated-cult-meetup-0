import firebase from 'firebase'

export default {
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
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
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
            location: dbValues[key].location,
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl, key
      firebase.database().ref('meetups').push(meetup)
      .then((response) => {
        key = response.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch(error => console.error('createMeetup error:', error))
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        console.error('updateMeetupData error:', error)
        commit('setLoading', false)
      })
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
}
