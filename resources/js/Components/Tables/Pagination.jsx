import { router } from "@inertiajs/react";
import { IoChevronBackOutline, IoChevronForwardSharp } from "react-icons/io5";

export default function Pagination({ data }) {
  if (!data.links) return null;

  const currentPage = data.current_page;
  const lastPage = data.last_page;
  const visiblePages = 4;

  function getDisplayedPages() {
    let pages = [];

    if (lastPage <= visiblePages + 1) {
      pages = data.links.slice(1, -1);
    } else {
      pages.push(data.links[1]);

      if (currentPage > 3) {
        pages.push({ label: "...", url: null });
      }

      let start = Math.max(2, currentPage);
      let end = Math.min(lastPage - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = visiblePages;
      }

      if (currentPage >= lastPage - 2) {
        start = lastPage - visiblePages + 1;
        end = lastPage - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(data.links[i]);
      }

      if (currentPage < lastPage - 2) {
        pages.push({ label: "...", url: null });
      }

      pages.push(data.links[lastPage]);
    }

    return pages;
  }

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center space-x-1">
      <button
        onClick={() => router.visit(data.prev_page_url)}
        className={`px-3 py-1 text-[#4D4FED] ${
          !data.prev_page_url ? "opacity-50 cursor-default" : "cursor-pointer"
        }`}
        disabled={!data.prev_page_url}
      >
        <IoChevronBackOutline size={24} />
      </button>

      {displayedPages.map((link, index) => (
        <button
          key={index}
          onClick={() => link.url && router.visit(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label }}
          className={`px-3 text-[#4D4FED] text-base py-1 rounded-full ${
            link.active ? "bg-[#4D4FED] text-white" : ""
          } ${!link.url ? "cursor-default" : "cursor-pointer"}`}
          disabled={!link.url}
        />
      ))}

      <button
        onClick={() => router.visit(data.next_page_url)}
        className={`px-3 py-1 text-[#4D4FED] ${
          !data.next_page_url ? "opacity-50 cursor-default" : "cursor-pointer"
        }`}
        disabled={!data.next_page_url}
      >
        <IoChevronForwardSharp size={24} />
      </button>
    </div>
  );
}
