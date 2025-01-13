function clearScrollArea() {
    const scrollArea = document.getElementById("content");
    // get all element children of scrollArea except for the last one (active-group) and remove them
    const childrenToRemove = Array.from(scrollArea.childNodes.values())
        .filter(child => child.nodeType === Node.ELEMENT_NODE).slice(0, -2);
    for (let child of childrenToRemove) {
        child.hidden = true;
    }
}

// staticOn should be true to make it static, false to do the opposite
function toStaticSite(staticOn, wasClick) {
    if (document.getElementById("active-group").hidden && !wasClick) {
        // if we've already gone static, don't go back to active without a click
        return;
    }

    clearScrollArea();
    document.getElementById("initial-item-group").hidden = false;
    document.getElementById("active-group").hidden = staticOn;
    document.getElementById("help-message").hidden = staticOn;
    document.getElementById("unstatic").hidden = !staticOn;
    document.getElementById("static-site").hidden = !staticOn;
    if (staticOn) {
        window.scrollTo(0, 0);
    }
}
