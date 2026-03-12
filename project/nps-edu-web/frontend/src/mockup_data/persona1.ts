import { User, ExamAttempt, RefundRecord } from "@/schema/persona";

/**
 * Persona 1: 일반 학습자
 * - 모든 ID는 각 도메인 내에서 1부터 시작
 * - 자격증 참조: 정보처리기사 (certificateId: 1)
 */

const user: User = {
  id: 1,
  name: '김ㅇㅇ',
  isLowIncome: false,
  totalRefundApprovedCount: 0,
  description: "저소득층 해당 없음 | 합격 인증 시 응시료 100% 환급 (현재 1회차 신청 중)"
};

const examAttempts: ExamAttempt[] = [
  {
    id: 1, // 첫 번째 응시 (합격)
    userId: 1,
    certificateId: 1, // 정보처리기사
    isPassed: true,
    verificationDocUrl: 'https://example.com/certs/info-pass.pdf',
  },
  {
    id: 2, // 두 번째 응시 (불합격)
    userId: 1,
    certificateId: 2, // SQLD
    isPassed: false,   // 일반 학습자이므로 이 건은 환급 신청이 불가능해야 함
    verificationDocUrl: 'https://example.com/certs/sqld-fail.pdf',
  },
];

// 환급 레코드에는 조건에 맞는 '합격' 건만 초기 데이터로 포함
const refundRecords: RefundRecord[] = [
  {
    id: 1,
    userId: 1,
    certificateId: 1, // 정보처리기사 직접 참조
    examAttemptId: 1,
    requestDate: '2026-03-12',
    status: 'PENDING',
    isExceptionApplied: false,
  },
];

export const persona1 = {
  user,
  examAttempts,
  refundRecords,
};