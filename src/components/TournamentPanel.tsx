import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, ArrowLeft, PencilSimple, Users, ListNumbers, Crosshair, CalendarBlank, GearSix } from '@phosphor-icons/react'
import { Tournament, Team, Match, Group } from '@/lib/types'
import { DetailsTab } from '@/components/tabs/DetailsTab'
import { TeamsTab } from '@/components/tabs/TeamsTab'
import { GroupsTab } from '@/components/tabs/GroupsTab'
import { ScheduleTab } from '@/components/tabs/ScheduleTab'

type TournamentPanelProps = {
  tournament: Tournament
  onBack: () => void
  teams: Team[]
  setTeams: (teams: Team[] | ((prev: Team[] | undefined) => Team[])) => void
  matches: Match[]
  setMatches: (matches: Match[] | ((prev: Match[] | undefined) => Match[])) => void
  groups: Group[]
  setGroups: (groups: Group[] | ((prev: Group[] | undefined) => Group[])) => void
  onUpdateTournament: (tournament: Tournament) => void
}

export function TournamentPanel({
  tournament,
  onBack,
  teams,
  setTeams,
  matches,
  setMatches,
  groups,
  setGroups,
  onUpdateTournament
}: TournamentPanelProps) {
  const [activeTab, setActiveTab] = useState('details')

  const tournamentTeams = (teams || []).filter(t => 
    tournament.categories.some(c => c.id === t.categoryId)
  )
  const tournamentMatches = (matches || []).filter(m => m.tournamentId === tournament.id)
  const tournamentGroups = (groups || []).filter(g => 
    tournament.categories.some(c => c.id === g.categoryId)
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Trophy size={32} className="text-primary" weight="fill" />
                <div>
                  <h1 className="mb-0">{tournament.name}</h1>
                  {tournament.description && (
                    <p className="text-sm text-muted-foreground mt-1">{tournament.description}</p>
                  )}
                </div>
              </div>
            </div>
            {tournament.generated && (
              <span className="px-3 py-1 bg-success/10 text-success-foreground rounded-full text-sm font-medium">
                Tournament Generated
              </span>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 h-auto">
              <TabsTrigger value="details" className="flex items-center gap-2 py-3">
                <PencilSimple />
                <span className="hidden sm:inline">Details</span>
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2 py-3">
                <Users />
                <span className="hidden sm:inline">Teams</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2 py-3">
                <ListNumbers />
                <span className="hidden sm:inline">Groups</span>
              </TabsTrigger>
              <TabsTrigger value="draws" className="flex items-center gap-2 py-3">
                <Crosshair />
                <span className="hidden sm:inline">Draws</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2 py-3">
                <CalendarBlank />
                <span className="hidden sm:inline">Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="registration" className="flex items-center gap-2 py-3">
                <Users />
                <span className="hidden sm:inline">Registration</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
                <GearSix />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="details">
            <DetailsTab 
              tournament={tournament} 
              onUpdate={onUpdateTournament} 
            />
          </TabsContent>
          
          <TabsContent value="teams">
            <TeamsTab
              tournament={tournament}
              teams={tournamentTeams}
              setTeams={setTeams}
            />
          </TabsContent>
          
          <TabsContent value="groups">
            <GroupsTab
              tournament={tournament}
              teams={tournamentTeams}
              matches={tournamentMatches}
              groups={tournamentGroups}
              setGroups={setGroups}
              setMatches={setMatches}
            />
          </TabsContent>
          
          <TabsContent value="draws">
            <div className="text-center py-12 text-muted-foreground">
              <Crosshair size={48} className="mx-auto mb-4 opacity-50" />
              <p>Draw brackets will appear here after group phase completion</p>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <ScheduleTab
              tournament={tournament}
              teams={tournamentTeams}
              matches={tournamentMatches}
              setMatches={setMatches}
            />
          </TabsContent>
          
          <TabsContent value="registration">
            <div className="text-center py-12 text-muted-foreground">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>Registration management coming soon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="text-center py-12 text-muted-foreground">
              <GearSix size={48} className="mx-auto mb-4 opacity-50" />
              <p>Tournament settings and rules configuration coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
