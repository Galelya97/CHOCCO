let player;
const videoContainer = $('.video');

const normNumber = (num) => {
    return num.toString().length === 1 ? `0${num}` : num.toString();
}

const normTime = (duration) => {
    const minuts = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);
    return `${normNumber(minuts)}:${normNumber(sec)}`
}

let interval;

const onPlayerReady = () => {
    const duration = player.getDuration();
    const durationStr = normTime(duration);

    $('.video__duration-estimate').text(durationStr);

    if (typeof interval !== 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        const currentTimeStr = normTime(currentTime);

        $('.video__duration-completed').text(currentTimeStr);

        const progress = (currentTime / duration * 100);

        $('.video__playback-button').css({
            left: `calc(${progress}% - 7px)`
        });
    }, 300);
}

const onPlayerStateChange = (e) => {
    if (e.data === 1) {
        videoContainer.addClass('video_active');
    } else if (e.data === 2) {
        videoContainer.removeClass('video_active');
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        videoId: 'ZuCAhfxXOKw',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });
}

$('.video__start').click((e) => {
    e.preventDefault();

    if (videoContainer.hasClass('video_active')) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

$('.video__poster').click((e) => {
    e.preventDefault();

    if (videoContainer.hasClass('video_active')) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

$('.video__playback').click((e) => {
    const duration = player.getDuration();
    const bar = $(e.currentTarget);
    const point = e.originalEvent.layerX;
    const width = bar.width();
    const progress = point / width;

    $('.video__playback-button').css({
        left: `calc(${progress * 100}% - 7px)`
    });

    player.seekTo(duration * progress);
});

