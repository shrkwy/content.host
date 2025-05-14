


// Replace spinner SVG on shaka to get the mod animation.
function replaceSpinnerSVG(svg_fed) {
    fetch(svg_fed)
        .then(response => response.text())
        .then((svgContent) => {
            document.querySelectorAll('.shaka-spinner-svg').forEach((svgElement) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = svgContent.trim();
                const newSVG = tempDiv.querySelector('svg');
                if (newSVG) {
                    svgElement.replaceWith(newSVG);
                }
            });
        })
        .catch(console.error);
}

/*
const observerConfig = {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
};
const spinnerObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        const $target = $(mutation.target);
        if ($target.hasClass("shaka-spinner-container") && $target.hasClass("shaka-hidden")) {
            replaceSpinnerSVG();
        }
    });
});
spinnerObserver.observe(document.body, observerConfig);
*/


////////--------------------------------------------------------////////



// Replace default button icons
function replaceIcons() {
    const buttonIcons = {
        'shaka-language-button': 'record_voice_over',
        'shaka-resolution-button': 'tune',
        'shaka-playbackrate-button': 'slow_motion_video',
        'shaka-pip-button': 'pip',
        'shaka-cast-button': 'cast',
        'shaka-loop-button': 'repeat',
        'shaka-caption-button': 'subtitles',
    };
    Object.entries(buttonIcons).forEach(([buttonClass, iconName]) => {

        document.querySelectorAll(`button.${buttonClass} label`).forEach(label => {
            if (!label.querySelector('.material-icons-round')) {
                const icon = document.createElement('b');
                icon.className = 'material-icons-round';
                icon.textContent = iconName;
                label.prepend(icon);
            }
        });
        document.querySelectorAll(`button.${buttonClass} i`).forEach((iElement) => {
            if (iElement.closest("button.shaka-overflow-button")) {
                iElement.remove();
            }
        });

    });
    $(".shaka-overflow-menu-button").text("settings");
    $(".shaka-back-to-overflow-button .material-icons-round").text("arrow_back_ios_new");
    document.querySelectorAll('button[aria-label="Save video frame"] label').forEach((button) => {
        const span = document.createElement('b');
        span.className = 'material-icons-round';
        span.textContent = 'panorama';
        button.insertBefore(span, button.firstChild);
    });

    document.querySelectorAll('.shaka-forward-rewind-container-icon').forEach((element) => {
        element.classList.add('material-icons-round');
    });
}



////////--------------------------------------------------------////////



// Replace "Undetermined" text
function replaceUndeterminedText() {
    const observer = new MutationObserver(() => {
        document.querySelectorAll('div.shaka-audio-languages button span.shaka-chosen-item, button.shaka-language-button label span.shaka-current-selection-span')
            .forEach(span => {
                if (span.textContent.trim() === 'Undetermined') {
                    span.textContent = 'Default';
                }
            });
    });

    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
}



////////--------------------------------------------------------////////



function onPlayerErrorEvent(event) {
    onPlayerError(event.detail);
}

function onPlayerError(error) {
    console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(event) {
    onPlayerError(event.detail);
}