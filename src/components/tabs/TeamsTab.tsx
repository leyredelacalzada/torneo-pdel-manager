import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, MagnifyingGlass, PencilSimple  } from '@phosphor-icons/react'
import { Tournament, Team, Player } from '@/lib/types'
import { toast } from 'sonner'
import { EditTeamDialog } from './EditTeamDialog'

type TeamsTabProps = {
  tournament: Tournament
  teams: Team[]
  setTeams: (teams: Team[] | ((prev: Team[] | undefined) => Team[])) => void
}

export function TeamsTab({ tournament, teams, setTeams }: TeamsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState(tournament.categories[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')

  const categoryTeams = teams.filter(t => t.categoryId === selectedCategory)
  const filteredTeams = categoryTeams.filter(t =>
    t.player1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.player2.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addTeam = () => {
    if (!player1Name.trim() || !player2Name.trim()) {
      toast.error('Please enter both player names')
      return
    }

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      player1: { id: `player-${Date.now()}-1`, name: player1Name },
      player2: { id: `player-${Date.now()}-2`, name: player2Name },
      categoryId: selectedCategory,
      checkedIn: false,
      paid: false
    }

    setTeams(prev => [...(prev || []), newTeam])
    setPlayer1Name('')
    setPlayer2Name('')
    setShowAddDialog(false)
    toast.success('Team added successfully')
  }

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team)
    setShowEditDialog(true)
  }

  const handleSaveTeam = (updatedTeam: Team) => {
    setTeams(prev => {
      if (!prev) return [updatedTeam]
      return prev.map(t => t.id === updatedTeam.id ? updatedTeam : t)
    })
    setShowEditDialog(false)
    setSelectedTeam(null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Teams Management</h3>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" />
                Add Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tournament.categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Player 1 Name</Label>
                  <Input
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    placeholder="Enter player 1 name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Player 2 Name</Label>
                  <Input
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    placeholder="Enter player 2 name"
                  />
                </div>
                <Button onClick={addTeam} className="w-full">Add Team</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Categories</h4>
            {tournament.categories.map(cat => {
              const catTeamCount = teams.filter(t => t.categoryId === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedCategory === cat.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{cat.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{catTeamCount} teams</div>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by player name..."
                className="pl-10"
              />
            </div>

            {filteredTeams.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No teams in this category yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTeams.map(team => (
                  <Card key={team.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          {team.player1.name} / {team.player2.name}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {tournament.categories.find(c => c.id === team.categoryId)?.name}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTeam(team)}
                        >
                          <PencilSimple className="mr-2" size={16} />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      <EditTeamDialog
        team={selectedTeam}
        tournament={tournament}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={handleSaveTeam}
      />
    </div>
  )
}
