import { createContext, JSX, useRef, type PropsWithChildren } from "react";

export type RefContextType = {
  refs: Array<
    | HTMLElement
    | HTMLDivElement
    | HTMLParagraphElement
    | HTMLHeadingElement
    | HTMLImageElement
  >;
};

const defaultContext = {
  refs: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalRefsContext = createContext<RefContextType>(defaultContext);

export const GlobalRefsProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const refs = useRef<RefContextType>(defaultContext);

  return (
    <GlobalRefsContext.Provider
      value={{
        refs: refs.current.refs,
      }}
    >
      {children}
    </GlobalRefsContext.Provider>
  );
};
