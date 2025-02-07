import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product } from "@/types/product_type";

type AddToCartProps = {
  product: Product;
};

const AddToCart = ({ product }: AddToCartProps) => {
  return (
    <Accordion type="single" collapsible>
      {/* Details */}
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          {product.description || "No description available."}
        </AccordionContent>
      </AccordionItem>

      {/* Dimensions */}
      {product.height && product.width && (
        <AccordionItem value="dimensions">
          <AccordionTrigger>Dimensions</AccordionTrigger>
          <AccordionContent>
            {product.height} cm X {product.width} cm
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Weight */}
      {product.weight && (
        <AccordionItem value="weight">
          <AccordionTrigger>Weight</AccordionTrigger>
          <AccordionContent>{product.weight} KG</AccordionContent>
        </AccordionItem>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <AccordionItem value="tags">
          <AccordionTrigger>Tags</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc ml-4">
              {product.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Sub Categories */}
      {product.subCategories && product.subCategories.length > 0 && (
        <AccordionItem value="sub-categories">
          <AccordionTrigger>Sub Categories</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc ml-4">
              {product.subCategories.map((subCategory, index) => (
                <li key={index}>{subCategory}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default AddToCart;
