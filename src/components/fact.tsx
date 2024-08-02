import { useState } from "react";
import supabase from "../config/supabase";
import { CATEGORIES, CategoryType, FactType } from "../data";

interface FactProps {
  fact: FactType;
  onUpdateFact: (updatedFact: FactType, factId: number) => void;
}

function Fact({ fact, onUpdateFact }: FactProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVote = async (columnName: keyof FactType) => {
    setIsUpdating(true);

    const {
      data: [updatedFact],
      error,
    } = await supabase
      .from("facts")
      .update({
        [columnName]:
          typeof fact[columnName] === "number"
            ? fact[columnName] + 1
            : fact[columnName],
      })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);

    if (!error) {
      onUpdateFact(updatedFact, fact.id);
    }

    if (error) {
      console.error("Error", error.message);
    }
  };
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{ backgroundColor: getCategoryColor(CATEGORIES, fact.category) }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

function getCategoryColor(catergoriesObj: CategoryType[], category: string) {
  return catergoriesObj.find((cat) => cat.name === category)?.color;
}

export default Fact;
