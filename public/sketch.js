////////////////////// SEED ////////////////////////
let ELSEMEN = 0;
// let canvasLoaded = false;
function preload()  
{
    // preload stuff here
    // canvasLoaded = true;
}
ELSEMEN = Math.floor(fxrand()*9999999);
////////////////////// CANVAS SETUP ////////////////////////

let baseMargin = 8;
let MLP = 1
let margin = baseMargin * MLP;


let canXstart = 1784;
let canYstart = 1784;

let baseWidth = canXstart + (baseMargin * 2)
let baseHeight = canYstart + (baseMargin * 2)
let canvX;
let canvY;

/////////////////////// DRAW AREA /////////////////////////

let drawAreaX;
let drawAreaY;
let drawAreaW;
let drawAreaH;

let marginDrawArea;

///////////////// Features /////////////////////
let myFeatures = {};
///////////////// Palette /////////////////////
let colorPaletteNames;
let paletteIdx;
let totalWeight;
let selectedPalette;
///////////////// Pattern //////////////////////

let pattern;

let patternNames;
let patternIdx;
let totalWeightPattern;
let selectedPattern;

// OFFSCREEN BUFFER

let oB01;
let oB02;
let oB03;
let oBTEST;
let bufferList = []


function setup() {

    canvX = canXstart * MLP;
    canvY = canYstart * MLP;

    createCanvas(canvX + margin * 2, canvY + margin * 2);

    randomSeed(ELSEMEN);
    noiseSeed(ELSEMEN);


    // Draw area
    marginDrawArea = margin/3;
    drawAreaX = marginDrawArea;
    drawAreaY = marginDrawArea;
    drawAreaW = width - 2 * marginDrawArea;
    drawAreaH = height - 2 * marginDrawArea;


    colorPaletteNames = [
        { colors: "Midnight", weight: 40 },
        { colors: "Sylvan Dream", weight: 40 },
        { colors: "Labyrinthine", weight: 40 },
        { colors: "Shadowed Echoes", weight: 40 },
        { colors: "Synesthesia", weight: 40 },
        { colors: "Rumination", weight: 40 },
        { colors: "Emergent Thoughts", weight: 40 },
        { colors: "Whispers", weight: 40 },
        { colors: "Serenity", weight: 40 },
        { colors: "Twilight", weight: 40 },
        { colors: "Sculpted Grains", weight: 40 },
        { colors: "Deep Resonance", weight: 40 },
        { colors: "Brainwave", weight: 40 },
        { colors: "Mindful Growth", weight: 40 },
        { colors: "Awareness", weight: 50 },
        { colors: "Introspective", weight: 40 },
    ];

    // Calculate the total weight of all the palettes
    totalWeight = colorPaletteNames.reduce((acc, curr) => acc + curr.weight, 0);
    selectedPalette = selectItem(colorPaletteNames, totalWeight, "colors");
    paletteIdx = selectedPalette.index

    paletteName = selectedPalette.item
    console.log('Palette Name:', paletteName)
    myFeatures["Palette"] = paletteName;

    // if (paletteName !== 'Awareness') {
    //     throw new Error('Stopping the code here');
    // }

    ////////////////////// ++++++++++++++++++++ '////////////////////////////
    density = pixelDensity(1);
    ////////////////////// ++++++++++++++++++++ '////////////////////////////

    startTime = millis();

    drawAreaW = width - 2 * marginDrawArea;

    //////////////////////////////////////////// Pattern /////////////////////
    pattern = new Pattern(width - 2 * marginDrawArea, height - 2 * marginDrawArea);

    patternNames = [
        { pattName: "randomRectangles", weight: 40 },
        { pattName: "checkered", weight: 250 },
        { pattName: "chevron", weight: 100 },
        { pattName: "chevronOff", weight: 100 },
        { pattName: "altRect", weight: 100 },
        { pattName: "altRectSkewed", weight: 100 },
        { pattName: "sinWaveColumns", weight: 40 },
        { pattName: "sineCosWaveRect", weight: 40 },
        { pattName: "sineWave", weight: 40 },
        { pattName: "sineWaveAlbers", weight: 100 },
        { pattName: "step", weight: 250 },
        { pattName: "interwovenStrips", weight: 250 },
        { pattName: "albersGrid", weight: 175 },
        { pattName: "albersCrazy", weight: 125 },
        { pattName: "mondrian", weight: 150 },
        { pattName: "solLeWitt", weight: 40 },
    ];

    // Calculate the total weight of all the patterns
    totalWeightPattern = patternNames.reduce((acc, curr) => acc + curr.weight, 0);
    selectedPattern = selectItem(patternNames, totalWeightPattern, "pattName");
    patternIdx = selectedPattern.index

    patternName = selectedPattern.item

    pattern.generatePattern(patternName);
    // myFeatures["Pattern"] = patternName;


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    $fx.features(myFeatures)


}

