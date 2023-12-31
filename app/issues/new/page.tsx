"use client";
import {
  Button,
  CalloutRoot,
  CalloutText,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, seterror] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setisSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setisSubmitting(false);
      seterror("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <TextFieldRoot>
          <TextFieldInput placeholder="Title" {...register("title")} />
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
