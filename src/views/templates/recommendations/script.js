// document.addEventListener('DOMContentLoaded', function () {
//     function configureSlider() {
//         // Verifique o tamanho da tela
//         const isMobile = window.innerWidth < 768;

//         var animation = { duration: 40000, easing: (t) => t }

//         // Configure o slider com base na largura da tela
//         new KeenSlider("#recommendations", {
//             loop: true,
//             mode: "free",
//             slides: { origin: "auto", perView: isMobile ? 2.5 : 3.5, spacing: 15 },
//             range: {
//                 min: 0,
//                 max: 0,
//             },
//             created(s) {
//                 s.moveToIdx(5, true, animation)
//             },
//             updated(s) {
//                 s.moveToIdx(s.track.details.abs + 5, true, animation)
//             },
//             animationEnded(s) {
//                 s.moveToIdx(s.track.details.abs + 5, true, animation)
//             },
//         });
//     }

//     // Inicialize o slider na carga inicial
//     configureSlider();
// });

// window.addEventListener('resize', function() {
//     configureSlider();
// });

document.addEventListener('DOMContentLoaded', function () {
    function configureSlider() {
        const isMobile = window.innerWidth < 768;

        var slider = new KeenSlider(
            "#recommendations",
            {
                loop: true,
                mode: isMobile ? "free" : "snap", // Altera o modo para "snap" em desktop
                slides: {
                    origin: "auto",
                    perView: isMobile ? 2.5 : 3.5,
                    spacing: 15
                },
                range: {
                    min: 0,
                    max: 0
                }
            },
            [
                (slider) => {
                    if (isMobile) {
                        // Desabilitar animações em mobile
                        return;
                    }

                    let timeout;
                    let mouseOver = false;
                    
                    function clearNextTimeout() {
                        clearTimeout(timeout);
                    }

                    function nextTimeout() {
                        clearTimeout(timeout);
                        if (mouseOver) return;
                        timeout = setTimeout(() => {
                            slider.next();
                        }, 2000);
                    }

                    slider.on("created", () => {
                        slider.container.addEventListener("mouseover", () => {
                            mouseOver = true;
                            clearNextTimeout();
                        });
                        slider.container.addEventListener("mouseout", () => {
                            mouseOver = false;
                            nextTimeout();
                        });
                        nextTimeout();
                    });

                    slider.on("dragStarted", clearNextTimeout);
                    slider.on("animationEnded", nextTimeout);
                    slider.on("updated", nextTimeout);
                }
            ]
        );
    }

    // Inicialize o slider na carga inicial
    configureSlider();

    // Reconfigure o slider em caso de redimensionamento
    window.addEventListener('resize', function () {
        configureSlider();
    });
});