function draw() {
    


    let colorList = [midnight, sylvanDream, labyrinthine, shadowedEchoes, synesthesia,
                    rumination, emergentThoughts, whispers, serenity, twilight, sculptedGrains, deepResonance, brainwave,
                    mindfulGrowth, awareness, introspective ]
    colorPalette = new Palette(colorList[paletteIdx]).getPalette();

    bg = colorPalette.back
    delete colorPalette.back;
    background(bg);



    oB01 = createGraphics(drawAreaW, drawAreaH);
    oB02 = createGraphics(drawAreaW, drawAreaH);
    oB03 = createGraphics(drawAreaW, drawAreaH);
    oBTEST = createGraphics(drawAreaW, drawAreaH);

    bufferList = [oB01,oB02,oB03];

    let entries = Object.entries(colorPalette);


    for (let i = entries.length - 1; i > 0; i--) {
        const j = floor(random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
    }


    let shuffledValues = entries.map(([, value]) => value);


    let priColors = shuffledValues.map(color => color.primary);
    colorsPri = priColors;



    let backTexture;
    let colorLightBackground = []; // all backgrounds are dark...

    let isLightBackground = colorLightBackground.includes(paletteName);


    let colBG = color(bg);
    let r = red(colBG);
    let g = green(colBG);
    let b = blue(colBG);

    let compColor = isLightBackground 
        ? chroma(255 - r/2, 255 - g/2, 255 - b/2)
        : chroma(255 - r, 255 - g, 255 - b);



    let mixBase = isLightBackground ? "#000000" : compColor;
    let alphaValue = isLightBackground ? 0.62 : 0.22;

    let colBackTexture = chroma.mix(bg, mixBase, 0.5).hex();
    backTexture = chroma(colBackTexture).alpha(alphaValue).hex();







    // Extent of the area drawn - For all subdivisions layouts
    let initialSection = {
        x: drawAreaX,
        y: drawAreaY,
        w: drawAreaW,
        h: drawAreaH
    };

    let offsetFactor = round(boundedParetoDistribution(5, 1.001, 75) * MLP, 2);
    // offsetFactor = 0;




    ////////////////////////// Subdivision 1 ////////////////////////////////

    let splitHorOrVerBase = random(0.1, 0.9)

    const sectionSizeBase = {
        opt1: {w: width/3, h:height/3},
        opt2: {w: width/5, h:height/5},
        opt3: {w: width/10, h:height/10},   
    }

    const randomSectionBase = getRandomOption(sectionSizeBase);

    
    let ssWBase = randomSectionBase.w;
    let ssHBase = randomSectionBase.h;
    // Start the subdivision
    let baseLayout = true;
    let dFacBase = weightedRandom(0.025,0.02,0.005,0.3); 
    let lenFacBase = weightedRandom(0.25,0.1,0.01,0.9);
    subdivide(bufferList, baseLayout, initialSection, priColors, splitHorOrVerBase, ssWBase, ssHBase, dFacBase, lenFacBase, offsetFactor);
    console.log(`The first part (1/3) has been generated.`);

    ////////////////////////// Subdivision 2 ////////////////////////////////
    let splitHorOrVer = random(0.1, 0.9)
    const sectionSize = {
        // opt1: {w: width/3, h:height/3},
        // opt2: {w: width/5, h:height/5},
        opt3: {w: width/10, h:height/10},   
        opt4: {w: width/20, h:height/20},   
        opt5: {w: width/100, h:height/100},   
        opt6: {w: width/200, h:height/200},   
        opt5: {w: width/5, h:height/20},   
        opt6: {w: width/20, h:height/5},        
        opt7: {w: width/3, h:height/200},        
        opt8: {w: width/200, h:height/5}        
    }

    const randomSection = getRandomOption(sectionSize);
    
    var ssW = randomSection.w;
    var ssH = randomSection.h;
    var dFac = random(0.02,0.10); 
    var lenFac = random(0.1,0.9);
    subdivide(bufferList, false, initialSection, priColors, splitHorOrVer, ssW, ssH, dFac, lenFac, offsetFactor);
    console.log(`The second part (2/3) has been generated.`);

    ////////////////////////// Subdivision 3 ////////////////////////////////
    
    // translate(marginDrawArea, marginDrawArea)
    let vertices = pattern.getRectangleVertices();
    

    // function subdivideRectangle(base, vertices, col, dFac, lenFac, offsetFactor) {
    var dFac = random(0.05,0.15); 
    var lenFac = random(0.1,0.9);
    offsetFactor = round(boundedParetoDistribution(1, 1.001, 75) * MLP, 2);

    // Weighted random selection to extract colours at the end.
    let randLastCols = random();
    let numColorsToExtract;
    if (randLastCols < 0.50) {
        numColorsToExtract = 2;
    } else if (randLastCols < 0.80) {
        numColorsToExtract = 3;
    } else if (randLastCols < 0.95) {
        numColorsToExtract = 5;
    } else {
        numColorsToExtract = 1;
    }

    let lastColors = priColors.slice(-numColorsToExtract);

    for (let i = 0; i < vertices.length; i++) {
        subdivideRectangle(bufferList,true,vertices[i],lastColors,dFac, lenFac, offsetFactor)
        
    }
    
    console.log(`The third part (3/3) has been generated`);

    image(oB01, drawAreaX, drawAreaY, drawAreaW, drawAreaH);
    image(oB02, drawAreaX, drawAreaY, drawAreaW, drawAreaH);
    image(oB03, drawAreaX, drawAreaY, drawAreaW, drawAreaH);
    

    loadingOverlay.style.display = 'none';
    // Apply the box-shadow to the canvas element
    document.querySelector('main canvas').style.boxShadow = '0px 22px 35px 15px rgba(0, 0, 0, 0.62)';


    console.log((millis() - startTime) / 1000 + " seconds have passed.IMAGE GENERATED!!!");


    // +++++++++++++++++++ DO NOT CHANGE +++++++++++++++++
    // REQUIRED BY FXHASH
    // call fxpreview once confirmation that preview is ready
    i = 0;
    while (i != 1) 
        {
            if ((isFxpreview = true)) {fxpreview(); i = 1;}
        }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++


    noLoop()
}




// ######################################################################################################################
// ######################     PROJECT FUNCTIONS     #####################################################################
// ######################################################################################################################

function subdivide(bufferList, base, section, col, splitNum, w, h, dFac, lenFac, offsetFactor) {
    let buffer = random(bufferList)

    let singleCol = random(col);
    buffer.fill(singleCol);

    let offsetTopLeft = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetTopRight = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetBottomLeft = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetBottomRight = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };

    // Draw the section with the random color

    let lineThickness = base ? random(0.2, 0.5) : random(0.5, 0.8);
    

    let prob = random();

    if (prob < 0.85) {
        drawCrisCrossLines(buffer,
            { x: section.x + offsetTopLeft.x, y: section.y + offsetTopLeft.y },
            { x: section.x + section.w + offsetTopRight.x, y: section.y + offsetTopRight.y },
            { x: section.x + offsetBottomLeft.x, y: section.y + section.h + offsetBottomLeft.y },
            { x: section.x + section.w + offsetBottomRight.x, y: section.y + section.h + offsetBottomRight.y },
            singleCol, lineThickness, dFac, lenFac
        );
    } else {
        drawSketchyLines(buffer,
            { x: section.x + offsetTopLeft.x, y: section.y + offsetTopLeft.y },
            { x: section.x + section.w + offsetTopRight.x, y: section.y + offsetTopRight.y },
            { x: section.x + offsetBottomLeft.x, y: section.y + section.h + offsetBottomLeft.y },
            { x: section.x + section.w + offsetBottomRight.x, y: section.y + section.h + offsetBottomRight.y },
            singleCol, lineThickness, dFac, 0.5
        );
    }
    
    // stroke(0);
    noStroke();
    
    // Decide whether to split vertically or horizontally
    let splitVertically = random() > splitNum;
    
    // Decide if we should subdivide or not (e.g. based on the section size)
    if (section.w < w || section.h < h) return;
    
    if (splitVertically) {
        // Choose a random x-position within the section
        let splitX = section.x + random(section.w);
        
        // Draw the line
        // line(splitX, section.y, splitX, section.y + section.h);
        
        // Recursively subdivide the left and right sections
        subdivide(bufferList, base, {x: section.x, y: section.y, w: splitX - section.x, h: section.h}, col, splitNum, w, h, dFac, lenFac, offsetFactor);
        subdivide(bufferList, base, {x: splitX, y: section.y, w: section.x + section.w - splitX, h: section.h}, col, splitNum, w, h, dFac, lenFac, offsetFactor);
    } else {
        // Choose a random y-position within the section
        let splitY = section.y + random(section.h);
        
        // Draw the line
        // line(section.x, splitY, section.x + section.w, splitY);
        
        // Recursively subdivide the top and bottom sections
        subdivide(bufferList, base, {x: section.x, y: section.y, w: section.w, h: splitY - section.y}, col, splitNum, w, h, dFac, lenFac, offsetFactor);
        subdivide(bufferList, base, {x: section.x, y: splitY, w: section.w, h: section.y + section.h - splitY}, col, splitNum, w, h, dFac, lenFac, offsetFactor);
    }
}

