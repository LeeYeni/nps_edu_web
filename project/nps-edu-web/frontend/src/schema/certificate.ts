export interface Certificate {
  id: number;           // 1부터 시작하는 고유 ID
  name: string;         // 자격증 이름 (예: 정보처리기사)
  series: string;       // 계열 (예: 국가기술자격, 민간자격)
  publisher: string;    // 시행처 (예: 한국산업인력공단)
  fee: {
    written: number;    // 필기 응시료
    practical: number;  // 실기 응시료
  };
  description: string;  // 자격증 간단 설명
}