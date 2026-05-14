
class FloatingLines {
    constructor(options) {
        this.container = options.container;
        this.options = {
            linesGradient: options.linesGradient || ["#E945F5", "#6c4cf4", "#e945f5"],
            animationSpeed: options.animationSpeed || 1,
            interactive: options.interactive || false,
            bendRadius: options.bendRadius || 150,
            bendStrength: options.bendStrength || 0.1,
            mouseDamping: options.mouseDamping || 0.08,
            parallax: options.parallax || false,
            parallaxStrength: options.parallaxStrength || 0.2
        };

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Ensure canvas is absolutely positioned and transparent
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.opacity = '0.6'; // Slight transparency for subtle effect

        this.container.appendChild(this.canvas);

        this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
        this.lines = [];
        this.animationFrameId = null;
        this.time = 0;

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createLines();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        if (this.options.interactive) {
            // Track mouse on the whole document for better response
            document.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                // We care about mouse relative to canvas, but if it's outside we still track it
                // for the "approach" effect if visible.
                this.mouse.targetX = e.clientX - rect.left;
                this.mouse.targetY = e.clientY - rect.top;
            });

            // Reset mouse when leaving window
            document.addEventListener('mouseleave', () => {
                this.mouse.targetX = -1000;
                this.mouse.targetY = -1000;
            });
        }
    }

    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Handle DPI
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        this.ctx.scale(dpr, dpr);

        this.createLines();
    }

    createLines() {
        this.lines = [];
        // Calculate gap based on width/density. 
        // Let's aim for ~20-30 lines for a balanced look on desktop
        const desiredLines = 25;
        const gap = this.width / desiredLines;

        for (let i = 0; i < desiredLines + 2; i++) {
            this.lines.push({
                x: (i * gap) - (gap / 2),
                baseX: (i * gap) - (gap / 2),
                // Add some randomness to each line's phase
                phaseOffset: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Update mouse position with damping
        const dx = this.mouse.targetX - this.mouse.x;
        const dy = this.mouse.targetY - this.mouse.y;

        this.mouse.x += dx * this.options.mouseDamping;
        this.mouse.y += dy * this.options.mouseDamping;

        const { linesGradient, animationSpeed, bendRadius, bendStrength, parallax, parallaxStrength } = this.options;

        // Create Gradient
        // We can create a gradient that spans the width or height.
        // Diagonal gradient usually looks better
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        linesGradient.forEach((color, index) => {
            gradient.addColorStop(index / (Math.max(linesGradient.length - 1, 1)), color); // Safety check for 1-color array
        });

        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.time += 0.01 * animationSpeed;

        // Pre-calculate parallax offset
        let parallaxX = 0;
        if (parallax) {
            // Parallax moves lines opposite to mouse
            // Center is 0
            const centerX = this.width / 2;
            parallaxX = ((this.mouse.x - centerX) / centerX) * -1 * (this.width * 0.05 * parallaxStrength);
        }

        this.ctx.beginPath();

        this.lines.forEach((line, i) => {
            let currentX = line.baseX + parallaxX;

            // We draw the line by iterating Y from 0 to height
            // More segments = smoother curve
            const segments = 40;
            const segmentHeight = this.height / segments;

            this.ctx.moveTo(currentX, 0); // Start top

            // To draw a continuous smooth curve, we should collect points first then draw quadraticCurveTo
            // But lineTo is usually fine for high segment count

            for (let j = 0; j <= segments; j++) {
                let py = j * segmentHeight;

                // Calculate Sine Wave offset
                // x = sin(time + y_factor + line_index_factor)
                // Varying frequencies creates a nice "ribbon" effect
                const wave = Math.sin(this.time + (j * 0.1) + line.phaseOffset) * 15;

                let px = currentX + wave;

                // Apply Bend (Interaction)
                if (this.options.interactive) {
                    const distX = this.mouse.x - px;
                    const distY = this.mouse.y - py;
                    const dist = Math.sqrt(distX * distX + distY * distY);

                    if (dist < bendRadius) {
                        // Calculate push factor (1 at center, 0 at radius)
                        // Smooth step for nicer falloff
                        let t = 1 - (dist / bendRadius);
                        t = t * t * (3 - 2 * t); // smoothstep

                        // Push away from mouse horizontally
                        // If mouse is to the left, push right.
                        const dirX = distX > 0 ? -1 : 1;

                        // But usually "bend" means curve around.
                        // Let's just push strictly horizontally away
                        const force = t * bendStrength * 100; // Multiplier

                        // Directional push based on mouse X relative to line
                        px += (distX / dist) * -1 * force;
                    }
                }

                this.ctx.lineTo(px, py);
            }
        });

        this.ctx.stroke();

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

// Attach to window
window.FloatingLines = FloatingLines;