function subdivideRectangle(bufferList, base, vertices, col, dFac, lenFac, offsetFactor) {
    
    let buffer = selectBuffer(bufferList);

    let singleCol = random(col);
    buffer.fill(singleCol);

    let section = {
        x: vertices[0][0],  // topLeft x
        y: vertices[0][1],  // topLeft y
        w: vertices[1][0] - vertices[0][0],  // topRight x minus topLeft x
        h: vertices[2][1] - vertices[0][1]   // bottomLeft y minus topLeft y
    };
    // Generate random offsets for the top-left, top-right, bottom-left, and bottom-right corners
    let offsetTopLeft = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetTopRight = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetBottomLeft = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };
    let offsetBottomRight = { x: random(-offsetFactor, offsetFactor), y: random(-offsetFactor, offsetFactor) };

    // Draw the section with the random color

    let lineThickness = base ? random(0.2, 0.5) : random(0.5, 0.8);

    let prob = random();

    if (prob < 0.85) {
        drawCrisCrossLines(buffer,
            { x: vertices[0][0] + offsetTopLeft.x, y: vertices[0][1] + offsetTopLeft.y },
            { x: vertices[1][0] + offsetTopRight.x, y: vertices[1][1] + offsetTopRight.y },
            { x: vertices[3][0] + offsetBottomLeft.x, y: vertices[3][1] + offsetBottomLeft.y },
            { x: vertices[2][0] + offsetBottomRight.x, y: vertices[2][1] + offsetBottomRight.y },
            singleCol, lineThickness, dFac, lenFac
        );
    } else {
        drawSketchyLines(buffer,
            { x: section.x + offsetTopLeft.x, y: section.y + offsetTopLeft.y },
            { x: section.x + section.w + offsetTopRight.x, y: section.y + offsetTopRight.y },
            { x: section.x + offsetBottomLeft.x, y: section.y + section.h + offsetBottomLeft.y },
            { x: section.x + section.w + offsetBottomRight.x, y: section.y + section.h + offsetBottomRight.y },
            singleCol, lineThickness, dFac, 0.5
        );
    }
}

