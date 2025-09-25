import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SettingsHome = () => {

  return (
    <div className="mx-auto mt-12 max-w-xl">
      <Accordion
        type="single"
        collapsible
        className="bg-card shadow-sm px-8 py-3 border rounded-2xl ring-4 ring-muted dark:ring-0 w-full">

        {/* theme preferences */}
        <AccordionItem
          value="theme-preferences"
          className="border-dashed">
          <AccordionTrigger className="text-base hover:no-underline cursor-pointer">Theme Preferences</AccordionTrigger>
          <AccordionContent>
            <p className="text-base">hello</p>
          </AccordionContent>
        </AccordionItem>

        {/* font preferences */}
        <AccordionItem
          value="font-preferences"
          className="border-dashed">
          <AccordionTrigger className="text-base hover:no-underline cursor-pointer">Font Preferences</AccordionTrigger>
          <AccordionContent>
            <p className="text-base text-center">hello</p>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
export default SettingsHome