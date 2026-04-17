import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform =
          `translate(${clientX}px, ${clientY}px)`;

        outlineRef.current.style.transform =
          `translate(${clientX - 15}px, ${clientY - 15}px)`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
}
