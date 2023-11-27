

export default function Hero() {
    return (
        <section id='hero-section' className='h-screen mx-auto max-w-full flex flex-col justify-center items-center'>
            <div className="flex flex-col items-center gap-5 sm:flex-row">

                <div className="flex flex-col justify-center items-center max-w-xs sm:max-w-full">
                    <h1 className="text-white text-4xl">👋 les Gamerz</h1>
                    <h1 class="font-extrabold text-transparent text-5xl sm:text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        BIENVENUE
                    </h1>
                    <h1 className="text-white">
                        Déverrouiller votre potentiel
                    </h1>
                    <p className="text-white text-sm sm:text-2xl">
                      Collection de jeux-vidéos pour vous satisfaire !
                    </p>
                </div>

                <div className="">
                    <img
                        src="/images/hero.png"
                        alt="Banniere"
                        className=""
                        width="800"
                        height="800"
                        style={{ objectFit: "cover", }} />
                </div>
            </div>
        </section>
 
    )
}