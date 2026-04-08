import { Court, CourtAvailability, TimeRange, Category, Team, Match, Group, Standing } from './types'

export function calculateAvailableSlots(courts: Court[], startDate: string, endDate: string, matchDuration: number): number {
  let totalSlots = 0
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  courts.forEach(court => {
    let currentDate = new Date(start)
    
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const ranges = court.availability[dateStr] || []
      
      ranges.forEach(range => {
        const [fromH, fromM] = range.from.split(':').map(Number)
        const [toH, toM] = range.to.split(':').map(Number)
        
        const fromMinutes = fromH * 60 + fromM
        const toMinutes = toH * 60 + toM
        const availableMinutes = toMinutes - fromMinutes
        
        const slots = Math.floor(availableMinutes / matchDuration)
        totalSlots += slots
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })
  
  return totalSlots
}

export function calculateRequiredMatches(teams: Team[], format: string): number {
  const numTeams = teams.length
  
  if (numTeams < 2) return 0
  
  if (format === 'single-group') {
    return (numTeams * (numTeams - 1)) / 2
  }
  
  if (format.startsWith('group')) {
    const groupSize = Math.ceil(Math.sqrt(numTeams))
    const numGroups = Math.ceil(numTeams / groupSize)
    const matchesPerGroup = (groupSize * (groupSize - 1)) / 2
    const groupPhaseMatches = numGroups * matchesPerGroup
    
    const qualifiersPerGroup = Math.min(2, groupSize)
    const totalQualifiers = numGroups * qualifiersPerGroup
    const drawMatches = totalQualifiers - 1
    
    let consoMatches = 0
    if (format.includes('conso')) {
      consoMatches = Math.max(0, totalQualifiers - 2)
    }
    
    return groupPhaseMatches + drawMatches + consoMatches
  }
  
  const drawMatches = numTeams - 1
  let consoMatches = 0
  if (format.includes('conso')) {
    consoMatches = Math.max(0, numTeams - 2)
  }
  
  return drawMatches + consoMatches
}

export function determineOptimalGroupStructure(
  numTeams: number,
  availableSlots: number,
  format: string
): { numGroups: number; groupSize: number; viable: boolean; reason?: string } {
  if (numTeams < 2) {
    return { numGroups: 0, groupSize: 0, viable: false, reason: 'Need at least 2 teams' }
  }
  
  if (format === 'single-group') {
    const required = (numTeams * (numTeams - 1)) / 2
    return {
      numGroups: 1,
      groupSize: numTeams,
      viable: required <= availableSlots,
      reason: required > availableSlots ? `Need ${required} slots, only ${availableSlots} available` : undefined
    }
  }
  
  if (format.startsWith('seeded')) {
    const required = numTeams - 1 + (format.includes('conso') ? Math.max(0, numTeams - 2) : 0)
    return {
      numGroups: 0,
      groupSize: 0,
      viable: required <= availableSlots,
      reason: required > availableSlots ? `Need ${required} slots, only ${availableSlots} available` : undefined
    }
  }
  
  const possibleStructures = [
    { groups: 2, size: Math.ceil(numTeams / 2) },
    { groups: 4, size: Math.ceil(numTeams / 4) },
    { groups: Math.ceil(numTeams / 4), size: 4 },
    { groups: Math.ceil(numTeams / 3), size: 3 }
  ]
  
  for (const structure of possibleStructures) {
    const matchesPerGroup = (structure.size * (structure.size - 1)) / 2
    const groupPhaseMatches = structure.groups * matchesPerGroup
    const qualifiers = structure.groups * Math.min(2, structure.size)
    const drawMatches = qualifiers - 1
    const consoMatches = format.includes('conso') ? Math.max(0, qualifiers - 2) : 0
    const totalRequired = groupPhaseMatches + drawMatches + consoMatches
    
    if (totalRequired <= availableSlots) {
      return {
        numGroups: structure.groups,
        groupSize: structure.size,
        viable: true
      }
    }
  }
  
  return {
    numGroups: 0,
    groupSize: 0,
    viable: false,
    reason: `Cannot fit ${numTeams} teams in ${availableSlots} available slots`
  }
}

export function generateGroups(teams: Team[], categoryId: string, numGroups: number): Group[] {
  const groups: Group[] = []
  const shuffled = [...teams].sort(() => Math.random() - 0.5)
  
  for (let i = 0; i < numGroups; i++) {
    groups.push({
      id: `${categoryId}-group-${i + 1}`,
      categoryId,
      name: `Group ${String.fromCharCode(65 + i)}`,
      teamIds: []
    })
  }
  
  shuffled.forEach((team, index) => {
    const groupIndex = index % numGroups
    groups[groupIndex].teamIds.push(team.id)
  })
  
  return groups
}

export function generateGroupMatches(
  group: Group,
  tournamentId: string,
  categoryId: string
): Match[] {
  const matches: Match[] = []
  const teamIds = group.teamIds
  
  for (let i = 0; i < teamIds.length; i++) {
    for (let j = i + 1; j < teamIds.length; j++) {
      matches.push({
        id: `${group.id}-${i}-${j}`,
        tournamentId,
        categoryId,
        team1Id: teamIds[i],
        team2Id: teamIds[j],
        status: 'scheduled',
        groupId: group.id,
        phase: 'group'
      })
    }
  }
  
  return matches
}

export function calculateStandings(matches: Match[], teams: Team[]): Standing[] {
  const standings: { [teamId: string]: Standing } = {}
  
  teams.forEach(team => {
    standings[team.id] = {
      teamId: team.id,
      played: 0,
      won: 0,
      lost: 0,
      setsFor: 0,
      setsAgainst: 0,
      setDiff: 0,
      gameDiff: 0,
      points: 0
    }
  })
  
  matches.forEach(match => {
    if (match.status === 'completed' && match.score) {
      const [score1, score2] = match.score.split('-').map(Number)
      
      standings[match.team1Id].played++
      standings[match.team2Id].played++
      
      standings[match.team1Id].setsFor += score1
      standings[match.team1Id].setsAgainst += score2
      standings[match.team2Id].setsFor += score2
      standings[match.team2Id].setsAgainst += score1
      
      if (score1 > score2) {
        standings[match.team1Id].won++
        standings[match.team1Id].points += 3
        standings[match.team2Id].lost++
      } else {
        standings[match.team2Id].won++
        standings[match.team2Id].points += 3
        standings[match.team1Id].lost++
      }
    }
  })
  
  Object.values(standings).forEach(standing => {
    standing.setDiff = standing.setsFor - standing.setsAgainst
    standing.gameDiff = standing.setsFor - standing.setsAgainst
  })
  
  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.setDiff !== a.setDiff) return b.setDiff - a.setDiff
    return b.setsFor - a.setsFor
  })
}

