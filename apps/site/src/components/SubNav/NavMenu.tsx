'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { FaCaretDown } from "react-icons/fa";
import { GlobalNavigationPayload } from '@/sanity/types';
import Link from 'next/link';

const generateUrl = (subItem: { _type: string; slug?: string; _ref: string; _id?: string }) => {
  if (subItem._type === "Tag") {
    return `/tag/${subItem.slug || ''}`;
  } else if (subItem._type === "Article") {
    return `/${subItem.slug || ''}`;
  }
  return "#";
};

export const NavMenu = ({ data }: { data: GlobalNavigationPayload | null }) => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-full justify-center">
      <NavigationMenu.List className="center m-0 flex list-none bg-white p-1">
        {data?.items.map(({ label, url, list }, idx) => (
          <NavigationMenu.Item key={idx}>
            {list ? (
              <>
                <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none">
                  {label} <FaCaretDown className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" aria-hidden />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                  <ul className="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px]">
                    {list.map((subItem, subIdx) => (
                      <li key={subIdx} className="row-span-3 grid">
                        <NavigationMenu.Link asChild>
                          <Link href={generateUrl(subItem)} className="flex h-full w-full select-none flex-col justify-end rounded-[6px] bg-gradient-to-b p-[25px] no-underline outline-none hover:bg-gray-100">
                            {subItem.label}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild>
                <Link href={url || "#"} className="block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none">
                  {label}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
        <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
      </NavigationMenu.Indicator>
      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-tion-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};
