import Image from "next/image";

interface CardProps {
  title: string;
  desc: string;
  image: string;
}

export default function Home() {
  return (
    <div className="">
      <LandingSection />
      <div className="h-screen"></div>
    </div>
  );
}

const LandingSection = () => {
  const cardData = [
    {
      title: "Shift 99 V1 Tennis Racket",
      description:
        "Revolutionary performance racket with modern bending technology to generate heavy spin with unmatched comfort.",
      imageUrl: "/images/Racket1.webp",
    },
    {
      title: "Burn 100S V5 Tennis Racket",
      description:
        "Performance racket with a string pattern that generates relentless spin.",
      imageUrl: "/images/Racket2.webp",
    },
  ];

  return (
    <section className="relative section-padding">
      <div className="grid grid-cols-12 gap-x-24 h-full py-16 items-center">
        {/* left contetn */}
        <div className="col-span-5 relative">
          <div className="relative h-[90vh]">
            <Image
              src="/images/Tennis1.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center grayscale"
            />
            <div className="absolute bottom-4 left-4 text-base font-inter font-light mix-blend-difference text-white">
              BURN V100 2025 COLLECTION
            </div>
          </div>
        </div>
        {/* right content */}
        <div className="col-span-6 self-start h-full flex flex-col justify-between">
          <div className="flex flex-col gap-y-6 items-baseline">
            <div className="font-archivo text-display tracking-[-0.6rem]">
              <h1>DESIGNED</h1>
              <h1>TO DOMINATE.</h1>
            </div>
            <p className="text-base font-inter max-w-[60ch]">
              Discover rackets crafted for all levels, from weekend enthusiasts
              to professional champions. Your best game starts here.
            </p>
            <button className="bg-[#1e1e1e] flex items-center px-6 py-2 w-auto">
              <span className="text-white/90 text-h6 font-archivo">
                SHOP HERE
              </span>
              <Image
                src="/ArrowRight.svg"
                alt=""
                width={30}
                height={30}
                className="opacity-90"
              />
            </button>
          </div>
          <div>
            <h2 className="text-h4 font-archivo">NEW ARRIVALS.</h2>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {cardData.map((card, index) => (
                <NewCard
                  key={index}
                  title={card.title}
                  desc={card.description}
                  image={card.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewCard = ({ title, desc, image }: CardProps) => {
  return (
    <div>
      <div className="relative aspect-square mb-4">
        <Image src={image} alt="" fill className="object-cover object-center" />
        <Image
          src="ArrowDiagonal.svg"
          alt=""
          width={40}
          height={40}
          className="absolute m-4 right-0"
        />
      </div>
      <h3 className="text-h5 font-archivo uppercase mb-2">{title}</h3>
      <p className="text-base font-inter">{desc}</p>
    </div>
  );
};
