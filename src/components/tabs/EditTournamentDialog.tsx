import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tournament } from '@/lib/types'
import { toast } from 'sonner'

type EditTournamentDialogProps = {
  tournament: Tournament
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (tournament: Tournament) => void
}

export function EditTournamentDialog({ tournament, open, onOpenChange, onSave }: EditTournamentDialogProps) {
  const [formData, setFormData] = useState({
    name: tournament.name,
    description: tournament.description || '',
    club: tournament.club,
    venue: tournament.venue,
    matchDuration: tournament.matchDuration.toString(),
    tournamentStart: tournament.tournamentStart.split('T')[0],
    tournamentEnd: tournament.tournamentEnd.split('T')[0],
    registrationStart: tournament.registrationStart.slice(0, 16),
    registrationEnd: tournament.registrationEnd.slice(0, 16),
  })

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('Tournament name is required')
      return
    }

    const updated: Tournament = {
      ...tournament,
      name: formData.name.trim(),
      description: formData.description.trim(),
      club: formData.club.trim(),
      venue: formData.venue.trim(),
      matchDuration: parseInt(formData.matchDuration) || 60,
      tournamentStart: formData.tournamentStart,
      tournamentEnd: formData.tournamentEnd,
      registrationStart: formData.registrationStart,
      registrationEnd: formData.registrationEnd,
    }

    onSave(updated)
    toast.success('Tournament information updated')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tournament Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tournament Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="club">Club</Label>
              <Input
                id="club"
                value={formData.club}
                onChange={(e) => setFormData({ ...formData, club: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="matchDuration">Match Duration (minutes)</Label>
            <Input
              id="matchDuration"
              type="number"
              min="15"
              step="15"
              value={formData.matchDuration}
              onChange={(e) => setFormData({ ...formData, matchDuration: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tournamentStart">Tournament Start Date</Label>
              <Input
                id="tournamentStart"
                type="date"
                value={formData.tournamentStart}
                onChange={(e) => setFormData({ ...formData, tournamentStart: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tournamentEnd">Tournament End Date</Label>
              <Input
                id="tournamentEnd"
                type="date"
                value={formData.tournamentEnd}
                onChange={(e) => setFormData({ ...formData, tournamentEnd: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStart">Registration Start</Label>
              <Input
                id="registrationStart"
                type="datetime-local"
                value={formData.registrationStart}
                onChange={(e) => setFormData({ ...formData, registrationStart: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationEnd">Registration End</Label>
              <Input
                id="registrationEnd"
                type="datetime-local"
                value={formData.registrationEnd}
                onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
              />
            </div>
          </div>
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
