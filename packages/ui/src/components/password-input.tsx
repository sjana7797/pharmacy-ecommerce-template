"use client";

import { forwardRef, useState } from "react";
import { Input } from "./input";
import Render from "./render";
import { Button } from "./button";
import { EyeClosed, EyeIcon } from "lucide-react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type">
>(({ ...props }, ref) => {
  const [type, setType] = useState<"password" | "text">("password");

  //   handlers
  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <div className="flex items-center gap-x-2">
      <Input {...props} ref={ref} type={type} />
      <Button onClick={toggleType} variant="ghost" size="icon" type="button">
        <Render renderIf={type === "password"}>
          <EyeIcon className="h-4 w-4" />
        </Render>
        <Render renderIf={type === "text"}>
          <EyeClosed className="h-4 w-4" />
        </Render>
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
