# Butler.AI Escalation Specification

**Version**: 1.0  
**Date**: 14 April 2026  
**Status**: Implemented

---

## Overview

Butler.AI implements a **two-path escalation system** that collects visitor contact information through a conversational 3-step form, then confirms successful submission. This ensures no visitor is left without a path to human assistance.

---

## Escalation Paths

### **Path 1: Direct Contact Request**
**Trigger**: User clicks "Contact the team" option in FAQ responses

**Entry Points**:
- FAQ: "What is TMaaS?" → Options include "Contact the team"
- FAQ: "What does it cost?" → Options include "Contact the team"
- Any message with "Contact the team" chip

**Flow**: Immediately starts contact form (Step 1)

---

### **Path 2: Automatic Escalation**
**Trigger**: After 3 consecutive unresolved queries

**Definition of "Unresolved Query"**:
- User types free-text input that Butler cannot match to:
  - Known goal selection (4 transformation goals)
  - Journey stage selection (4 stages)
  - FAQ keywords (TMaaS, pricing, how it works, getting started)
  - Service navigation commands
  - Contact form responses (when form is active)

**Escalation Counter Logic**:
```
Query 1 (unresolved) → Counter = 1 → Show fallback with FAQ options
Query 2 (unresolved) → Counter = 2 → Show fallback with FAQ options
Query 3 (unresolved) → Counter = 3 → Trigger escalation
```

**Counter Reset Conditions**:
- User clicks any FAQ option
- User selects a goal or journey stage
- User navigates to a service
- Escalation is triggered (counter resets to 0)

**Escalation Message**:
```
"I wasn't able to find a clear answer for that. Would you like me to connect you with the TMaaS team?"

[Contact the team] [Try asking something else]
```

**User Actions**:
- Clicks "Contact the team" → Starts contact form (Step 1)
- Clicks "Try asking something else" → Returns to normal conversation, counter resets

---

## Contact Form Flow

### **Step 1: Name Collection**

**Butler Message**:
```
"I'd be happy to connect you with our team. What's your name?"
```

**User Input**: Free-text (any string)

**Validation**: None (accepts any input)

**Next**: Proceeds to Step 2

---

### **Step 2: Email Collection**

**Butler Message**:
```
"Great! What's your email address?"
```

**User Input**: Free-text (any string)

**Validation**: None in prototype (production should validate email format)

**Next**: Proceeds to Step 3

---

### **Step 3: Reason Collection**

**Butler Message**:
```
"Perfect! What would you like to discuss with our team?"
```

**User Input**: Free-text (any string)

**Validation**: None (accepts any input)

**Next**: Proceeds to Confirmation

---

### **Step 4: Confirmation**

**Butler Message**:
```
"Thank you, [Name]! Our team will review your request and get back to you at [email] within 24 hours."
```

**Variables**:
- `[Name]`: User's name from Step 1
- `[email]`: User's email from Step 2

**User State**: Contact form closes, conversation returns to normal

**No further action required from user**

---

## Data Capture & Logging

### **Contact Request Object**
```javascript
{
  timestamp: "2026-04-14T13:45:30.123Z",
  name: "John Doe",
  email: "john.doe@company.com",
  reason: "Need help understanding pricing for DWS Strategy",
  conversationContext: {
    selectedGoal: "Improve internal operations" | null,
    selectedStage: "Exploring / defining the problem" | null,
    recommendedService: "DWS Strategy" | null
  },
  escalationTriggered: true | false,
  unresolvedQueryCount: 3 | 0,
  conversationHistory: [
    { type: "ai", content: "Hi, I'm Butler..." },
    { type: "user", content: "Improve internal operations" },
    // ... full message history
  ]
}
```

### **Console Logging** (Development)
```javascript
console.log("📧 CONTACT REQUEST:", contactRequestObject);
```

### **Production Integration Points**
- **CRM Integration**: POST to `/api/contact-requests`
- **Email Notification**: Send to `support@digitalqatalyst.com`
- **Slack Notification**: Post to `#tmaas-leads` channel
- **Analytics**: Track conversion funnel (escalation → form start → form complete)

---

## User Experience Considerations

### **Form State Management**
- Form state persists across messages
- User cannot exit form mid-flow (must complete or refresh page)
- Form data is stored in component state until submission

### **Error Handling**
- No validation errors in prototype
- Production should handle:
  - Invalid email format
  - Empty fields
  - Network errors on submission

### **Conversation Context**
- Butler maintains awareness of previous conversation
- Confirmation message references user's name
- Logged data includes full conversation history for team context

---

## Fallback Behavior (Before Escalation)

### **Query 1-2: Unresolved**

**Butler Message**:
```
"I'm not sure I understood that. Here are some things I can help with:"

[What is TMaaS?] [How does it work?] [What does it cost?] [How do I get started?]
```

**Purpose**: Give user structured options before escalating

**User Actions**:
- Click any FAQ option → Resets counter, shows FAQ response
- Type another query → Increments counter

---

## Edge Cases

### **User Abandons Form Mid-Flow**
- **Scenario**: User closes dialog during Step 1, 2, or 3
- **Behavior**: Form state is lost, counter resets
- **Next Session**: User starts fresh

