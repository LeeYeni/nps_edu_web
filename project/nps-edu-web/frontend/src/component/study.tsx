"use client";

import { StudyResource } from "@/schema/study";
import { Lightbulb } from "lucide-react";

interface StudyCardProps {
  resource: StudyResource;
}

export default function StudyCard({ resource }: StudyCardProps) {
  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
      {/* 상단 아이콘 및 배지 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 group-hover:bg-amber-100 transition-colors">
          <Lightbulb size={22} fill="currentColor" className="text-amber-400" />
        </div>
      </div>

      {/* 제목 */}
      <h3 className="mb-3 text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
        {resource.title}
      </h3>

      {/* 본문 (설명/꿀팁 내용) */}
      <div className="relative flex-1">
        <p className="text-sm leading-relaxed text-gray-600 break-keep">
          {resource.description}
        </p>
      </div>
    </div>
  );
}