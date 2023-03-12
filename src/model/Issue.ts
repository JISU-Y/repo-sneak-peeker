import { OwnerType } from './Repo'

export interface LabeType {
  id: number
  name: string
  description: string
}

export interface AssigneeType {
  id: number
  login: string
  avatar_url: string
}

export interface IssueType {
  id: number
  url: string
  state: 'open' | 'close'
  html_url: string
  title: string
  body: string
  user: OwnerType
  labels: LabeType[]
  assignees: AssigneeType[]
  comments: number
  created_at: string
  closed_at?: string
}
