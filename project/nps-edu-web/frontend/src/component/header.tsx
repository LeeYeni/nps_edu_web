"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, LogOut, FileText, ChevronDown } from "lucide-react";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [persona, setPersona] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // 로컬스토리지 데이터를 상태에 반영하는 함수
  const updateStateFromStorage = () => {
    const loginItem = localStorage.getItem("isLogin") === "true";
    const personaItem = localStorage.getItem("persona");
    setIsLogin(loginItem);
    setPersona(personaItem);
  };

  useEffect(() => {
    // 1. 마운트 시 최초 실행
    updateStateFromStorage();

    // 2. 브라우저의 스토리지 변화 감지 (다른 탭 혹은 동일 페이지 이벤트)
    window.addEventListener("storage", updateStateFromStorage);
    
    // 3. 같은 페이지 내에서 setItem 호출 시 강제로 이벤트를 발생시켜 감지
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      window.dispatchEvent(new Event("storage")); // 수동으로 이벤트 트리거
    };

    return () => {
      window.removeEventListener("storage", updateStateFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("persona");
    localStorage.removeItem("user_refund_requests");
    window.dispatchEvent(new Event("storage"));
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 transition-colors hover:text-blue-700">
          <span className="tracking-tight text-gray-900">자격있네</span>
        </Link>

        {/* 네비게이션 및 유저 메뉴 */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pl-3 transition-all hover:border-blue-300 hover:shadow-md active:scale-95"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <User size={18} />
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
              </button>

              {/* 드롭다운 메뉴 */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    My Menu
                  </div>
                  
                  <Link
                    href="/exam"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                  >
                    <FileText size={16} /> 내가 응시한 시험
                  </Link>

                  <Link
                    href="/refund"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                  >
                    <FileText size={16} /> 환급 신청 내역
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <Link
                    href="/"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={16} /> 로그아웃
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </header>
  );
}