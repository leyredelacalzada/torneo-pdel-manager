import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tournament, Court } from '@/lib/types'
import { Step1TournamentInfo } from '@/components/wizard/Step1TournamentInfo'
import { Step2Courts } from '@/components/wizard/Step2Courts'
import { Step3Categories } from '@/components/wizard/Step3Categories'
import { Trophy, X } from '@phosphor-icons/react'
import { toast } from 'sonner'

type TournamentWizardProps = {
  onComplete: (tournament: Tournament) => void
  onCancel: () => void
}

export function TournamentWizard({ onComplete, onCancel }: TournamentWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Partial<Tournament>>({
    courts: [],
    categories: []
  })

  const canProceed = () => {
    if (step === 1) {
      return !!(data.name && data.matchDuration && data.registrationStart && 
        data.registrationEnd && data.tournamentStart && data.tournamentEnd)
    }
    if (step === 2) {
      return (data.courts?.length || 0) > 0
    }
    if (step === 3) {
      return (data.categories?.length || 0) > 0 &&
        data.categories?.every(c => c.name && c.format && c.maxPairs && c.startTime)
    }
    return false
  }

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please fill all required fields')
      return
    }
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    const tournament: Tournament = {
      id: `tournament-${Date.now()}`,
      name: data.name!,
      description: data.description,
      club: data.club || '',
      venue: data.venue || '',
      matchDuration: data.matchDuration!,
      registrationStart: data.registrationStart!,
      registrationEnd: data.registrationEnd!,
      tournamentStart: data.tournamentStart!,
      tournamentEnd: data.tournamentEnd!,
      courts: data.courts || [],
      categories: data.categories || [],
      createdAt: new Date().toISOString(),
      generated: false
    }
    onComplete(tournament)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} className="text-primary" weight="fill" />
              <h1>Create Tournament</h1>
            </div>
            <Button variant="ghost" onClick={onCancel}>
              <X />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    s === step
                      ? 'bg-primary text-primary-foreground'
                      : s < step
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </div>
                <span className="text-sm font-medium">
                  {s === 1 && 'Tournament Info'}
                  {s === 2 && 'Courts'}
                  {s === 3 && 'Categories'}
                </span>
                {s < 3 && <div className="w-12 h-0.5 bg-border ml-2" />}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && <Step1TournamentInfo data={data} onChange={setData} />}
          {step === 2 && (
            <Step2Courts
              courts={data.courts || []}
              onChange={(courts: Court[]) => setData({ ...data, courts })}
              tournamentStart={data.tournamentStart || ''}
              tournamentEnd={data.tournamentEnd || ''}
            />
          )}
          {step === 3 && (
            <Step3Categories
              categories={data.categories || []}
              onChange={categories => setData({ ...data, categories })}
            />
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => step > 1 ? setStep(step - 1) : onCancel()}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === 3 ? 'Finish Tournament Setup' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
