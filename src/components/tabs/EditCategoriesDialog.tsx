import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category, TournamentFormat } from '@/lib/types'
import { toast } from 'sonner'
import { Plus, Trash } from '@phosphor-icons/react'

type EditCategoriesDialogProps = {
  categories: Category[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (categories: Category[]) => void
}

const formatOptions: { value: TournamentFormat; label: string }[] = [
  { value: 'group-draw-conso', label: 'Group → Draw → Conso' },
  { value: 'seeded-draw-conso', label: 'Seeded Draw → Conso' },
  { value: 'single-group', label: 'Single Group' },
  { value: 'group-draw', label: 'Group → Draw' },
  { value: 'seeded-draw', label: 'Seeded Draw' },
]

export function EditCategoriesDialog({ categories, open, onOpenChange, onSave }: EditCategoriesDialogProps) {
  const [editedCategories, setEditedCategories] = useState<Category[]>([...categories])

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: `Category ${editedCategories.length + 1}`,
      format: 'group-draw-conso',
      maxPairs: 16,
      startTime: '09:00',
    }
    setEditedCategories([...editedCategories, newCategory])
  }

  const handleRemoveCategory = (id: string) => {
    setEditedCategories(editedCategories.filter(c => c.id !== id))
  }

  const handleUpdateCategory = (id: string, field: keyof Category, value: string | number) => {
    setEditedCategories(editedCategories.map(category => 
      category.id === id ? { ...category, [field]: value } : category
    ))
  }

  const handleSave = () => {
    if (editedCategories.length === 0) {
      toast.error('At least one category is required')
      return
    }

    const invalidCategory = editedCategories.find(c => !c.name.trim() || c.maxPairs < 2)
    if (invalidCategory) {
      toast.error('All categories must have a name and at least 2 pairs')
      return
    }

    onSave(editedCategories)
    toast.success('Categories updated successfully')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Categories</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {editedCategories.map((category) => (
            <div key={category.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`category-name-${category.id}`}>Category Name</Label>
                  <Input
                    id={`category-name-${category.id}`}
                    value={category.name}
                    onChange={(e) => handleUpdateCategory(category.id, 'name', e.target.value)}
                    placeholder="e.g., Men's Open"
                  />
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveCategory(category.id)}
                  disabled={editedCategories.length === 1}
                  className="mt-8"
                >
                  <Trash />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`category-format-${category.id}`}>Format</Label>
                  <Select
                    value={category.format}
                    onValueChange={(value) => handleUpdateCategory(category.id, 'format', value as TournamentFormat)}
                  >
                    <SelectTrigger id={`category-format-${category.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`category-maxPairs-${category.id}`}>Max Pairs</Label>
                  <Input
                    id={`category-maxPairs-${category.id}`}
                    type="number"
                    min="2"
                    step="2"
                    value={category.maxPairs}
                    onChange={(e) => handleUpdateCategory(category.id, 'maxPairs', parseInt(e.target.value) || 2)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`category-startTime-${category.id}`}>Start Time</Label>
                  <Input
                    id={`category-startTime-${category.id}`}
                    type="time"
                    value={category.startTime}
                    onChange={(e) => handleUpdateCategory(category.id, 'startTime', e.target.value)}
                  />
                </div>
              </div>

              {(category.format === 'group-draw-conso' || category.format === 'group-draw') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`category-drawNotBefore-${category.id}`}>Draw Not Before</Label>
                    <Input
                      id={`category-drawNotBefore-${category.id}`}
                      type="time"
                      value={category.drawNotBefore || ''}
                      onChange={(e) => handleUpdateCategory(category.id, 'drawNotBefore', e.target.value)}
                    />
                  </div>

                  {category.format === 'group-draw-conso' && (
                    <div className="space-y-2">
                      <Label htmlFor={`category-consoNotBefore-${category.id}`}>Conso Not Before</Label>
                      <Input
                        id={`category-consoNotBefore-${category.id}`}
                        type="time"
                        value={category.consoNotBefore || ''}
                        onChange={(e) => handleUpdateCategory(category.id, 'consoNotBefore', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddCategory}
          >
            <Plus className="mr-2" />
            Add Category
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
