# Transact.AI Mode 01 - Integration Guide

## Visual Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    TMaaS Platform                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Pre-Login (Stage 0)          Post-Login (Stage 2 & 3)      │
│  ┌──────────────────┐         ┌──────────────────────┐      │
│  │   Butler.AI      │         │  Transact.AI Mode 01 │      │
│  │   Concierge      │         │  Personal Advisor    │      │
│  ├──────────────────┤         ├──────────────────────┤      │
│  │ • Platform Info  │         │ • User Profile       │      │
│  │ • Service Match  │         │ • Engagement Status  │      │
│  │ • FAQ Responses  │         │ • Pending Actions    │      │
│  │ • Route to Sign  │         │ • Session Schedule   │      │
│  └──────────────────┘         │ • Recommendations    │      │
│                                │ • Team Contacts      │      │
│                                └──────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## User Journey

### 1. Landing Page (Pre-Login)
```
User visits TMaaS.com
    ↓
Butler.AI appears (bottom-right)
    ↓
User asks: "What is TMaaS?"
    ↓
Butler.AI explains platform & services
    ↓
User clicks "Get Started" → Sign In
```

### 2. Dashboard (Post-Login)
```
User signs in
    ↓
Redirected to /dashboard/overview
    ↓
Transact.AI Mode 01 button appears (bottom-right)
    ↓
User clicks Mode 01 button
    ↓
Mode 01 loads user profile (mock data)
    ↓
Personalized greeting: "Welcome back, Sarah! 
You have 3 active engagements and 2 pending actions."
```

## Integration Points

### 1. Dashboard Layout Component
**File**: `src/components/DashboardLayout.tsx`

```typescript
// State management
const [transactAIOpen, setTransactAIOpen] = useState(false);

// Floating button (always visible on dashboard)
<motion.button
  onClick={() => setTransactAIOpen(true)}
  className="fixed bottom-6 right-6 z-30 ..."
>
  <Sparkles size={24} />
</motion.button>

// Dialog component
<TransactAIMode01 
  isOpen={transactAIOpen} 
  onClose={() => setTransactAIOpen(false)} 
/>
```

### 2. Mock Data Source
**File**: `src/data/transactAI.ts`

Contains:
- `mockUserProfile` - Complete user profile with engagements
- `mode01Templates` - Conversation templates
- `mode01IntentPatterns` - Intent classification rules
- `mode01QuickActions` - Quick action definitions

### 3. Mode 01 Component
**File**: `src/components/TransactAIMode01.tsx`

Key functions:
- `classifyIntent()` - Determines user intent from message
- `handleEngagementStatus()` - Shows engagement progress
- `handleNextActions()` - Lists pending actions
- `handleUpcomingSessions()` - Displays scheduled sessions
- `handleRecommendations()` - Generates personalized advice

## Data Flow

```
User Opens Mode 01
    ↓
Session Initialization
    ↓
Load Mock User Profile (simulating Supabase fetch)
    ↓
Generate Personalized Greeting
    ↓
Display Active Engagements Count
    ↓
Show Pending Actions Count
    ↓
Present Quick Reply Options
    ↓
User Interaction Loop:
    ├─ User sends message
    ├─ Classify intent
    ├─ Query user profile data
    ├─ Generate context-aware response
    ├─ Provide quick reply options
    └─ Repeat
```

## Example Conversations

### Scenario 1: Check Status
```
User: "What's my status?"

Mode 01: "Here's your current engagement status:

1. Customer Experience Strategy
   • Status: In Progress
   • Progress: 35%
   • Next Milestone: Architecture Workshop
   
2. Collaboration Platform Implementation
   • Status: Awaiting Inputs
   • Progress: 65%
   • Next Milestone: Design Review
   • Pending: 2 action(s)
   
3. Data Platform Modernisation
   • Status: In Progress
   • Progress: 30%
   • Next Milestone: Requirements Workshop"

[Show pending actions] [View next sessions] [Get detailed status]
```

### Scenario 2: Pending Actions
```
User: "What do I need to do?"

Mode 01: "You have 2 pending action(s):

1. Submit security requirements document
   (Collaboration Platform Implementation)

2. Review and approve integration architecture
   (Collaboration Platform Implementation)

Would you like help with any of these?"

[Help with first action] [View all engagements] [Contact delivery lead]
```

### Scenario 3: Recommendations
```
User: "Give me recommendations"

Mode 01: "Based on your current status, here are my recommendations:

1. Complete your 2 pending action(s) to keep engagements on track

2. Focus on accelerating progress in Data Platform Modernisation (30% complete)

3. Prepare for your upcoming Architecture Blueprint Review on March 18, 2026

4. Follow up on 1 document(s) pending review"

[Show pending actions] [View next session] [Contact delivery lead]
```

## Styling & Branding

