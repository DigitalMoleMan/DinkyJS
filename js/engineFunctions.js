getIntersection = (v1, v2) => {
    let x1 = v1[0].x
    let x2 = v1[1].x
    let x3 = v2[0].x
    let x4 = v2[1].x
    let y1 = v1[0].y
    let y2 = v1[1].y
    let y3 = v2[0].y
    let y4 = v2[1].y
    var ua, ub, denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) {
        return null;
    }
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return new Vector(
        x1 + ua * (x2 - x1),
        y1 + ua * (y2 - y1),
    );
}


function getIntersection2(p1, p2, p3, p4) {
    function CCW(p1, p2, p3) {
        return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
    }
    return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
}