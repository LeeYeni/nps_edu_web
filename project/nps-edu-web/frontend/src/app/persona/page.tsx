"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PersonaCard from "@/component/persona";
import { persona1 } from "@/mockup_data/persona1";
import { persona2 } from "@/mockup_data/persona2";
import { persona3 } from "@/mockup_data/persona3";

export default function PersonaPage() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  useEffect(() => {
    // 이미 선택된 페르소나가 있는지 확인
    const savedPersona = localStorage.getItem("persona");
    setSelectedPersona(savedPersona);
  }, []);

  const handleSelectPersona = (personaKey: string) => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("persona", personaKey);
    
    // Header와 동기화를 위해 커스텀 이벤트 발생
    window.dispatchEvent(new Event("storage")); 
    
    setSelectedPersona(personaKey);
    
    // 선택 완료 후 메인 대시보드로 이동
    router.push("/study");
  };

  const personas = [
    { key: "persona1", data: persona1.user },
    { key: "persona2", data: persona2.user },
    { key: "persona3", data: persona3.user },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-6xl w-full text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
          테스트를 위한 페르소나를 선택해주세요
        </h1>
        <p className="mb-12 text-gray-500 text-lg">
          유형에 따라 환급 한도 및 불합격 예외 로직이 다르게 적용됩니다.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {personas.map((p) => (
            <PersonaCard
              key={p.key}
              user={p.data}
              personaKey={p.key}
              isSelected={selectedPersona === p.key}
              onSelect={handleSelectPersona}
            />
          ))}
        </div>
      </div>
    </div>
  );
}