export function assignMatchesToSlots(
  matches: Match[],
  courts: Court[],
  startDate: string,
  endDate: string,
  matchDuration: number
): Match[] {
  const assignedMatches = [...matches]
  const sortedCourts = [...courts].sort((a, b) => b.weight - a.weight)
  
  let matchIndex = 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  let currentDate = new Date(start)
  
  while (currentDate <= end && matchIndex < assignedMatches.length) {
    const dateStr = currentDate.toISOString().split('T')[0]
    
    sortedCourts.forEach(court => {
      const ranges = court.availability[dateStr] || []
      
      ranges.forEach(range => {
        const [fromH, fromM] = range.from.split(':').map(Number)
        const [toH, toM] = range.to.split(':').map(Number)
        
        let currentMinutes = fromH * 60 + fromM
        const endMinutes = toH * 60 + toM
        
        while (currentMinutes + matchDuration <= endMinutes && matchIndex < assignedMatches.length) {
          const hours = Math.floor(currentMinutes / 60)
          const minutes = currentMinutes % 60
          const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          
          assignedMatches[matchIndex] = {
            ...assignedMatches[matchIndex],
            courtId: court.id,
            date: dateStr,
            time: timeStr
          }
          
          matchIndex++
          currentMinutes += matchDuration
        }
      })
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return assignedMatches
}
