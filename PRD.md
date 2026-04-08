# Padel Tournament Manager

A professional tournament management system that automates group generation, scheduling, and bracket creation for padel tournaments with real-time administrative control.


1. Professional - Feels like enterprise tournament software with comprehensive administrative tools
2. Intelligent - Automatically calculates optimal tournament formats based on available courts and time slots
3. Operationally fluid - Enables real-time schedule adjustments during live events

- **Progression**: Step 1 (Tournament Info) → Step 2 (Courts Configuration) → Step 3 (Categori


- **Trigger**: Step 2

### Automatic Tournament Generation
- **Purpose**: Eliminate manual planning, ensure feasible tournament structure
- **Progression**: Count Pairs → Calculate Match Slots → Determine Group Structure

- **Progression**: Step 1 (Tournament Info) → Step 2 (Courts Configuration) → Step 3 (Categories Setup) → Tournament Created → Navigate to Tournament Panel
- **Success criteria**: All required fields validated, court availability calculated, tournament capacity determined

### Court Availability Matrix
- **Functionality**: Configure courts with name, weight, and time availability by day/hour
- **Purpose**: Define when and where matches can be played for automatic scheduling
- **Trigger**: Step 2 of tournament creation or editing court settings
- **Progression**: Select Court → Navigate Days → Add Time Ranges → Calculate Available Slots → Determine Tournament Capacity
- **Success criteria**: Each court has defined availability, total match capacity calculated correctly

### Automatic Tournament Generation
- **Functionality**: Calculate optimal group sizes and generate schedule based on pairs, courts, and time
- **Purpose**: Eliminate manual planning, ensure feasible tournament structure
- **Trigger**: Admin completes wizard or clicks "Generate Tournament"
- **Progression**: Count Pairs → Calculate Match Slots → Determine Group Structure → Generate Round-Robin Matches → Assign Courts/Times → Create Draw Brackets → Display Schedule
- **Success criteria**: All matches scheduled within available time/courts, viable group format selected, warnings shown if infeasible

### Team Management
- **Purpose**: Help players and admins quickly locate specific match information
- **Progression**: Type Name → Results Filter → View Player's Matches → 

- **Functionality**: Configure scheduling rules with priorities (same day matches, court consistency, etc.)
- **Trigger**: Navigate to Settings tab

## Edge Case Handling
- **Insufficient Court Capacity**: Show warning when pairs/matches exceed available time 
- **Incomplete Results**: Handle partially completed groups, don't
- **Schedule Conflicts**: Prevent assigning same tea
- **Draw Bracket Sizing**: Auto-adjust bracket size based on qualifiers (4, 8, 16 teams)





- **Secondary Colors**: 
  - Bright Lime (oklch(0.75 0.18 135)) - Accent for successful states, completed matches, available courts
- **Foreground/Background Pairings**: 

  - Deep Navy on Bright Lime - Ra



  - H1 (Page Titles): Space Grotesk Bold/32px/tight tracking/-0.02em
  - H3 (Card Headers): Space Grotesk Medium/18px/normal tracking/0





  - Wizard: Custom multi-step form with progress indicator using Card + Tabs logic
  - Schedule Grid: Custom time-slot grid with drag-drop using framer-motion

  - Dialogs: Dial
  - Badges: Badge for match status, category labels, group indicators
- **Purpose**: Help players and admins quickly locate specific match information

  - Custom schedule grid component with time slots as rows and courts as columns
  - Court availability time-range builder with day navigation


- **Functionality**: Configure scheduling rules with priorities (same day matches, court consistency, etc.)
  - Inputs: Focus state with enhanced border and subtle glow
- **Trigger**: Navigate to Settings tab
- **Icon Selection**: 
  - CalendarBlank for schedule, dates

## Edge Case Handling

  - PencilSimple for edit
  - Warning for capacity alerts
  - ArrowsDownUp for drag-drop indicators
- **Spacing**: 
  - Card padding: p-6
  - Grid gaps: gap-4 (cards), gap-2 (tight lists)
- **Draw Bracket Sizing**: Auto-adjust bracket size based on qualifiers (4, 8, 16 teams)
  - Wizard: Full-screen steps with fixed bottom navigation buttons

  - Navigation: Col








- **Secondary Colors**: 

  - Bright Lime (oklch(0.75 0.18 135)) - Accent for successful states, completed matches, available courts

- **Foreground/Background Pairings**: 











  - H1 (Page Titles): Space Grotesk Bold/32px/tight tracking/-0.02em

  - H3 (Card Headers): Space Grotesk Medium/18px/normal tracking/0











  - Wizard: Custom multi-step form with progress indicator using Card + Tabs logic

  - Schedule Grid: Custom time-slot grid with drag-drop using framer-motion





  - Badges: Badge for match status, category labels, group indicators

  - Tooltips: Tooltip for rule explanations, capacity warnings



  - Custom schedule grid component with time slots as rows and courts as columns

  - Court availability time-range builder with day navigation





  - Buttons: Distinct hover with transform scale(1.02), active with brightness adjustment

  - Inputs: Focus state with enhanced border and subtle glow



- **Icon Selection**: 

  - CalendarBlank for schedule, dates







  - PencilSimple for edit

  - Warning for capacity alerts

  - ArrowsDownUp for drag-drop indicators

- **Spacing**: 

  - Card padding: p-6

  - Grid gaps: gap-4 (cards), gap-2 (tight lists)



  - Wizard: Full-screen steps with fixed bottom navigation buttons






