import { Button } from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {BadgePlus} from 'lucide-react'

function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex justify-start items-center"><BadgePlus/>ADD NEW PRODUCT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default AddProduct
