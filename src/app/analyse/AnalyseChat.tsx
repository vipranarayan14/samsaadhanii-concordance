"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "react-bootstrap/Button";
import { BsXLg, BsSend, BsStars } from "react-icons/bs";
import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import { Form, Spinner } from "react-bootstrap";

type Message = { sender: "user" | "agent"; text: string };

const DEFAULT_QUERIES = [
  "How many dhatus are there Kshiratarangini but not in Madhaviya? Give some examples.",
  "Give me list of anit dhatus in tanadi gana.",
  "List some dhatus with their details in table format.",
  "Which dhatus have हिंसायाम् as its meaning?",
  "Give examples of dhatus that repeat across ganas.",
];

export default function AnalyseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function send(qOverride?: string) {
    const question = (qOverride ?? input).trim();
    if (!question) return;

    setInput(question);
    const userMsg: Message = { sender: "user", text: question };
    setMessages((m) => [...m, userMsg]);
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
      setMessages((m) => [
        ...m,
        { sender: "agent", text: "Failed to contact agent." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FixedWidthContainer>
      <h2 className="m-4 text-center">Analyse Dhatupatha</h2>

      <Form
        className="d-flex align-items-center py-2 my-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex-fill rounded-1 shadow">
          <div className="_bg-surface rounded-1">
            <Form.Control
              as="textarea"
              name="q"
              placeholder="Analyse dhatupatha..."
              className="border border-0 ms-0 p-3 shadow-none bg-transparent flex-fill"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  send();
                }
              }}
              autoCorrect="off"
              spellCheck="false"
              rows={3}
              disabled={loading}
              style={{ resize: "none" }}
            />

            <div className="d-flex justify-content-between align-items-center px-2 pb-2">
              <Button
                type="button"
                variant="light"
                className="d-flex align-items-center _rounded-start-1 border border-0 shadow-none"
                title="Clear"
                onClick={() => {
                  setInput("");
                  setMessages([]);
                }}
              >
                <BsXLg className="me-2" />
                <span>Clear</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="d-flex align-items-center _rounded-end-1 border border-0 shadow-none"
                title="Send"
                onClick={() => send()}
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : (
                  <BsStars className="me-2" />
                )}
                <span>{loading ? "Searching..." : "Search"}</span>
              </Button>
            </div>
          </div>
        </div>
      </Form>

      {!input.trim() && (
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2">
            {DEFAULT_QUERIES.map((q, i) => (
              <button
                key={i}
                className="btn btn-light _border-divider text-start text-muted text-wrap"
                onClick={() => {
                  setInput(q);
                  send(q);
                }}
                type="button"
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={listRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${m.sender === "user" ? "text-end" : ""}`}
          >
            <div
              className={`d-inline-block p-3 rounded ${
                m.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
              style={{
                maxWidth: "100%",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.sender === "user" ? (
                <span>{m.text}</span>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
      </div>
    </FixedWidthContainer>
  );
}