function drawCrisCrossLines(buffer, topLeft, topRight, bottomLeft, bottomRight, lineColor, thickness, dF, lenF, uniformLengthFactor = random(0.1, 0.9), gradientFactor = random(0.1, 0.9), gradientAngle = random(360)) {
    let linesDrawn = 0; // Initialize a counter for this function
    buffer.strokeWeight(thickness);
    const [width, height, area] = [topRight.x - topLeft.x, bottomLeft.y - topLeft.y, (topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)];
    const numberOfLines = floor(area * dF);
    const precomputedColors = computeColors(lineColor);
    const gradientDirection = createVector(cos(radians(gradientAngle)), sin(radians(gradientAngle)));
    const uniformLength = 150 * MLP;
    
    const randMaxLines = random();
    let maxLines;
    if (randMaxLines < 0.7) {
        maxLines = 25000
    } else if (randMaxLines < 0.8) {
        maxLines = 15000
    } else if (randMaxLines < 0.9) {
        maxLines = 5000
    } else if (randMaxLines < 0.95) {
        maxLines = 2500
    } else if (randMaxLines < 0.98) {
        maxLines = 250
    } else {
        maxLines = 50
    }

    for (let i = 0; i < numberOfLines; i++) {
        if (linesDrawn >= maxLines) {
            // Exit the loop if 25,000 lines have been drawn
            break;
        }
        const orientation = random(['horizontal', 'vertical']);
        const [start, end] = computeStartEndPoints(orientation, topLeft, topRight, bottomLeft, bottomRight, width, height, lenF, uniformLength, uniformLengthFactor);
        if (shouldDrawLine(start, gradientDirection, topLeft, topRight, bottomLeft, bottomRight, gradientFactor) && random() <= 0.999 && isPointInQuadrilateral(start, topLeft, topRight, bottomRight, bottomLeft) && isPointInQuadrilateral(end, topLeft, topRight, bottomRight, bottomLeft)) {
            buffer.stroke(selectColor(precomputedColors));
            buffer.line(start.x, start.y, end.x, end.y);
            linesDrawn++;
        }
    }
    // console.log('>>>>>>>>> linesDrawn:',linesDrawn)
}

