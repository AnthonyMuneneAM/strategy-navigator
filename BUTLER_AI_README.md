# Butler.AI Prototype - TMaaS Platform

## Overview

Butler.AI is a conversational AI assistant prototype built on top of the existing TMaaS platform. It provides stage-aware assistance across two key user journey phases:

- **Stage 0 (Concierge)**: Landing page assistance and platform orientation
- **Stage 1 (Advisory)**: Marketplace guidance and service recommendations

## Features Implemented

### Stage 0: Concierge Functions (Landing Page)

#### 1.1 Platform Orientation
- ✅ Explains TMaaS and 4D Framework in simple terms
- ✅ Clear explanation within 2 conversation turns
- ✅ Pre-built responses about platform capabilities

#### 1.2 Visitor Routing
- ✅ Intent detection with 90%+ simulated accuracy
- ✅ Quick reply options for navigation:
  - [Explore Services] → `/explore`
  - [Learn About TMaaS] → `/about`
  - [Talk to the Team] → `/contact`

#### 1.3 FAQ Resolution
- ✅ Knowledge base integration with structured responses
- ✅ Common questions covered:
  - "What is TMaaS?"
  - "How does it work?"
  - "What does it cost?"
  - "What services do you offer?"
- ✅ Dynamic links to relevant pages

### Stage 1: Advisory Functions (Marketplace)

#### 2.1 Conversational Qualification
- ✅ 1-2 qualifying questions without login required
- ✅ Organization type assessment
- ✅ Transformation stage identification

#### 2.2 Service Recommendation
- ✅ Personalized recommendations based on user profile
- ✅ Confidence scoring system
- ✅ Dynamic links to service pages
- ✅ Rationale for each recommendation

#### 2.3 Marketplace Navigation Assistance
- ✅ Service catalog integration
- ✅ Accurate availability status
- ✅ No false claims about service availability

## Technical Implementation

### Enhanced Components

1. **DiagnoseDialog.tsx**
   - Stage-aware conversation flow
   - Enhanced intent classification
   - Knowledge base integration
   - Service recommendation engine

2. **ChatButton.tsx**
   - Context-aware tooltips
   - Stage indicators (0/1)
   - Route-based behavior switching

3. **butlerAI.ts** (New)
   - Structured knowledge base
   - Service recommendation data
   - Intent classification patterns
   - Conversation templates

### Performance Features

- **Response Time**: <3 seconds (simulated)
- **Intent Accuracy**: 90%+ (pattern-based classification)
- **Session Management**: 30-minute timeout simulation
- **Escalation Logic**: After 3 unresolved queries
- **Analytics**: Conversation metrics tracking

## Demo Access

Visit `/butler-demo` to see the full prototype in action with:

- Interactive demo scenarios
- Performance metrics display
- Feature capability overview
- Technical implementation details

## Key Demo Scenarios

1. **New Visitor - Platform Learning**
   - Ask: "What is TMaaS?"
   - See: Comprehensive platform explanation with routing

2. **Service Discovery - Enterprise**
   - Say: "I need transformation help"
   - Experience: Qualification → Personalized recommendations

3. **FAQ Resolution**
   - Ask: "How much does it cost?"
   - Get: Detailed pricing breakdown with links

4. **Escalation Handling**
   - Try unclear queries 3 times
   - See: Automatic expert connection offer

## Simulated Features

- **Knowledge Base**: Structured FAQ responses
- **Intent Classification**: Pattern-based routing
- **Service Recommendations**: Profile-based matching
- **Performance Metrics**: Response time simulation
- **Conversation Analytics**: Usage tracking
- **Session Management**: Context continuity

## Usage Instructions

1. **Stage 0 Testing** (Landing Page):
   - Visit homepage (`/`)
   - Click floating chat button
   - Try platform-related questions

2. **Stage 1 Testing** (Marketplace):
   - Visit marketplace (`/marketplace` or `/explore`)
   - Click floating chat button
   - Request service recommendations

3. **Demo Page**:
   - Visit `/butler-demo`
   - Use demo buttons to test specific scenarios
   - Explore feature documentation

## Future Enhancements

- Real AI/ML integration
- Database-backed knowledge base
- Advanced analytics dashboard
- Multi-language support
- Voice interaction capabilities
- Integration with CRM systems

## Technical Notes

- Built on existing React/TypeScript TMaaS platform
- Uses Framer Motion for animations
- Tailwind CSS for styling
- React Router for navigation
- No external AI APIs (fully simulated)
- Responsive design for mobile/desktop

---

**Note**: This is a prototype/demo implementation. All AI responses are simulated using pre-defined patterns and responses. In production, this would integrate with actual AI/ML services and real-time data sources.