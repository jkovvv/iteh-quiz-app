import React, { useState } from "react";

interface Quiz {
  id: number;
  title: string;
  description: string;
}

interface Props {
  items: Quiz[];
  onSelectItem: (item: Quiz) => void;
}

const QuizList: React.FC<Props> = ({ items, onSelectItem }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <h3 className="text-center">Kvizovi</h3>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((quiz, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={quiz.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(quiz);
            }}
          >
            {quiz.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
