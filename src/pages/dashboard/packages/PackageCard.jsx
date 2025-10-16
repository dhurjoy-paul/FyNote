import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PackageCard = ({ card }) => {
  const { isp_id, package_id, name, autoName, bandwidth, price } = card;

  return (
    <Card
      className={`@container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs hover:shadow-md transition-all duration-200 ease-in-out`}
    >
      <CardHeader>
        <CardTitle className="font-normal tabular-nums text-base @[250px]/card:text-xl">
          {name ? name : autoName ? autoName : `Package #${package_id}`}
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-2 grid grid-cols-[1fr_1fr_max-content] @[454px]/panel:grid-cols-2">
        <div>
          <CardDescription >Bandwidth</CardDescription>
          <p>
            <span className="font-semibold text-xl @[250px]/card:text-3xl">{bandwidth} </span>
            <span>Mbps</span>
          </p>
        </div>
        <div>
          <CardDescription >Price</CardDescription>
          <p>
            <span className="font-semibold text-2xl @[250px]/card:text-3xl">{price} </span>
            <span>tk</span>
          </p>
        </div>
        <div className="self-end @[454px]/panel:mt-4">
          <Button variant="outline" size="sm" className="w-fit cursor-pointer">Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default PackageCard