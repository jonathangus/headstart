import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { AllPosts } from "@/components/all-posts";

export default function Home() {
  return <AllPosts />;
}
