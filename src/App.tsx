import CategoryFilter from "./components/category-filter";
import FactList from "./components/fact-list";
import Header from "./components/header";
import NewFactForm from "./components/new-fact-form";

import { initialFacts } from "./data"

function App() {
  return (
    <div className="container">
      <Header />
      <NewFactForm />

      <main className="main">
        <CategoryFilter />
        <FactList facts={initialFacts} />
      </main>
    </div>
  );
}

export default App;
