import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
    return (
        <nav className=" text-center mt-4">
            {links.map((link, index) => (
                <Link
                    href={link.url || ""}
                    key={link.label}
					preserveScroll
                    className={
                        "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
                        (link.active ? "bg-gray-950 " : "") +
                        (!link.url
                            ? "!text-gray-500 cursor-not-allowed "
                            : "hover:bg-gray-950")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
