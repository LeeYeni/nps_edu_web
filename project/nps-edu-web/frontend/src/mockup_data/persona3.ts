import { User, ExamAttempt, RefundRecord } from "@/schema/persona";

/**
 * Persona 3: 저소득층 다회차 이용자
 * - userId: 3
 * - 시나리오: 이미 4회 환급 승인을 받았으며, 현재 마지막 5회차(ADsP) 신청 중
 * - 특징: 한도 도달(5회) 알림 로직 테스트용
 */

const user: User = {
  id: 3,
  name: '최ㅇㅇ',
  isLowIncome: true,
  totalRefundApprovedCount: 4, // 이미 4회 승인됨
  description: "저소득층 다회차 이용자 | 현재 마지막 5회차 지원 단계 (한도 도달 안내 대상)"
};

const examAttempts: ExamAttempt[] = [
  {
    id: 1,
    userId: 3,
    certificateId: 2, // SQLD
    isPassed: true,
    verificationDocUrl: 'https://example.com/docs/adsp-pass.pdf',
  },
  {
    id: 2,
    userId: 3,
    certificateId: 5, // 리눅스마스터 2급 (추가 응시 이력)
    isPassed: true,
    verificationDocUrl: 'https://example.com/docs/linux-pass.pdf',
  }
];

const refundRecords: RefundRecord[] = [
  // 과거 이력 1 (승인 완료)
  {
    id: 1,
    userId: 3,
    certificateId: 4, // ADsP
    examAttemptId: 1,
    requestDate: '2024-02-01',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2024-02-10',
    refundAmount: 25000,
  },
  // 과거 이력 2 (승인 완료)
  {
    id: 2,
    userId: 3,
    certificateId: 6, // 네트워크 관리사
    examAttemptId: 2,
    requestDate: '2024-05-01',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2024-05-15',
    refundAmount: 50000,
  },
  // 과거 이력 3 (승인 완료 - 과거 데이터 ID 103)
  {
    id: 3,
    userId: 3,
    certificateId: 3, // 컴퓨터활용능력 1급
    examAttemptId: 103,
    requestDate: '2025-01-10',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2025-01-20',
    refundAmount: 20000,
  },
  // 과거 이력 4 (승인 완료 - 과거 데이터 ID 104)
  {
    id: 4,
    userId: 3,
    certificateId: 1, // 정보처리기사
    examAttemptId: 104,
    requestDate: '2025-10-25',
    status: 'APPROVED',
    isExceptionApplied: false,
    approvedDate: '2025-11-05',
    refundAmount: 44000,
  },
  // 현재 진행 중 (대기 - 마지막 5회차)
  {
    id: 5,
    userId: 3,
    certificateId: 2, // SQLD 재참조
    examAttemptId: 1, 
    requestDate: '2026-03-12',
    status: 'PENDING',
    isExceptionApplied: false,
  },
  {
    id: 6,
    userId: 3,
    certificateId: 5, // 리눅스 마스터 재참조
    examAttemptId: 1, 
    requestDate: '2026-03-12',
    status: 'PENDING',
    isExceptionApplied: false,
  }
];

export const persona3 = {
  user,
  examAttempts,
  refundRecords,
};