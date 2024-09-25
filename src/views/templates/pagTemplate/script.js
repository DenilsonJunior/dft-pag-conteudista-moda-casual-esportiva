document.addEventListener('DOMContentLoaded', function () {
    function updateStickyPosition() {
        const filho = document.querySelector('.btnFixed');
        const contentReturn = document.querySelector('.contentReturn');
        
        // Define a posição inicial do elemento filho
        const offset = contentReturn.offsetTop;
    
        // Adiciona o evento de scroll apenas se a largura da tela for menor que 768px
        if (window.innerWidth < 768) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > offset) {
                    filho.style.position = 'fixed';
                    filho.style.top = '50vh';
                    filho.style.width = '100%'; // Para garantir que ocupe toda a largura
                } else {
                    filho.style.position = 'relative';
                }
            });
        } else {
            // Remove o evento de scroll se a largura for maior que 768px
            window.removeEventListener('scroll', arguments.callee);
        }
    }
    
    // Chama a função ao carregar a página e ao redimensionar a janela
    window.addEventListener('load', updateStickyPosition);
    window.addEventListener('resize', updateStickyPosition);
});
