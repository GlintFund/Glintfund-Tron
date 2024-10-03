import React from "react";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center mt-8 pb-5 mb-5 gap-5">
      <div className="flex">
        <p className="text-2xl font-medium z-[1000000]">
          Powered by&nbsp;
          <a
            href="https://zetachain.com"
            target="_blank"
            rel="Zetachain"
            className="text-red-800 font-bold"
          >
            Tron
          </a>
        </p>
      </div>
      <div className="flex">
        <p className="cursor-pointer">Terms &nbsp;</p>
        <p className="text-purple-500 cursor-pointer">and &nbsp;</p>
        <p className="cursor-pointer">Conditions</p>
      </div>
      <div className="flex gap-7 z-[100000]">
        <a
          href="https://x.com/glintfund"
          target="_blank"
          rel="GlintFund Twitter"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://discord.gg/c7zQwM5h2E"
          target="_blank"
          rel="GlintFund Discord"
        >
          <FaDiscord />
        </a>
        <a
          href="https://github.com/Dunsin-cyber/glint-fund"
          target="_blank"
          rel="GlintFund Github"
        >
          <FaGithub />
        </a>
        <a
          href="https://medium.com/@glintfund"
          target="_blank"
          rel="GlintFund Medium"
        >
          <FaMedium />
        </a>
      </div>
    </div>
  );
}

export default Footer;
