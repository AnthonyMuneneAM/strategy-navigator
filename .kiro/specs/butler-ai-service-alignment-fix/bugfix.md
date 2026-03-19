# Bugfix Requirements Document

## Introduction

The Butler.AI service recommendation engine currently provides hallucinated service data that doesn't align with the actual marketplace services. Service recommendations in `butlerAI.ts` use fabricated URLs (e.g., `/services/digital-org-strategy`), incorrect service names, and mismatched metadata that don't correspond to the real marketplace services (IDs 0-405 defined in `Marketplace.tsx`). This misalignment creates a broken user experience where recommended services lead to non-existent pages or incorrect information.

Additionally, the system lacks implementation of expected outcome tracking metrics such as visitor engagement, stage conversion rates, service discovery efficiency, and platform positioning differentiation.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN Butler.AI recommends a service THEN the system provides a URL like `/services/digital-org-strategy` that does not exist in the application routing

1.2 WHEN Butler.AI recommends "Digital Organisation Strategy" THEN the system uses service metadata (name, description, price, duration) that does not match the actual marketplace service with id 0

1.3 WHEN Butler.AI recommends "Data & Intelligence Strategy" THEN the system uses a fabricated URL `/marketplace` instead of linking to the specific service detail page or marketplace with appropriate filters

1.4 WHEN Butler.AI recommends services like "CRM & Service Platform" THEN the system uses generic URLs that don't navigate to the actual service (id 104) in the marketplace

1.5 WHEN Butler.AI provides service recommendations THEN the system does not use actual marketplace service IDs (0-405) for reference or navigation

1.6 WHEN Butler.AI displays service prices THEN the system shows prices like "From $75k" that may not match the actual marketplace service pricing

1.7 WHEN Butler.AI displays service durations THEN the system shows durations like "8-12 weeks" that may not match the actual marketplace service durations

### Expected Behavior (Correct)

2.1 WHEN Butler.AI recommends a service THEN the system SHALL provide a URL that navigates to `/marketplace` with the service visible or highlighted

2.2 WHEN Butler.AI recommends "Digital Organisation Strategy" THEN the system SHALL use the exact service metadata from marketplace service id 0 (name, description, price, duration, tags, deliverables)

2.3 WHEN Butler.AI recommends "Data & Intelligence Strategy" THEN the system SHALL use the exact service metadata from marketplace service id 3 and link to `/marketplace?tower=dia&type=design`

2.4 WHEN Butler.AI recommends services like "CRM & Service Platform" THEN the system SHALL use the exact service metadata from marketplace service id 104 and link to `/marketplace?tower=dxp&type=deploy-saas`

2.5 WHEN Butler.AI provides service recommendations THEN the system SHALL reference actual marketplace service IDs (0-405) from the services array in Marketplace.tsx

2.6 WHEN Butler.AI displays service prices THEN the system SHALL show prices that exactly match the marketplace service data (e.g., service id 0 shows "From $75k")

2.7 WHEN Butler.AI displays service durations THEN the system SHALL show durations that exactly match the marketplace service data (e.g., service id 0 shows "8-12 weeks")

### Unchanged Behavior (Regression Prevention)

3.1 WHEN Butler.AI provides FAQ responses from the knowledge base THEN the system SHALL CONTINUE TO return accurate answers with appropriate links

3.2 WHEN Butler.AI classifies user intent using intentPatterns THEN the system SHALL CONTINUE TO correctly identify FAQ, routing, and advisory intents

3.3 WHEN Butler.AI qualifies users by organization type and transformation stage THEN the system SHALL CONTINUE TO collect and store user profile data

3.4 WHEN Butler.AI filters recommendations by user profile THEN the system SHALL CONTINUE TO apply confidence scoring and profile-based filtering logic

3.5 WHEN Butler.AI displays conversation UI with messages, options, and links THEN the system SHALL CONTINUE TO render the chat interface correctly

3.6 WHEN Butler.AI handles escalation after unresolved queries THEN the system SHALL CONTINUE TO offer expert connection after 3 unresolved queries

3.7 WHEN Butler.AI switches between concierge and advisory modes THEN the system SHALL CONTINUE TO adapt conversation flow based on current stage

3.8 WHEN users click on service recommendation links THEN the system SHALL CONTINUE TO navigate or open links appropriately (internal vs external)

3.9 WHEN Butler.AI displays service metadata (tower, type, confidence) THEN the system SHALL CONTINUE TO show this information in the message UI

3.10 WHEN the marketplace displays services with filters THEN the system SHALL CONTINUE TO filter by tower, price range, duration, and capability areas

3.11 WHEN the marketplace sorts services THEN the system SHALL CONTINUE TO sort by price, duration, and name correctly

3.12 WHEN users view service cards in the marketplace THEN the system SHALL CONTINUE TO display service details, tags, deliverables, and pricing accurately
