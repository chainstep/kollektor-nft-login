import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface LoginViewProps {
  title: string;
  teaser: string;
  author: string;
  date: string;
  image: string;
}

export default function ItemPreview({
  title,
  teaser,
  author,
  date,
  image,
}: LoginViewProps) {
  return (
    <section className="grid h-screen">
      <div></div>
    </section>
  );
}
