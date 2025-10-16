import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PackageCard = ({ card }) => {
  const { isp_id, package_id, name, autoName, bandwidth, price } = card;

  return (
    <Card
      className={`@container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs transition-all ${isClickable ? 'cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out' : ''}`}
      onClick={() => isClickable && navigate(card.url)}
    >
      <CardHeader>
        <CardDescription>
          {name ? name : autoName ? autoName : `Package #${package_id}`}
        </CardDescription>
        <CardTitle className="font-semibold tabular-nums text-2xl @[250px]/card:text-3xl">
          {bandwidth} Mbps - ৳{price}
        </CardTitle>
      </CardHeader>

      {/* <CardFooter className="flex justify-between items-center">
        <div className="flex-col items-start gap-1.5 text-sm">
          <p className="flex gap-2 font-medium line-clamp-1">
            {card.footerTitle} <TrendIcon className="size-4" />
          </p>
          <p className="text-muted-foreground">
            {card.footerDescription}
          </p>
        </div>
      </CardFooter> */}
    </Card>
  )
}
export default PackageCard