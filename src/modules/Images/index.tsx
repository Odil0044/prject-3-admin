('use client');
export const runtime = 'edge'; // 'nodejs' (default) | 'edge'
import styles from './index.module.scss';
import React, { useState } from 'react';
import Card from './Card';
import { CiSquarePlus } from 'react-icons/ci';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

async function getData(): Promise<any[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/images?q=my_website_images`
    );

    return res.data;
  } catch (error) {
    return [];
  }
}

export default function Images() {
  const { data, isLoading, refetch } = useQuery('images', getData);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sendFile = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(e);

      const formData = new FormData(e.target as HTMLFormElement);

      const res = await axios.post('/api/add-image', formData);
      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Cannot upload image!',
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <section>
      {' '}
      <div className={styles.grid}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div>
              <CiSquarePlus size={'100%'} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action="" onSubmit={sendFile}>
              <DialogHeader>
                <DialogTitle>Add image</DialogTitle>
                <DialogDescription>
                  {' '}
                  You can add images to you website from here!{' '}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input name="title" id="title" className="col-span-3" />
                </div>{' '}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Upload
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    id="file"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="context" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    name="context"
                    id="context"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {data?.map((image: any) => (
          <Card key={image.id} image={image} refetch={refetch} />
        ))}
      </div>
    </section>
  );
}
