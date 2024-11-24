import { useCallback, useState } from "react";

type OnChangeEvent = (selected: any) => void;

export default function useTab(defaultValue: any): [any, OnChangeEvent] {
  const [selected, updateSelected] = useState(defaultValue);

  const handleOnChange = useCallback(
    (value: any) => {
      updateSelected(value);
    },
    [updateSelected]
  );

  return [selected, handleOnChange];
}
