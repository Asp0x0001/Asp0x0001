// Select the particles container
const particlesContainer = document.querySelector('.particles');

// Particle properties
const numParticles = 30; // Number of particles to generate at a time (reduced for performance)
const particleSize = 5; // Size of each particle
const maxParticlesOnScreen = 150; // Maximum number of particles that can be on screen at once

// Function to create particles
function generateParticles() {
    // If there are too many particles on the screen, remove the oldest ones
    const existingParticles = document.querySelectorAll('.particle');
    if (existingParticles.length > maxParticlesOnScreen) {
        existingParticles[0].remove();
    }

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize the position and speed of each particle
        particle.style.width = `${particleSize}px`;
        particle.style.height = `${particleSize}px`;
        particle.style.top = `${-Math.random() * 50}px`; // Start slightly above the screen to avoid mess
        particle.style.left = `${Math.random() * window.innerWidth}px`; // Random start position horizontally
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random animation duration between 5s and 10s
        particle.style.animationDelay = `${Math.random() * 5}s`; // Delay for variation

        // Add the particle to the container
        particlesContainer.appendChild(particle);
    }
}

// Particle CSS animation
const styles = document.createElement('style');
styles.innerHTML = `
    @keyframes fall {
        0% {
            transform: translateY(0) translateX(0);
        }
        100% {
            transform: translateY(100vh) translateX(0);
        }
    }

    .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        animation: fall linear infinite;
    }
`;

document.head.appendChild(styles);

// Continuously generate particles at intervals to avoid performance lag
function generateParticlesContinuously() {
    generateParticles();
    setTimeout(generateParticlesContinuously, 1000); // Generate particles every 300ms (slower for less lag)
}

// Start generating particles when the page loads
generateParticlesContinuously();


fetch('animes.json')
    .then(response => response.json())
    .then(animes => {
        const animeBoxesContainer = document.getElementById('anime-boxes');

        // Create anime boxes dynamically
        animes.forEach(anime => {
            const animeBox = document.createElement('div');
            animeBox.classList.add('anime-box');

            // Add the image and name
            const animeImage = document.createElement('img');
            animeImage.src = anime.image;
            animeImage.alt = anime.name;

            const animeName = document.createElement('p');
            animeName.textContent = anime.name;

            // Append the elements
            animeBox.appendChild(animeImage);
            animeBox.appendChild(animeName);

            // Add hover effect (Popup details)
            animeBox.addEventListener('click', () => {
                window.open(anime.link, '_blank');
            });

            animeBoxesContainer.appendChild(animeBox);
        });
    })
    .catch(error => console.error('Error fetching anime data:', error));

    // Get the audio element
const audio = document.getElementById('background-music');

// Play the music and apply fade-in effect
audio.play();
audio.volume = 0; // Start with volume at 0 for the fade-in effect
audio.classList.add('fade');

// Slowly increase volume to 1 (full volume)
let fadeInDuration = 5; // Duration of the fade-in in seconds
let fadeOutDuration = 5; // Duration of the fade-out in seconds

// Fade-in function
function fadeInAudio() {
    let volume = 0;
    let interval = setInterval(function () {
        if (volume < 1) {
            volume += 0.1;
            audio.volume = volume;
        } else {
            clearInterval(interval);
        }
    }, fadeInDuration * 100);
}

// Fade-out function
function fadeOutAudio() {
    let volume = 1;
    let interval = setInterval(function () {
        if (volume > 0) {
            volume -= 0.1;
            audio.volume = volume;
        } else {
            clearInterval(interval);
        }
    }, fadeOutDuration * 100);
}

// Listen for when the music ends to fade out and fade in again
audio.addEventListener('ended', function () {
    fadeOutAudio();
    setTimeout(() => {
        fadeInAudio();
    }, fadeOutDuration * 1000); // Wait for fade-out to complete before fading in again
});

// Initially fade in the music
fadeInAudio();

