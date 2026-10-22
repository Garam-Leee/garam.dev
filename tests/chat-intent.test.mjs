import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { detectIntent } = loadTypeScript("src/lib/chat-intent.ts");

test("specific questions take precedence over broad project words", () => {
  for (const [question, intent] of [
    ["서비스 개선 성과를 알려주세요", "growth"],
    ["React 성능 최적화 경험", "growth"],
    ["프로젝트에 사용한 기술 스택", "tools"],
    ["프로젝트 이력서를 보고 싶어요", "resume"],
    ["개발자님 이메일로 연락하고 싶어요", "chat"],
    ["링크드인 주소", "linkedin"],
    ["My Work", "work"],
    ["About Me", "developer"],
    ["How I Improve Products", "growth"],
    ["Tech Stack", "tools"],
    ["Let's Talk", "chat"],
    ["ＣＶ", "resume"],
    ["LINKEDIN", "linkedin"],
  ]) assert.equal(detectIntent(question), intent, question);
});

test("word fragments and unknown questions do not match English keywords", () => {
  for (const question of ["network", "reaction", "next steps", "", "오늘 날씨는?"]) {
    assert.equal(detectIntent(question), "fallback", question);
  }
});
