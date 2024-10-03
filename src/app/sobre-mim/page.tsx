"use server";

import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { GoogleMapsIcon } from "../../icons";

export default async function AboutPage() {
  return (
    <div className="relative mt-16 w-full h-full mx-0 flex justify-center pb-16">
      <div className="absolute w-full h-60 bottom-full translate-y-1/2 -z-10 bg-base-300 dark:bg-dark-base-300" />
      <div className="relative w-full max-w-5xl mx-12 rounded-3xl border border-base-border dark:border-dark-base-border mt-12 flex flex-col items-center bg-base-150 dark:bg-dark-base-150">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`
          relative size-44 rounded-full 
          before:content-[''] before:absolute before:w-[calc(100%_+_6px)] before:h-[calc(100%_+_6px)] 
          before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
          before:rounded-full before:-z-[1] before:opacity-50 before:blur-xl before:bg-profile-image-border-2 before:animate-border-spin 
          after:content-[''] after:absolute after:w-full after:h-full 
          after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 
          after:rounded-full after:-z-[1] after:bg-profile-image-border-2 after:animate-border-spin 
        `}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="https://placehold.co/160x160/png"
                alt="Foto de perfil de fulano de tal"
                fill
                sizes="176px"
                className="p-1 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-full p-8 mt-16">
          <div className="flex flex-col text-center mb-12">
            <span className="text-base-neutral dark:text-dark-base-neutral text-4xl font-extrabold">
              Fulano de Tal
            </span>
            <span className="text-base-neutral dark:text-dark-base-neutral text-xl">
              GitHub:{" "}
              <Link
                href="https://github.com/fulano-de-tal"
                target="_blank"
                className="font-bold underline text-base-green dark:text-dark-base-green hover:text-base-green-hover dark:hover:text-dark-base-green-hover"
              >
                https://github.com/fulano-de-tal
              </Link>
            </span>
          </div>
          <p className="text-base-neutral dark:text-dark-base-neutral text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsa
            corrupti fugiat fuga, iusto dolorum ratione ullam quasi et facere
            suscipit nemo quam repellat debitis! Sint quisquam mollitia eius
            praesentium exercitationem quidem autem reiciendis neque
            voluptatibus dolorem, debitis expedita ea nisi voluptatem distinctio
            temporibus deserunt! Accusamus voluptatum atque maiores magni?
          </p>
        </div>
        {/* <hr className="w-full dark:border-dark-base-border" /> */}
        <div className="border-y border-base-border dark:border-dark-base-border px-28 flex justify-between w-full p-4 bg-base-200 dark:bg-dark-base-300">
          <span className="text-base-placeholder dark:text-dark-base-placeholder text-base flex items-center gap-1">
            <GoogleMapsIcon /> SP, Brasil
          </span>
          <span className="text-base-placeholder dark:text-dark-base-placeholder text-base flex items-center gap-1">
            <FaCakeCandles /> 11-08-1998
          </span>
          <span className="text-base-placeholder dark:text-dark-base-placeholder text-base flex items-center gap-1">
            <MdAttachEmail /> fulanodetal@gmail.com
          </span>
          <span className="text-base-placeholder dark:text-dark-base-placeholder text-base flex items-center gap-1">
            <FaGithub /> https://github.com/fulano-de-tal
          </span>
        </div>
      </div>
    </div>
  );
}
