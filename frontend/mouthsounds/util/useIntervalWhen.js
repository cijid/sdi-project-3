import { useRef, useEffect, useEffectEvent, useCallback } from "react";
//Source: https://usehooks.com/useintervalwhen
//Source GitHub: https://github.com/uidotdev/usehooks

function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const id = useRef(null);
  const onTick = useEffectEvent(cb);
  const immediatelyCalled = useRef(startImmediately === true ? false : null);

  const handleClearInterval = useCallback(() => {
    window.clearInterval(id.current);
    immediatelyCalled.current = false;
  }, []);

  useEffect(() => {
    if (when === true) {
      id.current = window.setInterval(onTick, ms);

      if (startImmediately === true && immediatelyCalled.current === false) {
        onTick();
        immediatelyCalled.current = true;
      }

      return handleClearInterval;
    }
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
}

export default useIntervalWhen;
