"use client";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Chapter } from "@prisma/client";
import {
  Grip,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import ChapterModalEdit from "./chapter-modal-edit";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
interface ChapterListProps {
  items: Chapter[];
  onReorder: (updateData: { id: number; position: number }[]) => void;
  sectionid: string;
  courseid: string;
}

const ChapterList = ({
  items,
  onReorder,
  sectionid,
  courseid,
}: ChapterListProps) => {
  const [chapters, setChapters] = useState(items);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIdChapter, setActiveIdChapter] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setChapters(items);
  }, [items]);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapters);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setChapters(items);

    const bulkUpdatedData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));
    onReorder(bulkUpdatedData);
  };
  if (!mounted) return null;
  const handleEdit = (id: number) => {
    setOpen(true);
    let cpt = items.findIndex((item) => item.id == id);
    setActiveIdChapter(cpt);
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `/api/course/${courseid}/section/${sectionid}/chapter/${activeIdChapter}`
      );

      setOpenWarning(false);
      router.refresh();
      toast.success(response.data.message);
    } catch (error) {
      console.log("[ERROR DELETE CHAPTER]");
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const isCompleted = (chapter: Chapter) => {
    if (chapter.title && chapter.description && chapter.videoUrl) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((cpt, idx) => (
                <Draggable
                  key={cpt.id}
                  draggableId={String(cpt.id)}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      placeholder={"Chapters"}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      {cpt.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {cpt.isFree && <Badge>Free</Badge>}
                        {isCompleted(cpt) ? (
                          <Badge variant={"success"}>Complete</Badge>
                        ) : (
                          <Badge variant={"warning"}>Draft</Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} className="h-4 w-8 p-0">
                              <span className="sr-only">Open Menu</span>
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex items-center gap-x-3 cursor-pointer"
                              onClick={() => handleEdit(cpt.id)}
                            >
                              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-x-3 cursor-pointer"
                              onClick={() => {
                                setOpenWarning(true);
                                setActiveIdChapter(cpt.id);
                              }}
                            >
                              <Trash2Icon className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {open && (
        <ChapterModalEdit
          open={open}
          setOpen={setOpen}
          item={chapters[activeIdChapter]}
        />
      )}
      {openWarning && (
        <Modal
          open={openWarning}
          setOpen={setOpenWarning}
          title="Delete Chapter"
          description="Are you sure you want to delete this chapter"
        >
          <div className="flex items-end justify-end gap-x-3">
            <Button
              variant={"danger"}
              className="outline-none "
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin " />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant={"outline"}
              className="outline-none"
              onClick={() => setOpenWarning(false)}
            >
              Cancell
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChapterList;
