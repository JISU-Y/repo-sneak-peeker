export interface OwnerType {
  login: string
  id: number
  avatar_url: string
}

export interface RepoItemType {
  id: number
  full_name: string
  name: string
  owner: OwnerType
  private: boolean
  description: string
  created_at: string
  updated_at: string
  language: string
  visibility: 'private' | 'public' | 'internal'
}

export interface RepoResponseType {
  total_count: number
  incomplete_results: boolean
  items: RepoItemType[]
}
