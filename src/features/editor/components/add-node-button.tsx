"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

const AddNodeButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size="icon"
      variant="outline"
      className="bg-background"
    >
      <PlusIcon className="size-4" />
    </Button>
  );
});

export default AddNodeButton;

AddNodeButton.displayName = "AddNodeButton";
