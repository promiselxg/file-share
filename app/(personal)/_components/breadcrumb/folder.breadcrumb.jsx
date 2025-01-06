"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Icon } from "../icon/icon";
import Link from "next/link";

const FolderBreadCrumb = ({ className }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className={cn(`${className}`)}>
          <BreadcrumbItem>
            <Link
              href="/my_items"
              className="text-[--gray] font-[400] text-[20px] hover:text-[--primary-btn] link-transition"
              onClick={() => {
                return false;
              }}
            >
              My Items
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-3">
              <Icon className="text-[30px]" />
              <span className="text-white text-[20px]">Folder 8</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default FolderBreadCrumb;
