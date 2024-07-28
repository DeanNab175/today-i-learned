import { FactType } from "../data"
import Fact from "./fact";

interface FactListProps {
  facts: FactType[];
}

function FactList({ facts }: FactListProps) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => {
          return (
            <Fact key={fact.id} fact={fact} />
          )
        })}
      </ul>
    </section>
  )
}

export default FactList