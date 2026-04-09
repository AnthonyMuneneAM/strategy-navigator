# Transact.AI Mode 01 - Post-Login Personalized Advisory

## Overview

Transact.AI Mode 01 is the post-login personalized advisory chatbot for TMaaS. It is an intelligent layer that sits inside the authenticated platform and knows who the user is, providing context-aware guidance throughout their transformation journey.

## Key Characteristics

### Stage 2 & 3 Integration
- **Stage 2 (Portal/Application)**: Embedded in the Overview window for authenticated users
- **Stage 3 (CRM/Management)**: Available in the Dashboard for detailed engagement management
- Accessible via floating action button (purple/blue gradient with Sparkles icon)

### Post-Login Context
- **Session Initialization**: On open, Mode 01 reads the user's full profile from mock data (simulating Supabase)
- **Personalized Greeting**: Uses user's name, active engagement count, and pending actions
- **Read-Only**: Does not perform any write operations - purely advisory

### User Profile Context (Mock Data)
Mode 01 has access to:
- User identity (name, role, organization)
- Organization type and transformation stage
- Active engagements with progress tracking
- Upcoming sessions and workshops
- Document status and pending reviews
- Recent activity across engagements
- Pending actions requiring attention

## Architecture

### Files Created

1. **`src/data/transactAI.ts`**
   - Mock user profile data structure
   - Engagement, session, and document types
   - Conversation templates
   - Intent patterns for classification
   - Quick action definitions

2. **`src/components/TransactAIMode01.tsx`**
   - Main chatbot component
   - Session initialization and profile loading
   - Intent classification engine
   - Context-aware response handlers
   - Personalized recommendations

3. **Integration in `src/components/DashboardLayout.tsx`**
   - Floating action button (bottom-right)
   - Dialog state management
   - Available on all dashboard pages

## Features

### Intent Classification
Mode 01 understands and responds to:

1. **Engagement Queries**
   - Status and progress updates
   - Next steps and actions
   - Timeline and completion dates
   - Team contacts

2. **Session Queries**
   - Upcoming sessions
   - Session preparation
   - Rescheduling requests

3. **Document Queries**
   - Document status
   - Approval tracking
   - Template requests

4. **Advisory Queries**
   - Personalized recommendations
   - Best practices
   - Similar client examples

5. **Navigation Queries**
   - Platform navigation help
   - Feature guidance

### Response Handlers

#### `handleEngagementStatus()`
Shows current status of all active engagements with:
- Progress percentage
- Current status
- Next milestone
- Pending actions count

#### `handleNextActions()`
Lists all pending actions across engagements:
- Action description
- Associated engagement
- Priority context

#### `handleUpcomingSessions()`
Displays upcoming sessions with:
- Session title and type
- Date and time
- Associated engagement
- Preparation suggestions

#### `handleEngagementSummary()`
Provides high-level overview:
- Overall progress percentage
- Active engagement count
- Pending actions count
- Transformation towers involved

#### `handleRecommendations()`
Generates personalized recommendations based on:
- Pending actions
- Low-progress engagements
- Upcoming sessions
- Documents pending review

#### `handleContactLead()`
Shows delivery lead information:
- Lead names
- Engagements they manage
- Contact options

### Quick Reply Options
Every AI response includes contextual quick reply buttons:
- "Show my pending actions"
- "What's my next session?"
- "Summarize my engagements"
- "Get recommendations"
- "Contact delivery lead"
- "View engagement status"
- Navigation shortcuts

## Mock Data Structure

### User Profile
```typescript
{
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  organizationType: "enterprise" | "smb" | "startup";
  industry: string;
  transformationStage: "starting" | "underway" | "optimizing";
  joinedDate: string;
  engagements: UserEngagement[];
  upcomingSessions: UserSession[];
  documents: UserDocument[];
  preferences: {
    communicationStyle: "detailed" | "concise";
    focusAreas: string[];
  };
}
```