function computeColors(lineColor) {
    // Generate a random alpha value between 0.2 and 1
    const alpha = random() * (0.7 - 0.2) + 0.2;

    // Determine whether to apply alpha (10% of the time)
    const applyAlpha = random() < 0.035;

    // Generate colors with or without alpha based on applyAlpha
    return [
        chroma(lineColor).alpha(applyAlpha ? alpha : 1).saturate(random() * 1.5).hex(),
        chroma(lineColor).alpha(applyAlpha ? alpha : 1).saturate(random() * (2.5 - 0.2) + 0.2).hex(),
        chroma(lineColor).alpha(applyAlpha ? alpha : 1).desaturate(random() * (1.5 - 0.2) + 0.2).hex(),
        chroma(lineColor).alpha(applyAlpha ? alpha : 1).saturate(random() * (10 - 1) + 1).hex()
    ];
}

function computeStartEndPoints(orientation, topLeft, topRight, bottomLeft, bottomRight, width, height, lenF, uniformLength, uniformLengthFactor) {
    const interpolatedLength = orientation === 'horizontal' ? lerp(width * lenF, uniformLength, uniformLengthFactor) : lerp(height * lenF, uniformLength, uniformLengthFactor);
    const lineLength = random(10, interpolatedLength);
    if (orientation === 'horizontal') {
        const y = random(topLeft.y, bottomLeft.y);
        const startX = random(topLeft.x, topRight.x - lineLength);
        return [{ x: startX, y: y }, { x: startX + lineLength, y: y }];
    } else {
        const x = random(topLeft.x, topRight.x);
        const startY = random(topLeft.y, bottomLeft.y - lineLength);
        return [{ x: x, y: startY }, { x: x, y: startY + lineLength }];
    }
}

function shouldDrawLine(start, gradientDirection, topLeft, topRight, bottomLeft, bottomRight, gradientFactor) {
    const projection = createVector(start.x, start.y).dot(gradientDirection);
    const minProjection = min([topLeft, topRight, bottomLeft, bottomRight].map(point => createVector(point.x, point.y).dot(gradientDirection)));
    const maxProjection = max([topLeft, topRight, bottomLeft, bottomRight].map(point => createVector(point.x, point.y).dot(gradientDirection)));
    const normalizedProjection = (projection - minProjection) / (maxProjection - minProjection);
    return random() <= (1 - gradientFactor * normalizedProjection);
}

function selectColor(colors) {
    const rand = random();
    if (rand < 0.499) return colors[0];
    if (rand < 0.900) return colors[1];
    if (rand < 0.95) return colors[2];
    return colors[3];
}


