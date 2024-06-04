"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelectCategoryProps {
  items: {
    id: number;
    name: string;
  }[];
}
export default function SelectCategory({ items }: SelectCategoryProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="danger"
          role="combobox"
          aria-expanded={open}
          className="w-full py-6 justify-between"
        >
          <p className="font-light">
            {value
              ? items.find((subject) => subject.name.toLowerCase() === value)
                  ?.name
              : "Select category..."}
          </p>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="font-light"
          />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {items.map((subject) => (
              <CommandItem
                key={subject.id}
                value={subject.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === subject.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {subject.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
