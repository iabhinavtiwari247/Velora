# Velora: Technical Architecture & Product Strategy

## 1. System Architecture (Microservices)

Velora is designed as a cloud-native, microservices-oriented platform to ensure 10M+ scalability and high availability.

### Core Services:
- **Authentication Service**: Handles OAuth2 (Google, Apple), Phone OTP, and Session Management.
- **User/Profile Service**: Manages the triple-layer profile (Matrimonial, Social, Professional). Integrated with a search engine (ElasticSearch/Typesense) for gender-restricted discovery.
- **Trust & Verification (KYC) Service**: Interfaces with Aadhaar/PAN APIs via third-party providers (e.g., Digio/HyperVerge). Manages physical verification requests and logistics scheduling.
- **Messaging Service (Real-time)**: WebSocket-based service for chat, audio, and video calls. Uses a Redis pub/sub layer for horizontal scaling.
- **AI Matchmaking Engine**: A Python-based service utilizing Gemini for vector embeddings and compatibility scoring.
- **Social Graph Service**: Manages "Posts", "Reels", "Groups", "Commonities", and user interactions (Likes, Comments).
- **Marketplace Service**: Vendor management, service listings, and booking workflows for wedding planning.
- **Media Optimization Service**: Handles image/video uploads, transcoding for Reels, and CDN distribution.

---

## 2. Database Schema (PostgreSQL/NoSQL Hybrid)

### Main Relational Store (User Core & Matrimony):
- `Users`: `id`, `email`, `phone`, `role` (Admin/User), `status`, `subscription_tier`.
- `Profiles`: `id`, `user_id`, `gender`, `visibility_restricted`, `matrimony_data` (JSONB), `professional_data` (JSONB).
- `Verifications`: `user_id`, `aadhaar_status`, `pan_status`, `physical_visit_status`.
- `Subscriptions`: `id`, `user_id`, `plan_type`, `expires_at`.

### NoSQL / Real-time Store (Social & Chat):
- `Groups`: `id`, `name`, `members` (Array), `posts` (Reference).
- `Posts/Reels`: `id`, `author_id`, `media_url`, `tags`, `engagement_metrics`.
- `Messages`: `id`, `sender_id`, `receiver_id`, `content`, `timestamp`, `read_receipt`.

---

## 3. API Design (GraphQL + REST Hybrid)

- **GraphQL (Consumer Client)**: Used for the complex data-fetching needs of the hybrid profile (fetching layers in a single request).
  - `query getProfile(id: ID!) { matrimonial { ... } social { ... } professional { ... } }`
- **REST (Internal & Third-party)**: Used for KYC integration and file uploads.
  - `POST /api/kyc/verify-aadhaar`
  - `POST /api/media/upload-reel`

---

## 4. AI Model Integration Points

- **Compatibility Scoring**: Gemini analyzes profile text and interests to generate a "Compatibility Graph".
- **Safety Filtering**: Automated image/video moderation for Reels and Profile photos.
- **Chat Assistant**: Smart replies and conversation starters based on cultural context.
- **Fake Profile Detection**: Behavioral analysis comparing user activity against known bot patterns.

---

## 5. Security & Compliance

- **DPDP Act (India)**: Implementation of strict consent managers, right to erasure, and data localization.
- **Gender Safety**: Women's profiles have granular privacy controls (blurring photos for unverified men, screenshot protection).
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit.

---

## 6. UI/UX Flow (Conceptual)

1. **Onboarding**: Multi-step registration (Personal -> Verification -> Interests).
2. **Discovery (LinkedIn-style list)**: Feed of profiles with social reels integrated.
3. **Deep Dive (Instagram-style profile)**: Swipeable tabs for Matrimony (details), Social (reels/posts), Professional (bio/job).
4. **Action**: "Connect" (LinkedIn style) -> "Express Interest" (Matrimony style) -> "Start Chat" (WhatsApp style).

---

## 7. Risk Mitigation Strategies

- **Catfishing**: Mandatory verified badge for discovery (after Phase 1).
- **Spam**: Rate limits on messaging for Free/Basic tiers.
- **Data Integrity**: Routine audits of physical verification agents.
- **Compliance Drift**: Automated legal-check pipelines for regulatory updates.
