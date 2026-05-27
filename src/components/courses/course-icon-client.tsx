"use client";

import React from 'react';
import { getDashboardIcon } from '@/components/dashboard/icon-map';

interface Props {
  iconName?: string | null;
  title?: string;
  size?: number;
}

export default function CourseIconClient({ iconName, title, size = 24 }: Props) {
  const Icon = getDashboardIcon((iconName as string) ?? 'sparkles');

  return (
    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04]">
      <Icon style={{ height: size, width: size }} className="text-white" />
    </div>
  );
}
