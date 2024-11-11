import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type TimerProps = {
  duration: number; // u milisekundama
  onTimeUp: () => void;
};

export type TimerHandle = {
  getTimeLeft: () => number;
};

const Timer = forwardRef<TimerHandle, TimerProps>(
  ({ duration, onTimeUp }, ref) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const timerRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      getTimeLeft: () => timeLeft,
    }));

    useEffect(() => {
      if (timeLeft <= 0) {
        onTimeUp();
        return;
      }

      timerRef.current = window.setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 40);
      }, 40);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [timeLeft, onTimeUp]);

    return (
      <div className="timer">
        <span>
          Time Left: {Math.floor(timeLeft / 1000)}.{(timeLeft % 1000) / 10}s
        </span>
      </div>
    );
  }
);

export default Timer;
