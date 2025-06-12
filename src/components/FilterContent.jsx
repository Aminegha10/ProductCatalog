
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function FilterContent({
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  categories,
}) {
  const [isSliding, setIsSliding] = useState(false)
  const [maxPrice, setMaxPrice] = useState(priceRange[1])

  useEffect(() => {
    setMaxPrice(priceRange[1])
  }, [priceRange])

  const handleSliderChange = (value) => {
    const newMaxPrice = value[0] // Slider returns array even for single value
    setMaxPrice(newMaxPrice)
    setPriceRange([0, newMaxPrice]) // Always start from 0
  }

  const handleSliderStart = () => {
    setIsSliding(true)
  }

  const handleSliderEnd = () => {
    setIsSliding(false)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-purple-900">Max Price</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPriceRange([0, 1000])
              setMaxPrice(1000)
            }}
            className="h-6 px-2 text-xs text-purple-500 hover:text-white hover:bg-purple-500 transition-all duration-200 rounded-md"
          >
            Clear
          </Button>
        </div>

        <div
          className={`transition-all duration-200 ${
            isSliding ? "bg-purple-50 p-3 rounded-lg border border-purple-200" : "p-1"
          }`}
        >
          <Slider
            value={[maxPrice]} // Single value in array
            onValueChange={handleSliderChange}
            onPointerDown={handleSliderStart}
            onPointerUp={handleSliderEnd}
            max={1000}
            min={0}
            step={1}
            className={`mb-2 transition-all duration-200 ${isSliding ? "scale-105" : ""} 
              [&_[role=slider]]:bg-purple-600 
              [&_[role=slider]]:border-purple-600 
              [&_[role=slider]]:hover:bg-purple-700
              [&_.slider-track]:bg-purple-200
              [&_.slider-range]:bg-purple-600`}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span
            className={`font-medium transition-colors duration-200 ${
              isSliding ? "text-purple-700" : "text-purple-500"
            }`}
          >
            $0
          </span>
          <span
            className={`font-medium transition-colors duration-200 ${
              isSliding ? "text-purple-700" : "text-purple-500"
            }`}
          >
            ${maxPrice}
          </span>
        </div>

        <div className="mt-2 text-center">
          <span className="text-xs text-purple-400">Showing products up to ${maxPrice}</span>
        </div>

        {isSliding && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
            Max: ${maxPrice}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-purple-900">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="h-6 px-2 text-xs text-purple-500 hover:text-white hover:bg-purple-500 transition-all duration-200 rounded-md"
            >
              Clear ({selectedCategories.length})
            </Button>
          )}
        </div>

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
  )
}
