import React from "react";
import Logo from "../Logo";

function Nav2() {
  return (
    <div className="flex justify-between mt-6">
      <div className="flex">
        <p className="text-2xl  font-extrabold">
          <Logo />
        </p>
      </div>
      <div className="hidden md:flex gap-12 items-center justify-center z-[20]">
        <button className="btn">Home</button>
        <a
          href="https://medium.com/@glintfund"
          target="_blank"
          rel="GlintFund Medium"
        >
          <p className="cursor-pointer">Learn</p>
        </a>
        <a
          href="https://discord.gg/c7zQwM5h2E"
          target="_blank"
          rel="GlintFund Discord"
        >
          <p className="cursor-pointer">Community</p>
        </a>
        <a
          href="https://x.com/glintfund"
          target="_blank"
          rel="GlintFund Twitter"
        >
          <p className="cursor-pointer">Support</p>
        </a>
      </div>
    </div>
  );
}

export default Nav2;
