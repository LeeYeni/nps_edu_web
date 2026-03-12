import { Certificate } from "@/schema/certificate";

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "정보처리기사",
    series: "국가기술자격",
    publisher: "한국산업인력공단",
    fee: {
      written: 19400,
      practical: 22600,
    },
    description: "컴퓨터 시스템의 설계, 분석 및 프로그래밍 업무를 수행하기 위한 자격입니다.",
  },
  {
    id: 2,
    name: "SQLD (SQL 개발자)",
    series: "국가공인민간자격",
    publisher: "한국데이터산업진흥원",
    fee: {
      written: 50000,
      practical: 0, // 실기 없음
    },
    description: "데이터베이스 SQL 문장을 작성하고 성능을 최적화하는 능력을 검증합니다.",
  },
  {
    id: 3,
    name: "컴퓨터활용능력 1급",
    series: "국가기술자격",
    publisher: "대한상공회의소",
    fee: {
      written: 20000,
      practical: 25000,
    },
    description: "스프레드시트 및 데이터베이스 활용 능력을 평가하는 국가기술자격 시험입니다.",
  },
  {
    id: 4,
    name: "ADsP (데이터분석 준전문가)",
    series: "국가공인민간자격",
    publisher: "한국데이터산업진흥원",
    fee: {
      written: 50000,
      practical: 0,
    },
    description: "데이터 분석 기획 및 데이터 분석 실무 능력을 평가합니다.",
  },
  {
    id: 5,
    name: "리눅스마스터 2급",
    series: "국가공인민간자격",
    publisher: "한국정보통신진흥협회",
    fee: {
      written: 22000,
      practical: 44000,
    },
    description: "리눅스 기반 시스템의 운영 및 관리 능력을 검증합니다.",
  },
  {
    id: 6,
    name: "네트워크관리사 2급",
    series: "국가공인민간자격",
    publisher: "한국정보통신자격협회",
    fee: {
      written: 43000,
      practical: 78000,
    },
    description: "네트워크 구축 및 운영, 유지보수에 관한 전문 지식과 기술력을 검증합니다.",
  }
];