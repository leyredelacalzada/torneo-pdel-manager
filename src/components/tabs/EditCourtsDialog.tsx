import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Court, CourtAvailability } from '@/lib/types'
import { toast } from 'sonner'
import { Plus, Trash } from '@phosphor-icons/react'

type EditCourtsDialogProps = {
  courts: Court[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (courts: Court[]) => void
}

export function EditCourtsDialog({ courts, open, onOpenChange, onSave }: EditCourtsDialogProps) {
  const [editedCourts, setEditedCourts] = useState<Court[]>([...courts])

  const handleAddCourt = () => {
    const newCourt: Court = {
      id: `court-${Date.now()}`,
      name: `Court ${editedCourts.length + 1}`,
      weight: 1,
      availability: {}
    }
    setEditedCourts([...editedCourts, newCourt])
  }

  const handleRemoveCourt = (id: string) => {
    setEditedCourts(editedCourts.filter(c => c.id !== id))
  }

  const handleUpdateCourt = (id: string, field: keyof Court, value: string | number) => {
    setEditedCourts(editedCourts.map(court => 
      court.id === id ? { ...court, [field]: value } : court
    ))
  }

  const handleSave = () => {
    if (editedCourts.length === 0) {
      toast.error('At least one court is required')
      return
    }

    const invalidCourt = editedCourts.find(c => !c.name.trim())
    if (invalidCourt) {
      toast.error('All courts must have a name')
      return
    }

    onSave(editedCourts)
    toast.success('Courts updated successfully')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Courts</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {editedCourts.map((court, index) => (
            <div key={court.id} className="flex gap-4 items-end p-4 bg-muted/30 rounded-lg">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`court-name-${court.id}`}>Court Name</Label>
                <Input
                  id={`court-name-${court.id}`}
                  value={court.name}
                  onChange={(e) => handleUpdateCourt(court.id, 'name', e.target.value)}
                  placeholder="e.g., Court 1"
                />
              </div>

              <div className="w-32 space-y-2">
                <Label htmlFor={`court-weight-${court.id}`}>Weight</Label>
                <Input
                  id={`court-weight-${court.id}`}
                  type="number"
                  min="1"
                  max="10"
                  value={court.weight}
                  onChange={(e) => handleUpdateCourt(court.id, 'weight', parseInt(e.target.value) || 1)}
                />
              </div>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveCourt(court.id)}
                disabled={editedCourts.length === 1}
              >
                <Trash />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddCourt}
          >
            <Plus className="mr-2" />
            Add Court
          </Button>
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
