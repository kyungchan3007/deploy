import { useState } from "react";

export const useCustomHooks = (initialValue: any) => {
  const [state, setState] = useState(initialValue);
  return [state, setState];
};
