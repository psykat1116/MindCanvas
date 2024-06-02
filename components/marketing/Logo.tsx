import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/LogoDark.png"
        height={25}
        width={25}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/LogoLight.png"
        height={25}
        width={25}
        alt="logo"
        className="hidden dark:block"
      />
      <p className="font-semibold">Mindcanvas</p>
    </div>
  );
};

export default Logo;
