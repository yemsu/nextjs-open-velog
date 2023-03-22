export interface RankKeyword {
  count: number
  keyword: string
}

export type AgeRanges = 'TO19' |  'TO29' |  'TO39' |  'TO59' |  'OVER60'
export type Genders = 'M' | 'F'

export interface KeywordTrendParams {
  ageRange: AgeRanges
  gender: Genders
  date: string
  limit: number
}
