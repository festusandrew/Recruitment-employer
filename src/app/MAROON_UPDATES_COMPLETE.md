# Maroon Color Updates - Complete Guide

## ✅ COMPLETED
1. **Sidebar** (`/components/Sidebar.tsx`)
   - Background: `#800020` (maroon)
   - Active state: `#A52A2A` (brown-maroon)
   - Borders: `#600018`
   - Text colors: white/gray for contrast

2. **JobsPage** (`/components/pages/JobsPage.tsx`)
   - Post New Job button
   - All Jobs filter button
   - View Details button

3. **AddJobModal** (`/components/modals/AddJobModal.tsx`)
   - Submit button

## 🔄 SEARCH & REPLACE PATTERNS

Apply these replacements across all `.tsx` files:

### Button Colors
```
bg-blue-600 → bg-[#800020]
hover:bg-blue-700 → hover:bg-[#600018]
```

### Text Colors
```
text-blue-600 → text-[#800020]
hover:text-blue-700 → hover:bg-[#600018]
text-blue-700 → text-[#8B0000]
text-blue-900 → text-[#4A0D0D]
text-blue-100 → text-[#FFA07A]
```

### Background Colors
```
bg-blue-50 → bg-[#F5E6E8]
bg-blue-100 → bg-[#FFA07A]
```

### Borders
```
border-blue-200 → border-[#E9967A]
border-blue-600 → border-[#800020]
hover:border-blue-300 → hover:border-[#E9967A]
```

### Gradients
```
from-blue-600 → from-[#800020]
to-blue-700 → to-[#8B0000]
from-blue-500 → from-[#A52A2A]
to-blue-600 → to-[#800020]
```

### Focus/Ring Colors  
```
focus:ring-blue-500 → focus:ring-[#800020]
ring-blue-500 → ring-[#800020]
```

## 📁 FILES REQUIRING UPDATES

### Modals (13 files remaining)
- `/components/modals/CandidateDetailsModal.tsx`
- `/components/modals/ScheduleInterviewModal.tsx`
- `/components/modals/AddTaskModal.tsx`
- `/components/modals/MessageModal.tsx`
- `/components/modals/JobDetailsModal.tsx`
- `/components/modals/EditJobModal.tsx`
- `/components/modals/ViewApplicantsModal.tsx`
- `/components/modals/ShareJobModal.tsx`
- `/components/modals/JobFiltersModal.tsx`
- `/components/modals/DuplicateJobModal.tsx`
- `/components/modals/BulkJobActionsModal.tsx`
- `/components/modals/JobActionsModal.tsx`
- `/components/modals/DeleteJobModal.tsx`

### Pages (7 files remaining)
- `/components/pages/CandidatesPage.tsx`
- `/components/pages/InterviewsPage.tsx`
- `/components/pages/MessagesPage.tsx`
- `/components/pages/TeamPage.tsx`
- `/components/pages/SettingsPage.tsx`
- `/components/pages/PipelinePage.tsx`
- `/components/pages/AnalyticsPage.tsx`

### Components (5 files)
- `/components/ActiveJobs.tsx`
- `/components/KPICards.tsx`
- `/components/ActivityFeed.tsx`
- `/components/PipelineSnapshot.tsx`
- `/components/TasksWidget.tsx`

## 🎨 MAROON COLOR PALETTE

```css
--maroon-900: #4A0D0D;  /* Darkest - for dark text */
--maroon-800: #600018;  /* Dark - for hover states */
--maroon-700: #800020;  /* Primary - main buttons/brand */
--maroon-600: #8B0000;  /* Gradients */
--maroon-500: #A52A2A;  /* Brown-maroon - active states */
--maroon-400: #B22222;  /* Fire brick */
--maroon-300: #CD5C5C;  /* Indian red */
--maroon-200: #E9967A;  /* Borders/light accents */
--maroon-100: #FFA07A;  /* Very light */
--maroon-50: #F5E6E8;   /* Backgrounds */
```

## 🚀 IMPLEMENTATION APPROACH

For maximum efficiency, use a find-and-replace tool with regex across your entire `/components` directory:

1. Open your IDE's find-and-replace (Cmd/Ctrl + Shift + F)
2. Enable regex mode
3. Apply each pattern from "SEARCH & REPLACE PATTERNS" above
4. Review changes before committing

Alternatively, use the shell script `/batch-color-replacement.sh` as a reference.

## ✨ RESULT

All blue accents (#2563eb, #1d4ed8, etc.) will be replaced with maroon (#800020, #600018, etc.), creating a professional, wine-colored brand aesthetic that matches the maroon sidebar.
