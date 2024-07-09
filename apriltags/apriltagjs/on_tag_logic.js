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
        this.tagObjects = new Map();
        this.visibleTags = new Set();
        this.debounceTimers = {};
        this.debounceTime = 300; // Adjust debounce time as needed
    }


    addTag(tag) {
        this.tagObjects.set(tag.id, tag);
    }


    updateTags(newTags) {
        const newTagIds = new Set(newTags.map(tag => tag.id));

        // Check currently visible tags to see if any have disappeared
        this.visibleTags.forEach(id => {
            if (!newTagIds.has(id)) {
                //  previously visible but not currently visible!
                if (!this.debounceTimers[id]) {
                    this.debounceTimers[id] = setTimeout(() => {
                        this.visibleTags.delete(id);
                        const thistag = this.tagObjects.get(id);
                        if (thistag) { thistag.triggerHide(); }
                        delete this.debounceTimers[id];
                    }, this.debounceTime);
                }
            }
        });

        // Check new tags to see if any are newly visible
        newTags.forEach(tag => {
            if (!this.visibleTags.has(tag.id)) {
                // new tag, but wasn't previously visible, so let's just show!
                this.visibleTags.add(tag.id);
                const thistag = this.tagObjects.get(tag.id);
                if (thistag) { thistag.triggerShow(); }
                // let's clear and delete any hide debounce timers
                if (this.debounceTimers[tag.id]) {
                    clearTimeout(this.debounceTimers[tag.id]);
                    delete this.debounceTimers[tag.id];
                }
            } else {
                if (this.debounceTimers[tag.id]) {
                    clearTimeout(this.debounceTimers[tag.id]);
                    delete this.debounceTimers[tag.id];
                }
            }
        });
    }
}

       


