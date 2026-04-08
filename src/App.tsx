import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy } from '@phosphor-icons/react'
import { Tournament, Team, Match, Group } from '@/lib/types'
import { TournamentWizard } from '@/components/TournamentWizard'
import { TournamentPanel } from '@/components/TournamentPanel'

function App() {
  const [tournaments, setTournaments] = useKV<Tournament[]>('tournaments', [])
  const [currentTournamentId, setCurrentTournamentId] = useState<string | null>(null)
  const [showWizard, setShowWizard] = useState(false)
  const [teams, setTeams] = useKV<Team[]>('teams', [])
  const [matches, setMatches] = useKV<Match[]>('matches', [])
  const [groups, setGroups] = useKV<Group[]>('groups', [])

  const currentTournament = (tournaments || []).find(t => t.id === currentTournamentId)

  const handleCreateTournament = (tournament: Tournament) => {
    setTournaments(prev => [...(prev || []), tournament])
    setCurrentTournamentId(tournament.id)
    setShowWizard(false)
  }

  if (showWizard) {
    return (
      <TournamentWizard
        onComplete={handleCreateTournament}
        onCancel={() => setShowWizard(false)}
      />
    )
  }

  if (currentTournament) {
    return (
      <TournamentPanel
        tournament={currentTournament}
        onBack={() => setCurrentTournamentId(null)}
        teams={teams || []}
        setTeams={setTeams}
        matches={matches || []}
        setMatches={setMatches}
        groups={groups || []}
        setGroups={setGroups}
        onUpdateTournament={(updated: Tournament) => {
          setTournaments(prev => (prev || []).map(t => t.id === updated.id ? updated : t))
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Trophy size={32} className="text-primary" weight="fill" />
            <h1 className="text-foreground">Padel Tournament Manager</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {(tournaments || []).length === 0 ? (
          <Card className="p-12 text-center">
            <Trophy size={64} className="mx-auto mb-6 text-muted-foreground" />
            <h2 className="mb-4">Welcome to Tournament Manager</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create your first padel tournament with automatic group generation, intelligent scheduling, and real-time management capabilities.
            </p>
            <Button size="lg" onClick={() => setShowWizard(true)}>
              <Trophy className="mr-2" />
              Create Your First Tournament
            </Button>
          </Card>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2>Your Tournaments</h2>
              <Button onClick={() => setShowWizard(true)}>
                <Trophy className="mr-2" />
                New Tournament
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(tournaments || []).map(tournament => (
                <Card
                  key={tournament.id}
                  className="p-6 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setCurrentTournamentId(tournament.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Trophy size={24} className="text-primary" weight="fill" />
                    {tournament.generated && (
                      <span className="text-xs px-2 py-1 bg-success/10 text-success-foreground rounded-full">
                        Generated
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2">{tournament.name}</h3>
                  {tournament.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tournament.description}
                    </p>
                  )}
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>📍 {tournament.venue || tournament.club}</div>
                    <div>📅 {new Date(tournament.tournamentStart).toLocaleDateString()}</div>
                    <div>🎾 {tournament.categories.length} {tournament.categories.length === 1 ? 'category' : 'categories'}</div>
                    <div>🏟️ {tournament.courts.length} {tournament.courts.length === 1 ? 'court' : 'courts'}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
