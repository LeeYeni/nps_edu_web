"use client";

import { ExamAttempt } from "@/schema/persona";
import { certificates } from "@/mockup_data/certificate";
import { CheckCircle2, XCircle, ArrowRight, Lock, ClipboardCheck, AlertTriangle } from "lucide-react";

interface ExamCardProps {
  attempt: ExamAttempt;
  isLowIncome: boolean; // 저소득층 여부
  isApplied: boolean;   // 이미 신청했는지 여부
  isLimitReached: boolean; // 전체 환급 한도 도달 여부
  onApply?: () => void; // 신청 버튼 클릭 이벤트
}

export default function ExamCard({ 
  attempt, 
  isLowIncome, 
  isApplied, 
  isLimitReached, 
  onApply 
}: ExamCardProps) {
  const certificate = certificates.find((c) => c.id === attempt.certificateId);
  
  // 1. 환급 기본 조건: 합격했거나 저소득층이거나
  const canApplyBasic = attempt.isPassed || isLowIncome;
  
  // 2. 한도 초과 차단 로직: 한도가 찼는데 아직 신청하지 않은 카드인 경우
  const isBlockedByLimit = isLimitReached && !isApplied;

  return (
    <div className={`group relative overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-300 flex flex-col h-full ${
      isApplied 
        ? "border-blue-200 shadow-sm" 
        : (canApplyBasic && !isBlockedByLimit) 
          ? "border-gray-100 hover:border-blue-100 hover:shadow-2xl" 
          : "border-gray-100 opacity-70 bg-gray-50/50"
    }`}>
      {/* 상단 섹션: 시행처 및 합격여부 */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            {certificate?.publisher}
          </p>
          <h3 className={`text-xl font-black leading-tight transition-colors ${
            isApplied ? "text-blue-700" : (canApplyBasic && !isBlockedByLimit) ? "text-gray-950 group-hover:text-blue-700" : "text-gray-500"
          }`}>
            {certificate?.name}
          </h3>
        </div>

        <div className={`flex items-center gap-1.5 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-extrabold ${
          attempt.isPassed ? "bg-green-100/70 text-green-700" : "bg-red-100/70 text-red-700"
        }`}>
          {attempt.isPassed ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
          {attempt.isPassed ? "합격" : "불합격"}
        </div>
      </div>

      {/* 하단 버튼 섹션 */}
      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">
            {isApplied 
              ? "심사 대기 중" 
              : isBlockedByLimit 
                ? "연간 한도 초과" 
                : !canApplyBasic 
                  ? "환급 대상 아님" 
                  : "신청 가능"}
          </span>
        </div>

        {/* 버튼 상태 분기 */}
        {isApplied ? (
          // 1. 이미 신청 완료된 경우
          <div className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white opacity-60 cursor-default shadow-none">
            <ClipboardCheck size={16} />
            신청 완료
          </div>
        ) : isBlockedByLimit ? (
          // 2. 한도 초과로 막힌 경우
          <div className="flex items-center gap-2 rounded-xl bg-gray-200 px-5 py-3 text-sm font-bold text-gray-400 cursor-not-allowed">
            <AlertTriangle size={16} />
            한도 초과
          </div>
        ) : canApplyBasic ? (
          // 3. 신청 가능한 경우
          <button
            onClick={onApply}
            className="flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 active:scale-95 shadow-lg shadow-gray-200"
          >
            환급 신청하기
            <ArrowRight size={16} />
          </button>
        ) : (
          // 4. 일반 학습자 불합격 등 신청 대상이 아닌 경우
          <div className="flex items-center gap-2 rounded-xl bg-gray-200 px-5 py-3 text-sm font-bold text-gray-400 cursor-not-allowed">
            <Lock size={16} />
            환급 불가
          </div>
        )}
      </div>
      
      {/* 배경 장식 바: 상태별 색상 변경 */}
      <div className={`absolute left-0 top-0 h-full w-1 ${
        isApplied 
          ? 'bg-blue-600' 
          : isBlockedByLimit 
            ? 'bg-amber-400' 
            : canApplyBasic 
              ? (attempt.isPassed ? 'bg-green-500' : 'bg-blue-500') 
              : 'bg-gray-300'
      }`} />
    </div>
  );
}