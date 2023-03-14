import { BASE_URL } from './constant'

const issueAPI = {
  // MEMO: ownerRepoName -> fullname(owner/reponame)
  getIssues(ownerRepoName: string) {
    return fetch(`${BASE_URL}repos/${ownerRepoName}/issues`) // MEMO: axios 도입해서 cache 등 적용할 수도
  }
}

export default issueAPI