function drawSketchyLines(buffer, topLeft, topRight, bottomLeft, bottomRight, lineColor, thickness, densityFactor, extensionProbability, bufferZone = 5) {
    densityFactor = densityFactor * 1.8;
    let width = topRight.x - topLeft.x;
    let height = bottomLeft.y - topLeft.y;
    let area = width * height;
    let numberOfLines = floor(area * densityFactor);

    const precomputedColors = computeColors(lineColor);

    extensionPercentage = weightedRandom(7,5,5,10000) * MLP

    buffer.strokeWeight(thickness);

    for (let i = 0; i < numberOfLines; i++) {
        let start = getRandomPointInQuadrilateral(topLeft, topRight, bottomLeft, bottomRight);
        // angle
        let predominantAngle = (random() < 0.5) ? 0 : HALF_PI; // 0 for horizontal, HALF_PI for vertical
        let deviation = radians(random(-1, 1)); // random deviation in range of -5 to +5 degrees
        let angle = predominantAngle + deviation;

        let lineLength = weightedRandom(10,5,5,35) * MLP; // You can adjust this as per requirements
        // let lineLength = 10
        let end = {
            x: start.x + lineLength * cos(angle),
            y: start.y + lineLength * sin(angle)
        };

        // Check if endpoint is within the bufferZone
        if (isPointNearEdges(end, topLeft, topRight, bottomLeft, bottomRight, bufferZone)) {
            if (random() < extensionProbability) {
                end.x += bufferZone * cos(angle);
                end.y += bufferZone * sin(angle);
            }
            extendLine(start, end, extensionPercentage, buffer); // Only extend lines that are close to the edge
        }
        // extendLine(start, end, extensionPercentage, buffer);

        buffer.stroke(selectColor(precomputedColors));
        buffer.line(start.x, start.y, end.x, end.y);
    }
}

function isPointNearEdges(point, topLeft, topRight, bottomLeft, bottomRight, bufferZone) {
    // Check if point is within bufferZone of any edge
    return (distToSegment(point, topLeft, topRight) < bufferZone ||
            distToSegment(point, topRight, bottomRight) < bufferZone ||
            distToSegment(point, bottomRight, bottomLeft) < bufferZone ||
            distToSegment(point, bottomLeft, topLeft) < bufferZone);
}

function distToSegment(p, v, w) {
    // Get the distance of point p to the segment defined by v and w
    let l2 = distSq(v, w);
    if (l2 === 0) return distSq(p, v);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = max(0, min(1, t));
    return distSq(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}

function distSq(v, w) {
    return (v.x - w.x) * (v.x - w.x) + (v.y - w.y) * (v.y - w.y);
}

function getRandomPointInQuadrilateral(tl, tr, bl, br) {
    // Bilinear interpolation method
    let s = random(), t = random();
    let x = (1 - s) * ((1 - t) * tl.x + t * bl.x) + s * ((1 - t) * tr.x + t * br.x);
    let y = (1 - s) * ((1 - t) * tl.y + t * bl.y) + s * ((1 - t) * tr.y + t * br.y);
    return { x: x, y: y };
}

function isLineCenterNearCanvasEdge(start, end, canvasWidth, canvasHeight, bufferZone) {
    const centerX = (start.x + end.x) / 2;
    const centerY = (start.y + end.y) / 2;

    return (centerX <= bufferZone || 
            centerX >= canvasWidth - bufferZone || 
            centerY <= bufferZone || 
            centerY >= canvasHeight - bufferZone);
}

function extendLine(start, end, extensionPercentage, buffer) {

    // Check if the midpoint is within the bufferZone from any edge
    const bufferZone = 10 * MLP;
    const canvasWidth = buffer.width;
    const canvasHeight = buffer.height;

    if (isLineCenterNearCanvasEdge(start, end, canvasWidth, canvasHeight, bufferZone)) {
        // Calculate the direction of the line
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        // Extend both the start and end points in their respective directions by the given percentage
        const extensionLength = sqrt(deltaX * deltaX + deltaY * deltaY) * (extensionPercentage / 100);
        const unitDeltaX = deltaX / sqrt(deltaX * deltaX + deltaY * deltaY);
        const unitDeltaY = deltaY / sqrt(deltaX * deltaX + deltaY * deltaY);

        // Modify both start and end points
        start.x -= unitDeltaX * extensionLength;
        start.y -= unitDeltaY * extensionLength;
        end.x += unitDeltaX * extensionLength;
        end.y += unitDeltaY * extensionLength;
    }
}

function isPointInQuadrilateral(point, v1, v2, v3, v4) {
    let d1 = direction(v1, v2, point);
    let d2 = direction(v2, v3, point);
    let d3 = direction(v3, v4, point);
    let d4 = direction(v4, v1, point);
    let has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0) || (d4 < 0);
    let has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0) || (d4 > 0);

    return !(has_neg && has_pos);
}

function direction(A, B, P) {
    return (B.x - A.x) * (P.y - A.y) - (P.x - A.x) * (B.y - A.y);
}
  
// Randomly select an option and extract w and h
function getRandomOption(sectionSize) {
    const options = Object.keys(sectionSize);
    const randomOptionKey = options[floor(random() * options.length)];
    const selectedOption = sectionSize[randomOptionKey];
    return selectedOption;
}

