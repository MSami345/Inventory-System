"use client";
import Link from "next/link";
import React from "react";

const Button = ({ btnText, btnLink }: { btnText: string; btnLink: string }) => {
  return (
    <Link href={btnLink}>
      <button className="p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
        {btnText}
      </button>
    </Link>
  );
};

export default Button;
