import { useEffect, useState } from "react";
import supabase from "./config/supabase";

import CategoryFilter from "./components/category-filter";
import FactList from "./components/fact-list";
import Header from "./components/header";
import NewFactForm from "./components/new-fact-form";

import { FactType } from "./data";
import Loader from "./components/loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState<FactType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const getFacts = async () => {
      setIsLoading(true);

      let query = supabase.from('facts').select('*');

      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (error) {
        setIsLoading(false);
        console.log("Error fetching the facts.", error);
      }

      if (facts) {
        setIsLoading(false);
        setFacts(facts as FactType[]);
      }
    }

    getFacts();
  }, [currentCategory])

  const handleShowForm = () => {
    setShowForm((show) => !show);
  }

  const handlePostFact = (fact: FactType) => {
    setFacts((prevFacts) => [fact, ...prevFacts])
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }

  const handleCategoryClick = (cat: string) => {
    setCurrentCategory((prevCat) => {
      if (prevCat === cat) return prevCat;

      return cat;
    })
  }

  console.log("currentCategory", currentCategory)

  return (
    <div className="container">
      <Header showForm={showForm} onToggleForm={handleShowForm} />
      {showForm ? <NewFactForm onPostFact={handlePostFact} onCloseForm={handleCloseForm} /> : null}

      <main className="main">
        <CategoryFilter onCategoryClick={handleCategoryClick} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </div>
  );
}

export default App;
