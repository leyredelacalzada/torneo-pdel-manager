import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tournament } from '@/lib/types'

type Step1Props = {
  data: Partial<Tournament>
  onChange: (data: Partial<Tournament>) => void
}

export function Step1TournamentInfo({ data, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-6">Tournament Information</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tournament Name *</Label>
            <Input
              id="name"
              value={data.name || ''}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="Spring Padel Championship 2025"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Tournament Description</Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="Brief description of the tournament..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="club">Club</Label>
              <Input
                id="club"
                value={data.club || ''}
                onChange={(e) => onChange({ ...data, club: e.target.value })}
                placeholder="Club name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={data.venue || ''}
                onChange={(e) => onChange({ ...data, venue: e.target.value })}
                placeholder="Venue location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="matchDuration">Match Duration (minutes) *</Label>
            <Input
              id="matchDuration"
              type="number"
              min="30"
              step="15"
              value={data.matchDuration || ''}
              onChange={(e) => onChange({ ...data, matchDuration: parseInt(e.target.value) || 0 })}
              placeholder="90"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStart">Registration Start *</Label>
              <Input
                id="registrationStart"
                type="datetime-local"
                value={data.registrationStart || ''}
                onChange={(e) => onChange({ ...data, registrationStart: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationEnd">Registration End *</Label>
              <Input
                id="registrationEnd"
                type="datetime-local"
                value={data.registrationEnd || ''}
                onChange={(e) => onChange({ ...data, registrationEnd: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tournamentStart">Tournament Start *</Label>
              <Input
                id="tournamentStart"
                type="date"
                value={data.tournamentStart || ''}
                onChange={(e) => onChange({ ...data, tournamentStart: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tournamentEnd">Tournament End *</Label>
              <Input
                id="tournamentEnd"
                type="date"
                value={data.tournamentEnd || ''}
                onChange={(e) => onChange({ ...data, tournamentEnd: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
