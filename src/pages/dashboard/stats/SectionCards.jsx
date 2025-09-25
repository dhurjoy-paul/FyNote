import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useNavigate } from "react-router";

const cardData = [
  {
    title: "Total Clients",
    url: "/dashboard/total-clients",
    value: "1250",
    trend: "+12.5%",
    isPositive: true,
    footerTitle: "Trending up this month",
    footerDescription: "Visitors for the last 6 months"
  },
  {
    title: "Paid Clients",
    url: "/dashboard/paid-clients",
    value: "1,232",
    trend: "-20%",
    isPositive: false,
    footerTitle: "Down 20% this period",
    footerDescription: "Acquisition needs attention"
  },
  {
    title: "Unpaid Clients",
    url: "/dashboard/unpaid-clients",
    value: "16",
    trend: "+12.5%",
    isPositive: true,
    footerTitle: "Strong user retention",
    footerDescription: "Engagement exceed targets"
  },
  {
    title: "Off Clients",
    url: "/dashboard/off-clients",
    value: "2",
    trend: "+4.5%",
    isPositive: true,
    footerTitle: "Steady performance increase",
    footerDescription: "Meets growth projections"
  },
  {
    title: "New Clients",
    url: "/dashboard/new-clients",
    value: "45",
    trend: "+4.5%",
    isPositive: true,
    footerTitle: "Steady performance increase",
    footerDescription: "Meets growth projections"
  },
  {
    title: "Total Paid",
    value: "70,125",
    trend: "+4.5%",
    isPositive: true,
    footerTitle: "Steady performance increase",
    footerDescription: "Meets growth projections"
  },
  {
    title: "Total Unpaid",
    value: "2400",
    trend: "+4.5%",
    isPositive: true,
    footerTitle: "Steady performance increase",
    footerDescription: "Meets growth projections"
  },
];

export function SectionCards() {
  const navigate = useNavigate();

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => {
        const TrendIcon = card.isPositive ? IconTrendingUp : IconTrendingDown;
        const isClickable = !!card.url;

        return (
          <Card
            key={index}
            className={`@container/card dark:bg-card bg-gradient-to-t from-primary/5 to-card shadow-xs transition-all ${isClickable ? 'cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out' : ''}`}
            onClick={() => isClickable && navigate(card.url)}
          >
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="font-semibold tabular-nums text-2xl @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="size-3.5" />
                  {card.trend}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <div className="flex-col items-start gap-1.5 text-sm">
                <p className="flex gap-2 font-medium line-clamp-1">
                  {card.footerTitle} <TrendIcon className="size-4" />
                </p>
                <p className="text-muted-foreground">
                  {card.footerDescription}
                </p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}