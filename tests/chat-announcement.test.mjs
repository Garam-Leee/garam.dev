import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { chatAnnouncement } = loadTypeScript("src/lib/chat-announcement.ts");

test("only completed assistant replies are announced in full", () => {
  assert.equal(chatAnnouncement([], false), "");
  const messages = [{ role: "user", text: "질문" }];
  assert.equal(chatAnnouncement(messages, false), "");
  assert.equal(chatAnnouncement(messages, true), "답변을 작성하고 있습니다.");
  messages.push({ role: "assistant", text: "완성된 답변", actionLabel: "프로젝트 보기" });
  assert.match(chatAnnouncement(messages, false), /완성된 답변.*프로젝트 보기/);
  messages.push({ role: "user", text: "다음 질문" });
  assert.doesNotMatch(chatAnnouncement(messages, true), /완성된 답변/);
});
