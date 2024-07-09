const visibleTags = new Set();
const debounceTimers = {};

const debounceTime = 300; // Adjust debounce time as needed

/*function onTagVisible(tag) {
    console.log(`Tag ${tag.id} became visible`);
    // Add your logic here for when a tag becomes visible
}

function onTagHidden(tag) {
    console.log(`Tag ${tag.id} became hidden`);
    // Add your logic here for when a tag becomes hidden
}*/

function onTagChange(tagid, change) {
    console.log(`Tag ${tag.id} became hidden`);
}

class Tag {
    constructor(id) {
        this.id = id;
        this.isVisible = false;
        this.showHandler = null;
        this.hideHandler = null;
    }

    onShow(callback) {
        this.showHandler = callback;
    }

    onHide(callback) {
        this.hideHandler = callback;
    }

    triggerShow() {
        if (this.showHandler) {
            this.showHandler();
        }
    }

    triggerHide() {
        if (this.hideHandler) {
            this.hideHandler();
        }
    }
}



class TagManager {
    constructor() {
        this.tags = new Map();
        this.visibleTags = new Set();
        this.debounceTimers = {};
        this.debounceTime = 300; // Adjust debounce time as needed
    }

    addTag(tag) {
        this.tags.set(tag.id, tag);
    }

    updateTags(newTags) {
        const newTagIds = new Set(newTags.map(tag => tag.id));

        // Check currently visible tags to see if any have disappeared
        visibleTags.forEach(id => {
            if (!newTagIds.has(id)) {
                //  previously visible but not currently visible!
                if (!debounceTimers[id]) {
                    debounceTimers[id] = setTimeout(() => {
                        visibleTags.delete(id);
                        const tag = this.tags.get(id);
                        if (tag) {
                            tag.triggerHide();
                        }
                        delete debounceTimers[id];
                    }, debounceTime);
                }
            }
        });

        // Check new tags to see if any are newly visible
        newTags.forEach(tag => {
            if (!visibleTags.has(tag.id)) {
                // new tag, but wasn't previously visible, so let's just show!
                visibleTags.add(tag.id);
                const tag = this.tags.get(id);
                    if (tag) {
                        tag.triggerShow();
                    }
                // let's clear and delete any hide debounce timers
                if (debounceTimers[tag.id]) {
                    clearTimeout(debounceTimers[tag.id]);
                    delete debounceTimers[tag.id];
                }
            } else {
                if (debounceTimers[tag.id]) {
                    clearTimeout(debounceTimers[tag.id]);
                    delete debounceTimers[tag.id];
                }
            }
        });
    }
}


       


