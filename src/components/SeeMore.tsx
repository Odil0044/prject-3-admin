import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SeeMore({ data }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   {
  //     "id": 14,
  //     "mail": "asdf",
  //     "title": "asdf",
  //     "short_description": "asdf",
  //     "long_description": "asdf",
  //     "contact": "asdf",
  //     "img_url": "http://res.cloudinary.com/dq5dvbrtp/image/upload/v1718122567/my_website_images/nmfppijzzpcb73fcuxou.jpg",
  //     "created_at": "2024-06-11T16:23:10.070Z"
  // }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">See more</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Contact datas</DialogTitle>
          <DialogDescription>
            This data sent you by user in yopur website!{" "}
          </DialogDescription>
        </DialogHeader>
        <div
          style={{
            maxHeight: "70vh",
            overflow: "auto",
            padding: "30px 0",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Title</h1>
            <p style={{ fontWeight: 300 }}>{data.title} </p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Email</h1>
            <p style={{ fontWeight: 300 }}>{data.mail} </p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Short Description</h1>
            <p style={{ fontWeight: 300 }}>{data.short_description} </p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Long Description</h1>
            <p style={{ fontWeight: 300 }}>{data.long_description} </p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Contact</h1>
            <p style={{ fontWeight: 300 }}>{data.contact} </p>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontWeight: 500 }}>Image</h1>
            <p style={{ fontWeight: 300 }}>
              {" "}
              <img src={data.img_url} className="sm:max-w-[200px]"/>{" "}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setIsDialogOpen(false)}>
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
