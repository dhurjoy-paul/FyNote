import { SidebarTrigger } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header
      className="flex items-center gap-2 border-b transition-[width,height] ease-linear shrink-0">
      <div className="flex items-center gap-1 lg:gap-2 my-5 sm:my-2.5 px-6 w-full">
        <SidebarTrigger className="ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="font-medium text-base"></h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" asChild size="lg" className="hidden sm:flex text-lg">
            <a
              href="https://www.youtube.com/shorts/Ay8lynMZ4mE"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              QodeOn
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
