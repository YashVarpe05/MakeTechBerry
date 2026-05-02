import { useState } from "react";

export default function Hero() {
  return (
    <div className="bg-transparent pt-10">
      <div className="relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-72.1875"
          />
        </div>
        <div className="mx-auto max-w-2xl pt-20 pb-0">
          <div className="text-center">
            <div className="relative inline-block">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] rounded-full transform scale-150"
              />
              <img
                src="/character.png"
                alt="character"
                className="w-1/4 mx-auto drop-shadow-xl"
              />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-balance text-gray-900 dark:text-white sm:text-6xl leading-snug sm:leading-relaxed transition-colors duration-300">
              Innovating <br /> learning  &{" "} <br />
              <span className=" text-[#9062ff] dark:text-purple-400">building digital futures</span>
            </h1>
            <p className="mt-8 text-xl font-medium text-pretty text-gray-600 dark:text-gray-300 sm:text-2xl/9 transition-colors duration-300">
              <span className="font-bold text-gray-900 dark:text-white">MakeTechBerry LLP</span>{" "}
              is a startup founded in 2025, dedicated to providing comprehensive
              training and internship programs in{" "}
              <span className="font-bold text-gray-900 dark:text-white">App Development</span>,{" "}
              <span className="font-bold text-gray-900 dark:text-white">Web Development</span>,{" "}
              <span className="font-bold text-gray-900 dark:text-white">Gen-AI</span>, and{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Python Full Stack Development
              </span>
              .
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-full bg-[#9062FF] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9062FF] transition-all hover:scale-105"
              >
                Explore Programs
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-[#9062FF] dark:hover:text-purple-400 transition-colors">
                Start Your Journey <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-36.125 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-72.1875"
          />
        </div>
      </div>
    </div>
  );
}
