import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="items-center flex">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/DocumentsDark.png"
            alt="Documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src="/DocumentsLight.png"
            alt="Documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            src="/ReadingDark.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <Image
            src="/ReadingLight.png"
            fill
            className="object-contain hidden dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
