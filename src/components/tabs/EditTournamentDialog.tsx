import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/tex
import { Tournament } from '@/lib/types'

  tournament: Tournament
  onOpenChange: (open: boolean) => void
}

type EditTournamentDialogProps = {
  tournament: Tournament
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (tournament: Tournament) => void
}

export function EditTournamentDialog({ tournament, open, onOpenChange, onSave }: EditTournamentDialogProps) {
  const [formData, setFormData] = useState({
      matchDuration: parse
      tournamentEnd: formData.tournamentEnd,
      registrationEnd: for

    toast.success('Tournament information updated')
  }
  return (
      <DialogContent className="max-w-2xl max-h-[90v
          <DialogTitle>Edit Tournament Informati


            <Input
              value={formData.nam
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
          </div>
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              
              />

          <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onC
          </Button>
            Save Cha
        </DialogFooter>
    </Dialog>
}









































































            Save Changes

        </DialogFooter>

    </Dialog>

}
