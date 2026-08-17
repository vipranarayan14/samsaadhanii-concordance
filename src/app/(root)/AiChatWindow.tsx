"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "react-bootstrap/Button";

type Message = { sender: "user" | "agent"; text: string };

export default function AiChatWindow({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    // focus input when opened
    const el = document.querySelector("#ai-chat-input") as HTMLInputElement | null;
    el?.focus();
  }, [isOpen]);

  useEffect(() => {
    // scroll to bottom on new message
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function send() {
    const question = input.trim();
    if (!question) return;

    const userMsg: Message = { sender: "user", text: question };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const answer = data?.answer || data?.error || "No response from agent.";

      const agentMsg: Message = { sender: "agent", text: String(answer) };
      setMessages((m) => [...m, agentMsg]);
    } catch (err) {
      setMessages((m) => [...m, { sender: "agent", text: "Failed to contact agent." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: 88,
        bottom: 16,
        width: 360,
        maxWidth: "95vw",
        maxHeight: "calc(100vh - 104px)",
        zIndex: 1050,
      }}
    >
      <div className="card h-100 shadow" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>AI Assistant</strong>
          <div>
            <Button variant="light" size="sm" onClick={() => setMessages([])} className="me-2">
              Clear
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="card-body d-flex flex-column p-2" style={{ minHeight: 0 }}>
          <div
            ref={listRef}
            className="flex-fill mb-2"
            style={{ overflowY: "auto", padding: 8 }}
          >
            {messages.length === 0 && <div className="text-muted small">Ask questions about the Dhatupatha data.</div>}

            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.sender === "user" ? "text-end" : ""}`}>
                <div
                  className={`d-inline-block p-2 rounded ${m.sender === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                  style={{ maxWidth: "82%", wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-2">
            <input
              id="ai-chat-input"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Ask something about the data..."
              disabled={loading}
            />
            <Button variant="primary" onClick={send} disabled={loading}>
              {loading ? "…" : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
