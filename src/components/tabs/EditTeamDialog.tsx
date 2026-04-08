import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Team, Tournament } from '@/lib/types'
import { toast } from 'sonner'

type EditTeamDialogProps = {
  team: Team | null
  tournament: Tournament
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (team: Team) => void
}

export function EditTeamDialog({
  team,
  tournament,
  open,
  onOpenChange,
  onSave
}: EditTeamDialogProps) {
  const [player1Name, setPlayer1Name] = useState('')
  const [player1Email, setPlayer1Email] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [player2Email, setPlayer2Email] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    if (team) {
      setPlayer1Name(team.player1.name)
      setPlayer1Email(team.player1.email || '')
      setPlayer2Name(team.player2.name)
      setPlayer2Email(team.player2.email || '')
      setCategoryId(team.categoryId)
    }
  }, [team, open])

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) return true // Email is optional
    return emailRegex.test(email)
  }

  const handleSave = () => {
    // Validation
    const trimmedPlayer1Name = player1Name.trim()
    const trimmedPlayer2Name = player2Name.trim()

    if (!trimmedPlayer1Name) {
      toast.error('Player 1 name is required')
      return
    }

    if (!trimmedPlayer2Name) {
      toast.error('Player 2 name is required')
      return
    }

    // Check for duplicate players
    if (
      trimmedPlayer1Name.toLowerCase() === trimmedPlayer2Name.toLowerCase() &&
      player1Email === player2Email
    ) {
      toast.error('Player 1 and Player 2 cannot be the same person')
      return
    }

    // Validate emails
    if (!validateEmail(player1Email.trim())) {
      toast.error('Player 1 email format is invalid')
      return
    }

    if (!validateEmail(player2Email.trim())) {
      toast.error('Player 2 email format is invalid')
      return
    }

    if (!team) {
      toast.error('Something went wrong')
      return
    }

    // Create updated team
    const updatedTeam: Team = {
      ...team,
      player1: {
        ...team.player1,
        name: trimmedPlayer1Name,
        email: player1Email.trim() || undefined
      },
      player2: {
        ...team.player2,
        name: trimmedPlayer2Name,
        email: player2Email.trim() || undefined
      },
      categoryId
    }

    onSave(updatedTeam)
    toast.success('Team updated successfully')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tournament.categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Player 1 Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-200">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900">Player 1</h3>

              <div className="space-y-2">
                <Label htmlFor="player1-name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="player1-name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  placeholder="Enter player 1 full name"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="player1-email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="player1-email"
                  type="email"
                  value={player1Email}
                  onChange={(e) => setPlayer1Email(e.target.value)}
                  placeholder="player1@example.com"
                  className="bg-white"
                />
              </div>
            </div>
          </Card>

          {/* Player 2 Card */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-50/50 border-emerald-200">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-900">Player 2</h3>

              <div className="space-y-2">
                <Label htmlFor="player2-name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="player2-name"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  placeholder="Enter player 2 full name"
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="player2-email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="player2-email"
                  type="email"
                  value={player2Email}
                  onChange={(e) => setPlayer2Email(e.target.value)}
                  placeholder="player2@example.com"
                  className="bg-white"
                />
              </div>
            </div>
          </Card>

          <p className="text-xs text-muted-foreground">* Required fields</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
