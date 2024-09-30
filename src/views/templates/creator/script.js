document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.creatorTemplate .boxCreator img');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.filter = 'grayscale(100%) brightness(0.5) blur(2px)';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            cards.forEach(c => c.style.filter = '');
        });
    });

    let slider; // Declare slider variable outside to maintain its reference

    function configureSlider() {
        const isMobile = window.innerWidth < 768;

        if (slider) {
            slider.destroy(); // Destroi o slider existente antes de criar um novo
        }

        slider = new KeenSlider(
            "#creator",
            {
                loop: isMobile ? true : false,
                mode: isMobile ? "snap" : "free",
                slides: {
                    origin: "auto",
                    perView: isMobile ? 1 : 3,
                    spacing: 0
                },
                range: {
                    min: 0,
                    max: 0
                }
            },
            [
                (slider) => {
                    let timeout;
                    let mouseOver = false;

                    const clearNextTimeout = () => clearTimeout(timeout);

                    const nextTimeout = () => {
                        clearTimeout(timeout);
                        if (!mouseOver) {
                            timeout = setTimeout(() => slider.next(), 5000);
                        }
                    };

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

    configureSlider();

    window.addEventListener('resize', () => {
        configureSlider(); // Reconfigure o slider ao redimensionar
    });
});
