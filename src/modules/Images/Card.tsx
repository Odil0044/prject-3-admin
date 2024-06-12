import { Button } from "@/components/ui/button";
import styles from "./index.module.scss";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Card({ image, refetch }: any) {
  const [loading, setLoading] = useState(false);
const {toast} = useToast()
  const onDelete = async () => {
    setLoading(true)

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/images/${image.id}`)
      refetch()
    } catch (error) {
      console.log({error});
       toast({
        title: "Cannot delete image!",
         action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
        description:"Please try again"
       })

    }
    setLoading(false)
  };
  return (
    <div className={styles.image}>
      <img
        src={
          image.img_url ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BNGImiFNXoEc3ONE3biDks4T4Y9JkCJCMA&s"
        }
        alt={image.title}
        onError={(e) => {
          e.currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BNGImiFNXoEc3ONE3biDks4T4Y9JkCJCMA&s";
        }}
      />
      <Button
        variant="destructive"
        onClick={onDelete}
        className={styles.button}
      disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <FaRegTrashCan />
        )}
      </Button>
      <div className={styles.description}>
        <h1>{image.title}</h1> <p>{image.context}</p>
      </div>
    </div>
  );
}