### **User Triggers Escalation Multiple Times**
- **Scenario**: User completes form, continues asking unresolved questions
- **Behavior**: Counter can trigger escalation again
- **Each submission**: Logged separately

### **User Types "Contact the team" as Free Text**
- **Scenario**: User types the phrase instead of clicking button
- **Behavior**: Treated as unresolved query (increments counter)
- **Recommendation**: Add text matching for common phrases

---

## Success Metrics

### **Escalation Metrics**
- **Escalation Rate**: % of conversations that trigger escalation
- **Escalation Resolution**: % of escalations that complete contact form
- **Average Queries to Escalation**: Typically 3 (by design)

### **Contact Form Metrics**
- **Form Start Rate**: % who click "Contact the team"
- **Form Completion Rate**: % who complete all 3 steps
- **Form Abandonment**: % who exit at Step 1, 2, or 3

### **Response Time Metrics** (Production)
- **Time to First Response**: Team response time to contact requests
- **Resolution Time**: Time from contact to issue resolution

---

## Implementation Status

### **✅ Implemented**
- [x] Unresolved query counter
- [x] Escalation trigger after 3 queries
- [x] Fallback messages with FAQ options
- [x] "Contact the team" button in escalation
- [x] 3-step contact form (name, email, reason)
- [x] Confirmation message with personalization
- [x] Console logging for development
- [x] Conversation context capture
- [x] Counter reset logic
- [x] Form state management

### **🔄 Production Ready**
- [ ] Email validation
- [ ] API integration for contact submission
- [ ] CRM integration
- [ ] Email notifications to team
- [ ] Slack notifications
- [ ] Analytics tracking
- [ ] Error handling for failed submissions
- [ ] Rate limiting for spam prevention

---

## Testing Scenarios

### **Test 1: Direct Contact Request**
1. User clicks "What is TMaaS?"
2. Butler shows FAQ response with "Contact the team" option
3. User clicks "Contact the team"
4. Butler asks for name → User provides
5. Butler asks for email → User provides
6. Butler asks for reason → User provides
7. Butler confirms submission

**Expected**: Form completes successfully

---

### **Test 2: Escalation After 3 Unresolved Queries**
1. User types "random question 1"
2. Butler shows fallback with FAQ options
3. User types "random question 2"
4. Butler shows fallback with FAQ options
5. User types "random question 3"
6. Butler shows escalation message with "Contact the team" button
7. User clicks "Contact the team"
8. Complete form flow (Steps 1-4)

**Expected**: Escalation triggers, form completes

---

### **Test 3: Counter Reset**
1. User types "random question 1" (counter = 1)
2. Butler shows fallback
3. User clicks "What is TMaaS?" (counter resets)
4. Butler shows FAQ response
5. User types "random question 2" (counter = 1, not 2)

**Expected**: Counter resets after FAQ interaction

---

### **Test 4: Form Abandonment**
1. Trigger escalation
2. Click "Contact the team"
3. Provide name
4. Close dialog (abandon form)
5. Reopen dialog

**Expected**: Form state is lost, conversation continues normally

---

## Code References

### **Files**
- `src/components/DiagnoseDialog.tsx` - Main escalation logic
- `src/data/butlerAI.ts` - Escalation messages and FAQ options

### **Key Functions**
- `handleUserMessage()` - Processes unresolved queries, triggers escalation
- `handleOptionClick()` - Handles "Contact the team" button click
- Contact form state: `contactFormStep`, `contactFormData`, `showContactForm`

### **State Variables**
```typescript
const [unresolvedCount, setUnresolvedCount] = useState(0);
const [showContactForm, setShowContactForm] = useState(false);
const [contactFormStep, setContactFormStep] = useState(0);
const [contactFormData, setContactFormData] = useState({ 
  name: "", 
  email: "", 
  reason: "" 
});
```

---

## Future Enhancements

### **Phase 2: Smart Escalation**
- Detect frustration in user messages
- Offer escalation proactively before 3 queries
- Sentiment analysis on user input

### **Phase 3: Live Agent Handoff**
- Real-time chat with team member
- Queue management for multiple requests
- Agent availability status

### **Phase 4: Self-Service Resolution**
- Suggest related FAQ articles
- Link to documentation
- Video tutorials for common questions

---

## Compliance & Privacy

### **Data Collection**
- **What we collect**: Name, email, reason, conversation history
- **Purpose**: To respond to visitor inquiries
- **Storage**: Logged to console (dev), sent to CRM (production)
- **Retention**: Per company data retention policy

### **User Consent**
- Implicit consent by submitting form
- Privacy policy link in footer
- No sensitive data collected in prototype

### **GDPR Considerations** (Production)
- Right to access collected data
- Right to deletion
- Data processing agreement with CRM provider
- Cookie consent for conversation tracking

---

## Summary

Butler.AI's escalation system ensures **no visitor is left without help**. Through a combination of automatic escalation (after 3 unresolved queries) and direct contact options (in FAQ responses), visitors can always reach the TMaaS team. The 3-step contact form is conversational, non-intrusive, and captures the essential information needed for the team to respond effectively.

**Key Principle**: Escalation is a **safety net**, not a failure. It acknowledges Butler's limits and provides a human path when AI guidance isn't sufficient.
