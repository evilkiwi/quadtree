class Node {

    /**
     * Initializes the new Quadtree Node.
     *
     * @param {Object} options
     */
    constructor(options) {
        /**
         * The options used to initialise this Node.
         *
         * @type {Object}
         */
        this.options = Object.assign({
            level: 0,
            x: 0,
            y: 0,
            width: 1000,
            height: 1000,
            max_depth: 4,
            max_objects: 10,
        }, options);

        /**
         * All of the child Nodes inside this one.
         *
         * @type {Array}
         */
        this.children = [];

        /**
         * Whether or not this Node is a parent Node.
         *
         * @type {Boolean}
         */
        this.parent = false;

        /**
         * All of the Objects currently inserted in to the Quadtree.
         *
         * @type {Array}
         */
        this.objects = [];

        /**
         * The count of all Objects in the Quadtree.
         *
         * @type {Number}
         */
        this.total = 0;
    }

    /**
     * Retrieves all Objects that could collide with the given box.
     *
     * @param {Object} box
     *
     * @return {Array}
     */
    retrieve(box) {
        let objects = [];

        if (this.options.level === 0 || this.inside(box)) {
            if (!this.parent) {
                objects = this.objects;
            } else {
                Array.prototype.push.apply(objects, this.children[0].retrieve(box));
                Array.prototype.push.apply(objects, this.children[1].retrieve(box));
                Array.prototype.push.apply(objects, this.children[2].retrieve(box));
                Array.prototype.push.apply(objects, this.children[3].retrieve(box));
            }
        }

        return objects;
    }

    /**
     * Inserts all of the given Objects in to the Quadtree.
     *
     * @param {Array} objects
     */
    insertAll(objects) {
        const total = objects.length;

        for (let i = 0; i < total; i++) {
            this.insert(objects[i]);
        }
    }

    /**
     * Inserts the given Object in to the Quadtree.
     *
     * @param {Object} object
     */
    insert(object) {
        if (
            !this.parent &&
            this.total >= this.options.max_objects &&
            this.options.level < this.options.max_depth
        ) {
            this.split();
            this.insertAll(this.objects);
            this.objects = [];
            this.total = 0;
        }

        if (this.parent) {
            if (this.children[0].inside(object)) {
                this.children[0].insert(object);
            }

            if (this.children[1].inside(object)) {
                this.children[1].insert(object);
            }

            if (this.children[2].inside(object)) {
                this.children[2].insert(object);
            }

            if (this.children[3].inside(object)) {
                this.children[3].insert(object);
            }

            return;
        }

        this.objects[this.total] = object;
        this.total++;
    }

    /**
     * Clears the Quadtree.
     */
    clear() {
        this.nodes = [];
        this.objects = [];
        this.total = 0;
        this.parent = false;
    }

    /**
     * Returns whether the given Object is inside this Node.
     *
     * @param {Object} object
     *
     * @return {Boolean}
     */
    inside(object) {
        return this.options.x <= object.x + object.width &&
            object.x <= this.options.x + this.options.width &&
            this.options.y <= object.y + object.height &&
            object.y <= this.options.y + this.options.height;
    }

    /**
     * Splits the Node on the given Object.
     */
    split() {
        if (this.parent) {
            return;
        }

        this.parent = true;

        const level = this.options.level + 1;
        const width = this.options.width / 2;
        const height = this.options.height / 2;

        this.children[0] = new Node(Object.assign({}, this.options, {
            level,
            x: this.options.x,
            y: this.options.y,
            width,
            height,
        }));

        this.children[1] = new Node(Object.assign({}, this.options, {
            level,
            x: this.options.x + width,
            y: this.options.y,
            width,
            height,
        }));

        this.children[2] = new Node(Object.assign({}, this.options, {
            level,
            x: this.options.x,
            y: this.options.y + height,
            width,
            height,
        }));

        this.children[3] = new Node(Object.assign({}, this.options, {
            level,
            x: this.options.x + width,
            y: this.options.y + height,
            width,
            height,
        }));
    }

}

export default Node;