### Color Scheme
- **Primary Gradient**: Orange (#FF6B35) to Coral (#FF8C61) - TMaaS brand gradient
- **Background**: Card background with border
- **Text**: Foreground color with muted variants
- **Badges**: Primary color with transparency
- **Shadow**: Brand shadow with glow effect

### Visual Elements
- **Icon**: Sparkles (representing AI intelligence)
- **Badge**: "Post-Login" indicator with primary color
- **Active Count**: Shows number of active engagements
- **Typing Indicator**: Animated dots with "Analyzing your data..."

### Animations
- **Entry**: Scale and fade in
- **Exit**: Scale and fade out
- **Hover**: Scale up (1.05x)
- **Tap**: Scale down (0.95x)
- **Messages**: Slide up with fade

## Responsive Design

### Desktop (1024px+)
- Full-width dialog (max 672px)
- Floating button bottom-right
- Sidebar visible

### Tablet (768px - 1023px)
- Adjusted dialog width
- Floating button remains visible
- Sidebar collapsible

### Mobile (< 768px)
- Full-screen dialog
- Floating button bottom-right
- Sidebar hidden (hamburger menu)

## Accessibility Features

1. **Keyboard Navigation**
   - Tab through quick reply buttons
   - Enter to submit message
   - Escape to close dialog

2. **Screen Readers**
   - ARIA labels on buttons
   - Semantic HTML structure
   - Alt text for icons

3. **Focus Management**
   - Auto-focus on input field
   - Visible focus indicators
   - Logical tab order

4. **Color Contrast**
   - WCAG AA compliant
   - High contrast text
   - Clear visual hierarchy

## Performance Optimization

1. **Lazy Loading**
   - Profile loaded on first open
   - Not loaded until needed

2. **Efficient Rendering**
   - AnimatePresence for smooth transitions
   - Conditional rendering
   - Memoized components (future)

3. **State Management**
   - Local state only
   - No unnecessary re-renders
   - Efficient message updates

## Testing Scenarios

### Functional Tests
- [ ] Open Mode 01 from Overview page
- [ ] Open Mode 01 from Active Engagements page
- [ ] Open Mode 01 from Calendar page
- [ ] Verify personalized greeting
- [ ] Test "Show my pending actions"
- [ ] Test "What's my next session?"
- [ ] Test "Summarize my engagements"
- [ ] Test "Get recommendations"
- [ ] Test navigation quick replies
- [ ] Test close button
- [ ] Test input field
- [ ] Test send button

### Edge Cases
- [ ] No pending actions
- [ ] No upcoming sessions
- [ ] All engagements completed
- [ ] Empty message submission
- [ ] Long messages
- [ ] Rapid message sending
- [ ] Close during typing indicator

### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## Migration to Supabase

When ready to connect to real Supabase:

1. **Replace Mock Data**
   ```typescript
   // Before (Mock)
   setUserProfile(mockUserProfile);
   
   // After (Supabase)
   const { data, error } = await supabase
     .from('user_profiles')
     .select('*, engagements(*), sessions(*), documents(*)')
     .eq('id', user.id)
     .single();
   
   setUserProfile(data);
   ```

2. **Add Real-time Updates**
   ```typescript
   const subscription = supabase
     .channel('user_updates')
     .on('postgres_changes', 
       { event: '*', schema: 'public', table: 'engagements' },
       (payload) => {
         // Update profile state
       }
     )
     .subscribe();
   ```

3. **Error Handling**
   ```typescript
   if (error) {
     addAIMessage(
       "I'm having trouble loading your profile. Please try again.",
       ["Retry", "Contact Support"]
     );
   }
   ```

## Deployment Checklist

- [ ] All files committed to repository
- [ ] TypeScript compilation successful
- [ ] No console errors
- [ ] Mock data structure matches Supabase schema
- [ ] Floating button visible on all dashboard pages
- [ ] Dialog opens and closes correctly
- [ ] All intent handlers tested
- [ ] Quick replies work as expected
- [ ] Navigation links functional
- [ ] Responsive on all screen sizes
- [ ] Accessibility features verified
- [ ] Documentation complete

## Support & Maintenance

### Common Issues

**Issue**: Mode 01 button not appearing
- **Solution**: Check DashboardLayout integration, verify z-index

**Issue**: Profile not loading
- **Solution**: Check mockUserProfile import, verify data structure

**Issue**: Intent not recognized
- **Solution**: Review mode01IntentPatterns, add new patterns if needed

**Issue**: Quick replies not working
- **Solution**: Check handleOptionClick mapping, verify navigation paths

### Future Enhancements

1. **Voice Input** - Add speech-to-text capability
2. **Multi-language** - Support multiple languages
3. **Rich Media** - Embed charts, images, documents
4. **Proactive Alerts** - Notify users of important updates
5. **Learning Mode** - Improve responses based on feedback

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Maintained By**: TMaaS Development Team
