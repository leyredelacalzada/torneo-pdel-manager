import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { Category, TournamentFormat } from '@/lib/types'
import { toast } from 'sonner'

type Step3Props = {
  categories: Category[]
  onChange: (categories: Category[]) => void
}

const FORMAT_OPTIONS: { value: TournamentFormat; label: string; hasDrawTime: boolean; hasConsoTime: boolean }[] = [
  { value: 'group-draw-conso', label: 'Group phases + Draw/Consolation', hasDrawTime: true, hasConsoTime: true },
  { value: 'seeded-draw-conso', label: 'Seeded Draw + Consolation', hasDrawTime: true, hasConsoTime: true },
  { value: 'single-group', label: 'Single group', hasDrawTime: false, hasConsoTime: false },
  { value: 'group-draw', label: 'Group phases + Draw', hasDrawTime: true, hasConsoTime: false },
  { value: 'seeded-draw', label: 'Seeded Draw', hasDrawTime: true, hasConsoTime: false },
]

export function Step3Categories({ categories, onChange }: Step3Props) {
  const createEmptyCategory = (): Category => ({
    id: `category-${Date.now()}`,
    name: '',
    format: 'group-draw-conso',
    maxPairs: 16,
    startTime: '09:00',
    drawNotBefore: '',
    consoNotBefore: ''
  })

  const [draftCategory, setDraftCategory] = useState<Category>(createEmptyCategory)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

  useEffect(() => {
    if (editingCategoryId && !categories.some(category => category.id === editingCategoryId)) {
      setEditingCategoryId(null)
      setDraftCategory(createEmptyCategory())
    }
  }, [categories, editingCategoryId])

  const updateDraftCategory = (updates: Partial<Category>) => {
    setDraftCategory(current => ({ ...current, ...updates }))
  }

  const resetDraft = () => {
    setDraftCategory(createEmptyCategory())
    setEditingCategoryId(null)
  }

  const validateCategory = (category: Category) => {
    if (!category.name.trim()) {
      toast.error('Category name is required')
      return false
    }

    if (!category.startTime) {
      toast.error('Category start time is required')
      return false
    }

    if (category.maxPairs < 2) {
      toast.error('A category must allow at least 2 pairs')
      return false
    }

    return true
  }

  const saveCategory = () => {
    const categoryToSave = {
      ...draftCategory,
      name: draftCategory.name.trim()
    }

    if (!validateCategory(categoryToSave)) {
      return
    }

    const normalizedCategory: Category = {
      ...categoryToSave,
      drawNotBefore: categoryToSave.drawNotBefore || undefined,
      consoNotBefore: categoryToSave.consoNotBefore || undefined
    }

    if (editingCategoryId) {
      onChange(categories.map(category =>
        category.id === editingCategoryId ? normalizedCategory : category
      ))
      toast.success('Category updated')
    } else {
      onChange([...categories, normalizedCategory])
      toast.success('Category added')
    }

    resetDraft()
  }

  const editCategory = (id: string) => {
    const category = categories.find(item => item.id === id)
    if (!category) {
      return
    }

    setEditingCategoryId(id)
    setDraftCategory({
      ...category,
      drawNotBefore: category.drawNotBefore || '',
      consoNotBefore: category.consoNotBefore || ''
    })
  }

  const removeCategory = (id: string) => {
    onChange(categories.filter(c => c.id !== id))
    if (editingCategoryId === id) {
      resetDraft()
    }
  }

  const formatOption = FORMAT_OPTIONS.find(option => option.value === draftCategory.format)

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-6">
          <h2>Categories Configuration</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Add as many categories as needed before finishing the tournament setup.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3>{editingCategoryId ? 'Edit Category' : 'Create Category'}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {editingCategoryId
                    ? 'Update the selected category and keep building the tournament.'
                    : 'Complete the form and add the category to the tournament.'}
                </p>
              </div>
              {editingCategoryId && (
                <Button variant="outline" onClick={resetDraft}>
                  Cancel edit
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category Name *</Label>
                <Input
                  value={draftCategory.name}
                  onChange={(e) => updateDraftCategory({ name: e.target.value })}
                  placeholder="e.g., Men's Open, Women's Advanced"
                />
              </div>

              <div className="space-y-2">
                <Label>Tournament Format *</Label>
                <Select
                  value={draftCategory.format}
                  onValueChange={(value) => updateDraftCategory({ format: value as TournamentFormat })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMAT_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Max Pairs *</Label>
                <Input
                  type="number"
                  min="2"
                  value={draftCategory.maxPairs}
                  onChange={(e) => updateDraftCategory({ maxPairs: parseInt(e.target.value) || 2 })}
                />
              </div>

              <div className="space-y-2">
                <Label>Start Time *</Label>
                <Input
                  type="time"
                  value={draftCategory.startTime}
                  onChange={(e) => updateDraftCategory({ startTime: e.target.value })}
                />
              </div>

              {formatOption?.hasDrawTime && (
                <div className="space-y-2">
                  <Label>Draw Not Before</Label>
                  <Input
                    type="time"
                    value={draftCategory.drawNotBefore || ''}
                    onChange={(e) => updateDraftCategory({ drawNotBefore: e.target.value })}
                  />
                </div>
              )}

              {formatOption?.hasConsoTime && (
                <div className="space-y-2">
                  <Label>Consolation Not Before</Label>
                  <Input
                    type="time"
                    value={draftCategory.consoNotBefore || ''}
                    onChange={(e) => updateDraftCategory({ consoNotBefore: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Button variant="outline" onClick={resetDraft}>
                Clear form
              </Button>
              <Button onClick={saveCategory}>
                <Plus className="mr-2" />
                {editingCategoryId ? 'Save category' : 'Add category'}
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3>Added Categories</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Review, edit or remove categories before finishing the setup.
                </p>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {categories.length} {categories.length === 1 ? 'category' : 'categories'}
              </span>
            </div>

            <div className="space-y-3">
              {categories.map((category, index) => (
                <Card key={category.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="font-medium truncate">
                        {category.name || `Category ${index + 1}`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {FORMAT_OPTIONS.find(option => option.value === category.format)?.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {category.maxPairs} pairs · Starts at {category.startTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editCategory(category.id)}
                      >
                        <PencilSimple className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeCategory(category.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {categories.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground border-dashed">
                  <p className="mb-2">No categories added yet</p>
                  <p className="text-sm">Use the form to add the first category and keep adding more without leaving this step.</p>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
