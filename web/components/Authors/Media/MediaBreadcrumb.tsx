"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../Breadcrumb";
import { usePathname } from "next/navigation";
import { cn, focusRing } from "../../../utils/variants";
import { Link } from "../../Links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropDownMenu";
import { Button } from "../../Button";

export default function MediaBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const mediaIndex = segments.indexOf("media");
  const mediaPath = "/" + segments.slice(0, mediaIndex + 1).join("/");

  // Pegamos todos os segmentos após /media
  const dynamicSegments = segments.slice(mediaIndex + 1);

  // Itens para o Dropdown: todos menos o último (onde o usuário já está)
  const menuItems = dynamicSegments.slice(0, -1);
  // O item atual (último segmento da URL)
  const currentFolder = dynamicSegments[dynamicSegments.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Renderiza prefixos: users > authors */}
        {segments.slice(0, mediaIndex).map((segment) => (
          <div key={segment} className="flex items-center gap-1.5">
            <BreadcrumbItem className="text-neutral-400 dark:text-neutral-500 capitalize">
              {segment}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}

        {/* Link principal: Media */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={mediaPath}
              className={cn("border border-transparent capitalize", focusRing)}
            >
              media
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Se houver subpastas, mostra o Dropdown com os níveis intermediários */}
        {menuItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="size-6 p-0">
                    <span className="sr-only">
                      Abrir caminhos intermediários
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[160px]">
                  {menuItems.map((segment, index) => {
                    const fullPath =
                      "/" + segments.slice(0, mediaIndex + 2 + index).join("/");
                    return (
                      <DropdownMenuItem key={segment} asChild>
                        <Link
                          href={fullPath}
                          className="w-full cursor-pointer capitalize"
                        >
                          {segment.replace(/-/g, " ")}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Exibe a pasta atual como o último item (não clicável) */}
        {currentFolder && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-medium text-foreground capitalize">
              {currentFolder.replace(/-/g, " ")}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// "use client";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "../../Breadcrumb";
// import { usePathname } from "next/navigation";
// import { cn, focusRing } from "../../../utils/variants";
// import { Link } from "../../Links";

// export default function MediaBreadcrumb() {
//   const pathname = usePathname();
//   const pathnameArray = pathname.split(/(\/)/).splice(2);

//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {pathnameArray.map((path, index) => {
//           if (index % 2 === 0) {
//             const fullPath = "/" + pathnameArray.slice(0, index + 1).join("");
//             return index > 3 ? (
//               <BreadcrumbItem key={path}>
//                 <BreadcrumbLink asChild>
//                   <Link
//                     href={fullPath}
//                     className={cn("border border-transparent", focusRing)}
//                   >
//                     {path}
//                   </Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//             ) : (
//               <BreadcrumbItem
//                 key={path}
//                 className="text-neutral-400 dark:text-neutral-500"
//               >
//                 {path}
//               </BreadcrumbItem>
//             );
//           }
//           return <BreadcrumbSeparator key={index} />;
//         })}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
