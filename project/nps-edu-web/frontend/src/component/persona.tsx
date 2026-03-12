"use client";

import { User } from "@/schema/persona";
import {
  UserCircle2, 
  Target
} from "lucide-react";

interface PersonaCardProps {
  user: User;
  isSelected: boolean;
  onSelect: (personaId: string) => void;
  personaKey: string;
}

export default function PersonaCard({ user, isSelected, onSelect, personaKey }: PersonaCardProps) {
  // 저소득층 여부에 따른 뱃지 및 테마 컬러
  const isLowIncome = user.isLowIncome;
  
  const badgeStyles = isLowIncome 
    ? "bg-purple-100 text-purple-700 border-purple-200" 
    : "bg-blue-100 text-blue-700 border-blue-200";

  return (
    <div
      onClick={() => onSelect(personaKey)}
      className={`group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ${
        isSelected
          ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500 shadow-md"
          : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {/* 1. 상단 배지 및 선택 표시 */}
      <div className="flex items-start justify-between mb-5">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-tight ${badgeStyles}`}>
          <Target size={12} />
          {isLowIncome ? "저소득층 학습자" : "일반 학습자"}
        </span>
      </div>

      {/* 2. 유저 이름 */}
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-lg p-2 ${isLowIncome ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
          <UserCircle2 size={24} />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
          {user.name}
        </h3>
      </div>

      {/* 3. 누적 정보 필드 */}
      <div className="mb-5 flex items-center gap-4 rounded-xl bg-gray-50/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">누적 승인</span>
            <span className="text-sm font-black text-gray-700 leading-none">
              {user.totalRefundApprovedCount}회
            </span>
          </div>
        </div>
        <div className="h-6 w-[1px] bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">지원 한도</span>
            <span className="text-sm font-black text-gray-700 leading-none">
              {isLowIncome ? "최대 5회" : "최대 3회"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. 상세 설명 - 좌측 정렬 및 레이아웃 최적화 */}
      <div className="mt-auto w-full text-left">
        <p className="text-sm leading-relaxed text-gray-600 font-medium break-keep">
          {user.description}
        </p>
      </div>
    </div>
  );
}