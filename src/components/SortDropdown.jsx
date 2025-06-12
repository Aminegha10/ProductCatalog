import { ArrowUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { value: "featured", label: "Featured", description: "Recommended for you" },
  { value: "newest", label: "Newest First", description: "Latest arrivals" },
  {
    value: "price-low",
    label: "Price: Low to High",
    description: "Budget friendly",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
    description: "Premium first",
  },
  { value: "rating", label: "Highest Rated", description: "Best reviews" },
];

export default function SortDropdown({ sortBy, setSortBy }) {
  const currentSort = sortOptions.find((option) => option.value === sortBy);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[180px] justify-between bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-sm transition-all duration-200 font-medium"
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <span>{currentSort?.label || "Sort by"}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[240px] bg-white border-2 border-purple-100 shadow-xl rounded-xl p-2"
        sideOffset={8}
      >
        <div className="px-3 py-2 border-b border-purple-100 mb-2">
          <h3 className="font-semibold text-purple-900 text-sm">
            Sort Products
          </h3>
          <p className="text-xs text-purple-500 mt-1">
            Choose how to organize your results
          </p>
        </div>

        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-purple-50 focus:bg-purple-50 transition-colors duration-150 group"
            >
              <div className="flex items-center justify-center w-4 h-4 mt-0.5">
                {sortBy === option.value && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-purple-900 text-sm group-hover:text-purple-700">
                    {option.label}
                  </span>
                  {sortBy === option.value && (
                    <Check className="w-4 h-4 text-purple-600 ml-2" />
                  )}
                </div>
                <p className="text-xs text-purple-500 mt-1 group-hover:text-purple-600">
                  {option.description}
                </p>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <div className="border-t border-purple-100 mt-2 pt-2">
          <div className="px-3 py-2">
            <p className="text-xs text-purple-400">
              Showing{" "}
              {sortBy === "featured"
                ? "recommended"
                : sortOptions
                    .find((o) => o.value === sortBy)
                    ?.label.toLowerCase()}{" "}
              results
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
