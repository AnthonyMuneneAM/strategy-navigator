# Specification (Specific): Service Delivery Management (TMaaS SaaS / Pristine)

Base Shell link:  
https://arqitek.sharepoint.com/:t:/s/DELSPL.DBAAServicescopy/IQCrUXpfil_OS7vD7uQIoR3_AflsDqDSAVznGnRW88OYriE?e=40L0xW

---

## Story:

As a Delivery Lead (DQ), I want to drive the service engagement through its lifecycle by managing stages, inputs, and outputs, so that delivery moves forward without delays and reaches closure successfully.

---

## Purpose (Why):

TMaaS SaaS delivery must be:

- simple to understand  
- structured around clear responsibilities  
- action-driven rather than administratively heavy  

Traditional milestone-based delivery introduces unnecessary complexity for standardised services.

This model replaces milestones with a **stage-based lifecycle**, supported by a clear **input → delivery → output flow**, ensuring:

- clarity of current state  
- explicit ownership of actions  
- reduced ambiguity between client and delivery team  
- faster progression to closure  

---

## Offering (What):

Service Delivery Management provides a **structured engagement workspace** where delivery is managed through:

- predefined lifecycle stages  
- clearly defined client inputs and delivery outputs  
- integrated collaboration and governance features  

---

## 1. Engagement Header (Persistent Context)

Each Engagement Details page includes a persistent header displaying:

- Service Name  
- Service Order Number  
- Client Organisation  
- Start Date  
- Price  

The header remains visible across all tabs to maintain context.

---

## 2. Delivery Lifecycle (Stage-Based Model)

Each engagement progresses through predefined stages:

1. Payment Pending  
2. Client Input Pending  
3. Input in Review  
4. In Delivery  
5. Deliverables Pending Review  
6. Closed  

---

### Stage Principles

- Only one active stage at a time  
- Stage reflects the **current state of engagement**  
- Each stage indicates **who needs to act (Client vs Delivery Team)**  
- Stage progression is controlled and intentional  

---

### Stage Meaning

| Stage | Description | Primary Owner |
|------|-------------|--------------|
| Payment Pending | Awaiting payment confirmation | Client |
| Client Input Pending | Waiting for required inputs | Client |
| Input in Review | Inputs under review | Delivery Team |
| In Delivery | Service execution in progress | Delivery Team |
| Deliverables Pending Review | Outputs shared for validation | Client |
| Closed | Engagement completed and accepted | Shared |

---

## 3. Tab Structure (Engagement Workspace)

---

### 3.1 Overview

Provides a high-level summary:

- current stage  
- key updates  
- pending actions (client or delivery)  
- recent activity  

Purpose:
- immediate understanding of engagement state  
- clear visibility of next actions  

---

### 3.2 Delivery

Core execution workspace structured around **Inputs and Outputs**.

---

#### A. Client Inputs

Captures all required inputs from the client.

Each input includes:

- Input Name  
- Description / Instructions  
- Status (Pending / Submitted / In Review / Accepted)  
- Submitted Files / Data  
- Submitted Date  
- Review Feedback  

Purpose:

- define what is required from the client  
- track submission and validation  
- ensure delivery dependencies are clear  

---

#### B. Deliverables

Tracks outputs produced by the delivery team.

Each deliverable includes:

- Deliverable Name  
- Description  
- Status (In Progress / Submitted / Under Review / Accepted)  
- Associated Files  
- Submission Date  
- Client Feedback  

Purpose:

- manage outputs  
- track review and acceptance  
- ensure structured delivery completion  

---

#### C. Delivery Flow

The Delivery tab represents the full lifecycle:

Client Inputs → Input Review → Delivery Execution → Deliverables → Client Review  

This ensures:

- clear ownership separation  
- traceable progression  
- reduced ambiguity  

---

### 3.3 RAID

Governance view:

- Risks  
- Assumptions  
- Issues  
- Dependencies  

Includes:

- status  
- ownership  
- due dates  
- mitigation actions  

Purpose:
- maintain delivery governance and risk visibility  

---

### 3.4 Sessions

Working session management:

- upcoming sessions  
- past sessions  
- session notes  
- action items  

Purpose:
- structure collaboration and decision-making  

---

### 3.5 Inbox

Communication layer:

- messages between client and delivery team  
- context-linked discussions  
- attachments  

Purpose:
- maintain traceable and structured communication  

---

### 3.6 Commercial & Terms

Access to commercial and contractual context:

- Terms of Service  
- service-specific agreements  
- commercial documents  
- payment references  

Purpose:
- ensure transparency of agreements  

---

## 4. Stage-Driven Behaviour

The platform guides actions based on stage.

---

### Client Input Pending

- required inputs are visible in Delivery tab  
- client is prompted to submit inputs  
- engagement cannot progress without inputs  

---

### Input in Review

- delivery team reviews submitted inputs  
- feedback can be provided  
- inputs can be accepted or rejected  

---

### In Delivery

- delivery team executes service  
- deliverables are created and updated  

---

### Deliverables Pending Review

- deliverables are visible to client  
- client reviews and provides feedback or acceptance  

---

## 5. Ownership Model (Inputs vs Outputs)

The platform enforces clear ownership:

- Client owns → Inputs  
- Delivery Team owns → Deliverables  

This ensures:

- accountability is explicit  
- responsibilities are not mixed  
- delivery progression is structured  

Each stage reflects which party is expected to act.

---

## 6. Roles & Responsibilities

---

### Delivery Lead (DQ)

Responsible for:

- managing delivery stages  
- reviewing inputs  
- executing delivery  
- submitting deliverables  
- managing RAID  
- coordinating sessions  

---

### Delivery Lead (Client)

Responsible for:

- submitting required inputs  
- reviewing deliverables  
- participating in sessions  
- responding to communication  

---

## 7. Access Control

---

### Delivery Lead (DQ)

Can:

- update stages  
- manage inputs and deliverables  
- manage RAID  
- initiate sessions  
- communicate  

---

### Delivery Lead (Client)

Can:

- submit inputs  
- review deliverables  
- participate in sessions  
- communicate  

Cannot:

- change stages  
- modify delivery structure  

---

## 8. Navigation & UX Principles

- persistent header across tabs  
- clear tab separation  
- minimal complexity  
- action-driven UI  
- consistent layout across engagements  

---

## 9. Out of Scope

- detailed task management (external tools)  
- milestone planning  
- resource capacity management  
- automated workflow engines  

---

## 10. Expected Outcomes

This feature enables:

- simplified SaaS-style delivery  
- clear ownership of responsibilities  
- reduced ambiguity in collaboration  
- faster delivery progression  
- improved client–delivery alignment  
