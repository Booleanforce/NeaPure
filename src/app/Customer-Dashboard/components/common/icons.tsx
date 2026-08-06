/* Pixel-exact SVGs pasted from Figma, used instead of the closest lucide
   equivalent so the icon shapes match the design exactly. Moved here from
   the old single Dashboard.tsx so any card that needs them can import
   from one place instead of redefining them. */

export function VerifiedCheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M40 26C40 36 33 41 24.68 43.9C24.2443 44.0477 23.7711 44.0406 23.34 43.88C15 41 8 36 8 26V12C8 11.4696 8.21071 10.9609 8.58579 10.5858C8.96086 10.2108 9.46957 10 10 10C14 10 19 7.60004 22.48 4.56004C22.9037 4.19804 23.4427 3.99915 24 3.99915C24.5573 3.99915 25.0963 4.19804 25.52 4.56004C29.02 7.62004 34 10 38 10C38.5304 10 39.0391 10.2108 39.4142 10.5858C39.7893 10.9609 40 11.4696 40 12V26Z"
        fill="#00BC7D"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 24L22 28L30 20"
        fill="#00BC7D"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReminderBellIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M5.98962 12.25C6.09202 12.4273 6.2393 12.5746 6.41665 12.677C6.594 12.7794 6.79517 12.8333 6.99996 12.8333C7.20474 12.8333 7.40592 12.7794 7.58327 12.677C7.76061 12.5746 7.90789 12.4273 8.01029 12.25"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.90277 8.94013C1.82657 9.02365 1.77628 9.12752 1.75802 9.2391C1.73976 9.35067 1.75433 9.46515 1.79994 9.56861C1.84554 9.67206 1.92024 9.76003 2.01492 9.82182C2.10961 9.88361 2.22021 9.91654 2.33327 9.91663H11.6666C11.7797 9.91667 11.8903 9.88386 11.985 9.82219C12.0798 9.76052 12.1546 9.67265 12.2003 9.56926C12.246 9.46587 12.2607 9.35142 12.2426 9.23984C12.2245 9.12825 12.1744 9.02432 12.0983 8.94071C11.3224 8.14096 10.4999 7.29104 10.4999 4.66663C10.4999 3.73837 10.1312 2.84813 9.47481 2.19175C8.81844 1.53537 7.9282 1.16663 6.99994 1.16663C6.07168 1.16663 5.18144 1.53537 4.52507 2.19175C3.86869 2.84813 3.49994 3.73837 3.49994 4.66663C3.49994 7.29104 2.67686 8.14096 1.90277 8.94013Z"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReplacementKitIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M11.6667 4.66663H2.33333C2.01117 4.66663 1.75 4.92779 1.75 5.24996V6.41663C1.75 6.73879 2.01117 6.99996 2.33333 6.99996H11.6667C11.9888 6.99996 12.25 6.73879 12.25 6.41663V5.24996C12.25 4.92779 11.9888 4.66663 11.6667 4.66663Z"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 4.66663V12.25"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0833 7V11.0833C11.0833 11.3928 10.9604 11.6895 10.7416 11.9083C10.5228 12.1271 10.226 12.25 9.91663 12.25H4.08329C3.77387 12.25 3.47713 12.1271 3.25833 11.9083C3.03954 11.6895 2.91663 11.3928 2.91663 11.0833V7"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.37496 4.66668C3.98819 4.66668 3.61725 4.51303 3.34376 4.23954C3.07027 3.96605 2.91663 3.59512 2.91663 3.20834C2.91663 2.82157 3.07027 2.45064 3.34376 2.17715C3.61725 1.90366 3.98819 1.75001 4.37496 1.75001C4.93769 1.74021 5.48914 2.01325 5.95739 2.53352C6.42564 3.0538 6.78895 3.79716 6.99996 4.66668C7.21096 3.79716 7.57428 3.0538 8.04253 2.53352C8.51078 2.01325 9.06223 1.74021 9.62496 1.75001C10.0117 1.75001 10.3827 1.90366 10.6562 2.17715C10.9296 2.45064 11.0833 2.82157 11.0833 3.20834C11.0833 3.59512 10.9296 3.96605 10.6562 4.23954C10.3827 4.51303 10.0117 4.66668 9.62496 4.66668"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
