// 유저 기본 정보
export interface User {
  id: number;
  name: string;
  isLowIncome: boolean; // 저소득층 여부
  totalRefundApprovedCount: number; // 전체 누적 환급 승인 건수 (최대 5회 제한 확인용)
  description: string;
}

// 자격증 시험 응시 데이터
export interface ExamAttempt {
  id: number;
  userId: number;
  certificateId: number;
  isPassed: boolean; // 합격 여부
  verificationDocUrl?: string; // 증빙 서류 (합격증 등)
}

export type RefundStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RefundRecord {
  id: number;
  userId: number;
  certificateId: number;
  examAttemptId: number;
  requestDate: string;      // 신청 날짜
  status: RefundStatus;     // 상태 (대기, 승인, 반려)
  isExceptionApplied: boolean; // 저소득층 불합격 예외 적용 여부
  approvedDate?: string;    // 승인된 날짜 (완료 시에만 존재)
  refundAmount?: number;    // 환급된 금액 (완료 시에만 존재)
  rejectReason?: string;    // 반려 시 사유 (반려 시에만 존재)
}