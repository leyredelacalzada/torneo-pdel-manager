import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash } from '@phosphor-icons/react'
import { Category, TournamentFormat } from '@/lib/types'

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
  const addCategory = () => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: '',
      format: 'group-draw-conso',
      maxPairs: 16,
      startTime: '09:00'
    }
    onChange([...categories, newCategory])
  }

  const removeCategory = (id: string) => {
    onChange(categories.filter(c => c.id !== id))
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    onChange(categories.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2>Categories Configuration</h2>
          <Button onClick={addCategory}>
            <Plus className="mr-2" />
            Add Category
          </Button>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => {
            const formatOption = FORMAT_OPTIONS.find(f => f.value === category.format)
            
            return (
              <Card key={category.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3>Category {index + 1}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCategory(category.id)}
                  >
                    <Trash />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category Name *</Label>
                    <Input
                      value={category.name}
                      onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                      placeholder="e.g., Men's Open, Women's Advanced"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tournament Format *</Label>
                    <Select
                      value={category.format}
                      onValueChange={(value) => updateCategory(category.id, { format: value as TournamentFormat })}
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
                      value={category.maxPairs}
                      onChange={(e) => updateCategory(category.id, { maxPairs: parseInt(e.target.value) || 2 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Start Time *</Label>
                    <Input
                      type="time"
                      value={category.startTime}
                      onChange={(e) => updateCategory(category.id, { startTime: e.target.value })}
                    />
                  </div>

                  {formatOption?.hasDrawTime && (
                    <div className="space-y-2">
                      <Label>Draw Not Before</Label>
                      <Input
                        type="time"
                        value={category.drawNotBefore || ''}
                        onChange={(e) => updateCategory(category.id, { drawNotBefore: e.target.value })}
                      />
                    </div>
                  )}

                  {formatOption?.hasConsoTime && (
                    <div className="space-y-2">
                      <Label>Consolation Not Before</Label>
                      <Input
                        type="time"
                        value={category.consoNotBefore || ''}
                        onChange={(e) => updateCategory(category.id, { consoNotBefore: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </Card>
            )
          })}

          {categories.length === 0 && (
            <Card className="p-12 text-center text-muted-foreground">
              <p className="mb-4">No categories added yet</p>
              <Button onClick={addCategory}>
                <Plus className="mr-2" />
                Add Your First Category
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
