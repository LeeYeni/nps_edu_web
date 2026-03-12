import { User, ExamAttempt, RefundRecord } from "@/schema/persona";

/**
 * Persona 2: 저소득층 학습자
 * - userId: 2 (모든 관련 데이터에 적용)
 * - 시나리오: SQLD 시험(ID: 2) 불합격 후 예외 조항으로 환급 신청 중
 */

const user: User = {
  id: 2, // 유저 ID를 2로 설정
  name: '이ㅇㅇ',
  isLowIncome: true,
  totalRefundApprovedCount: 2,
  description: "저소득층 | 불합격 시에도 재도전 응시료 지원 (동일 시험 3회 한도 내)"
};

const examAttempts: ExamAttempt[] = [
  {
    id: 1,
    userId: 2,
    certificateId: 2, // SQLD
    isPassed: false,   // 저소득층은 불합격해도 환급 신청 가능 시나리오
    verificationDocUrl: 'https://example.com/docs/sqld-fail.pdf',
  },
];

const refundRecords: RefundRecord[] = [
  // 과거 이력 1 (승인 완료 - 컴활)
  {
    id: 1,
    userId: 2,
    certificateId: 3, // 💡 직접 추가: 컴퓨터활용능력 1급
    examAttemptId: 98,
    requestDate: '2025-11-10',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2025-11-20',
    refundAmount: 20000,
  },
  // 과거 이력 2 (승인 완료 - SQLD)
  {
    id: 2,
    userId: 2,
    certificateId: 4, // ADsP (데이터분석 준전문가)
    examAttemptId: 99,
    requestDate: '2025-12-10',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2025-12-20',
    refundAmount: 50000,
  },
  // 현재 진행 중 (대기 - SQLD 불합격 건)
  {
    id: 3,
    userId: 2,
    certificateId: 2, // 💡 직접 추가: SQLD
    examAttemptId: 1, 
    requestDate: '2026-03-12',
    status: 'PENDING',
    isExceptionApplied: true, // 저소득층 전용 불합격 예외 로직 적용됨
  }
];

export const persona2 = {
  user,
  examAttempts,
  refundRecords,
};