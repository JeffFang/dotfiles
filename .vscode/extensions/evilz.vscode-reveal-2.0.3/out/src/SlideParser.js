"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countLines = text => {
    return text.split('\n').length;
};
/**
 * Count horizontal slides
 *
 * @param {string} slideContent (w/o front matter)
 * @param {string} separator
 * @returns number of horizontal slides
 */
exports.parseSlides = (slideContent, slidifyOptions) => {
    const regex = new RegExp(slidifyOptions.separator, 'gm');
    const slides = slideContent.split(regex);
    return slides.map((s, i) => parseSlide(s, i, slidifyOptions));
};
exports.countLinesToSlide = (slides, horizontalIndex, verticalIndex) => {
    const stopSlideIndex = verticalIndex > 0 ? horizontalIndex + 1 : horizontalIndex;
    const lineToSlide = slides.slice(0, stopSlideIndex).reduce((lines, slide) => {
        const count = lines + exports.countLines(slide.text); // + 1 // heightSeparator
        // has some vertical slides
        if (slide.verticalChildren) {
            const stopVerticalAt = slide.index === horizontalIndex ? verticalIndex - 1 : slide.verticalChildren.length;
            const innerCount = slide.verticalChildren
                ? slide.verticalChildren.slice(0, stopVerticalAt).reduce((innerLines, innerSlide) => {
                    return innerLines + exports.countLines(innerSlide.text); // + 1 // heightVerticalSeparator
                }, 0)
                : 0;
            return count + innerCount;
        }
        return count;
    }, 0);
    return lineToSlide;
};
const parseSlide = (slideContent, index, slidifyOptions) => {
    const verticalSlides = getVerticalSlides(slideContent, slidifyOptions);
    const currentSlide = verticalSlides[0];
    return Object.assign({}, currentSlide, { index, verticalChildren: verticalSlides.length > 1 ? verticalSlides.slice(1) : undefined });
};
const getVerticalSlides = (slideContent, slidifyOptions) => {
    const regex = new RegExp(slidifyOptions.verticalSeparator, 'gm');
    const slides = slideContent.split(regex);
    const verticalSlides = slides.map((s, i) => {
        return { title: findTitle(s), index: i, text: s };
    });
    return verticalSlides;
};
const findTitle = (text) => {
    // Rem : ugly but not so bad ?
    const lines = text
        .replace(/^[ ]*/gm, '') // trim space
        .replace(/<!-- .slide:.* -->/gm, '') // remove slide property
        .replace(/^#+/gm, '') // remove title markup
        .replace(/\r\n/g, '\n') // nomalize line return
        .replace(/^\s*\n/gm, '') // remove whitespace lines
        .split('\n');
    return lines[0];
};
//# sourceMappingURL=SlideParser.js.map