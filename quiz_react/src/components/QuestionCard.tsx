import React from "react";

import Button from "./Button.tsx";
import Timer from "./Timer.tsx";

type QuestionCardProps = {
  question: string;
  options: string[];
  onAnswerSelect: (option: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  onAnswerSelect,
}) => {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="d-grid gap-2">
        {options.map((option, index) => (
          <Button key={index} onClick={() => onAnswerSelect(option)}>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
