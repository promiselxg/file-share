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
import { generateBreadcrumb } from "@/utils/generateBreadcrumbs";

const FolderBreadCrumb = ({ folder, className, currentPath }) => {
  const breadcrumbs = generateBreadcrumb(folder, currentPath);
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className={cn(`${className}`)}>
          <BreadcrumbItem>
            <Link
              href="/my_items"
              className="text-[--gray] font-[400] text-[14px] md:text-[20px] hover:text-[--primary-btn] link-transition"
              onClick={() => {
                return false;
              }}
            >
              My Items
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbs?.map((link, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-3">
                    <Link
                      href={`/folder/${link.id}`}
                      className={`text-[14px] md:text-[20px] flex items-center gap-2 ${
                        index === breadcrumbs.length - 1
                          ? "text-white"
                          : "text-[--gray]"
                      }`}
                    >
                      {index === breadcrumbs.length - 1 && (
                        <>
                          <Icon className="text-[14px] md:text-[20px]" />
                        </>
                      )}
                      {link.name}
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default FolderBreadCrumb;
