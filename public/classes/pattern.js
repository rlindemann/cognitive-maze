class Pattern {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.rects = [];
    }

    generatePattern(type) {
        this.rects = [];
        switch (type) {
        case "randomRectangles":
            this.randomRectangles();
            break;
        case "checkered":
            this.checkeredPattern();
            break;
        case "chevron":
            this.chevronPattern();
            break;
        case "chevronOff":
            this.chevronOffPattern();
            break;
        case "altRect":
            this.altRectPattern();
            break;
        case "altRectSkewed":
            this.altRectSkewedPattern();
            break;
        case "sinWaveColumns":
            this.sinWaveColumnsPattern();
            break;
        case "sineCosWaveRect":
            this.sineCosWaveRectPattern();
            break;
        case "sineWave":
            this.sineWavePattern();
            break;
        case "sineWaveAlbers":
            this.sineWaveAlbersPattern();
            break;
        case "step":
            this.stepPattern();
            break;
        // case "herringbone":
        //     this.herringbonePattern();
        //     break;
        case "interwovenStrips":
            this.interwovenStripsPattern();
            break;
        case "albersGrid":
            this.albersGridPattern();
            break;
        case "albersCrazy":
            this.albersCrazyPattern();
            break;
        case "mondrian":
            this.mondrianPattern();
            break;
        case "solLeWitt":
            this.solLeWittPattern();
            break;
        }

        
        
        

        
    }

    randomRectangles() {
        for (let i = 0; i < random(10,100); i++) {
            let x = random(this.width);
            let y = random(this.height);
            let w = random(20, 600) * MLP;
            let h = random(20, 600) * MLP;
            this.rects.push({
                topLeft: createVector(x, y),
                topRight: createVector(x + w, y),
                bottomLeft: createVector(x, y + h),
                bottomRight: createVector(x + w, y + h),
            });
        }
    }

    checkeredPattern() {
        const distributeSizes = (totalSize, count) => {
            let sizes = [];
            let ratios = [];
            let sumRatios = 0;

            for (let i = 0; i < count; i++) {
                let r = random(0.5, 1.5);
                ratios.push(r);
                sumRatios += r;
            }

            for (let r of ratios) {
                sizes.push((r / sumRatios) * totalSize);
            }

            return sizes;
        };

        let cols = floor(random(3, 40));
        let rows = floor(random(3, 40));
        let colWidths = distributeSizes(this.width, cols);
        let rowHeights = distributeSizes(this.height, rows);

        let xOffset = 0;
        for (let x = 0; x < colWidths.length; x++) {
            let yOffset = 0;
            for (let y = 0; y < rowHeights.length; y++) {
                this.rects.push({
                    topLeft: createVector(xOffset, yOffset),
                    topRight: createVector(xOffset + colWidths[x], yOffset),
                    bottomLeft: createVector(xOffset, yOffset + rowHeights[y]),
                    bottomRight: createVector(
                        xOffset + colWidths[x],
                        yOffset + rowHeights[y]
                    ),
                });
                yOffset += rowHeights[y];
            }
            xOffset += colWidths[x];
        }
    }

    chevronPattern() {
        let columns = floor(random(2, 10));
        let rows = floor(random(2, 10));
        let chevronWidth = this.width / columns;
        let chevronHeight = this.height / rows;
        let skew = chevronWidth / 2; // Adjusting skew based on width for 45-degree angle
    
        for (let y = 0; y < this.height; y += chevronHeight) {
          for (let x = 0, col = 0; x < this.width; x += chevronWidth, col++) {
            if (col % 2 == 0) {  // Upward pointing
              this.rects.push({
                topLeft: createVector(x, y + skew),
                topRight: createVector(x + chevronWidth, y),
                bottomLeft: createVector(x, y + skew + chevronHeight),
                bottomRight: createVector(x + chevronWidth, y + chevronHeight)
              });
            } else {  // Downward pointing
              this.rects.push({
                topLeft: createVector(x, y),
                topRight: createVector(x + chevronWidth, y + skew),
                bottomLeft: createVector(x, y + chevronHeight),
                bottomRight: createVector(x + chevronWidth, y + skew + chevronHeight)
              });
            }
          }
        }
    }
      
    chevronOffPattern() {
        let columns = floor(random(2, 10));
        let rows = floor(random(2, 10));
        let chevronWidth = this.width / columns;
        let chevronHeight = this.height / rows;
        let skew = chevronWidth / 2; // Adjusting skew based on width for 45-degree angle
    
        for (let y = 0; y < this.height; y += (chevronHeight + skew)) {
          for (let x = 0, col = 0; x < this.width; x += chevronWidth, col++) {
            if (col % 2 == 0) {  // Upward pointing
              this.rects.push({
                topLeft: createVector(x, y + skew),
                topRight: createVector(x + chevronWidth, y),
                bottomLeft: createVector(x, y + skew + chevronHeight),
                bottomRight: createVector(x + chevronWidth, y + chevronHeight)
              });
            } else {  // Downward pointing
              this.rects.push({
                topLeft: createVector(x, y),
                topRight: createVector(x + chevronWidth, y + skew),
                bottomLeft: createVector(x, y + chevronHeight),
                bottomRight: createVector(x + chevronWidth, y + chevronHeight + skew)
              });
            }
          }
        }
    }

    altRectPattern() {
        // Decide the type: 0 for vertical, 1 for horizontal, 2 for combined
        // Adjust the probabilities here based on your desired bias
        const randomValue = random(1);

        let drawType;

        if (randomValue < 0.6) {
            // 60% chance of selecting "2" (combined rectangles)
            drawType = 2;
        } else if (randomValue < 0.8) {
            // 20% chance of selecting "0" (vertical rectangles)
            drawType = 0;
        } else {
            // 20% chance of selecting "1" (horizontal rectangles)
            drawType = 1;
        }
    
        if (drawType === 0 || drawType === 2) {
            // Vertical rectangles
            let x = 0;
            let drawVerticalRect = true;
    
            while (x < this.width) {
                const rectWidth = this.width / random(5, 100);
    
                if (drawVerticalRect) {
                    this.rects.push({
                        topLeft: createVector(x, 0),
                        topRight: createVector(x + rectWidth, 0),
                        bottomLeft: createVector(x, this.height),
                        bottomRight: createVector(x + rectWidth, this.height)
                    });
                }
    
                x += rectWidth;
                drawVerticalRect = !drawVerticalRect;
            }
        }
    
        if (drawType === 1 || drawType === 2) {
            // Horizontal rectangles
            let y = 0;
            let drawHorizontalRect = true;
    
            while (y < this.height) {
                const rectHeight = this.height / random(5, 100);
    
                if (drawHorizontalRect) {
                    this.rects.push({
                        topLeft: createVector(0, y),
                        topRight: createVector(this.width, y),
                        bottomLeft: createVector(0, y + rectHeight),
                        bottomRight: createVector(this.width, y + rectHeight)
                    });
                }
    
                y += rectHeight;
                drawHorizontalRect = !drawHorizontalRect;
            }
        }
    
        // Intersections for combined rectangles (when drawType is 2)
        if (drawType === 2) {
            const verticalRects = this.rects.filter(rect => rect.topRight.x - rect.topLeft.x < this.width);
            const horizontalRects = this.rects.filter(rect => rect.bottomLeft.y - rect.topLeft.y < this.height);
            
            for (let vRect of verticalRects) {
                for (let hRect of horizontalRects) {
                    // Check if vRect intersects with hRect
                    if (vRect.bottomLeft.x < hRect.bottomRight.x &&
                        vRect.bottomRight.x > hRect.bottomLeft.x &&
                        vRect.topLeft.y < hRect.bottomLeft.y &&
                        vRect.bottomLeft.y > hRect.topLeft.y) {
    
                        // Calculate intersection
                        const intersectTopLeft = createVector(max(vRect.topLeft.x, hRect.topLeft.x), max(vRect.topLeft.y, hRect.topLeft.y));
                        const intersectBottomRight = createVector(min(vRect.bottomRight.x, hRect.bottomRight.x), min(vRect.bottomRight.y, hRect.bottomRight.y));
    
                        this.rects.push({
                            topLeft: intersectTopLeft,
                            topRight: createVector(intersectBottomRight.x, intersectTopLeft.y),
                            bottomLeft: createVector(intersectTopLeft.x, intersectBottomRight.y),
                            bottomRight: intersectBottomRight
                        });
                    }
                }
            }
        }
        
        // Shuffle the rectangles array
        for (let i = this.rects.length - 1; i > 0; i--) {
            const j = floor(random() * (i + 1));
            [this.rects[i], this.rects[j]] = [this.rects[j], this.rects[i]];
        }
    }
    

    altRectSkewedPattern() {
        // Integrated skew selection
        const skewFactor = (random() < 0.5) ? random(-0.9, -0.7) : random(0.7, 0.9);

        // Helper function to decide if we should draw a rectangle based on skew
        const shouldDrawRectangle = (position, total, skew) => {
            if (skew > 0) {
                return random() < (position / total) * skew;
            } else {
                return random() < (1 - (position / total)) * abs(skew);
            }
        };

        const randomValue = random(1);

        let drawType;

        if (randomValue < 0.6) {
            // 60% chance of selecting "2" (combined rectangles)
            drawType = 2;
        } else if (randomValue < 0.8) {
            // 20% chance of selecting "0" (vertical rectangles)
            drawType = 0;
        } else {
            // 20% chance of selecting "1" (horizontal rectangles)
            drawType = 1;
        }

        // Vertical rectangles
        if (drawType === 0 || drawType === 2) {
            let x = 0;
            while (x < this.width) {
                const rectWidth = this.width / random(5, 100);

                if (shouldDrawRectangle(x, this.width, skewFactor)) {
                    this.rects.push({
                        topLeft: createVector(x, 0),
                        topRight: createVector(x + rectWidth, 0),
                        bottomLeft: createVector(x, this.height),
                        bottomRight: createVector(x + rectWidth, this.height)
                    });
                }

                x += rectWidth;
            }
        }

        // Horizontal rectangles
        if (drawType === 1 || drawType === 2) {
            let y = 0;
            while (y < this.height) {
                const rectHeight = this.height / random(5, 100);

                if (shouldDrawRectangle(y, this.height, skewFactor)) {
                    this.rects.push({
                        topLeft: createVector(0, y),
                        topRight: createVector(this.width, y),
                        bottomLeft: createVector(0, y + rectHeight),
                        bottomRight: createVector(this.width, y + rectHeight)
                    });
                }

                y += rectHeight;
            }
        }

        // Intersections for combined rectangles (when drawType is 2)
        if (drawType === 2) {
            // CODE GOES HERE

            const verticalRects = this.rects.filter(rect => rect.topRight.x - rect.topLeft.x < this.width);
            const horizontalRects = this.rects.filter(rect => rect.bottomLeft.y - rect.topLeft.y < this.height);
            
            for (let vRect of verticalRects) {
                for (let hRect of horizontalRects) {
                    // Check if vRect intersects with hRect
                    if (vRect.bottomLeft.x < hRect.bottomRight.x &&
                        vRect.bottomRight.x > hRect.bottomLeft.x &&
                        vRect.topLeft.y < hRect.bottomLeft.y &&
                        vRect.bottomLeft.y > hRect.topLeft.y) {

                        // Calculate intersection
                        const intersectTopLeft = createVector(max(vRect.topLeft.x, hRect.topLeft.x), max(vRect.topLeft.y, hRect.topLeft.y));
                        const intersectBottomRight = createVector(min(vRect.bottomRight.x, hRect.bottomRight.x), min(vRect.bottomRight.y, hRect.bottomRight.y));

                        this.rects.push({
                            topLeft: intersectTopLeft,
                            topRight: createVector(intersectBottomRight.x, intersectTopLeft.y),
                            bottomLeft: createVector(intersectTopLeft.x, intersectBottomRight.y),
                            bottomRight: intersectBottomRight
                        });
                    }
                }
            }
        }

        // Shuffle the rectangles array
        for (let i = this.rects.length - 1; i > 0; i--) {
            const j = floor(random() * (i + 1));
            [this.rects[i], this.rects[j]] = [this.rects[j], this.rects[i]];
        }
    }

    sinWaveColumnsPattern() {
        let amplitude = weightedRandom(200, 100, 30, 1000) * MLP;  // Defines the maximum shift due to the sine wave.
        console.log('sinWaveColumnsPattern - amplitude:', amplitude)
        let frequency = random(0.0005, 0.002);  // Determines how frequent the wave oscillations are.
    
        let x = 0;
        while (x < this.width) {
            const columnWidth = this.width / weightedRandom(12, 5, 3, 25);  // Random width for each column.
    
            // Within each column, place the rectangles.
            let y = 0;
            while (y < this.height) {
                const rectHeight = this.height / weightedRandom(12, 5, 3, 25);  // Random height for each rectangle.
                const sineShift = amplitude * sin(y * frequency);
    
                // Rectangle creation with the sine wave shift.
                this.rects.push({
                    topLeft: createVector(x, y + sineShift),
                    topRight: createVector(x + columnWidth, y + sineShift),
                    bottomLeft: createVector(x, y + rectHeight + sineShift),
                    bottomRight: createVector(x + columnWidth, y + rectHeight + sineShift)
                });
    
                y += rectHeight + 10 * MLP;  // Move to the next position, 10 is a gap between rectangles.
            }
    
            x += columnWidth;  // Move to the next column.
        }
    }

    sineCosWaveRectPattern() {
        // Amplitude and frequency settings for sine and cosine waves
        let amplitudeX = weightedRandom(50, 10, 30, 100) * MLP;
        let amplitudeY = weightedRandom(50, 10, 30, 100) * MLP;
        let frequencyX = random(0.002, 0.01);
        let frequencyY = random(0.002, 0.01);
    
        let x = 0;
        while (x < this.width) {
            let y = 0;
            while (y < this.height) {
                // Calculate the wave's influence on X and Y positions
                const sineShiftX = amplitudeX * sin(y * frequencyX);
                const cosShiftY = amplitudeY * cos(x * frequencyY);
    
                const rectWidth = this.width / weightedRandom(10, 5, 3, 20);
                const rectHeight = this.height / weightedRandom(10, 5, 3, 20);
    
                // Create rectangles influenced by the sine and cosine waves
                this.rects.push({
                    topLeft: createVector(x + sineShiftX, y + cosShiftY),
                    topRight: createVector(x + rectWidth + sineShiftX, y + cosShiftY),
                    bottomLeft: createVector(x + sineShiftX, y + rectHeight + cosShiftY),
                    bottomRight: createVector(x + rectWidth + sineShiftX, y + rectHeight + cosShiftY)
                });
    
                y += rectHeight + 50;  // Add some gap between rectangles in Y direction
            }
    
            x += random(120, 140);  // Move to the next X position, you can adjust the gap for columns
        }
    }

    sineWavePattern() {
        const numColumns = weightedRandom(10, 5, 3, 20);  // Number of columns
        const numRows = weightedRandom(10, 5, 3, 20);     // Number of rows
        const colWidth = this.width / numRows;
        const rectWidth = this.width / numRows;                    // Constant rectangle width
        const rectHeight = this.height / numColumns;  // Height of each rectangle
    
        const amplitudeX = this.width / (random(0.5,1.5) * numColumns);  // Amplitude for x direction
        const amplitudeY = this.height / (random(0.5,1.5) * numRows);    // Amplitude for y direction
        const frequency = TWO_PI / this.height * 2;  // Frequency so that sine wave spans the canvas height
    
        for (let col = 0; col < numColumns; col++) {
            if (col % 2 === 0) { 
                for (let row = 0; row < numRows; row++) {
                    // Calculate the base y position of the rectangle's top left
                    const baseY = row * rectHeight;
    
                    // x position is influenced by the vertical sine wave
                    const x = col * colWidth + amplitudeX * sin(frequency * baseY);
                    // y position is influenced by the horizontal sine wave
                    const y = baseY + amplitudeY * sin(frequency * col * colWidth);
    
                    this.rects.push({
                        topLeft: createVector(x, y),
                        topRight: createVector(x + rectWidth, y),
                        bottomLeft: createVector(x, y + rectHeight),
                        bottomRight: createVector(x + rectWidth, y + rectHeight),
                    });
                }
            }
        }
    }

    sineWaveAlbersPattern() {
        const numColumns = weightedRandom(10, 5, 3, 20);  // Number of columns
        const numRows = weightedRandom(10, 5, 3, 20);     // Number of rows
        const colWidth = this.width / numRows;
        const rectWidth = this.width / numRows;                    // Constant rectangle width
        const rectHeight = this.height / numColumns;  // Height of each rectangle
    
        const amplitudeX = this.width / (random(0.5,1.5) * numColumns);  // Amplitude for x direction
        const amplitudeY = this.height / (random(0.5,1.5) * numRows);    // Amplitude for y direction
        const frequency = TWO_PI / this.height * 2;  // Frequency so that sine wave spans the canvas height
    
        const numRects = int(random(2,6));  // Number of nested rectangles
    
        for (let col = 0; col < numColumns; col++) {
            if (col % 2 === 0) { 
                for (let row = 0; row < numRows; row++) {
                    const baseY = row * rectHeight;
                    const x = col * colWidth + amplitudeX * sin(frequency * baseY);
                    const y = baseY + amplitudeY * sin(frequency * col * colWidth);
    
                    let currentWidth = rectWidth;
                    let currentHeight = rectHeight;
                    let insetX = rectWidth / (2 * numRects);
                    let insetY = rectHeight / (2 * numRects);
    
                    for (let i = 0; i < numRects; i++) {
                        this.rects.push({
                            topLeft: createVector(x + i * insetX, y + i * insetY),
                            topRight: createVector(x + currentWidth - i * insetX, y + i * insetY),
                            bottomLeft: createVector(x + i * insetX, y + currentHeight - i * insetY),
                            bottomRight: createVector(x + currentWidth - i * insetX, y + currentHeight - i * insetY)
                        });
                    }
                }
            }
        }
    }
    
    

    stepPattern() {
        const minPercentage = 0.01; // 1% of canvas size
        const maxPercentage = weightedRandom(0.15, 0.03, 0.12, 0.25); // 5% of canvas size

        const canvasSize = min(this.width, this.height); // Use the smaller dimension for consistent step sizing

        const minStepSize = canvasSize * minPercentage;
        const maxStepSize = canvasSize * maxPercentage;

        let stepSize = random(minStepSize, maxStepSize);
    
        const directions = [
            { dx: 1, dy: 0 },  // Right
            { dx: -1, dy: 0 }, // Left
            { dx: 0, dy: 1 },  // Down
            { dx: 0, dy: -1 }  // Up
        ];
    
        let corner = floor(random(4));
        corner = 0;
        let x, y, possibleDirections;
    
        switch (corner) {
            case 0: // Top-left
                x = 0;
                y = 0;
                possibleDirections = [directions[0], directions[2]];
                break;
            case 1: // Top-right
                x = this.width;
                y = 0;
                possibleDirections = [directions[1], directions[2]];
                break;
            case 2: // Bottom-left
                x = 0;
                y = this.height;
                possibleDirections = [directions[0], directions[3]];
                break;
            case 3: // Bottom-right
                x = this.width;
                y = this.height;
                possibleDirections = [directions[1], directions[3]];
                break;
        }
        let direction = random(possibleDirections);
    
        while (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
            let rectWidth, rectHeight;
    
            if (direction.dx !== 0) { // Left or Right
                rectWidth = stepSize;
                rectHeight = this.height;
            } else { // Up or Down
                rectWidth = this.width;
                rectHeight = stepSize;
            }
    
            this.rects.push({
                topLeft: createVector(x, y),
                topRight: createVector(x + rectWidth, y),
                bottomLeft: createVector(x, y + rectHeight),
                bottomRight: createVector(x + rectWidth, y + rectHeight)
            });
    
            x += rectWidth * direction.dx;
            y += rectHeight * direction.dy;
    
            direction = random(possibleDirections);  // Continue in the possible directions for the chosen corner
    
            stepSize = random(minStepSize, maxStepSize);
        }
    }
    

    // herringbonePattern() {
    //     const blockWidth = random(20, 50);   // Width of each block
    //     const blockHeight = blockWidth * 2;  // Typically, the height is twice the width
    
    //     // Loop through the width of the canvas
    //     for (let x = 0; x < this.width; x += blockWidth) {
    //         // Determine if the column starts with an upward or downward block
    //         let upwardBlock = (x / blockWidth) % 2 === 0;
    
    //         for (let y = 0; y < this.height; y += blockHeight) {
    //             // Upward block
    //             if (upwardBlock) {
    //                 this.rects.push({
    //                     topLeft: createVector(x, y),
    //                     topRight: createVector(x + blockWidth, y - blockHeight / 2),
    //                     bottomLeft: createVector(x, y + blockHeight / 2),
    //                     bottomRight: createVector(x + blockWidth, y)
    //                 });
    //             } 
    //             // Downward block
    //             else {
    //                 this.rects.push({
    //                     topLeft: createVector(x, y - blockHeight / 2),
    //                     topRight: createVector(x + blockWidth, y),
    //                     bottomLeft: createVector(x, y),
    //                     bottomRight: createVector(x + blockWidth, y + blockHeight / 2)
    //                 });
    //             }
    
    //             // Switch block orientation for the next block in the column
    //             upwardBlock = !upwardBlock;
    //         }
    //     }
    // }

    interwovenStripsPattern() {
        const stripHeight = weightedRandom(50, 30, 10, 100) * MLP; // Height of each strip
        const cutWidth = stripHeight * 3; // Width at which we'll "cut" or "overlap" the strips

        for (let y = 0; y < this.height; y += stripHeight) {
            let under = (y / stripHeight) % 2 === 0; // Determine if the current strip is under or over
            let x = 0;

            while (x < this.width) {
            let startX = x;

            // If this strip is "under", then we cut it where it's supposed to weave under the next strip.
            if (under) {
                x += cutWidth;
            } else {
                x += 2 * cutWidth; // If it's over, we let it go over two "cuts" to give the illusion of weaving.
            }

            this.rects.push({
                topLeft: createVector(startX, y),
                topRight: createVector(x, y),
                bottomLeft: createVector(startX, y + stripHeight),
                bottomRight: createVector(x, y + stripHeight),
            });

            // Switch the over/under state for the next segment of this strip
            under = !under;
            }
        }
    }
    
    albersGridPattern() {
        const numRects = int(random(2,5));  // Number of nested rectangles
        const totalColumns = int(random(5,15));  // Total columns of the grid pattern
        const totalRows = int(random(5,15));  // Total rows of the grid pattern
        const colWidth = this.width / totalColumns;
        const rowHeight = this.height / totalRows;
    
        const maxRandomOffsetX = colWidth / numRects / 2; // Maximum random offset for x
        const maxRandomOffsetY = rowHeight / numRects / 2; // Maximum random offset for y
    
        const allOrNothingMode = random() < 0.3; // 30% chance to apply all-or-nothing mode
        let applyOffsetForAll = false;
    
        if (allOrNothingMode) {
            applyOffsetForAll = true; // All rectangles in a cell will get the offset
        }
    
        for (let col = 0; col < totalColumns; col++) {
            for (let row = 0; row < totalRows; row++) {
    
                let topLeftX = col * colWidth;
                let topLeftY = row * rowHeight;
                
                for (let i = 0; i < numRects; i++) {
                    let offsetX = 0, offsetY = 0;
    
                    if (allOrNothingMode && applyOffsetForAll) {
                        offsetX = random(-maxRandomOffsetX, maxRandomOffsetX);
                        offsetY = random(-maxRandomOffsetY, maxRandomOffsetY);
                    } else if (!allOrNothingMode && random() < 0.3) {
                        offsetX = random(-maxRandomOffsetX, maxRandomOffsetX);
                        offsetY = random(-maxRandomOffsetY, maxRandomOffsetY);
                    }
    
                    let insetX = colWidth / numRects;
                    let insetY = rowHeight / numRects;
                    
                    this.rects.push({
                        topLeft: createVector(topLeftX + i * insetX/2 + offsetX, topLeftY + i * insetY/2 + offsetY),
                        topRight: createVector(topLeftX + colWidth - i * insetX/2 + offsetX, topLeftY + i * insetY/2 + offsetY),
                        bottomLeft: createVector(topLeftX + i * insetX/2 + offsetX, topLeftY + rowHeight - i * insetY/2 + offsetY),
                        bottomRight: createVector(topLeftX + colWidth - i * insetX/2 + offsetX, topLeftY + rowHeight - i * insetY/2 + offsetY)
                    });
                }
            }
        }
    }

    albersCrazyPattern() {
        const numRects = int(random(1, 5)); 
        const totalColumns = int(random(2, 10)); 
        const totalRows = int(random(2, 10)); 
        const colWidth = this.width / totalColumns;
        const rowHeight = this.height / totalRows;
    
        const maxRandomOffsetX = colWidth / numRects / 2; 
        const maxRandomOffsetY = rowHeight / numRects / 2; 
    
        const allOrNothingMode = random() < 0.3; 
        let applyOffsetForAll = false;
    
        if (allOrNothingMode) {
            applyOffsetForAll = true; 
        }
    
        for (let col = 0; col < totalColumns; col++) {
            for (let row = 0; row < totalRows; row++) {
                let topLeftX = col * colWidth;
                let topLeftY = row * rowHeight;
                
                for (let i = 0; i < numRects; i++) {
                    let offsetX = 0, offsetY = 0;
    
                    if (allOrNothingMode && applyOffsetForAll) {
                        offsetX = random(-maxRandomOffsetX, maxRandomOffsetX);
                        offsetY = random(-maxRandomOffsetY, maxRandomOffsetY);
                    } else if (!allOrNothingMode && random() < 0.3) {
                        offsetX = random(-maxRandomOffsetX, maxRandomOffsetX);
                        offsetY = random(-maxRandomOffsetY, maxRandomOffsetY);
                    }
    
                    let insetX = colWidth / numRects;
                    let insetY = rowHeight / numRects;
                    
                    // Skew factors for trapezoidal shapes
                    let skewTop = random(-insetX, insetX);
                    let skewBottom = random(-insetX, insetX);
    
                    this.rects.push({
                        topLeft: createVector(topLeftX + i * insetX/2 + offsetX + skewTop, topLeftY + i * insetY/2 + offsetY),
                        topRight: createVector(topLeftX + colWidth - i * insetX/2 + offsetX - skewTop, topLeftY + i * insetY/2 + offsetY),
                        bottomLeft: createVector(topLeftX + i * insetX/2 + offsetX + skewBottom, topLeftY + rowHeight - i * insetY/2 + offsetY),
                        bottomRight: createVector(topLeftX + colWidth - i * insetX/2 + offsetX - skewBottom, topLeftY + rowHeight - i * insetY/2 + offsetY)
                    });
                }
            }
        }
    }

    mondrianPattern() {
        const depth = 5; // or adjust as needed
        
        const splitRect = (x, y, w, h, d) => {
            if (d <= 0) {
                this.rects.push({
                    topLeft: createVector(x, y),
                    topRight: createVector(x + w, y),
                    bottomLeft: createVector(x, y + h),
                    bottomRight: createVector(x + w, y + h)
                });
                return;
            }

            let splitVertically = random() < 0.5;

            // Favor vertical split if width > height and vice versa
            if (w > h && w / h >= 2) {
                splitVertically = true;
            } else if (h > w && h / w >= 2) {
                splitVertically = false;
            }

            if (splitVertically) {
                let split = random(w * 0.2, w * 0.8);
                splitRect(x, y, split, h, d - 1);
                splitRect(x + split, y, w - split, h, d - 1);
            } else {
                let split = random(h * 0.2, h * 0.8);
                splitRect(x, y, w, split, d - 1);
                splitRect(x, y + split, w, h - split, d - 1);
            }
        }

        splitRect(0, 0, this.width, this.height, depth);
    }

    solLeWittPattern() {
        const numColumns = int(random(4, 10));  // Number of columns
        const numRows = int(random(4, 10));  // Number of rows
        const colWidth = this.width / numColumns;
        const rowHeight = this.height / numRows;
    
        for (let col = 0; col < numColumns; col++) {
            for (let row = 0; row < numRows; row++) {
                const x = col * colWidth;
                const y = row * rowHeight;
    
                const choice = random();
    
                const offset = min(colWidth, rowHeight) * 0.1;
                const tlOffset = random() < 0.5 ? offset : 0;
                const trOffset = random() < 0.5 ? offset : 0;
                const blOffset = random() < 0.5 ? offset : 0;
                const brOffset = random() < 0.5 ? offset : 0;
    
                this.rects.push({
                    topLeft: createVector(x + tlOffset, y + tlOffset),
                    topRight: createVector(x + colWidth - trOffset, y + trOffset),
                    bottomLeft: createVector(x + blOffset, y + rowHeight - blOffset),
                    bottomRight: createVector(x + colWidth - brOffset, y + rowHeight - brOffset)
                });
            }
        }
    }

    draw() {
        for (let rect of this.rects) {
            fill(random(255), random(255), random(255));
            beginShape();
            vertex(rect.topLeft.x, rect.topLeft.y);
            vertex(rect.topRight.x, rect.topRight.y);
            vertex(rect.bottomRight.x, rect.bottomRight.y);
            vertex(rect.bottomLeft.x, rect.bottomLeft.y);
            endShape(CLOSE);
        }
    }

    getRectangles() {
        return this.rects;
    }
    getRectangleVertices() {
        let vertices = [];
        for (let rect of this.rects) {
            vertices.push([
                [rect.topLeft.x, rect.topLeft.y],
                [rect.topRight.x, rect.topRight.y],
                [rect.bottomRight.x, rect.bottomRight.y],
                [rect.bottomLeft.x, rect.bottomLeft.y]
            ]);
        }
        return vertices;
    }
}

//   let pattern;
//   let patternTypes = ["checkered", "randomRectangles"];

//   function setup() {
//     createCanvas(400, 400);
//     noLoop();

//     pattern = new Pattern(width, height);

//     // Randomly select a pattern type and generate it
//     let selectedType = random(patternTypes);
//     pattern.generatePattern(selectedType);
//   }

//   function draw() {
//     background(220);
//     pattern.draw();

//     // Accessing the vertices
//     let rectangles = pattern.getRectangles();
//     for (let rect of rectangles) {
//       console.log("Top Left:", rect.topLeft.x, rect.topLeft.y);
//       console.log("Top Right:", rect.topRight.x, rect.topRight.y);
//       console.log("Bottom Left:", rect.bottomLeft.x, rect.bottomLeft.y);
//       console.log("Bottom Right:", rect.bottomRight.x, rect.bottomRight.y);
//     }
//   }
