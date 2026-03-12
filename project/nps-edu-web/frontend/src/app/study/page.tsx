"use client";

import { useState, useMemo } from "react";
import { studyResources } from "@/mockup_data/study";
import { certificates } from "@/mockup_data/certificate";
import StudyCard from "@/component/study";
import { BookOpen } from "lucide-react";

export default function StudyPage() {
  // 기본값은 0 (전체 자료 노출)
  const [selectedCertId, setSelectedCertId] = useState<number>(0);

  // 1. 실제 자료가 존재하는 자격증 ID들만 추출 (중복 제거)
  const availableCertIds = useMemo(() => {
    return Array.from(new Set(studyResources.map((res) => res.certificateId)));
  }, []);

  // 2. 자료가 있는 자격증만 필터링하여 탭 목록 생성
  const availableCertificates = useMemo(() => {
    return certificates.filter((cert) => availableCertIds.includes(cert.id));
  }, [availableCertIds]);

  // 3. 선택된 탭에 따른 리스트 계산 (0이면 전체)
  const filteredResources = useMemo(() => {
    if (selectedCertId === 0) return studyResources;
    return studyResources.filter((res) => res.certificateId === selectedCertId);
  }, [selectedCertId]);

  return (
    <div className="flex-1 bg-gray-50/50 pb-20">
      {/* 상단 헤더 섹션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-100">
              <BookOpen size={24} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 sm:text-3xl tracking-tight">
              합격 꿀팁 자료실
            </h1>
          </div>
          <p className="text-gray-500 font-medium max-w-2xl break-keep">
            선배 합격자들이 직접 작성한 과목별 요약과 단기 합격 전략을 확인하세요.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* 필터 탭 섹션 */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCertId(0)}
            className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
              selectedCertId === 0
                ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            전체
          </button>
          
          {availableCertificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCertId(cert.id)}
              className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                selectedCertId === cert.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cert.name}
            </button>
          ))}
        </div>

        {/* 꿀팁 카드 그리드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <StudyCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}