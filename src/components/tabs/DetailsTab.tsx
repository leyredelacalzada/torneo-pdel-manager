import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tournament } from '@/lib/types'
import { PencilSimple } from '@phosphor-icons/react'
import { EditTournamentDialog } from './EditTournamentDialog'
import { EditCourtsDialog } from './EditCourtsDialog'
import { EditCategoriesDialog } from './EditCategoriesDialog'

type DetailsTabProps = {
  tournament: Tournament
  onUpdate: (tournament: Tournament) => void
}

export function DetailsTab({ tournament, onUpdate }: DetailsTabProps) {
  const [showEditTournament, setShowEditTournament] = useState(false)
  const [showEditCourts, setShowEditCourts] = useState(false)
  const [showEditCategories, setShowEditCategories] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-0">Tournament Information</h3>
          <Button variant="outline" size="sm" onClick={() => setShowEditTournament(true)}>
            <PencilSimple className="mr-2" />
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Tournament Name:</span>
            <p className="font-medium mt-1">{tournament.name}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Club:</span>
            <p className="font-medium mt-1">{tournament.club || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Venue:</span>
            <p className="font-medium mt-1">{tournament.venue || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Match Duration:</span>
            <p className="font-medium mt-1">{tournament.matchDuration} minutes</p>
          </div>
          <div>
            <span className="text-muted-foreground">Tournament Period:</span>
            <p className="font-medium mt-1">
              {new Date(tournament.tournamentStart).toLocaleDateString()} - {new Date(tournament.tournamentEnd).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Registration Period:</span>
            <p className="font-medium mt-1">
              {new Date(tournament.registrationStart).toLocaleString()} - {new Date(tournament.registrationEnd).toLocaleString()}
            </p>
          </div>
        </div>
        {tournament.description && (
          <div className="mt-4">
            <span className="text-muted-foreground">Description:</span>
            <p className="mt-1">{tournament.description}</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-0">Courts ({tournament.courts.length})</h3>
          <Button variant="outline" size="sm" onClick={() => setShowEditCourts(true)}>
            <PencilSimple className="mr-2" />
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          {tournament.courts.map(court => (
            <div key={court.id} className="flex items-center justify-between p-3 bg-muted/30 rounded">
              <span className="font-medium">{court.name}</span>
              <span className="text-sm text-muted-foreground">Weight: {court.weight}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-0">Categories ({tournament.categories.length})</h3>
          <Button variant="outline" size="sm" onClick={() => setShowEditCategories(true)}>
            <PencilSimple className="mr-2" />
            Edit
          </Button>
        </div>
        <div className="space-y-3">
          {tournament.categories.map(category => (
            <div key={category.id} className="p-4 bg-muted/30 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category.name}</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{category.format}</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Max Pairs: {category.maxPairs}</div>
                <div>Start Time: {category.startTime}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <EditTournamentDialog
        tournament={tournament}
        open={showEditTournament}
        onOpenChange={setShowEditTournament}
        onSave={onUpdate}
      />

      <EditCourtsDialog
        courts={tournament.courts}
        open={showEditCourts}
        onOpenChange={setShowEditCourts}
        onSave={(courts) => onUpdate({ ...tournament, courts })}
      />

      <EditCategoriesDialog
        categories={tournament.categories}
        open={showEditCategories}
        onOpenChange={setShowEditCategories}
        onSave={(categories) => onUpdate({ ...tournament, categories })}
      />
    </div>
  )
}
