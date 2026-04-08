import { Card } from '@/components/ui/card'
import { Tournament } from '@/lib/types'

type DetailsTabProps = {
  tournament: Tournament
  onUpdate: (tournament: Tournament) => void
}

export function DetailsTab({ tournament }: DetailsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4">Tournament Information</h3>
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
        <h3 className="mb-4">Courts ({tournament.courts.length})</h3>
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
        <h3 className="mb-4">Categories ({tournament.categories.length})</h3>
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
    </div>
  )
}
