import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/IconDark.svg"
        height={45}
        width={45}
        alt="logo"
        className="dark:hidden"
      />
      <Image
        src="/IconLight.svg"
        height={45}
        width={45}
        alt="logo"
        className="hidden dark:block"
      />
      <p className="font-semibold">Mindcanvas</p>
    </div>
  );
};

export default Logo;
