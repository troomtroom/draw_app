class SketchPad {
    constructor(container, onUpdate=null, size = 400) {

        // Create a canvas element dynamically
        this.canvas = document.createElement("canvas");

        // Set canvas dimensions
        this.canvas.width = size;
        this.canvas.height = size;

        // Apply some basic styling
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `;

        // Add canvas to the given container element
        container.appendChild(this.canvas);


        // add a linebreak
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);


        // add undo button

        this.undoBtn = document.createElement("button");
    
        this.undoBtn.innerHTML = "UNDO";

        container.appendChild(this.undoBtn);

        // Get the 2D drawing context
        this.ctx = this.canvas.getContext("2d");

        /*
            paths stores all strokes drawn by the user.

            Example:
            [
                [[10,20],[15,25],[20,30]],   // stroke 1
                [[100,50],[110,60]]          // stroke 2
            ]
        */

        this.onUpdate= onUpdate;
        this.reset();
        this.#addEventListeners();
    }


    reset(){
         this.paths = [];

        // Tracks whether mouse button is currently pressed
        this.isDrawing = false;

        // Register mouse event handlers

        this.#redraw();
    }
    #addEventListeners() {

        // Start a new stroke when mouse button is pressed
        this.canvas.onmousedown = (evt) => {

            // Get mouse position relative to canvas
            const mouse = this.#getMouse(evt);

            // Create a new path containing the first point
            this.paths.push([mouse]);

            // Enable drawing mode
            this.isDrawing = true;
        };

        // Runs whenever mouse moves
        this.canvas.onmousemove = (evt) => {

            // Only draw if mouse button is pressed
            if (this.isDrawing) {

                // Current mouse position
                const mouse = this.#getMouse(evt);

                // Get the most recently created path
                const lastPath = this.paths[this.paths.length - 1];

                // Add current point to the path
                lastPath.push(mouse);

                // Redraw canvas with updated path
                this.#redraw();
            }
        };

        // Stop drawing when mouse button is released
        document.onmouseup = () => {
            this.isDrawing = false;
        };
        this.canvas.ontouchstart = (evt) => {
            evt.preventDefault();
            const touch = evt.touches[0];
            if (!touch) return;

            this.canvas.onmousedown({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        };

        this.canvas.ontouchmove = (evt) => {
            evt.preventDefault();
            const touch = evt.touches[0];
            if (!touch) return;

            this.canvas.onmousemove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        };

        document.ontouchend = () => {
            document.onmouseup();
        };

        this.undoBtn.onclick = ()=>{
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw() {

        // Clear the entire canvas
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        // Draw every stored path again
        draw.paths(this.ctx, this.paths);

        if(this.paths.length>0){
            this.undoBtn.disabled=false;
        }
        else{
            this.undoBtn.disabled=true;
        }

        this.triggerUpdate();
    }


    triggerUpdate(){
        if(this.onUpdate!=null){
            this.onUpdate(this.paths);
        }
    }
    // Convert browser mouse coordinates
    // into canvas-relative coordinates
    #getMouse = (evt) => {

        // Canvas position on screen
        const rect = this.canvas.getBoundingClientRect();

        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    };
}