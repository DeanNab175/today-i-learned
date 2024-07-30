import { useState } from "react"
import { CATEGORIES, FactType } from "../data"

interface NewFactFormProps {
  onPostFact: (fact: FactType) => void;
  onCloseForm: () => void;
}

function NewFactForm({ onPostFact, onCloseForm }: NewFactFormProps) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  const textLength = text.length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text, source, category);

    // check if data is valid then create a new fact
    if (text && isValidUrl(source) && category && textLength <= 200) {
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      }

      // update facts state
      onPostFact(newFact);

      // reset form
      setText("");
      setSource("");
      setCategory("");

      // close form
      onCloseForm();
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
      </select>
      <button type="submit" className="btn btn-large">Post</button>
    </form>
  )
}

function isValidUrl(urlString: string) {
  let url;
  try {
    url = new URL(urlString);
  }
  catch (e) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default NewFactForm