# AI Instructions & Project Context

Hello AI Assistant! If you are reading this, you are working on the NeaPure Frontend. Please follow these architectural guidelines strictly:

## Tech Stack & Architecture
- **Framework:** Next.js (App Router paradigm). Do NOT use the old `pages/` directory.
- **Styling:** Tailwind CSS. Use semantic class names.
- **Components:** React Server Components (RSC) are default. If you need hooks (e.g. `useState`, `useEffect`, `usePathname`), you MUST add `"use client";` at the very top of the file.
- **Icons:** We use `lucide-react`.

## Folder Structure
- `src/app/admin/*`: Contains all administrative dashboard layouts and pages.
- `src/components/ui/*`: Reusable, generic UI components (Buttons, Inputs, Tables, Cards). Build these organically with Tailwind. Do NOT introduce heavyweight UI libraries unless explicitly requested.
- `src/components/admin/*`: Layout-specific components like `Sidebar.tsx` and `AdminNavbar.tsx`.
- `src/services/*`: API service layer handling external data fetching.

## API Integration Rules
- All HTTP requests MUST go through `src/services/apiClient.ts`.
- The backend is a Django REST Framework API. 
- **CRITICAL:** The Django API always wraps its responses in a custom object: `{"success": true, "data": { ...actual content... }}`. The `apiClient.ts` handles unwrapping this. Do not try to unwrap it in individual components.
- When creating a new service (e.g. `productService.ts`), strictly define TypeScript interfaces (`export interface Product { ... }`) that mirror the Django models.

## Design Philosophy
- Follow clean, modern administrative UI patterns. 
- Stick to the existing color palette (blues, grays) and Geist typography.
- Always include dark mode variants (`dark:bg-gray-900`, etc.) when adding new components.
