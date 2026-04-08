import { Card } from '@/components/ui/card'
import { Tournament, Team, Match } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

type ScheduleTabProps = {
  tournament: Tournament
  teams: Team[]
  matches: Match[]
  setMatches: (matches: Match[] | ((prev: Match[] | undefined) => Match[])) => void
}

export function ScheduleTab({ tournament, teams, matches }: ScheduleTabProps) {
  const tournamentMatches = matches.filter(m => m.tournamentId === tournament.id && m.date && m.time)

  const groupedByDate = tournamentMatches.reduce((acc, match) => {
    const date = match.date!
    if (!acc[date]) acc[date] = []
    acc[date].push(match)
    return acc
  }, {} as Record<string, Match[]>)

  if (Object.keys(groupedByDate).length === 0) {
    return (
      <Card className="p-12 text-center text-muted-foreground">
        <p>No matches scheduled yet. Generate the tournament first.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDate).sort().map(([date, dayMatches]) => (
        <Card key={date} className="p-6">
          <h3 className="mb-6">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          
          <div className="space-y-4">
            {tournament.courts.map(court => {
              const courtMatches = dayMatches
                .filter(m => m.courtId === court.id)
                .sort((a, b) => (a.time || '').localeCompare(b.time || ''))

              if (courtMatches.length === 0) return null

              return (
                <div key={court.id}>
                  <h4 className="mb-3">{court.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {courtMatches.map(match => {
                      const team1 = teams.find(t => t.id === match.team1Id)
                      const team2 = teams.find(t => t.id === match.team2Id)
                      const category = tournament.categories.find(c => c.id === match.categoryId)

                      if (!team1 || !team2) return null

                      return (
                        <Card key={match.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-muted-foreground">{match.time}</span>
                            <Badge variant="secondary" className="text-xs">
                              {category?.name}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">
                              {team1.player1.name} / {team1.player2.name}
                            </div>
                            <div className="text-muted-foreground">vs</div>
                            <div className="font-medium">
                              {team2.player1.name} / {team2.player2.name}
                            </div>
                          </div>
                          {match.score && (
                            <div className="mt-3 pt-3 border-t text-center font-mono font-bold text-primary">
                              {match.score}
                            </div>
                          )}
                          {match.groupId && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {match.phase === 'group' && 'Group Match'}
                            </div>
                          )}
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}
