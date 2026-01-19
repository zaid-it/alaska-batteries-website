// Smooth Scroll Logic for # links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate header height to avoid overlapping the title
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' // This creates the "nice scrolling effect"
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('i');

            // Close other open items (Optional - remove if you want multiple open)
            document.querySelectorAll('.faq-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.style.maxHeight = '0';
                    otherContent.style.opacity = '0';
                    otherContent.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle active item
            if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = '1';
                icon.style.transform = 'rotate(45deg)'; // Changes + to x
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});