// Lerp
function lerp(a, b, f) {
    return (1 - f) * a + f * b;
}


function weightedRandomChoice(options, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let randomNum = random() * totalWeight;
    for (let i = 0; i < options.length; i++) {
        if (randomNum < weights[i]) {
            return options[i];
        }
        randomNum -= weights[i];
    }
    // This should not be reached unless there's a logic error or precision issue
    return options[options.length - 1];
}

function selectBuffer(bufferList) {
    let randWeights = random();
    let weights;
    if(randWeights < 0.15){
        weights = [0.1, 0.45, 0.45];
    }
    else if(randWeights < 0.85){
        weights = [0.1, 0.1, 0.8];
    }
    else if(randWeights < 0.97){
        weights = [0.1, 0.6, 0.3];
    }
    else{
        weights = [0.02, 0.03, 0.95];
        
    }
    return weightedRandomChoice(bufferList, weights);
}

function generateRandomRectangles(numRectangles) {
    for (let i = 0; i < numRectangles; i++) {
      // Random position within the canvas
      let x = random(width);
      let y = random(height);
  
      // Random width and height (between 20 and 100 pixels)
      let rectWidth = random(20, 100);
      let rectHeight = random(20, 100);
  
      // Random fill color (3 possible colors)
      let fillColor;
      let colorChoice = floor(random(3)); // Randomly choose one of 3 colors
      if (colorChoice === 0) {
        fillColor = color(255, 0, 0); // Red
      } else if (colorChoice === 1) {
        fillColor = color(0, 255, 0); // Green
      } else {
        fillColor = color(0, 0, 255); // Blue
      }
  
      // Draw the rectangle with the selected properties
      fill(fillColor);
      rect(x, y, rectWidth, rectHeight);
    }
}

function drawBigText(textContent, fontSize, x, y, textColor) {
    textSize(fontSize); // Set the font size
    textAlign(CENTER, CENTER); // Center-align the text
    
    fill(textColor); // Set the text color
    
    text(textContent, x, y); // Display the text
}
function drawBigTextOB(textContent, fontSize, x, y, textColor) {
    oBTEST.textSize(fontSize); // Set the font size
    oBTEST.textAlign(CENTER, CENTER); // Center-align the text
    
    oBTEST.fill(textColor); // Set the text color
    
    oBTEST.text(textContent, x, y); // Display the text
}


// Define a function to perform the weighted selection and return the selected palette and its index
function selectItem(items, totalWeight, propertyKey) {
    let randomIndex = -1;
    let randomNumber = random() * totalWeight;
    
    for (let j = 0; j < items.length; j++) {
      randomNumber -= items[j].weight;
      if (randomNumber <= 0) {
        randomIndex = j;
        break;
      }
    }
    
    const selectedItem = items[randomIndex][propertyKey]; // Access the specified property
    const selectedItemIndex = randomIndex;
    
    return { item: selectedItem, index: selectedItemIndex };
}

// Distributions
function paretoDistribution (minimum, alpha) {
    var u = 1.0 - random();
    return minimum / pow(u, 1.0 / alpha);
}

function boundedParetoDistribution (minimum, alpha, maxBound) {
    let value;
    do {
        var u = 1.0 - random();
        value = minimum / pow(u, 1.0 / alpha);
    } while (value > maxBound);
    return value;
}

function weightedRandom(mean, stdDev, min, max) {
    let isFocused = random() < 0.9; 
  
    if (isFocused) {
      return gaussianRandom(mean, stdDev, min, max);  
    } else {
      return gaussianRandom(mean, stdDev * 10, min, max);
    }
}
  
function gaussianRandom(mean, stdDev, min, max) {
    let randNormal;
    do {
        let u1 = 1.0 - random();
        let u2 = 1.0 - random();
        let randStdNormal = sqrt(-2.0 * log(u1)) * sin(2.0 * PI * u2);
        randNormal = mean + stdDev * randStdNormal;
    } while (randNormal < min || randNormal > max);

    return randNormal;
}

function elapsedTime(){
    let timepassed = round((millis() - startTime) / 1000, 4 ); // 4 decimal places

    return timepassed
}

function keyPressed() {
    // // // console.log('Key pressed:', key, keyCode);
    if (key.toLowerCase() === 's') {
        // Save canvas
        saveCanvas(`cognitiveMaze_${fxhash}`, 'jpeg');
    } 
    
}

