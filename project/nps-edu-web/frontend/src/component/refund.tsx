"use client";

import { RefundRecord } from "@/schema/persona";
import { certificates } from "@/mockup_data/certificate";
import { Clock, CheckCircle, XCircle, Calendar, Coins } from "lucide-react";

interface RefundRecordCardProps {
  record: RefundRecord;
}

export default function RefundRecordCard({ record }: RefundRecordCardProps) {
  // 💡 [수정] record에 포함된 certificateId를 사용하여 자격증 정보를 직접 매칭합니다.
  // 이제 allExamAttempts를 임포트하거나 루프를 돌 필요가 없어 성능과 정확도가 올라갑니다.
  const certificate = certificates.find(
    (c) => Number(c.id) === Number(record.certificateId)
  );

  // 상태별 스타일 및 아이콘 설정
  const statusConfig = {
    PENDING: { 
      label: "심사 중", 
      color: "text-amber-600 bg-amber-50 border-amber-100", 
      icon: <Clock size={14} /> 
    },
    APPROVED: { 
      label: "환급 완료", 
      color: "text-green-600 bg-green-50 border-green-100", 
      icon: <CheckCircle size={14} /> 
    },
    REJECTED: { 
      label: "반려됨", 
      color: "text-red-600 bg-red-50 border-red-100", 
      icon: <XCircle size={14} /> 
    },
  };

  const currentStatus = statusConfig[record.status as keyof typeof statusConfig] || statusConfig.PENDING;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md">
      {/* 상단: 상태 배지 및 신청일 */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold border ${currentStatus.color}`}>
          {currentStatus.icon}
          {currentStatus.label}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
          <Calendar size={12} />
          신청일: {record.requestDate.replace(/-/g, '.')}
        </div>
      </div>

      {/* 중간: 자격증 명칭 (certificateId 기반 직결) */}
      <div className="mb-5 text-left">
        <p className="text-lg font-black text-gray-900 tracking-tight leading-tight">
          {certificate?.name || `알 수 없는 자격증 (ID:${record.certificateId})`}
          {record.isExceptionApplied && (
            <span className="ml-2 inline-block text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded border border-purple-100 align-middle">
              예외적용
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          {certificate?.publisher || "시행처 정보 없음"}
        </p>
      </div>

      {/* 하단: 결과 정보 및 환급액 */}
      <div className="flex items-end justify-between border-t border-gray-50 pt-4 mt-auto">
        {record.status === 'APPROVED' ? (
          <>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">환급 완료일</span>
              <span className="text-xs font-semibold text-gray-600">
                {record.approvedDate?.replace(/-/g, '.')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 block mb-0.5 tracking-tighter">환급액</span>
              <div className="flex items-center gap-1 text-blue-600">
                <Coins size={16} />
                <span className="text-xl font-black">{record.refundAmount?.toLocaleString()}원</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-gray-400 bg-gray-50/50 w-full p-3 rounded-xl border border-gray-100 border-dashed">
            <Clock size={16} className="text-gray-300" />
            <span className="text-xs font-medium italic">증빙 서류 검토가 진행 중입니다.</span>
          </div>
        )}
      </div>

      {/* 포인트 사이드 바 디자인 */}
      <div className={`absolute left-0 top-0 h-full w-1 ${
        record.status === 'APPROVED' ? 'bg-green-500' : 'bg-amber-400'
      }`} />
    </div>
  );
}