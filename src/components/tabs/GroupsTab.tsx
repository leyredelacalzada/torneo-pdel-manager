import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tournament, Team, Match, Group } from '@/lib/types'
import { generateGroups, generateGroupMatches, calculateStandings } from '@/lib/tournament-logic'
import { toast } from 'sonner'

type GroupsTabProps = {
  tournament: Tournament
  teams: Team[]
  matches: Match[]
  groups: Group[]
  setGroups: (groups: Group[] | ((prev: Group[] | undefined) => Group[])) => void
  setMatches: (matches: Match[] | ((prev: Match[] | undefined) => Match[])) => void
}

export function GroupsTab({ tournament, teams, groups, matches, setGroups, setMatches }: GroupsTabProps) {
  const generateTournament = () => {
    const newGroups: Group[] = []
    const newMatches: Match[] = []

    tournament.categories.forEach(category => {
      const categoryTeams = teams.filter(t => t.categoryId === category.id)
      
      if (categoryTeams.length < 2) {
        toast.error(`Category "${category.name}" needs at least 2 teams`)
        return
      }

      const numGroups = Math.min(4, Math.max(2, Math.ceil(categoryTeams.length / 4)))
      const categoryGroups = generateGroups(categoryTeams, category.id, numGroups)
      
      categoryGroups.forEach(group => {
        const groupMatches = generateGroupMatches(group, tournament.id, category.id)
        newMatches.push(...groupMatches)
      })
      
      newGroups.push(...categoryGroups)
    })

    setGroups(prev => [...(prev || []), ...newGroups])
    setMatches(prev => [...(prev || []), ...newMatches])
    toast.success('Tournament generated successfully!')
  }

  const tournamentGroups = groups.filter(g => 
    tournament.categories.some(c => c.id === g.categoryId)
  )

  if (tournamentGroups.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="mb-4">No Groups Generated Yet</h3>
        <p className="text-muted-foreground mb-6">
          Generate groups and matches to start the tournament
        </p>
        <Button onClick={generateTournament}>Generate Tournament</Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {tournament.categories.map(category => {
        const categoryGroups = tournamentGroups.filter(g => g.categoryId === category.id)
        
        return (
          <Card key={category.id} className="p-6">
            <h3 className="mb-6">{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGroups.map(group => {
                const groupTeams = teams.filter(t => group.teamIds.includes(t.id))
                const groupMatches = matches.filter(m => m.groupId === group.id)
                const standings = calculateStandings(groupMatches, groupTeams)

                return (
                  <Card key={group.id} className="p-4 bg-muted/30">
                    <h4 className="mb-4">{group.name}</h4>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground grid grid-cols-6 gap-2 pb-2 border-b">
                        <div className="col-span-3">Team</div>
                        <div>MP</div>
                        <div>W</div>
                        <div>PTS</div>
                      </div>
                      {standings.map((standing, idx) => {
                        const team = groupTeams.find(t => t.id === standing.teamId)
                        if (!team) return null
                        
                        return (
                          <div key={standing.teamId} className="grid grid-cols-6 gap-2 text-sm">
                            <div className="col-span-3 font-medium">
                              {idx + 1}. {team.player1.name} / {team.player2.name}
                            </div>
                            <div>{standing.played}</div>
                            <div>{standing.won}</div>
                            <div className="font-medium">{standing.points}</div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
