import type { ChatIntent } from "@/data/chat";

// Specific destinations take precedence over broad topics such as projects.
const rules: { intent: ChatIntent; pattern: RegExp }[] = [
  { intent: "linkedin", pattern: /링크드인|\blinkedin\b/i },
  { intent: "resume", pattern: /이력서|경력\s*기술서|\b(?:resume|résumé|cv)\b/i },
  { intent: "chat", pattern: /연락|메일|이메일|이야기|\b(?:contact|email|e-mail|chat|talk)\b/i },
  { intent: "growth", pattern: /개선|성과|성장|최적화|성능|데이터\s*분석|\b(?:growth|impact|improve\w*|performance|optimi[sz]\w*)\b/i },
  { intent: "work", pattern: /기술\s*사례|실시간\s*상담|도면\s*편집|운영\s*어드민/i },
  { intent: "tools", pattern: /기술|스택|\b(?:react|next\.js|nextjs|typescript|javascript|swr|zustand|tech|stack|tools)\b/i },
  { intent: "work", pattern: /프로젝트|서비스|작업|\b(?:work|projects?|services?|portfolio)\b/i },
  { intent: "developer", pattern: /개발자|소개|어떤\s*사람|\b(?:about|developer|introduc\w*)\b/i },
];

export function detectIntent(question: string): ChatIntent {
  const value = question.normalize("NFKC").trim();
  return rules.find(({ pattern }) => pattern.test(value))?.intent ?? "fallback";
}
