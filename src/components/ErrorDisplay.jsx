
import { Button } from "@/components/ui/button"

export default function ErrorDisplay({ error, retryFn }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Button onClick={retryFn} className="bg-purple-600 hover:bg-purple-700">
          Try Again
        </Button>
      </div>
    </div>
  )
}
