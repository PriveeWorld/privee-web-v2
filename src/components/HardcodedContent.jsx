"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const HardcodedContent = ({ appStoreUrl = "https://priveee.onelink.me/AMM3/VEDATOR", playStoreUrl = "https://priveee.onelink.me/AMM3/VEDATOR" }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState(0);

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(imageScale + delta, 0.5), 3);
    setImageScale(newScale);
    
    if (newScale === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (imageScale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && imageScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (imageScale === 1) {
      setImageScale(2);
    } else {
      setImageScale(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const getDistance = (touches) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setLastPinchDistance(getDistance(e.touches));
    } else if (e.touches.length === 1 && imageScale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y
      });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches);
      if (lastPinchDistance > 0) {
        const scale = currentDistance / lastPinchDistance;
        const newScale = Math.min(Math.max(imageScale * scale, 0.5), 3);
        setImageScale(newScale);
        
        if (newScale === 1) {
          setImagePosition({ x: 0, y: 0 });
        }
      }
      setLastPinchDistance(currentDistance);
    } else if (e.touches.length === 1 && isDragging && imageScale > 1) {
      setImagePosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  return (
    <div className="w-full">
      {/* Discover Section */}
      <div className="mt-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="mb-6 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[28px] font-bold leading-tight tracking-tight text-transparent sm:text-[36px] md:text-[44px] lg:text-[52px]">
            DOBRODOŠLI U PRIVEE WORLD!
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-gray-700 font-medium">Otkrijte Privee</span>

            <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
              Zakoračite u <span className="font-semibold">novu eru</span> <span className="font-semibold">vizualnog pripovijedanja</span>
            </p>
            <p className="mb-6 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
              Privee nije samo još jedna društvena mreža – ovo je mjesto gdje vaši privatni trenuci postaju filmske priče.
            </p>

            <ul className="space-y-5 mb-8 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px] text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                    Uploadujte videozapise u privatnu sekciju i organizirajte ih u tematske foldere – i gledajte kako se pretvaraju u <span className="font-semibold">nevjerovatne lične filmove</span>.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                    Lajkovi, komentari i pregledi? <span className="font-semibold">100% su privatni</span> — dijelite ih samo vi i osoba koja reagira.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-500 mt-1 font-semibold">•</span>
                <div>
                  <p className="font-inter font-light tracking-[0.01em] leading-[20px]">
                     <span className="font-semibold">Uronite u Cinema sekciju</span>, naš glavni feed, pun uzbudljivih video vijesti, sportskih i lifestyle sadržaja. Povlačenjem prsta u bilo kojem smjeru, dodirom desno i lijevo po ekranu, istražite više od Privee Worlda.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mb-8">
              <p className="font-inter font-semibold text-gray-700 tracking-[0.18px] text-[18px] leading-[24px] text-center">
                <Link href={appStoreUrl} target="_blank" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline">
                  Preuzmite aplikaciju
                </Link>
                , pozovite prijatelje i iskusite čaroliju{" "}
                <Link href={appStoreUrl} target="_blank" className="text-[#CD1B70] hover:text-[#3B1872] transition-colors duration-300 cursor-pointer underline">
                  Privee Worlda
                </Link>
                !
              </p>
            </div>

            {/* Video Section */}
            <div className="mb-8 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-md w-full"
              >
                <video
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  controls
                  preload="metadata"
                  poster="/images/privee_tut_thumbnail.jpg"
                  onClick={(e) => {
                    if (e.target.requestFullscreen) {
                      e.target.requestFullscreen();
                    } else if (e.target.webkitRequestFullscreen) {
                      e.target.webkitRequestFullscreen();
                    } else if (e.target.msRequestFullscreen) {
                      e.target.msRequestFullscreen();
                    }
                  }}
                >
                  <source src="/videos/privee_tut.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="text-center mb-8">
        <h1 className="mb-4 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] bg-clip-text font-clash text-[28px] font-bold leading-tight tracking-tight text-transparent sm:text-[36px] md:text-[44px] lg:text-[52px]">
          Kako koristiti Privee World
        </h1>
        <div className="mb-4 text-lg font-medium text-gray-600 sm:text-xl">
          (bez napada panike)
        </div>
        <p className="mx-auto max-w-2xl text-base text-gray-500 sm:text-lg">
          Ili: preuzeli ste aplikaciju… i šta sad?
        </p>
      </div>

      {/* Welcome Card */}
      <motion.div 
        className="mx-auto mb-8 max-w-4xl rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg border border-purple-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center">
          <div className="mb-4 text-4xl">🌟</div>
          <h2 className="mb-4 font-clash text-2xl font-semibold text-gray-800">
            Hej, dobrodošli u Privee World! 🌟
          </h2>
           <p className="mx-auto max-w-2xl text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700">
             Ovo nije samo još jedna društvena mreža. Ovo je <span className="font-semibold text-[#3A1772]">tvoj život pretočen u film</span>. Ali prije
             nego što okačiš snimak svog psa dok jede špagete ili rođaka kako izvodi salto na
             svadbi, idemo <span className="font-semibold">sve razložiti. Korak po korak</span>.
           </p>
        </div>
      </motion.div>

      {/* What is Privee Section */}
      <div className="mx-auto mb-12 max-w-5xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
            Prvo i najvažnije: Šta je uopće Privee?
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div 
            className="rounded-xl bg-white p-8 shadow-md border border-gray-100"
            whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 text-3xl">🎬</div>
            <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
              Netflix za tvoj život
            </h3>
              <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                Privee World je mjesto na kojem se tvoja životna priča organizira poput <span className="font-semibold">Netflixove serije</span>.
                Kreiraš <span className="font-semibold text-[#3A1772]">"filmove"</span> – u suštini foldere – i svaki video ili fotografija koju dodaš ide u
                jedan od njih.
              </p>
        </motion.div>

      <motion.div
            className="rounded-xl bg-white p-8 shadow-md border border-gray-100"
            whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 text-3xl">🔒</div>
            <h3 className="mb-3 font-clash text-xl font-semibold text-gray-800">
              Privatno po defaultu
            </h3>
              <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                Najbolje od svega? Po defaultu je <span className="font-semibold text-[#CD1A70]">privatno</span>. Samo za tvoje oči. Sve dok ne kažeš: <span className="font-semibold">"OK, svijete,
                pogledaj ovo."</span>
              </p>
          </motion.div>
        </div>
      </div>

      {/* App Sections */}
      <div className="mx-auto mb-12 max-w-5xl">
        <motion.div 
          className="mb-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
            Tvoja aplikacija ima 3 glavne sekcije. Evo kako funkcioniraju:
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
        </motion.div>
        
        {/* 3 Main Sections Image */}
        <div className="mb-12 flex justify-center">
          <div 
            className="relative cursor-pointer group"
            onClick={() => setIsImageModalOpen(true)}
          >
            <Image
              src="/images/3_main_sections.jpg"
              alt="Privee World - 3 Main Sections: Cinema, Private, and Camera"
              width={800}
              height={600}
              className="rounded-2xl shadow-lg object-cover max-w-full h-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
            {/* Overlay with expand icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
            {/* Mobile tap indicator */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full md:hidden">
              Tap for full image
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div 
            className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 text-3xl">🎭</div>
            <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
              1. Cinema
            </h3>
              <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                Tu gledaš <span className="font-semibold text-blue-600">javne priče</span> drugih korisnika.
              </p>
          </motion.div>

      <motion.div
            className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
      >
            <div className="mb-4 text-3xl">🏠</div>
            <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
              2. Private
        </h3>
              <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                <span className="font-semibold text-green-600">Tvoj svijet. Tvoja priča.</span> Niko osim tebe to ne može vidjeti.
        </p>
      </motion.div>

      <motion.div
            className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-6 border border-orange-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 text-3xl">📸</div>
            <h3 className="mb-2 font-clash text-xl font-semibold text-gray-800">
              3. Camera
            </h3>
              <p className="text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">
                Ovdje ubacuješ sadržaj iz svoje galerije ili snimaš novi. Sve što dodaš prvo ide u <span className="font-semibold text-orange-600">tvoju Private sekciju</span>. <span className="font-semibold">Boom.</span>
              </p>
          </motion.div>
        </div>
      </div>

      {/* User Stories Section */}
      <div className="mx-auto mb-12 max-w-5xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-4 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
            Kako organizirati svoj život
          </h2>
          <p className="text-lg text-gray-600">(a da ne doživiš nervni slom)</p>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#3A1772] to-[#CD1A70] rounded-full"></div>
        </motion.div>

        {/* Maja's Story */}
        <motion.div 
          className="mb-12 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 border border-purple-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-6 flex items-center">
            <div className="mr-4 text-4xl">💼</div>
            <div>
              <h3 className="font-clash text-2xl font-bold text-gray-800">
                Upoznajmo Maju
              </h3>
              <p className="text-purple-600 font-medium">Šefica</p>
            </div>
          </div>
          
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Maja je <span className="font-semibold text-[#CD1A70]">šefica</span>. Ono, <span className="font-semibold">doslovno šefica</span>. Organizira <span className="font-semibold">globalne beauty evente</span>. Ima folder
            koji se zove <span className="font-semibold text-purple-700">Eventi</span>.
          </p>
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Nakon svakog eventa u folder ubaci nekoliko videa, doda <span className="font-semibold">naslov</span> (tipa <span className="font-semibold text-[#3A1772]">"NYC Pop-Up 💄"</span>)
            i napiše <span className="font-semibold">kratak opis</span> poput:
          </p>
          
          <div className="mb-6 rounded-lg bg-white/70 p-4 border-l-4 border-pink-400">
            <p className="italic text-gray-700">
              "Lansiranje šminke je bilo genijalno. Podsjetnik: nikada više ne zakazivati termin u 10 ujutro za pripremu postavke 😅"
            </p>
          </div>
          
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Kada svoj film Eventi pusti od početka, Maja dobija <span className="font-semibold text-[#CD1A70]">filmski prikaz</span> cijelog trajanja svog projekta.
          </p>
          <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Film je <span className="font-semibold text-green-600">privatan</span> – samo za njene oči. Ali kada poželi da neki trenutak podijeli sa svijetom,
            odabere video, opis malo prilagodi za javnost i <span className="font-bold text-[#CD1A70]">BOOM</span> – objavljen je na
            njenom javnom Privee profilu.
          </p>

          {/* Maja video embed */}
          <div className="mt-8 flex justify-center">
            <iframe 
              src="https://p.privee.world/embed?videoId=12a9ffda-37cb-4280-a21e-58f0f4814a1b&userId=4b8579d9-0dc4-4fb0-b24f-8829eeb54d0d"
              style={{width: '100%', height: '700px', maxWidth: '550px'}}
              frameBorder="0" 
              allow="autoplay; fullscreen" 
              allowFullScreen
              className="rounded-xl shadow-lg"
            />
          </div>
        </motion.div>

        {/* Ana's Story */}
        <motion.div 
          className="mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 border border-blue-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-6 flex items-center">
            <div className="mr-4 text-4xl">🎓</div>
            <div className="text-left">
              <h3 className="font-clash text-2xl font-bold text-gray-800 text-left">
                Predstavljamo: Anu, studenticu
              </h3>
              <p className="text-blue-600 font-medium text-left">Studentica</p>
            </div>
          </div>
          
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Ana sve konce svog <span className="font-semibold text-[#3A1772]">studentskog života drži u rukama</span>. Ima folder <span className="font-semibold text-blue-700">Kampus</span> za
            <span className="font-semibold">nezaboravne trenutke sa faksa</span>.
          </p>
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Ima još jedan koji se zove <span className="font-semibold text-blue-700">Prijatelji</span>. Jer – haloo!!?
          </p>
          <p className="mb-4 text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Svaki put kada zabilježi nešto što naprosto vrišti <span className="font-semibold text-[#CD1A70]">"Ovo je imalo vibru!"</span>, doda to u
            <span className="font-semibold">odgovarajući folder</span>.
          </p>
          <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">
            Za dvije godine, kada na dodjeli diplome bude grcala u suzama, imat će <span className="font-semibold text-[#3A1772]">cijeli film</span> pun svojih
            <span className="font-semibold text-[#CD1A70]">najljepših uspomena</span>.
          </p>

          {/* Ana video embed */}
          <div className="mt-8 flex justify-center">
            <iframe 
              src="https://p.privee.world/embed?videoId=8ecce508-b4eb-402f-bbd8-e4fd616cafbb&userId=be1575c7-a00e-4b92-bc29-2ff9381e4584"
              style={{width: '100%', height: '700px', maxWidth: '550px'}}
              frameBorder="0" 
              allow="autoplay; fullscreen" 
              allowFullScreen
              className="rounded-xl shadow-lg"
            />
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div 
          className="rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 border border-yellow-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-6 text-center">
            <div className="mb-4 text-4xl">💡</div>
            <h3 className="font-clash text-2xl font-bold text-gray-800">
              Pro savjeti za Privee eksperte
            </h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/70 p-4">
              <div className="mb-2 text-2xl">🏷️</div>
              <h4 className="mb-2 font-semibold text-gray-800">Imenuj pametno</h4>
              <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Recimo: "Avanture 2024" ili "Prva godina bebe Noe" – nešto što ćeš kasnije lako prepoznati.</p>
            </div>
            <div className="rounded-lg bg-white/70 p-4">
              <div className="mb-2 text-2xl">💭</div>
              <h4 className="mb-2 font-semibold text-gray-800">Okidači za prisjećanje</h4>
              <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Koristi opise kao okidače za prisjećanje. Zapiši šta osjećaš u tom trenutku.</p>
            </div>
            <div className="rounded-lg bg-white/70 p-4">
              <div className="mb-2 text-2xl">🎬</div>
              <h4 className="mb-2 font-semibold text-gray-800">Ti si reditelj</h4>
              <p className="text-sm text-gray-600 font-inter font-light tracking-[0.01em] leading-[20px]">Dijeli samo ono što želiš. Jedan isječak, cijeli film, ili ništa.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features & Users Section */}
      <div className="mx-auto mb-12 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* What you get */}
          <motion.div 
            className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 text-center">
              <div className="mb-4 text-4xl">🆓</div>
              <h3 className="font-clash text-2xl font-bold text-gray-800">
                Šta dobijaš (besplatno)
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">33 uploada svakog mjeseca – znači, 33 video/foto trenutka, bez naknade.</p>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Ako se pretplatiš 🎉 neograničeni uploadi i dužina videa do 1 pune minute (da, dobijaš više vremena da zablistaš).</p>
              </div>
            </div>
          </motion.div>

          {/* Who uses Privee */}
          <motion.div 
            className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
        whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-6 text-center">
              <div className="mb-4 text-4xl">👥</div>
              <h3 className="font-clash text-2xl font-bold text-gray-800">
                Ko sve koristi Privee?
        </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">👶</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Roditelji koji prave dokumentarce o svojoj bebi</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🏃</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Sportisti koji prate svoj napredak</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">✈️</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Putnici koji snimaju film o svakoj zemlji koju posjete</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🎓</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Studenti koji bilježe haos svog fakultetskog života</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">🎨</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Kreativci koji vode dnevnik svog stvaralačkog procesa iza scene</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-0.5 text-lg flex-shrink-0">✨</span>
                <span className="text-gray-700 font-inter font-light tracking-[0.01em] leading-[20px]">Obični ljudi koji dokumentiraju život – na smislen, lijep i autentičan način</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <motion.div 
        className="mx-auto mb-2 max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 sm:p-12 shadow-lg">
          <div className="text-center mb-8">
            <div className="mb-4 text-4xl">🎬</div>
            <h2 className="mb-6 font-clash text-3xl font-bold text-gray-800 sm:text-4xl">
              Da zaokružimo
            </h2>
          </div>
          
          <p className="mb-6 text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700 text-center max-w-3xl mx-auto">
            Ne moraš biti content creator da ispričaš priču. Samo trebaš živjeti – i to zabilježiti.
          </p>
          <p className="mb-8 text-lg font-inter font-light tracking-[0.01em] leading-[20px] text-gray-700 text-center max-w-3xl mx-auto">
            Zato samo naprijed. Pravi svoje filmove. Čuvaj ih samo za sebe. Ili ih podijeli sa svijetom.
            Samo nemoj dopustiti da tvoje uspomene zauvijek ostanu u nekom zabačenom kutku galerije.
          </p>
          
          <div className="mb-8 text-center">
            <div className="inline-block rounded-full bg-gradient-to-r from-[#3A1772] to-[#CD1A70] px-4 py-3 sm:px-8">
              <div className="text-base font-bold text-white sm:text-xl whitespace-nowrap">
                Ti živiš. Privee pamti.
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="mb-3 text-3xl">📺</div>
              <h3 className="font-clash text-lg font-semibold text-gray-800 sm:text-xl">
                Imaš još nejasnoća?
              </h3>
              <p className="text-gray-600 mt-2">Pogledaj nekoliko videa koje smo pripremili za tebe</p>
            </div>
            
            {/* Video Tutorial */}
            <div className="relative rounded-xl overflow-hidden bg-white/70 shadow-sm flex justify-center">
              <video
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                controls
                preload="metadata"
                poster="/images/prive_tut_1_thumbnail.jpg"
                onClick={(e) => {
                  if (e.target.requestFullscreen) {
                    e.target.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/prive_tut_1_compressed.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Download Buttons */}
      <div className="mt-24 mb-16">
        <div className="flex flex-row items-center justify-center gap-3 max-w-[400px] mx-auto">
          <Link href={appStoreUrl} target="_blank" className="w-[160px] sm:w-[180px]">
            <Image
              src="/App_Store.svg"
              alt="Download on the App Store"
              width={200}
              height={60}
              className="hover:opacity-80 transition-opacity duration-300 w-full h-auto"
            />
          </Link>
          <Link href={playStoreUrl} target="_blank" className="w-[160px] sm:w-[180px]">
            <Image
              src="/Google_Play.svg"
              alt="Get it on Google Play"
              width={200}
              height={60}
              className="hover:opacity-80 transition-opacity duration-300 w-full h-auto"
            />
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleImageModalClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleImageModalClose}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div
                className="relative overflow-hidden rounded-lg bg-white"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: imageScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
              >
                <Image
                  src="/images/3_main_sections.jpg"
                  alt="Privee World - 3 Main Sections: Cinema, Private, and Camera"
                  width={800}
                  height={600}
                  className="w-full h-auto transition-transform duration-200"
                  style={{
                    transform: `scale(${imageScale}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    transformOrigin: 'center center'
                  }}
                  priority
                />
              </div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                {imageScale > 1 ? 'Drag to move • Double-click to reset' : 'Double-click to zoom • Scroll to zoom'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HardcodedContent;
