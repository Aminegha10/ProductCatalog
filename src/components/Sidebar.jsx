
import { Button } from "@/components/ui/button"
import FilterContent from "./FilterContent"

export default function Sidebar({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  categories,
  clearFilters,
}) {
  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-24  bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <h2 className="text-lg font-semibold mb-4 text-purple-800">Filters</h2>
        <FilterContent
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
        />
        <div className="mt-6">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </aside>
  )
}
