import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import axios from "axios";

export default function DeleteBtn({ id ,refetch}: { id: string | number ,refetch:()=>void}) {
  const { toast } = useToast();

  async function deleteContact() {
    try {

        console.log(await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`));
        
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}`, {
        params: {
          id,
        },
      });
      refetch();
    } catch (error) {
      toast({
        title: "Cannot delete request!",
         action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Warning!</h4>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this request?
            </p>
          </div>
          <Button onClick={deleteContact}>Yes</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
