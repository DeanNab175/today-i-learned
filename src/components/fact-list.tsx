import { FactType } from "../data";
import Fact from "./fact";

interface FactListProps {
  facts: FactType[];
  onUpdateFact: (updatedFact: FactType, factId: number) => void;
}

function FactList({ facts, onUpdateFact }: FactListProps) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one ✌️
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => {
          return <Fact key={fact.id} fact={fact} onUpdateFact={onUpdateFact} />;
        })}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

export default FactList;
