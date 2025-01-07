"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";

const NagradnaIgra = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const imageRefs = useRef([]);

  const NAGRADNA_IGRA_SECTIONS = [
    {
      heading: "Giveaway: #Recap24",

      text: (
        <>
          <h3
            className="font-clashDisplay text-[25px] sm:text-[40px] font-normal leading-[49.2px] tracking-[0.01em] text-left text-white mb-6"
            style={{
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Podijeli svoje najbolje momente!
          </h3>
          <h3
            className="font-clashDisplay text-[25px] sm:text-[30px] font-normal leading-[35.2px] tracking-[0.01em] text-left text-white mb-6"
            style={{
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Objavi svoj kratki video na Priveeu i osvoji <br></br> <strong
            style={{
              fontFamily: "ClashDisplay",
              fontSize: "28px",
              fontWeight: 500,
              lineHeight: "30px",
              letterSpacing: "0.01em",
              textAlign: "justify",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
         iPhone 16,  Apple AirBuds 
          </strong> i druge vrijedne nagrade!<br></br><br></br> 
             Download aplikacije na ovom linku: <br></br><br></br>
             <div style={{ textAlign: "left" }}>
            <button
              onClick={() => window.open("https://priveee.onelink.me/AMM3/1313DJ", "_blank")}
              style={{
                border: "3px solid",
                borderImageSource: "linear-gradient(56.05deg, #CD1B70 8.3%, #F9772E 81.59%)",
                borderImageSlice: 1,
                padding: "8px 16px",
                color: "#fff",
                background: "transparent",
                borderRadius: "10px",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "30px",
                letterSpacing: "0.15em",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              FREE DOWNLOAD
            </button>
          </div>
          </h3>
          Tvoji najbolji trenuci iz 2024. godine zaslužuju pažnju i priliku da budu
          nagrađeni!   <strong
            style={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "30px",
              letterSpacing: "0.01em",
              textAlign: "justify",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
           Možete osvojiti iPhone 16, AirPods, ili upgrade na Privee World
           platformi.
          </strong>  Vrijeme je da zaviriš u galeriju svog mobitela, izabereš one
          najposebnije trenutke i učestvuješ u ovoj kreativnoj nagradnoj igri.
          <br /><br />
          Privee World je platforma koja omogućava korisnicima da na kreativan i
          organiziran način zabilježe svoje najvažnije trenutke i transformiraju ih u
          personalne dokumentarce. Revolucija je to u načinu na koji bilježimo, čuvamo i
          dijelimo svoje uspomene - društveni medij budućnosti.{" "}
          <strong
            style={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "30px",
              letterSpacing: "0.01em",
              textAlign: "justify",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Download je besplatan.
          </strong>
          <br /><br />
        
        </>
      ),
    },
    {
      heading: "Kako učestvovati?",
      text: ( <>Potraži u arhivi momente koji su obilježili tvoju godinu. Pripremi kratki video koji prikazuje neke od najljepših trenutaka iz tvoje 2024. godine.
<br /><br />
<strong
            style={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "30px",
              letterSpacing: "0.01em",
              textAlign: "justify",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
Objavi na Privee:          </strong> Postavi svoj video na platformu, pobrini se da bude u “Public” modu.
<br /><br />
<strong
            style={{
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "30px",
              letterSpacing: "0.01em",
              textAlign: "justify",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
Podijeli objavu:         </strong> Podijeli Privee Giveaway objavu sa našeg Instagrama ili Facebooka na svom Instagram ili Facebook storiju ili profilu, taguj privee.world i pozovi prijatelje da učestvuju!
<br /><br />    
Obavezno zapratite naše zvanične Instagram i Facebook profile, kako biste bili blagovremeno informisani o svim novostima.
   </>) },
    {
      heading: "Kako kreirati film?",
      text: (<>Privee ima tri osnovne cjeline i na svaku od njih prelazite povlačenjem (swiping) lijevo ili desno.<br></br> U nastavku, u video materijalu pogledajte kako uploadovati i kreirati svoj film   <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
    #RECAP24
    </strong></>)
    },
    {

      text: (<>
      <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
    Napomena:
    </strong> <em>Svaki upload završava u vašem privatnom profilu. Kako biste svoj film objavili da bude vidljiv svima, potrebno je svaki video/foto/scenu pojedinačno objaviti.
Na dnu ekrana možete pronaći ikonicu (krug) koji sadrži vodič za korištenje aplikacije. Za više informacija posjetite www.privee.world</em>
<br></br> <br></br>
<div style={{ textAlign: "center" }}>
            <button
              onClick={() => window.open("https://priveee.onelink.me/AMM3/1313DJ", "_blank")}
              style={{
                border: "3px solid",
                borderImageSource: "linear-gradient(56.05deg, #CD1B70 8.3%, #F9772E 81.59%)",
                borderImageSlice: 1,
                padding: "8px 16px",
                color: "#fff",
                background: "transparent",
                borderRadius: "10px",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "30px",
                letterSpacing: "0.15em",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              FREE DOWNLOAD
            </button>
          </div></>),
    },
    {
      heading: "Šta možeš osvojiti?",
      text: (<>    <strong
        style={{
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "30px",
          letterSpacing: "0.01em",
          textAlign: "justify",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
      Prva nagrada:
      </strong> Potpuno novi iPhone 16 - zabilježi svoje buduće trenutke u vrhunskoj kvaliteti.<br></br> <br></br>
      <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
    Druga nagrada:
    </strong> Apple AirPods - uživaj u omiljenoj muzici uz savršeni zvuk. Neograničen broj objava za osam korisnika Privee World platforme.</>),
    },
    {
      heading: "Važne informacije",
      text: (<>    <strong
        style={{
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "30px",
          letterSpacing: "0.01em",
          textAlign: "justify",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
      Trajanje nagradne igre:
      </strong>
      <br></br> Nagradna igra traje do 20. januara 2025. godine. Objavi svoj video na vrijeme kako bi imao priliku za pobjedu. <br></br> <br></br>
      <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
    Proglašenje pobjednika:
    </strong> <br></br>
Naš stručni žiri procjenjivat će sve prijave prema sljedećim kriterijima: kreativnost, originalnost, i sposobnost da inspirišeš i zabaviš.
<br></br>  <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
   Pobjednici će biti objavljeni 3. februara 2025. godine.
    </strong>
<br></br> <br></br>
<strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
   Pravila i uslovi:
    </strong> <br></br>
Video mora biti originalan i autentičan.
 Učesnici moraju pratiti sve korake za prijavu kako bi bili kvalifikovani. <br></br> <br></br>

 <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
Savjeti za uspješnu prijavu:
    </strong>  <br></br> <br></br>

    <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
Budi kreativan:
    </strong> Prikaži svoj video na način koji će se izdvojiti od ostalih.<br></br>

    <strong
      style={{
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "30px",
        letterSpacing: "0.01em",
        textAlign: "justify",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
Inspiracija je ključ:
    </strong> Dijeli trenutke koji će pokrenuti emocije kod publike.
   </>) },
    {
      heading: "Zašto učestvovati?",
      text: "Ovo je tvoja prilika da podijeliš svoje uspomene iz 2024. godine i osvojiš fantastične nagrade! Bilo da se radi o nevjerovatnom putovanju, posebnom životnom trenutku, ili zabavnoj situaciji koja te nasmijala do suza – tvoje priče vrijede pažnje!",
    },
    {
  
      text: (<>Požuri! Prijave su otvorene, a tvoji najbolji trenuci čekaju da budu viđeni i nagrađeni! <br></br> <br></br>          <div style={{ textAlign: "center" }}>
        <button
          onClick={() => window.open("https://priveee.onelink.me/AMM3/1313DJ", "_blank")}
          style={{
            border: "3px solid",
            borderImageSource: "linear-gradient(56.05deg, #CD1B70 8.3%, #F9772E 81.59%)",
            borderImageSlice: 1,
            padding: "8px 16px",
            color: "#fff",
            background: "transparent",
            borderRadius: "10px",
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "30px",
            letterSpacing: "0.15em",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          DOWNLOAD PRIVEE
        </button>
      </div> <br></br></>),
    },
  ];

  return (
    <div
      className="relative min-h-screen w-full bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/images/bck.png')" }}
    >
      <FullscreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <TopNav onMenuClick={() => setIsNavOpen(true)}  />

      {/* Flex container for desktop layout */}
      <div className="flex flex-col lg:flex-row relative mt-4 sm:mt-0 h-screen w-full max-w-[1600px] overflow-y-auto px-4 py-12 sm:px-8 sm:py-16">
        {/* Content Section */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div>
              {/* Optional introductory paragraph (currently empty) */}
              <p className="text-md mx-auto mb-8 max-w-3xl font-light text-white sm:mb-12 sm:text-base md:text-lg lg:text-xl">
                {/* You can add an introductory text here if needed */}
              </p>

              {/* Render each section */}
              {NAGRADNA_IGRA_SECTIONS.map((section, idx) => (
                <div
                  key={idx}
                  className="mb-20 w-full max-w-[757px] flex flex-col lg:flex-row"
                >
                  <div className="w-full lg:w-[85%] xl:w-[95%] mx-auto px-4">
                    <h2
                      className="font-clashDisplay text-[28px] sm:text-[40px] font-semibold leading-[49.2px] tracking-[0.01em] text-left text-white mb-0.2"
                      style={{
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                      }}
                    >
                      {section.heading}
                    </h2>
                    <div
                      className="text-sm font-light text-white sm:text-base md:text-lg"
                      style={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontWeight: 300,
                        lineHeight: "30px",
                        letterSpacing: "0.01em",
                        textAlign: "justify",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                      }}
                    >
                      {section.text}
                    </div>
                    {section.heading === "Kako kreirati film?" && (
                      <div className="mt-4 block lg:hidden">
                        <iframe
                          width="344px"
                          height="586px"
                        
                          src="https://www.youtube.com/embed/3lPPig-i2tk"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    {section.heading === "Kako kreirati film?" && (
                      <div className="hidden lg:block mt-2">
                        <img src="/images/tutorial1.svg" alt="Tutorial" className="w-full h-auto mt-4" />
                      </div>
                    )}
                  </div>

                  {/* Conditionally add image below specific sections on mobile */}
                  {idx === 0 && (
                    <div className="block lg:hidden mt-4">
                      <img
                        src="/images/iphone_nagrada.svg"
                        alt="iPhone Nagrada"
                        className="w-full h-auto mt-8"
                      />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Column for Desktop */}
        <div className="hidden lg:block w-2/5 ml-4 mr-4 mt-20">
          <img
            src="/images/iphone_nagrada.svg"
            alt="iPhone Nagrada"
            className="w-full h-auto"
          />
          <div className="mt-4">
            <iframe
              width="344px"
              height="586px"
              style={{
                position: "absolute",
                top: "1350px",
                left: "1059px",
                gap: "0px",
                opacity: "0px",
              }}
              src="https://www.youtube.com/embed/3lPPig-i2tk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <img
            src="/images/nagrada.svg"
            alt="Nagrada"
            style={{ position: "absolute", top: "2600px" }}
            className="w-140 h-auto mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NagradnaIgra;
