"use client";

import { useState, useEffect } from "react";
import PersonaPage from "./persona/page";
import StudyPage from "./study/page";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 로컬스토리지 상태 확인 함수
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
    setIsLoaded(true); // 데이터를 읽어온 후 렌더링하도록 설정
  };

  useEffect(() => {
    // 1. 초기 마운트 시 확인
    checkLoginStatus();

    // 2. 다른 곳에서 로그인(페르소나 선택) 시 발생하는 스토리지 이벤트 감지
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Hydration 오류 방지 (클라이언트 데이터를 읽기 전까지 빈 화면 처리)
  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full">
        {!isLogin ? (
          // 로그인 전: 페르소나 선택 화면
          <div className="flex flex-col items-center justify-center">
            <PersonaPage />
          </div>
        ) : (
          // 로그인 후: 대시보드(자료실) 화면
          <div className="flex flex-col">
            <StudyPage />
          </div>
        )}
      </div>
    </main>
  );
}