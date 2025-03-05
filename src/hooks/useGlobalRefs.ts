import { RefObject, useContext } from "react";
import { GlobalRefsContext } from "../providers/refs-provider/GlobalRefsProvider";

export const useGlobalRefs = () => {
  const context = useContext(GlobalRefsContext);

  if (!context) {
    throw new Error("useGlobalRefs must be used within a RefProvider");
  }

  const setRef = (
    ref: RefObject<
      | HTMLElement
      | HTMLDivElement
      | HTMLParagraphElement
      | HTMLHeadingElement
      | HTMLImageElement
      | null
    >
  ) => {
    if (!ref || !ref.current || context.refs.includes(ref.current)) return;

    context.refs.push(ref.current);
  };

  return {
    globalRefs: context.refs,
    setRef,
  };
};
