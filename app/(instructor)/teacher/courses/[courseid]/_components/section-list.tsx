"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Section } from "@prisma/client";
import axios from "axios";
import {
  Grip,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  items: Section[];
  onReorder: (updateData: { id: number; position: number }[]) => void;
  onEdit: (id: number) => void;
  courseid: string;
}

const SectionList = ({
  items,
  onReorder,
  onEdit,
  courseid,
}: ChapterListProps) => {
  const [sections, setSections] = useState(items);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idActiveSection, setIdActiveSection] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setSections(items);
  }, [items]);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedSections = items.slice(startIndex, endIndex + 1);
    setSections(items);

    const bulkUpdatedData = updatedSections.map((sct) => ({
      id: sct.id,
      position: items.findIndex((item) => item.id === sct.id),
    }));
    onReorder(bulkUpdatedData);
  };
  if (!mounted) return null;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `/api/course/${courseid}/section/${idActiveSection}`
      );
      setOpen(false);
      router.refresh();
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((sct, idx) => (
                <Draggable
                  key={sct.id}
                  draggableId={String(sct.id)}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      placeholder={"sections"}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      {sct.title}
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {sct.isPublished ? (
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
                              onClick={() => onEdit(sct.id)}
                            >
                              <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-x-3 cursor-pointer"
                              onClick={() => {
                                setOpen(true);
                                setIdActiveSection(String(sct.id));
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
        <Modal
          open={open}
          setOpen={setOpen}
          title="Delete Section"
          description="Are you sure you want to delete this section"
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
              onClick={() => setOpen(false)}
            >
              Cancell
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SectionList;
