"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chapter } from "@prisma/client";
import ChapterTitleForm from "./chapter-title-form";
import { usePathname } from "next/navigation";
import ChapterIsFreeForm from "./chapter-isFree-form";
import ChapterDescriptionForm from "./chapter-description-form";
import ChapterAttachmentForm from "./chapter-attachment-form";
import ChapterVideoForm from "./chapter-video-form";
interface ChapterModalEditProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  item: Chapter | [] | any;
}
const ChapterModalEdit = ({ open, setOpen, item }: ChapterModalEditProps) => {
  const path = usePathname();
  const courseid = path.split("/").filter((item) => item !== "")?.[2];
  const sectionid = path.split("/").filter((item) => item !== "")?.[4];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-7xl overflow-scroll mx-auto max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Chapter Setup</DialogTitle>
          <DialogDescription>Complete All Fields (1/5) </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-5">
            <ChapterTitleForm
              initialData={item.title}
              chapterid={item.id}
              courseid={courseid}
              sectionid={sectionid}
            />
            <ChapterDescriptionForm
              initialData={item.description}
              chapterid={item.id}
              courseid={courseid}
              sectionid={sectionid}
            />
            <ChapterIsFreeForm
              initialData={item.isFree}
              chapterid={item.id}
              courseid={courseid}
              sectionid={sectionid}
            />
            <ChapterAttachmentForm
              initialData={item.attachment}
              chapterid={item.id}
              courseid={courseid}
              sectionid={sectionid}
            />
          </div>
          <div className="space-y-5">
            <ChapterVideoForm
              initialData={item}
              chapterid={item.id}
              courseid={courseid}
              sectionid={sectionid}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChapterModalEdit;
