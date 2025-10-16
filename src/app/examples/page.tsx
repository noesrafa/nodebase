"use client";
import Link from "next/link";

const Examples = async () => {
  return (
    <div>
      <Link href="/examples/easy-trpc">Easy TRPC</Link>
      <Link href="/examples/best-trpc">Best TRPC</Link>
    </div>
  );
};

export default Examples;
