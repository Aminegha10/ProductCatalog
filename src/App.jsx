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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      {/* <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
        clearFilters={clearFilters}
      /> */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                ShopHub
              </h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-purple-600 hover:text-purple-800 hover:bg-purple-100"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-purple-600 hover:text-purple-800 hover:bg-purple-100"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 hover:bg-pink-600">
                  {favorites.length}
                </Badge>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden border-purple-200 text-purple-600"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 border-r-purple-200">
                  <SheetHeader>
                    <SheetTitle className="text-purple-800">Filters</SheetTitle>
                    <SheetDescription>
                      Refine your product search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      categories={categories}
                    />
                  </div>
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
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </nav>

     

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
