export function chatAnnouncement(
  messages: { role: "user" | "assistant"; text: string; actionLabel?: string }[],
  loading: boolean
): string {
  if (loading) return "답변을 작성하고 있습니다.";
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.role !== "assistant") return "";
  return `가람의 답변: ${lastMessage.text}${lastMessage.actionLabel ? ` ${lastMessage.actionLabel} 링크가 있습니다.` : ""}`;
}
