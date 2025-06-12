import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
        <p className="text-purple-600">Loading products...</p>
      </div>
    </div>
  )
}
