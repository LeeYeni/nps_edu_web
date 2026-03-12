"use client";

import { useState, useEffect, useMemo } from "react";
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";
import ExamCard from "@/component/exam";
import { ClipboardCheck, Coins, CreditCard } from "lucide-react";

export default function ExamsPage() {
  const [currentPersonaData, setCurrentPersonaData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  useEffect(() => {
    const savedPersona = localStorage.getItem("persona");
    if (savedPersona === "persona1") setCurrentPersonaData(persona1);
    else if (savedPersona === "persona2") setCurrentPersonaData(persona2);
    else if (savedPersona === "persona3") setCurrentPersonaData(persona3);

    const currentStorage = JSON.parse(localStorage.getItem("user_refund_requests") || "[]");
    setAppliedIds(currentStorage.map((r: any) => r.examAttemptId));

    setIsLoaded(true);
  }, []);

  // 💡 수정: attemptId 대신 attempt 객체 전체를 인자로 받습니다.
  const handleApplyRefund = (attempt: any) => {
    const currentStorage = JSON.parse(localStorage.getItem("user_refund_requests") || "[]");
    
    if (currentStorage.some((r: any) => r.examAttemptId === attempt.id)) return;

    const newRequest = {
      id: Date.now(),
      userId: currentPersonaData.user.id,
      // 💡 [중요] certificateId를 반드시 추가해야 환급 내역에서 이름이 뜹니다.
      certificateId: attempt.certificateId, 
      examAttemptId: attempt.id,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      isExceptionApplied: !currentPersonaData.user.isLowIncome ? false : true,
    };

    const updatedStorage = [...currentStorage, newRequest];
    localStorage.setItem("user_refund_requests", JSON.stringify(updatedStorage));
    
    setAppliedIds(updatedStorage.map((r: any) => r.examAttemptId));
    alert("환급 신청이 접수되었습니다.");
  };

  const stats = useMemo(() => {
    if (!currentPersonaData || !currentPersonaData.user) return null;
    const user = currentPersonaData.user;
    
    const maxLimit = user.isLowIncome ? 5 : 3;
    const approvedCount = user.totalRefundApprovedCount;
    const currentAppliedCount = appliedIds.length;
    const totalUsedCount = approvedCount + currentAppliedCount;
    const remainingCount = Math.max(0, maxLimit - totalUsedCount);

    return {
      maxLimit,
      approvedCount,
      remainingCount,
      isLowIncome: user.isLowIncome,
      isLimitReached: totalUsedCount >= maxLimit 
    };
  }, [currentPersonaData, appliedIds]);

  if (!isLoaded || !stats) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
                  <ClipboardCheck size={24} />
                </div>
                <h1 className="text-2xl font-black text-gray-900 sm:text-3xl tracking-tight">나의 응시 현황</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 min-w-[140px]">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Coins size={16} /><span className="text-[11px] font-bold uppercase tracking-wider">누적 승인</span>
                </div>
                <p className="text-2xl font-black text-blue-900">{stats.approvedCount}회</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 min-w-[140px] shadow-xl shadow-gray-200">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <CreditCard size={16} /><span className="text-[11px] font-bold uppercase tracking-wider">잔여 횟수</span>
                </div>
                <p className="text-2xl font-black text-white">{stats.remainingCount}회 <span className="text-sm font-normal text-gray-500 ml-1">/ {stats.maxLimit}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPersonaData.examAttempts.map((attempt: any) => (
            <ExamCard 
              key={attempt.id} 
              attempt={attempt} 
              isLowIncome={stats.isLowIncome}
              isApplied={appliedIds.includes(attempt.id)}
              isLimitReached={stats.isLimitReached}
              // 💡 수정: attempt 객체 자체를 전달합니다.
              onApply={() => handleApplyRefund(attempt)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}