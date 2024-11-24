import { createContext } from "react";

interface TabContextValue<T = any> {
  value?: T;
  onChange?: (value: T) => void;
}

// @ts-ignore
export const TabContext = createContext<TabContextValue>(undefined);
