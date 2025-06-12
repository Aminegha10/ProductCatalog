import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-500 py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h2>
          <p className="text-purple-100 mb-6">Get the latest updates on new products and upcoming sales</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white"
            />
            <Button className="bg-white text-purple-700 hover:bg-purple-100">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
