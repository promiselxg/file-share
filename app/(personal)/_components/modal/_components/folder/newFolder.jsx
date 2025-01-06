"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/context/Dialog.context";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  folder_name: z.string().min(2, {
    message: "Folder Name must be at least 2 characters.",
  }),
});

const NewFolder = () => {
  const { closeDialog } = useDialog();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("is submitting", isSubmitting);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          placeholder="Enter a folder name"
          className="border border-[#434343] boxShadow focus-visible:outline-none focus-visible:border-[--primary-btn] text-[--sidebar-link-color] text-[14px] rounded-[8px] mt-3"
          {...register("folder_name")}
        />
        {errors?.folder_name && (
          <span className=" text-red-600 text-[12px] mt-2 ml-1">
            {errors?.folder_name?.message}
          </span>
        )}
        <div className="w-full flex justify-end gap-3 mt-2">
          <Button
            variant="outline"
            className="bg-transparent border-[#434343] hover:bg-transparent hover:border-[--primary-btn] hover:text-[--primary-btn] text-[--popover-text-color]"
            onClick={() => closeDialog("newFolder")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[--primary-btn] hover:bg-[--primary-btn] disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className=" animate-spin" />}
            {isSubmitting ? "please wait..." : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewFolder;
