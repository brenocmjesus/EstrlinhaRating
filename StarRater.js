// COMO CRIAR UMA DOM FANTASMA -->

// criar elementos no html através do js
class StarRater extends HTMLElement {

    constructor() {
        super()
        this.build()
        console.log("passou o constructor");
    }
        build() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())
        const rater = this.createRater()
        this.stars = this.creatStars()
        this.stars.forEach(star => rater.appendChild(star))
        shadow.appendChild(rater)
        this.resetRating()
    }
    
    createRater() {
        const rater = document.createElement('div')
        rater.classList.add('star-rater')
        rater.addEventListener('mouseout', this.resetRating.bind(this))
        return rater
    }

    creatStars() {
        const createStar = (_, id) => {
            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', Number(id) + 1)
            star.innerHTML = '&#9733;'
            star.addEventListener('click', this.setRating.bind(this))
            star.addEventListener('mouseover', this.ratingHover.bind(this))
            return star
        }
        return Array.from({ length: 5 }, createStar)
    }

    resetRating() {
        this.currentRatingValue = this.getAttribute('data-rating') || 0
        this.hightLightRating()
    }

    setRating(event) {
        this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'))
    }

    hightLightRating() {
        this.stars.forEach(star => {
            star.style.color = this.currentRatingValue >= star.getAttribute
                ('data-value') ? 'yellow' : 'gray'
        })
    }

    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute('data-value')
        this.hightLightRating()
        // console.log(this.currentRatingValue)

    }

    styles() {
        const style = document.createElement('style')
        style.textContent = `
            .star {
                font-size: 3rem;
                color: gray;
                cursor: pointer;
                
            }
        `
        return style
    }

}
customElements.define('star-rater', StarRater)
