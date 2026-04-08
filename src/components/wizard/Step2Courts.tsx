import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Trash, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Court, TimeRange } from '@/lib/types'

type Step2Props = {
  courts: Court[]
  onChange: (courts: Court[]) => void
  tournamentStart: string
  tournamentEnd: string
}

export function Step2Courts({ courts, onChange, tournamentStart, tournamentEnd }: Step2Props) {
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(
    courts.length > 0 ? courts[0].id : null
  )
  const [currentDate, setCurrentDate] = useState<string>(tournamentStart || new Date().toISOString().split('T')[0])

  const selectedCourt = courts.find(c => c.id === selectedCourtId)

  const addCourt = () => {
    const newCourt: Court = {
      id: `court-${Date.now()}`,
      name: `Court ${courts.length + 1}`,
      weight: 1,
      availability: {}
    }
    onChange([...courts, newCourt])
    setSelectedCourtId(newCourt.id)
  }

  const removeCourt = (id: string) => {
    const updated = courts.filter(c => c.id !== id)
    onChange(updated)
    if (selectedCourtId === id) {
      setSelectedCourtId(updated.length > 0 ? updated[0].id : null)
    }
  }

  const updateCourt = (id: string, updates: Partial<Court>) => {
    onChange(courts.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const addTimeRange = () => {
    if (!selectedCourt) return
    
    const newRange: TimeRange = {
      id: `range-${Date.now()}`,
      from: '09:00',
      to: '10:00'
    }
    
    const availability = { ...selectedCourt.availability }
    if (!availability[currentDate]) {
      availability[currentDate] = []
    }
    availability[currentDate] = [...availability[currentDate], newRange]
    
    updateCourt(selectedCourt.id, { availability })
  }

  const updateTimeRange = (rangeId: string, updates: Partial<TimeRange>) => {
    if (!selectedCourt) return
    
    const availability = { ...selectedCourt.availability }
    availability[currentDate] = (availability[currentDate] || []).map(r =>
      r.id === rangeId ? { ...r, ...updates } : r
    )
    
    updateCourt(selectedCourt.id, { availability })
  }

  const removeTimeRange = (rangeId: string) => {
    if (!selectedCourt) return
    
    const availability = { ...selectedCourt.availability }
    availability[currentDate] = (availability[currentDate] || []).filter(r => r.id !== rangeId)
    
    updateCourt(selectedCourt.id, { availability })
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() + (direction === 'next' ? 1 : -1))
    setCurrentDate(date.toISOString().split('T')[0])
  }

  const timeRanges = selectedCourt?.availability[currentDate] || []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6">Courts Configuration</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Courts</h3>
              <Button onClick={addCourt} size="sm">
                <Plus className="mr-2" />
                Add Court
              </Button>
            </div>
            
            <div className="space-y-2">
              {courts.map(court => (
                <Card
                  key={court.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedCourtId === court.id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedCourtId(court.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{court.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCourt(court.id)
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Weight: {court.weight}
                  </div>
                </Card>
              ))}
              
              {courts.length === 0 && (
                <Card className="p-6 text-center text-muted-foreground">
                  No courts added yet
                </Card>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedCourt ? (
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4">Court Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Court Name</Label>
                      <Input
                        value={selectedCourt.name}
                        onChange={(e) => updateCourt(selectedCourt.id, { name: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Weight (priority)</Label>
                      <Input
                        type="number"
                        min="1"
                        value={selectedCourt.weight}
                        onChange={(e) => updateCourt(selectedCourt.id, { weight: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3>Availability</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigateDate('prev')}>
                        <CaretLeft />
                      </Button>
                      <Input
                        type="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        className="w-auto"
                      />
                      <Button size="sm" variant="outline" onClick={() => navigateDate('next')}>
                        <CaretRight />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {timeRanges.map(range => (
                      <div key={range.id} className="flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">From</Label>
                            <Input
                              type="time"
                              value={range.from}
                              onChange={(e) => updateTimeRange(range.id, { from: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">To</Label>
                            <Input
                              type="time"
                              value={range.to}
                              onChange={(e) => updateTimeRange(range.id, { to: e.target.value })}
                            />
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTimeRange(range.id)}
                          className="mt-5"
                        >
                          <Trash />
                        </Button>
                      </div>
                    ))}
                    
                    {timeRanges.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No availability set for this day
                      </div>
                    )}
                    
                    <Button onClick={addTimeRange} variant="outline" className="w-full">
                      <Plus className="mr-2" />
                      Add Time Range
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center text-muted-foreground">
                <p>Select a court to configure its details and availability</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
