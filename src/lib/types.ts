export type TimeRange = {
  id: string
  from: string
  to: string
}

export type CourtAvailability = {
  [date: string]: TimeRange[]
}

export type Court = {
  id: string
  name: string
  weight: number
  availability: CourtAvailability
}

export type TournamentFormat = 
  | 'group-draw-conso'
  | 'seeded-draw-conso'
  | 'single-group'
  | 'group-draw'
  | 'seeded-draw'

export type Category = {
  id: string
  name: string
  format: TournamentFormat
  maxPairs: number
  startTime: string
  drawNotBefore?: string
  consoNotBefore?: string
}

export type Tournament = {
  id: string
  name: string
  description?: string
  club: string
  venue: string
  matchDuration: number
  registrationStart: string
  registrationEnd: string
  tournamentStart: string
  tournamentEnd: string
  courts: Court[]
  categories: Category[]
  createdAt: string
  generated: boolean
}

export type Player = {
  id: string
  name: string
}

export type Team = {
  id: string
  player1: Player
  player2: Player
  categoryId: string
  checkedIn: boolean
  paid: boolean
}

export type MatchStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'

export type Match = {
  id: string
  tournamentId: string
  categoryId: string
  team1Id: string
  team2Id: string
  courtId?: string
  date?: string
  time?: string
  status: MatchStatus
  score?: string
  groupId?: string
  phase: 'group' | 'draw' | 'conso'
  roundName?: string
  position?: number
}

export type Group = {
  id: string
  categoryId: string
  name: string
  teamIds: string[]
}

export type Standing = {
  teamId: string
  played: number
  won: number
  lost: number
  setsFor: number
  setsAgainst: number
  setDiff: number
  gameDiff: number
  points: number
}

export type SchedulingRule = {
  id: string
  name: string
  description: string
  enabled: boolean
  priority: number
  score: number
}

export const DEFAULT_RULES: SchedulingRule[] = [
  {
    id: 'same-day-group',
    name: 'All group matches happening in the same day',
    description: 'Ensures all group phase matches occur on the same day',
    enabled: true,
    priority: 1,
    score: 100
  },
  {
    id: 'morning-afternoon',
    name: 'All team matches happening either during the morning or the afternoon',
    description: 'Teams play either morning or afternoon slots, not both',
    enabled: true,
    priority: 2,
    score: 80
  },
  {
    id: 'one-day-per-team',
    name: 'All team matches happening in just one day',
    description: 'Each team plays all their matches on a single day',
    enabled: false,
    priority: 3,
    score: 60
  },
  {
    id: 'max-three-consecutive',
    name: 'No more than three consecutive matches',
    description: 'Teams won\'t play more than 3 matches in a row',
    enabled: true,
    priority: 4,
    score: 70
  },
  {
    id: 'max-two-consecutive',
    name: 'No more than two consecutive matches',
    description: 'Teams won\'t play more than 2 matches in a row',
    enabled: false,
    priority: 5,
    score: 90
  },
  {
    id: 'one-match-per-day',
    name: 'One match per team at the same day',
    description: 'Each team plays maximum one match per day',
    enabled: false,
    priority: 6,
    score: 50
  },
  {
    id: 'multi-category-different-days',
    name: 'Players from multiple categories on different days',
    description: 'Players in multiple categories play on different days',
    enabled: false,
    priority: 7,
    score: 40
  },
  {
    id: 'same-court-group',
    name: 'All group matches happening in the same court',
    description: 'All matches in a group play on the same court',
    enabled: false,
    priority: 8,
    score: 30
  }
]
