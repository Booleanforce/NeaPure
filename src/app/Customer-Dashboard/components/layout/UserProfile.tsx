"use client";

import Image from "next/image";

/**
 * Extracted from the avatar + name block inside the old TopHeader so it
 * can be reused (e.g. in a mobile nav or settings page) without pulling in
 * the whole Topbar.
 */
export default function UserProfile({
  name,
  avatarSrc,
}: {
  name: string;
  avatarSrc: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-200">
        <Image
          src={avatarSrc}
          alt={name}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="hidden text-xs font-semibold text-slate-700 sm:block">
        {name}
      </p>
    </div>
  );
}