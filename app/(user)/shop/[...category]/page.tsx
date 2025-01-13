// interface PageProps {
//   params: {
//     category?: string[];
//   };
// }

const Page = async ({ params }: any) => {
  const data = await params;
  const categories = data?.category || [];
  console.log(categories);

  return (
    <div>
      <div>
        <h1>Categories</h1>
        <p>Path: {categories.join(" / ")}</p>
      </div>
    </div>
  );
};

export default Page;
