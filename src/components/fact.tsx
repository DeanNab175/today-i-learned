import { CATEGORIES, CategoryType, FactType } from "../data"

interface FactProps {
  fact: FactType;
}

function Fact({ fact }: FactProps) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
        >
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
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  )
}

function getCategoryColor(catergoriesObj: CategoryType[], category: string) {
  return catergoriesObj.find((cat) => cat.name === category)?.color;
}

export default Fact;