import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { FaBangladeshiTakaSign } from "react-icons/fa6"

const AddPackage = () => {
  const [name, setName] = useState('');
  const [bandwidth, setBandwidth] = useState('');
  const [price, setPrice] = useState('');
  const formData = { name, bandwidth, price };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Package object -->", formData);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-sm">

        {/* site name */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-balance">Add Packages</h2>
          <p className="mt-4 text-muted-foreground text-balance">Add unlisted or new packages</p>
        </div>

        {/* main form */}
        <div className="flex flex-col gap-6">
          <Card className="bg-card">
            <CardContent className="py-3">
              <form onSubmit={handleSave}>
                <div className="gap-6 grid">
                  <div className="gap-6 grid">

                    {/* email */}
                    <div className="gap-3 grid">
                      <Label htmlFor="name">Package name</Label>
                      <Input id="name" type="text" required
                        placeholder="Premium"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* bandwidth */}
                    <div className="gap-3 grid">
                      <Label htmlFor="bandwidth">Bandwidth (Mbps)</Label>
                      <Input id="bandwidth" type="number" required
                        placeholder="40"
                        value={bandwidth}
                        onChange={(e) => setBandwidth(e.target.value)} />
                    </div>

                    {/* price */}
                    <div className="gap-3 grid">
                      <Label htmlFor="price">Price <FaBangladeshiTakaSign className="-ml-1" /></Label>
                      <Input id="price" type="number" required
                        placeholder="1000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <Button type="submit" className="mt-1 w-full cursor-pointer">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
export default AddPackage