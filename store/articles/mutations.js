import Vue from 'vue'

export default {
  SET: (state, payload) => {
    if (!payload) {
      return
    }
    payload.forEach(article => {
      const el = state[article.id]
      Vue.set(state, article.id, el ? { ...el, ...article } : article)
    })
  }
}
