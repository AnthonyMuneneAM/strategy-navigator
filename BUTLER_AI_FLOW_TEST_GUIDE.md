# Butler AI Flow - Testing Guide

## Date: April 30, 2026

---

## 🎯 What to Test

Verify that all 16 challenge paths follow Stephane's flow pattern:
**Knowledge Exchange → Lock-In (email + org) → Navigation**

---

## 🧪 Test Scenarios

### Test 1: Data Transformation - Data Silos

1. Open Butler AI dialog
2. Click **"Unlock value from data"**
3. Click **"We have data silos across systems"**
4. **Expected**: Knowledge exchange response (no option buttons)
5. **Expected**: After 1.5 seconds, Butler asks: "I can send you a detailed architecture diagram for this solution. What's your email address?"
6. Type: `test@example.com`
7. **Expected**: Butler asks: "Great! Which organization are you with?"
8. Type: `Test Corp`
9. **Expected**: Butler says: "Perfect, Test Corp! I've sent you the architecture diagram to test@example.com. Should I also take you to the service page where you can explore the full offering?"
10. **Expected**: Options appear: ["Yes, take me there", "Tell me more first", "Connect me with an architect"]
11. Click **"Yes, take me there"**
12. **Expected**: Butler says "Taking you to the service page..."
13. **Expected**: After 2 seconds, auto-navigates to `/service/3`

✅ **Pass Criteria**: Lead captured BEFORE navigation offered

---

### Test 2: Internal Operations - Manual Processes

1. Open Butler AI dialog
2. Click **"Improve internal operations"**
3. Click **"Manual processes and handoffs"**
4. **Expected**: Knowledge exchange response (no option buttons)
5. **Expected**: After 1.5 seconds, email prompt appears
6. Provide email and organization
7. **Expected**: Navigation options appear AFTER lead capture
8. Click **"Yes, take me there"**
9. **Expected**: Auto-navigates to `/service/2`

✅ **Pass Criteria**: Lead captured BEFORE navigation offered

---

### Test 3: Customer Experience - Disconnected Touchpoints

1. Open Butler AI dialog
2. Click **"Improve customer experience"**
3. Click **"Disconnected customer touchpoints"**
4. **Expected**: Knowledge exchange response (no option buttons)
5. **Expected**: After 1.5 seconds, email prompt appears
6. Provide email and organization
7. **Expected**: Navigation options appear AFTER lead capture
8. Click **"Yes, take me there"**
9. **Expected**: Auto-navigates to `/service/1`

✅ **Pass Criteria**: Lead captured BEFORE navigation offered

---

### Test 4: DevOps - Security Slows Down Delivery

1. Open Butler AI dialog
2. Click **"Improve delivery speed / DevOps"**
3. Click **"Security slows down delivery"**
4. **Expected**: Knowledge exchange response (no option buttons)
5. **Expected**: After 1.5 seconds, email prompt appears
6. Provide email and organization
7. **Expected**: Navigation options appear AFTER lead capture
8. Click **"Yes, take me there"**
9. **Expected**: Auto-navigates to `/service/4`

✅ **Pass Criteria**: Lead captured BEFORE navigation offered

---

## 🔍 What to Look For

### ✅ Correct Behavior:
- Knowledge exchange appears first (educational content)
- NO option buttons after knowledge exchange
- Email prompt appears automatically after 1.5 seconds
- Organization prompt appears after email is provided
- Navigation options appear ONLY after lead is captured
- Console logs show: `🎯 LEAD CAPTURED:` with email, organization, and context

### ❌ Incorrect Behavior:
- Option buttons appear immediately after knowledge exchange
- Navigation offered before lead capture
- Email prompt never appears
- Lead data not logged to console

---

## 📊 All 16 Paths to Test

### Data Transformation (4 paths)
- [ ] We have data silos across systems
- [ ] Our data quality is inconsistent
- [ ] We can't get a unified business view
- [ ] All of the above (data)

### Internal Operations (4 paths)
- [ ] Manual processes and handoffs
- [ ] System silos and data duplication
- [ ] Slow approval workflows
- [ ] All of the above (operations)

### Customer Experience (4 paths)
- [ ] Disconnected customer touchpoints
- [ ] Slow response times
- [ ] Inconsistent experience across channels
- [ ] All of the above (customer experience)

### DevOps (4 paths)
- [ ] Security slows down delivery
- [ ] Manual compliance checks
- [ ] Inconsistent deployment processes
- [ ] All of the above (devops)

---

## 🐛 Common Issues to Check

### Issue 1: Lead Capture Not Triggering
**Symptom**: Option buttons appear instead of email prompt  
**Cause**: `triggerLeadCapture()` not called  
**Fix**: Verify all 16 paths call `triggerLeadCapture()`

### Issue 2: Navigation Offered Too Early
**Symptom**: "Yes, take me there" appears before email is collected  
**Cause**: Options passed to `addAIMessage()` in knowledge exchange  
**Fix**: Remove options array from knowledge exchange responses

### Issue 3: Wrong Service URL
**Symptom**: Navigates to wrong service page  
**Check**: Verify `selectedGoal` matches service URL mapping:
- "Improve customer experience" → `/service/1`
- "Improve internal operations" → `/service/2`
- "Unlock value from data" → `/service/3`
- "Improve delivery speed / DevOps" → `/service/4`

---

## 🎯 Success Criteria

**All 16 paths must:**
1. ✅ Show knowledge exchange response first
2. ✅ Automatically trigger email prompt (no manual action needed)
3. ✅ Collect email + organization
4. ✅ Log lead data to console
5. ✅ Offer navigation ONLY after lead is captured
6. ✅ Auto-navigate to correct service page

---

## 📝 Test Results Template

```
Date: [Date]
Tester: [Name]

Path Tested: [Challenge Name]
Result: [PASS/FAIL]
Notes: [Any observations]

Lead Captured: [YES/NO]
Email: [Email provided]
Organization: [Organization provided]
Navigation URL: [URL navigated to]
Console Log: [YES/NO]
```

---

## 🚀 Quick Test Command

To test the flow quickly:

1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Open Butler AI dialog
4. Test any of the 16 paths
5. Check browser console for lead capture logs

---

**Status**: Ready for Testing  
**Date**: April 30, 2026  
**Implementation**: Complete  
**Test Coverage**: All 16 paths
