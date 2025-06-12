import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function FilterContent({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  categories,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
        
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={1}
          className="mb-2 bg-purple-400"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
         <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:bg-purple-50 ${
                selectedCategories.includes(category) ? "bg-purple-100 border border-purple-200" : ""
              }`}
            >
              <Checkbox
                className="cursor-pointer data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 hover:border-purple-400 transition-colors duration-200"
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category))
                  }
                }}
              />
              <Label
                htmlFor={category}
                className={`text-sm font-normal cursor-pointer transition-colors duration-200 ${
                  selectedCategories.includes(category)
                    ? "text-purple-900 font-medium"
                    : "text-purple-700 hover:text-purple-900"
                }`}
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
