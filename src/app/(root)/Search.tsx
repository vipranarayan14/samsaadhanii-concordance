import Form from "react-bootstrap/Form";

import { useInView } from "react-intersection-observer";

import FixedWidthContainer from "@/commons/components/FixedWidthContainer";
import type { Query } from "@/utils/types";

import { SearchInput } from "./SearchInput";
import { ViewOptionsBtnContainer } from "./ViewOptionsBtnContainer";
import dynamic from "next/dynamic";

// AiChatWidget is a client-only widget (button + window)
const AiChatWidget = dynamic(() => import("./AiChatWidget"), { ssr: false });

type Props = {
  setIsTyping: (isTyping: boolean) => void;
  query: Query;
  updateQuery: (query: Query) => void;
};

export function Search({ query, updateQuery, setIsTyping }: Props) {
  const { ref, entry } = useInView({ threshold: 1 });

  const isPinned = entry && entry.intersectionRatio < 1;
  const bg = isPinned ? "bg-primary" : "bg-body";

  return (
    <section
      ref={ref}
      className={`sticky-top _transition-bg ${bg}`}
      style={{ top: -1 }}
    >
      <FixedWidthContainer>
        <Form className="d-flex align-items-center py-2 px-1">
          <div className="flex-fill rounded-1 shadow">
            <div className="input-group rounded-1">
              <ViewOptionsBtnContainer query={query} setQuery={updateQuery} />

              <SearchInput
                query={query}
                updateQuery={updateQuery}
                setIsTyping={setIsTyping}
              />

              <AiChatWidget />
            </div>
          </div>
        </Form>
      </FixedWidthContainer>

    </section>
  );
}
 
