import { AddAddress } from "@/app/components/Profile/AddAddress";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


const addresses = [
  {
    id: 1,
    type: "HOME",
    name: "ALOK",
    address: "52RV-5FR, Golden Apartments, MG Rd, near Kapadia Hospital, Goregaon (W), Mumbai, Maharashtra 400104",
    phone: "+91 96500 39980",
    email: "sariya@gmail.com",
  },
  {
    id: 2,
    type: "HOME",
    name: "ALOK",
    address: "52RV-5FR, Golden Apartments, MG Rd, near Kapadia Hospital, Goregaon (W), Mumbai, Maharashtra 400104",
    phone: "+91 96500 39980",
    email: "sariya@gmail.com",
  },
  {
    id: 3,
    type: "HOME",
    name: "ALOK",
    address: "52RV-5FR, Golden Apartments, MG Rd, near Kapadia Hospital, Goregaon (W), Mumbai, Maharashtra 400104",
    phone: "+91 96500 39980",
    email: "sariya@gmail.com",
  },
];

const AddressCard = ({ address }: { address: typeof addresses[0] }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm w-full">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-semibold">{address.type}</span>
        <button className="text-blue-600 text-sm">✎ Edit</button>
      </div>
      <h2 className="font-bold text-lg">{address.name}</h2>
      <p className="text-gray-600 text-sm">{address.address}</p>
      <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
      <p className="text-gray-600 text-sm">Email: {address.email}</p>
    </div>
  );
};

function UserAddress() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Shipping ADDRESS</h1>
        <AddAddress />
      </div>

      <div className="space-y-4 w-full">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default UserAddress;
