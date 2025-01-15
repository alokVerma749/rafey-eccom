import { Card } from "@/components/ui/card";

import image1 from "@/public/asset/image41.png";
import image2 from "@/public/asset/image42.png";
import image4 from "@/public/asset/image43.png";

const cardDetails: any = [
  {
    name: "EXPRESS DELIVERY",
    description: "Lorem ipsum dolor sit amet consectetur delectus hic nobis corporis, quam exercitationem! Reiciendis, unde.",
    images: image1,
  },
  {
    name: "EXPRESS DELIVERY",
    description: "Lorem ipsum dolor sit amet consectetur delectus hic nobis corporis, quam exercitationem! Reiciendis, unde.",
    images: image2,
  },
  {
    name: "EXPRESS DELIVERY",
    description: "Lorem ipsum dolor sit amet consectetur delectus hic nobis corporis, quam exercitationem! Reiciendis, unde.",
    images: image2,
  },
  {
    name: "EXPRESS DELIVERY",
    description: "Lorem ipsum dolor sit amet consectetur delectus hic nobis corporis, quam exercitationem! Reiciendis, unde.",
    images: image4,
  },
];

function Section4() {
  return (
    <div className="flex justify-between items-center gap-10 flex-wrap w-full p-10">
      {cardDetails.map((product: any, index: any) => {
        const { name, description, images } = product;
        return (
          <Card
            key={index}
            className="h-[300px] rounded-2xl relative shadow-lg bg-[#c9b3a3] md:w-[47%]"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.6) 100%)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex justify-between items-center w-full h-full pl-4">
              <div className="flex flex-col items-start justify-start">
                <h2 className="font-semibold text-2xl pb-4">{name}</h2>
                <p className="text-base text-start">{description}</p>
              </div>
              <img src={images.src} alt="image" className="w-2/5 h-full" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Section4;
