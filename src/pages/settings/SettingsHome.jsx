import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/theme/ThemeProvider';

const SettingsHome = () => {
  const { setTheme } = useTheme();
  const storedTheme = localStorage.getItem('vite-ui-theme');

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <Accordion
        type="single"
        collapsible
        className="bg-card shadow-sm px-4 md:px-8 py-3 border rounded-2xl ring-0 ring-muted dark:ring-0 w-full">

        {/* theme preferences */}
        <AccordionItem value="theme-preferences" className="border-dashed">
          <AccordionTrigger className="text-base hover:no-underline cursor-pointer">Theme Preferences</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center mx-auto mt-4 mb-3 max-w-64">
              <Button
                onClick={() => setTheme("light")}
                variant="outline"
                size="sm"
                className={`px-6" ${storedTheme === "light" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                Light
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                variant="outline"
                size="sm"
                className={`px-6" ${storedTheme === "dark" ? "dark:bg-primary text-primary-foreground dark:hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                Dark
              </Button>
              <Button
                onClick={() => setTheme("system")}
                variant="outline"
                size="sm"
                className={`px-6 ${storedTheme === "system" ? "bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground hover:dark:bg-primary/90 hover:dark:text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}>
                System
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* font preferences */}
        <AccordionItem value="font-preferences" className="border-dashed">
          <AccordionTrigger className="text-base hover:no-underline cursor-pointer">Font Preferences</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center gap-4 pt-5 pb-3">
              <p className="font-medium text-muted-foreground text-lg text-center">
                Font panel is coming soon!
              </p>
              <p className="text-muted-foreground text-sm text-center">
                We're working on bringing you a modern font changing experience.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
export default SettingsHome