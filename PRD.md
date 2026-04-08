# Padel Tournament Manager

A professional tournament management system that automates group generation, scheduling, and bracket creation for padel tournaments with real-time administrative control.

**Experience Qualities**: 
1. Professional - Feels like enterprise tournament software with comprehensive administrative tools
2. Intelligent - Automatically calculates optimal tournament formats based on available courts and time slots
3. Operationally fluid - Enables real-time schedule adjustments during live events

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a sophisticated tournament management platform requiring intelligent scheduling algorithms, multi-step wizards, real-time data updates, role-based access, and complex business logic for automatic group/bracket generation based on court availability and time constraints.

## Essential Features

### Tournament Creation Wizard (3-Step Process)
- **Functionality**: Multi-step form collecting tournament configuration (info, courts, categories)
- **Purpose**: Gather all necessary data to calculate optimal tournament structure
- **Trigger**: Admin clicks "Create Tournament" from dashboard
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
- **Functionality**: Add, import, export teams (pairs) per category with search capability
- **Purpose**: Manage tournament participants across multiple categories
- **Trigger**: Navigate to Teams tab, add manually or import
- **Progression**: Select Category → View Teams → Add/Import Teams → Assign to Category → Teams Available for Group Generation
- **Success criteria**: Teams organized by category, searchable by player name, ready for tournament generation

### Groups & Classification
- **Functionality**: Display auto-generated groups with live standings (MP, W, L, SD, GD)
- **Purpose**: Track group phase progress and determine qualifiers
- **Trigger**: Tournament generated, results entered
- **Progression**: View Groups → Select Category/Group → See Standings → Expand Matches → Enter Results → Standings Update → Qualifiers Determined
- **Success criteria**: Standings calculate correctly, qualifiers auto-advance to draws when group phase completes

### Draw Brackets
- **Functionality**: Display main draw and consolation brackets with auto-population from groups
- **Purpose**: Visualize knockout phase progression
- **Trigger**: Group phase completes, qualifiers determined
- **Progression**: Groups Complete → Qualified Teams Seeded → Brackets Generated → View Main Draw/Consolation → Matches Scheduled → Results Entered → Winners Advance
- **Success criteria**: Brackets populate automatically, match progression works correctly

### Interactive Schedule Calendar
- **Functionality**: Grid view showing all matches by court/time with drag-and-drop rescheduling
- **Purpose**: Provide master schedule overview and enable real-time adjustments
- **Trigger**: Navigate to Schedule tab
- **Progression**: View Day → See Matches by Court/Hour → Identify Conflicts → Drag Match to New Time/Court → Schedule Updates → Notify Changes
- **Success criteria**: All matches visible, filterable by category, drag-drop works, free courts indicated

### Result Entry & Live Updates
- **Functionality**: Admin enters match scores (simple format: 7-5), updates propagate immediately
- **Purpose**: Keep tournament state current during live events
- **Trigger**: Match completes, admin enters result
- **Progression**: Find Match → Enter Score → Save → Group Standings Update → Draw Brackets Populate → Next Matches Unlocked
- **Success criteria**: Results persist, calculations trigger, dependent matches update

### Player Search
- **Functionality**: Search any player name to see all their matches with times/courts
- **Purpose**: Help players and admins quickly locate specific match information
- **Trigger**: Enter player name in search bar
- **Progression**: Type Name → Results Filter → View Player's Matches → See Times/Courts/Status → Navigate to Match
- **Success criteria**: Instant filtering across all tournament data, works in Teams/Groups/Schedule views

### Tournament Settings & Rules
- **Functionality**: Configure scheduling rules with priorities (same day matches, court consistency, etc.)
- **Purpose**: Control automatic scheduling behavior based on tournament preferences
- **Trigger**: Navigate to Settings tab
- **Progression**: View Rules → Enable/Disable Rules → Set Priorities → Save → Regenerate Schedule → Rules Applied
- **Success criteria**: Rules affect schedule generation, priorities enforced correctly

## Edge Case Handling

- **Insufficient Court Capacity**: Show warning when pairs/matches exceed available time slots, suggest reducing pairs or adding courts
- **Overlapping Time Ranges**: Validate court availability doesn't have conflicting time slots
- **Incomplete Results**: Handle partially completed groups, don't generate draws until group phase finishes
- **Empty Categories**: Prevent tournament generation if categories have no teams
- **Schedule Conflicts**: Prevent assigning same team to multiple simultaneous matches
- **Invalid Date Ranges**: Validate registration/tournament dates are logical (start before end)
- **Draw Bracket Sizing**: Auto-adjust bracket size based on qualifiers (4, 8, 16 teams)
- **Mobile Drag-and-Drop**: Provide alternative rescheduling UI for touch devices

## Design Direction

The design should evoke a professional tournament operations center—clean, data-dense yet organized, with clear visual hierarchy that helps administrators make quick decisions during live events. It should feel capable, intelligent, and trustworthy, like software designed for serious competition management.

