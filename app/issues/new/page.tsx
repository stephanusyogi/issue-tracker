"use client";
import { Button, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <SimpleMDE placeholder="Description"></SimpleMDE>
      <Button>Submit New Issue</Button>
    </div>
  );
}
