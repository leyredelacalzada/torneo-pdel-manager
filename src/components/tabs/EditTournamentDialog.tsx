import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Input } from '@/components/ui/input'

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
      ...tournament,
      description: formData.description.trim()
      venue: formData.venu
      tournamentStart: formD
      registrationStart: formData.registrationStart,
    }
    onSave(updated)
    onOpenChange(false)

    

        </DialogHeader>
        <div className="space-y-
            <Label htmlFor="name">Tournament Nam
            
     

          <div className="space-y
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
              <Label h
            />
                

          <div className="grid grid-cols-2 gap-4">
            Save Changes
        </DialogFooter>
    </Dialog>
}




















































































