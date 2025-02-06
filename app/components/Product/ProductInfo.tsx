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
    <Accordion type="single" collapsible>
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          {product.description}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dimensions">
        <AccordionTrigger>Dimensions</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vitae.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="weight">
        <AccordionTrigger>Weight</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vitae.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tags">
        <AccordionTrigger>Tags</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vitae.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AddToCart

