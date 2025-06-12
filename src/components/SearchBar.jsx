
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
      <Input
        placeholder="Search products..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-full"
      />
    </div>
  )
}