## Color Selection

A sporty yet professional palette centered around padel's vibrant energy with strong organizational clarity.

- **Primary Color**: Electric Blue (oklch(0.58 0.20 240)) - Communicates technology, trust, and sport energy. Used for primary actions and active navigation.
- **Secondary Colors**: 
  - Deep Navy (oklch(0.25 0.05 240)) - Provides authority and grounding for headers and important text
  - Bright Lime (oklch(0.75 0.18 135)) - Accent for successful states, completed matches, available courts
- **Accent Color**: Vibrant Orange (oklch(0.68 0.18 45)) - Attention for critical actions, warnings, and live indicators
- **Foreground/Background Pairings**: 
  - Primary Blue on White Background (#FFFFFF) - Ratio 5.2:1 ✓
  - Deep Navy on Light Gray (oklch(0.97 0 0)) - Ratio 12.8:1 ✓
  - White on Electric Blue - Ratio 5.2:1 ✓
  - Deep Navy on Bright Lime - Ratio 9.1:1 ✓
  - White on Vibrant Orange - Ratio 4.6:1 ✓

## Font Selection

Typefaces should convey modern professionalism with excellent readability for dense data displays, combining technical precision with approachable clarity.

- **Typographic Hierarchy**: 
  - H1 (Page Titles): Space Grotesk Bold/32px/tight tracking/-0.02em
  - H2 (Section Headers): Space Grotesk SemiBold/24px/normal tracking/-0.01em  
  - H3 (Card Headers): Space Grotesk Medium/18px/normal tracking/0
  - Body (Forms/Tables): Inter Regular/14px/1.5 line-height
  - Small (Labels/Meta): Inter Medium/12px/1.4 line-height/uppercase tracking/0.05em
  - Numbers (Scores/Times): JetBrains Mono Medium/14px/1.2 line-height

## Animations

Animations should reinforce administrative control and system responsiveness. Use quick, purposeful transitions that confirm actions without slowing workflow. Schedule changes should animate smoothly to show cause-and-effect. Loading states should indicate calculation complexity. Navigation transitions should maintain spatial orientation across the multi-tab interface.

## Component Selection

- **Components**: 
  - Wizard: Custom multi-step form with progress indicator using Card + Tabs logic
  - Court Configuration: Custom split panel (Sidebar + Sheet pattern) with time range inputs
  - Schedule Grid: Custom time-slot grid with drag-drop using framer-motion
  - Tables: Table component for teams, standings, registration lists
  - Cards: Card component for match display, group summaries, statistics
  - Forms: Form + Input + Label + Select + Calendar for all data entry
  - Dialogs: Dialog for result entry, confirmations, warnings
  - Tabs: Tabs for main tournament navigation (Details, Teams, Groups, etc.)
  - Badges: Badge for match status, category labels, group indicators
  - Buttons: Button with variants for primary/secondary/destructive actions
  - Tooltips: Tooltip for rule explanations, capacity warnings
  - Search: Input with Command component for player search

- **Customizations**: 
  - Custom schedule grid component with time slots as rows and courts as columns
  - Drag-and-drop match cards within schedule grid
  - Court availability time-range builder with day navigation
  - Bracket visualization component for draws
  - Live standings calculator display
  - Match capacity indicator with warning states

- **States**: 
  - Buttons: Distinct hover with transform scale(1.02), active with brightness adjustment
  - Match Cards: Status colors (scheduled/in-progress/completed), dragging opacity 0.6
  - Inputs: Focus state with enhanced border and subtle glow
  - Tables: Row hover with background tint, selected row with border accent
  - Nav Tabs: Active tab with underline indicator and bolder weight

- **Icon Selection**: 
  - Trophy for tournaments, winners
  - CalendarBlank for schedule, dates
  - CourtFootball (or similar) for courts
  - Users for teams, players
  - ListNumbers for groups, standings
  - Brackets for draws
  - GearSix for settings
  - MagnifyingGlass for search
  - Plus for add actions
  - PencilSimple for edit
  - Check for completed matches
  - Warning for capacity alerts
  - CaretRight/Left for date navigation
  - ArrowsDownUp for drag-drop indicators

- **Spacing**: 
  - Page padding: p-6 (desktop), p-4 (mobile)
  - Card padding: p-6
  - Form field spacing: space-y-4
  - Grid gaps: gap-4 (cards), gap-2 (tight lists)
  - Section margins: mb-8 (major sections), mb-4 (subsections)

- **Mobile**: 
  - Wizard: Full-screen steps with fixed bottom navigation buttons
  - Schedule: Switch to list view with collapsible courts, swipe between days
  - Court Config: Stack court list above detail editor
  - Tables: Horizontal scroll with sticky first column
  - Navigation: Collapsible hamburger menu or bottom tab bar
  - Drag-drop: Tap match → select new time/court from modal
  - Forms: Stack all inputs vertically with increased touch targets