### Engagement Data
```typescript
{
  id: string;
  name: string;
  service: string;
  tower: string;
  status: "In Progress" | "Awaiting Inputs" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  expectedCompletion: string;
  deliveryLead: string;
  nextMilestone: string;
  recentActivity: string[];
  pendingActions?: string[];
}
```

## Usage

### For Users
1. Navigate to any dashboard page (Overview, Active Engagements, etc.)
2. Click the purple/blue floating button (bottom-right)
3. Mode 01 opens with personalized greeting
4. Ask questions or click quick reply options
5. Get context-aware responses based on your profile

### Example Interactions

**User**: "What's my status?"
**Mode 01**: Shows all active engagements with progress, status, and next milestones

**User**: "What do I need to do?"
**Mode 01**: Lists all pending actions across engagements with context

**User**: "When is my next meeting?"
**Mode 01**: Shows upcoming sessions with dates, times, and preparation tips

**User**: "Give me recommendations"
**Mode 01**: Analyzes profile and provides prioritized recommendations

## Differences from Butler.AI (Pre-Login)

| Feature | Butler.AI (Pre-Login) | Transact.AI Mode 01 (Post-Login) |
|---------|----------------------|----------------------------------|
| **Stage** | Stage 0 - Concierge | Stage 2 & 3 - Portal/Dashboard |
| **Context** | Anonymous visitor | Authenticated user with full profile |
| **Purpose** | Platform education & service discovery | Personalized advisory & engagement management |
| **Data Access** | General knowledge base | User-specific engagement data |
| **Recommendations** | Generic service matching | Personalized based on actual progress |
| **Actions** | Route to sign-up | Navigate to specific engagements/tasks |
| **Tone** | Educational & promotional | Advisory & supportive |

## Future Enhancements (When Supabase is Connected)

1. **Real-time Data Loading**
   - Replace mock data with Supabase queries
   - Load user profile on session start
   - Fetch engagement updates in real-time

2. **Activity Tracking**
   - Log conversation analytics
   - Track user intents and satisfaction
   - Measure recommendation effectiveness

3. **Advanced Recommendations**
   - ML-based next action suggestions
   - Predictive engagement risk alerts
   - Personalized learning resources

4. **Collaboration Features**
   - Draft messages to delivery leads
   - Schedule session requests
   - Document upload assistance

5. **Multi-User Context**
   - Team-level insights
   - Organization-wide progress
   - Peer comparison (anonymized)

## Technical Notes

### State Management
- Uses React hooks for local state
- Profile loaded once per session
- No global state required (self-contained)

### Performance
- Simulated response delays (600-1600ms) for realistic feel
- Lazy loading of profile data
- Efficient intent classification

### Styling
- Consistent with TMaaS design system
- Purple/blue gradient branding for Mode 01
- Responsive design for mobile/tablet
- Smooth animations with Framer Motion

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels on interactive elements

## Testing Checklist

- [ ] Floating button appears on all dashboard pages
- [ ] Session initializes with personalized greeting
- [ ] All intent handlers work correctly
- [ ] Quick reply buttons trigger appropriate responses
- [ ] Navigation options redirect correctly
- [ ] Typing indicator shows during responses
- [ ] Messages scroll to bottom automatically
- [ ] Close button works properly
- [ ] Responsive on mobile/tablet
- [ ] No console errors

## Deployment Notes

1. Ensure `src/data/transactAI.ts` is imported correctly
2. Verify `TransactAIMode01` component is integrated in `DashboardLayout`
3. Test with different user roles (client vs DQ delivery lead)
4. Confirm floating button z-index doesn't conflict with other UI
5. Validate mock data matches expected Supabase schema

## Support

For questions or issues with Transact.AI Mode 01:
- Review this documentation
- Check console for errors
- Verify user profile data structure
- Test intent classification patterns
- Ensure all dependencies are installed

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Prototype (Mock Data)
