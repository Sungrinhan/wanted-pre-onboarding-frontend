import { useState, useCallback, SetStateAction, Dispatch } from "react";

type ReturnType<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];
const useInput = <T>(initValue: T): ReturnType<T> => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback((e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }, []);
  return [value, handler, setValue];
};

export default useInput;
