// Adiciona um fundo sólido à barra de navegação ao rolar a página
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark');
    } else {
        navbar.classList.remove('bg-dark');
    }
});