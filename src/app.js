const Filter = (function () {
    const file = document.querySelector('input[type=file]');
    const preview = document.querySelector('.section--bgi');
    const rangesWrap = document.querySelector('aside');
    const reset = document.querySelector('.btn-reset');
    const filterObj = [
        ['brightness', this.brightness.value = 100],
        ['contrast', this.contrast.value = 100],
        ['grayscale', this.grayscale.value = 0],
        ['hue-rotate', this['hue-rotate'].value = 0],
        ['invert', this.invert.value = 0],
        ['saturate', this.saturate.value = 100],
        ['sepia', this.sepia.value = 0]
    ]

    function iventListen() {
        file.addEventListener('change', previewFile)

        rangesWrap.addEventListener('mousedown', function (e) {
            const trg = e.target;
            changeFilters(trg)
        });

        rangesWrap.addEventListener('mousemove', function (e) {
            const trg = e.target;
            changeFilters(trg)
            recalacFilters(trg, trg.id)
        });

        document.addEventListener('DOMContentLoaded', calcRanges);

        reset.addEventListener('click', resetFolters);

        document.querySelector('.slider').addEventListener('click', getStyle)
    };

    function getStyle(e) {
        const trg = e.target;
        if (trg.classList.contains('slide')) {
            const style = window.getComputedStyle(trg)
            const filter = style.getPropertyValue('filter')

            const num = filter.match(/\d+((.)\d+)|0|1|((-?\d+)(?=deg))/g)
            const keys = filter.match(/brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia/g)

            preview.style.filter = filter
            setRangesFromExample(keys, num)
        }
    }

    function setRangesFromExample(keys, num) {
        document.querySelectorAll('.range').forEach((item, i) => {
            keys.forEach((key, i) => {
                if (key === item.id) {
                    item.value = num[i] * 100

                }
            })
            recalacFilters(item, item.id)
            changeFilters(item)
        })
    };

    function recalacFilters(trg, filter) {
        if (trg.classList.contains('range')) {
            filterObj.forEach((item, i) => {
                if (item[0] === filter) {
                    item[1] = trg.value
                }
                addFiltersToImage()
            })

        }
    };

    function addFiltersToImage() {
        preview.style.filter = filterObj[0][0] + '(' + filterObj[0][1] + '%)' + filterObj[1][0] + '(' + filterObj[1][1] + '%)' +
            filterObj[2][0] + '(' + filterObj[2][1] + '%)' +
            filterObj[3][0] + '(' + filterObj[3][1] + 'deg)' +
            filterObj[4][0] + '(' + filterObj[4][1] + '%)' +
            filterObj[5][0] + '(' + filterObj[5][1] + '%)' +
            filterObj[6][0] + '(' + filterObj[6][1] + '%)';
    };

    function calcRanges() {
        const ranges = document.querySelectorAll('input[type=range]');
        ranges.forEach(item => putRange(item))
    };

    function putRange(item) {
        item.nextElementSibling.textContent = item.value;
    };

    function changeFilters(trg) {
        if (trg.classList.contains('range')) {
            putRange(trg)
        }
    };
    ///// Upload image
    function previewFile() {
        const item = file.files[0]
        const reader = new FileReader();
        const slides = document.querySelectorAll('.slide')

        reader.onloadend = function () {
            preview.style.backgroundImage = `url("${reader.result}")`;
            slides.forEach(slide => {
                slide.style.backgroundImage = `url("${reader.result}")`;
            })
        }

        if (item) {
            reader.readAsDataURL(item);
        } else {
            preview.src = "";
        }
    }
    ///// Reset filters
    function resetFolters(e) {
        document.querySelectorAll('.range').forEach((range, i) => {
            i === 0 || i == 1 || i === 5 ? range.value = 100 : range.value = 0
            putRange(range)
        })
        filterObj[0][1] = 100;
        filterObj[1][1] = 100;
        filterObj[2][1] = 0;
        filterObj[3][1] = 0;
        filterObj[4][1] = 0;
        filterObj[5][1] = 100;
        filterObj[6][1] = 0;
        addFiltersToImage();
        e.preventDefault();
    };
    return {
        init: function () {
            iventListen()
            
        }
    }
})();

const Carousel = (function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const persent = 25;


    function calcWidth() {
        const sliderWidth = slider.children.length * persent;
        console.log(slider.children.length)
        slider.style.width = `${sliderWidth}%`
    }

    function cloneSlides() {
        slides.forEach(slide => {
            let cloned = slide.cloneNode(true);
            cloned.classList.add('cloned')
            slider.appendChild(cloned)
        })
    }

    function moveSlide() {
        let count = 0
        const cloned = document.querySelectorAll('.cloned')
        console.log(cloned)
        setInterval(function () {
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.transform = `translateX(-${count}%)`
            })

            count >= cloned.length * 100 ? count = 0 : count += 100
        }, 5000)
    }
    return {
        init: function() {
            cloneSlides()
            calcWidth();
            moveSlide();
        }
    }
})();
Carousel.init();
Filter.init();