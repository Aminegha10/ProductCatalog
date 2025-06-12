import { Heart, Star, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product, isFavorite, toggleFavorite }) {
  return (
    <div className="group relative bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-purple-50">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isOnSale && (
            <Badge className="bg-pink-500 hover:bg-pink-600 px-2 py-1">
              Sale
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 px-2 py-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> New
            </Badge>
          )}
          {product.isTrending && (
            <Badge className="bg-orange-500 hover:bg-orange-600 px-2 py-1 flex items-center gap-1">
              <Flame className="h-3 w-3" /> Trending
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-700 transition-all">
            {product.title}
          </h3>
          <p className="text-xs text-purple-500 capitalize">
            {product.category}
          </p>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating.rate)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-purple-500">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-purple-900">
              ${product.price}
            </span>
          </div>
          <Button
            size="sm"
            className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
