import { CATEGORIES } from "../data"

interface CategoryFilterProps {
  onCategoryClick: (cat: string) => void;
}

function CategoryFilter({ onCategoryClick }: CategoryFilterProps) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => onCategoryClick("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => onCategoryClick(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategoryFilter