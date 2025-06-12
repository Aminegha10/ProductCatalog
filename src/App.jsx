import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";
import SortDropdown from "./components/SortDropdown";
import FilterContent from "./components/FilterContent";

export default function ProductsCatalog() {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from API using axios
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("https://fakestoreapi.com/products");

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      const data = response.data;

      // Transform API data to match our component structure
      const transformedProducts = data.map((product) => ({
        ...product,
        name: product.title,
        reviews: product.rating.count,
        isFavorite: false,
        isOnSale: Math.random() > 0.7, // Random sale items
        isNew: Math.random() > 0.8, // Random new items
        isTrending: Math.random() > 0.6, // Random trending items
      }));

      setProducts(transformedProducts);

      // Extract unique categories remove any duplicates and turn into a destructure the array
      // from ["Electronics", "Jewelery", "Electronics", "Clothing"]
      // to ["Electronics", "Jewelery", "Clothing" ]

      const uniqueCategories = [
        ...new Set(
          data.map(
            (product) =>
              product.category.charAt(0).toUpperCase() +
              product.category.slice(1)
          )
        ),
      ];
      // all categories are in categories state
      setCategories(uniqueCategories);
    } catch (err) {
      setError("An error occurred while fetching products");
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const productCategory =
          product.category.charAt(0).toUpperCase() + product.category.slice(1);
        if (!selectedCategories.includes(productCategory)) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating.rate - a.rating.rate;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, priceRange, selectedCategories, sortBy]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} retryFn={fetchProducts} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white ">
      {/* Navigation */}
      <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
        clearFilters={clearFilters}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <Sidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
            clearFilters={clearFilters}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-purple-900">Products</h1>
                <p className="text-purple-500">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>

            {/* Products Grid */}
            {/* All Products are here */}
            <ProductGrid
              products={filteredProducts}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              clearFilters={clearFilters}
            />

            {/* Load More */}
            {filteredProducts.length > 5 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer categories={categories} />
    </div>
  );
}
