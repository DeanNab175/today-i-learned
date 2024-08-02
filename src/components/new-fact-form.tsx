import { useState } from "react"
import { CATEGORIES, FactType } from "../data"
import supabase from "../config/supabase";

interface NewFactFormProps {
  onPostFact: (fact: FactType) => void;
  onCloseForm: () => void;
}

function NewFactForm({ onPostFact, onCloseForm }: NewFactFormProps) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://www.google.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const textLength = text.length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text, source, category);

    // check if data is valid then create a new fact
    if (text && isValidUrl(source) && category && textLength <= 200) {
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // }

      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      // update facts state
      if (newFact) {
        onPostFact(newFact[0] as FactType);
      }

      if (error) {
        console.log("Error creating a new fact.", error.message)
      }

      setIsUploading(false);

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
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={isUploading}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
      </select>
      <button type="submit" className="btn btn-large" disabled={isUploading}>{isUploading ? "Creating fact!!" : "Post"}</button>
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