export const travelTimes = [
    /*       Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune */
    /* Mercury */ [0, 50, 100, 150, 600, 1200, 2500, 4000],
    /* Venus   */ [50, 0, 50, 100, 550, 1150, 2450, 3900],
    /* Earth   */ [100, 50, 0, 75, 500, 1100, 2400, 3800],
    /* Mars    */ [150, 100, 75, 0, 450, 1050, 2350, 3750],
    /* Jupiter */ [600, 550, 500, 450, 0, 500, 1900, 3300],
    /* Saturn  */ [1200, 1150, 1100, 1050, 500, 0, 1400, 2800],
    /* Uranus  */ [2500, 2450, 2400, 2350, 1900, 1400, 0, 1400],
    /* Neptune */ [4000, 3900, 3800, 3750, 3300, 2800, 1400, 0],
];

/* All ##s in table represent travel time in days */
/* Future implementation might look like adding some variability/randomness to enhance experience */
/* or allowing user to change things like ship, speed, etc */