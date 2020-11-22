// npm install vuex@next --save
import { createStore } from 'vuex'
import axios from 'axios'

export interface ColumnProps {
  id: string;
  title: string;
  avatar?: string;
  description: string;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
}

const store = createStore<GlobalDataProps>({
  state: {
    // 1.ColumnList
    columns: []
  },
  mutations: {
    // 1.ColumnList
    fetchColumns (state, respData) {
      state.columns = respData.data
    }
  },
  actions: {
    // 1.ColumnList
    fetchColumns (context) {
      axios.get('/api/columnlist').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    }
  }
})

export default store
