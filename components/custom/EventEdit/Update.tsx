"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export const Update = ({ date, name, password, id }: any) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    name: name,
    password: password,
    date: date ? new Date(date) : new Date(),
  });

  const handleCreateEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        const data = await response.json();
        router.refresh();
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="m-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              {`Make changes to your profile here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(n) =>
                  setData((e) => ({ ...e, name: n.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                value={data.password}
                onChange={(n) =>
                  setData((e) => ({ ...e, password: n.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !data.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.date ? (
                      format(data.date, "dd-MM-yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={data.date}
                    onSelect={(d) => setData((e: any) => ({ ...e, date: d }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button
                onClick={handleCreateEvent}
                disabled={!data.name || !data.password || !data.date || loading}
                type="submit"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
