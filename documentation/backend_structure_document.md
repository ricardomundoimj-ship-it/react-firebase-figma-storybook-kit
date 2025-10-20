# Backend Structure Document

## 1. Backend Architecture

Our backend is built on a **serverless** model using Firebase’s suite of managed services. It follows a **client-centric** pattern, where the frontend interacts directly with Firebase Authentication, Firestore, and Cloud Functions rather than a traditional monolithic server.

Key design choices:
- Serverless Functions: Individual pieces of logic (for example, syncing design tokens or sending email notifications) are implemented as small, single-purpose Cloud Functions.  
- Client SDK Usage: For most CRUD operations, the frontend uses Firebase’s client SDK to talk directly to Firestore and Authentication, reducing the need for a separate API server.  
- Event-Driven Logic: Cloud Functions can trigger on Firestore changes or Authentication events, enabling automated workflows (for example, updating version history when a design token changes).

How this supports our goals:
- Scalability: Firebase auto-scales each service (Auth, Firestore, Functions) to handle spikes in traffic without manual intervention.
- Maintainability: Using small, focused functions and managed services minimizes infrastructure overhead and simplifies updates.
- Performance: Direct client-to-database access via SDK reduces latency; Cloud Functions are regionally distributed.

## 2. Database Management

We rely on **Cloud Firestore**, a NoSQL document database, to store and retrieve all application data.

Database components:
- Firestore (NoSQL document store) for persistent data.  
- Firebase Authentication for user identity and session management.  
- Cloud Storage for any large binary files (if needed, such as design assets).

Data practices:
- Collections & Documents: Data is organized into top-level collections (e.g., `users`, `designTokens`). Each document holds JSON-style key/value pairs.  
- Offline Support: The client SDK caches data locally for improved performance and offline usage.  
- Backup & Export: Firestore offers automated daily backups and exports via scheduled Cloud Functions or Google Cloud scheduler jobs.

## 3. Database Schema

Below is a human-readable overview of our Firestore collections and documents.

Collection: users
• Document ID: user’s Firebase UID  
• Fields:
  – `email` (string)  
  – `displayName` (string)  
  – `role` (string, e.g., "admin" or "editor")  
  – `createdAt` (timestamp)  
  – `lastLogin` (timestamp)

Collection: designTokens
• Document ID: token set name (e.g., "global-tokens")  
• Fields:
  – `version` (number)  
  – `tokens` (map of tokenName → value)  
  – `updatedBy` (user UID)  
  – `updatedAt` (timestamp)

Collection: tokenHistory
• Document ID: automatic Firestore ID  
• Fields:
  – `designTokenId` (reference to designTokens document)  
  – `changes` (map of tokenName → { oldValue, newValue })  
  – `changedBy` (user UID)  
  – `changedAt` (timestamp)

Collection: sessions (optional)
• Document ID: session ID  
• Fields:
  – `userId` (reference to users collection)  
  – `createdAt` (timestamp)  
  – `expiresAt` (timestamp)

## 4. API Design and Endpoints

Instead of a classic REST server, we use a combination of **Firebase client SDK calls** and **Cloud Function HTTP endpoints** for specialized workflows.

Client SDK-based operations:
- `firebase.auth().signInWithEmailAndPassword(email, password)` → handles login  
- `firestore().collection('designTokens').doc(id).get()` → fetches latest tokens  
- `firestore().collection('users').doc(uid).update({...})` → updates user profile

Key Cloud Function endpoints (HTTP-triggered):
- `POST /api/syncTokens`
  • Purpose: Programmatically trigger a sync of Figma design tokens from an external source into Firestore.  
  • Input: JSON payload of tokens.  
  • Workflow: Validates incoming data, writes to `designTokens`, and logs a `tokenHistory` entry.

- `GET /api/exportTokens`
  • Purpose: Returns the current token set as a downloadable JSON file.  
  • Security: Requires a valid Firebase Auth ID token in the request header.

All function endpoints enforce authentication by verifying Firebase ID tokens and checking custom claims (for example, only users with role `admin` can call certain functions).

## 5. Hosting Solutions

We host the backend using **Firebase Hosting** and **Cloud Functions**, all within the Google Cloud Platform.

Why Firebase Hosting:
- Global CDN by default, ensuring fast content delivery worldwide.  
- Automatic HTTPS with free SSL certificates.  
- Built-in support for rewrites to Cloud Functions or client app hosting.

Why Cloud Functions:
- No servers to maintain—automatically scales up or down.  
- Native integration with Firestore triggers and Google Cloud services.  
- Pay-as-you-go billing model to optimize costs.

## 6. Infrastructure Components

Our backend leverages these core infrastructure pieces:

• Load Balancing & CDN:
  – Handled automatically by Firebase Hosting’s global CDN.  
• Caching:
  – Firestore SDK’s client-side cache for reads.  
  – Optional HTTP caching headers on Function responses for static assets.  
• Content Delivery Network (CDN):
  – Firebase Hosting caches both static files (like JSON exports) and dynamic Cloud Function responses at edge locations.

Together, these components minimize latency, improve fault tolerance, and deliver consistent performance.

## 7. Security Measures

We implement multiple layers of security to protect user data and comply with best practices:

Authentication & Authorization:
- Firebase Authentication with email/password and optional OAuth providers (Google, GitHub).  
- Custom claims to assign roles (`admin`, `editor`, `viewer`).  
- Security Rules on Firestore to enforce document-level access control (for example, only the token owner or an admin can update a designTokens document).

Data Encryption:
- All data in transit is protected by HTTPS (TLS).  
- Firestore data at rest is encrypted by Google’s default encryption.

Environment Secrets:
- Sensitive configuration (for example, third-party API keys) stored in Firebase Functions environment variables, not checked into source control.

Regulatory Compliance:
- Google Cloud’s managed services help meet GDPR and other regional data regulations when configured appropriately.

## 8. Monitoring and Maintenance

We keep the backend healthy and performant using these tools and practices:

Monitoring:
- Firebase Console dashboards for Auth, Firestore, Functions usage and error rates.  
- Google Cloud Logging (Stackdriver) collects logs from Cloud Functions, searchable by function name and severity.  
- Error Reporting to capture uncaught exceptions in Cloud Functions.

Maintenance:
- Automated backup and export of Firestore data via scheduled Cloud Functions or Google Cloud Scheduler.  
- Dependency updates managed through a regular review process and automated pull requests (using tools like Dependabot).  
- Periodic reviews of Security Rules and IAM roles to ensure least privilege.

## 9. Conclusion and Overall Backend Summary

In summary, our backend uses a fully managed, serverless approach powered by Firebase. By leveraging Firestore, Firebase Authentication, Hosting, and Cloud Functions, we get:

- **Scalability & Performance:** Google’s infrastructure auto-scales and delivers content via a global CDN.  
- **Simplicity & Maintainability:** Minimal operational overhead—no servers to patch or manage.  
- **Security & Compliance:** Built-in encryption, robust security rules, and identity management.  

This setup aligns perfectly with the goals of a React-focused UI library: it handles all backend concerns out of the box and lets the frontend code remain lean and focused on component development. The serverless model also means that as your component library gains adoption, you won’t need to worry about provisioning or scaling new backend servers—Firebase has you covered.