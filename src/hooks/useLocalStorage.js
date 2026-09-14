import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(() => {
    try {
      const getData = localStorage.getItem(key);

      if(getData === null){
        return initialValue;
      }
      const data = JSON.parse(getData);

      return data;
    } catch (error) {
      console.log(error.message);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;