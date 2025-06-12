
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"

export default function ProductGrid({ products, favorites, toggleFavorite, clearFilters }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            toggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">No products match your filters</p>
          <Button variant="outline" className="mt-4 cursor-pointer bg-purple-500" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
