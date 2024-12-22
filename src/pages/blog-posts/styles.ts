import { CSSProperties } from "react";

export const markdownStyles: Record<string, CSSProperties> = {
  body: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    lineHeight: "24px",
    color: "#333",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2a2a2a",
    marginBottom: 16,
    borderBottom: "2px solid #ddd",
    paddingBottom: 8,
  },
  h2: {
    fontSize: 28,
    fontWeight: "600",
    color: "#3c3c3c",
    marginBottom: 12,
    borderBottom: "1px solid #ddd",
    paddingBottom: 6,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  p: {
    fontSize: 16,
    lineHeight: "26px",
    color: "#444",
    marginBottom: 12,
  },
  a: {
    color: "#1e90ff",
    textDecoration: "underline",
  },
  strong: {
    fontWeight: "bold",
    color: "#000",
  },
  em: {
    fontStyle: "italic",
  },
  blockquote: {
    borderLeft: "4px solid #ccc",
    paddingLeft: 16,
    margin: "12px 0",
    fontStyle: "italic",
    color: "#666",
  },
  "code:not([class])": {
    backgroundColor: "#f4f4f4",
    fontFamily: "Courier",
    padding: 4,
    borderRadius: 4,
    color: "#d6336c",
  },
  pre: {
    backgroundColor: "#272822",
    fontFamily: "Courier",
    color: "#f8f8f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    lineHeight: "22px",
    overflow: "auto",
  },
  "pre code": {
    backgroundColor: "transparent",
    color: "inherit",
    padding: 0,
  },
  li: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  ul: {
    marginLeft: 16,
    marginBottom: 12,
    listStyle: "disc",
  },
  ol: {
    marginLeft: 16,
    marginBottom: 12,
  },
  img: {
    borderRadius: 8,
    margin: "16px 0",
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
};
