import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: {
      thumbnail: string;
    };
  };
};
const AddToCart = ({ product }: AddToCartProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          {product.description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Dimensions</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Reviews</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AddToCart

