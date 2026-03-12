"use client";

import { useState, useEffect, useMemo } from "react";
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import RefundRecordCard from "@/component/refund";
import { History, Receipt, AlertCircle } from "lucide-react";

export default function RefundsPage() {
  const [currentPersonaData, setCurrentPersonaData] = useState<any>(null);
  const [localRecords, setLocalRecords] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. 페르소나 데이터 로드
    const savedPersona = localStorage.getItem("persona");
    let baseData = null;
    if (savedPersona === "persona1") baseData = persona1;
    else if (savedPersona === "persona2") baseData = persona2;
    else if (savedPersona === "persona3") baseData = persona3;
    
    setCurrentPersonaData(baseData);

    // 2. localStorage에서 직접 신청한 내역 가져오기
    if (baseData) {
      const stored = JSON.parse(localStorage.getItem("user_refund_requests") || "[]");
      // 현재 유저의 아이디와 일치하는 신청 건만 필터링
      const myRequests = stored.filter((r: any) => r.userId === baseData.user.id);
      setLocalRecords(myRequests);
    }

    setIsLoaded(true);
  }, []);

  // 💡 데이터 병합 로직: 목업의 APPROVED + 로컬의 PENDING
  const combinedRecords = useMemo(() => {
    if (!currentPersonaData) return [];
    
    // 1. 사용자가 직접 신청한 실시간 데이터 (PENDING)
    const userPendingRecords = localRecords;

    // 2. 목업 데이터 중 'APPROVED(승인완료)' 상태인 것만 유지
    const pastApprovedRecords = currentPersonaData.refundRecords.filter(
      (record: any) => record.status === 'APPROVED'
    );

    // 3. 병합
    const merged = [...userPendingRecords, ...pastApprovedRecords];
    
    // 4. 최신순 정렬 (ID 기준 내림차순)
    return merged.sort((a, b) => b.id - a.id);
  }, [currentPersonaData, localRecords]);

  // 통계 계산
  const refundSummary = useMemo(() => {
    const totalAmount = combinedRecords
      .filter((r: any) => r.status === "APPROVED")
      .reduce((acc: number, cur: any) => acc + (cur.refundAmount || 0), 0);
    
    const pendingCount = combinedRecords.filter((r: any) => r.status === "PENDING").length;
    const approvedCount = combinedRecords.filter((r: any) => r.status === "APPROVED").length;

    return { totalAmount, pendingCount, approvedCount };
  }, [combinedRecords]);

  if (!isLoaded || !currentPersonaData) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* 요약 배너 */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-100">
              <History size={24} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 sm:text-3xl tracking-tight">
              환급 신청 내역
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-gray-200">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Receipt size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">총 환급 완료 금액</span>
              </div>
              <p className="text-3xl font-black">{refundSummary.totalAmount.toLocaleString()}원</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">승인 완료</span>
              <p className="text-3xl font-black text-gray-900">{refundSummary.approvedCount}건</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">현재 심사 중</span>
                {refundSummary.pendingCount > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </div>
              <p className="text-3xl font-black text-gray-900">{refundSummary.pendingCount}건</p>
            </div>
          </div>
        </div>
      </div>

      {/* 리스트 영역 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            전체 신청 기록
            <span className="text-sm font-normal text-gray-400">
              ({combinedRecords.length}건)
            </span>
          </h2>
        </div>

        {combinedRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combinedRecords.map((record: any) => (
              <RefundRecordCard key={`${record.id}-${record.examAttemptId}`} record={record} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-gray-100 shadow-sm">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <AlertCircle size={40} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-bold text-lg">아직 신청한 환급 내역이 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">응시한 시험 결과를 확인하고 환급을 신청해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}