import { BASE_URL } from './constant'

const repoAPI = {
  searchReposWith(word: string) {
    return fetch(`${BASE_URL}search/repositories?q=${word}`)
  }
}

export default repoAPI
