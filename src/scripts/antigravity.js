import * as THREE from 'three';

/**
 * Initializes the Antigravity Hero Animation
 * @param {string} containerId - The ID of the container element
 * @param {Object} props - Configuration properties (matches provided React props)
 */
export function runAntigravity(containerId, props = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Antigravity: Container #${containerId} not found.`);
        return;
    }

    // --- Configuration ---
    const settings = {
        count: 300,
        magnetRadius: 6,
        ringRadius: 7,
        waveSpeed: 0.4,
        waveAmplitude: 1,
        particleSize: 1.5,
        lerpSpeed: 0.05,
        color: '#FF9FFC',
        autoAnimate: true,
        particleVariance: 1,

        // Internal defaults from provided code
        rotationSpeed: 0,
        depthFactor: 1,
        pulseSpeed: 3,
        particleShape: 'capsule',
        fieldStrength: 10,
        ...(props || {})
    };

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera setup matching R3F default: fov 35, position [0,0,50]
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for performance
    container.appendChild(renderer.domElement);

    // --- Geometry & Material ---
    let geometry;
    if (typeof THREE.CapsuleGeometry !== 'undefined' && settings.particleShape === 'capsule') {
        geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
    } else {
        // Fallback or other shapes
        if (settings.particleShape === 'sphere') geometry = new THREE.SphereGeometry(0.2, 16, 16);
        else if (settings.particleShape === 'box') geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        else if (settings.particleShape === 'tetrahedron') geometry = new THREE.TetrahedronGeometry(0.3);
        else geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8); // Fallback for capsule
    }

    const material = new THREE.MeshBasicMaterial({ color: settings.color });
    const mesh = new THREE.InstancedMesh(geometry, material, settings.count);
    scene.add(mesh);

    // --- State & Particles ---
    const dummy = new THREE.Object3D();
    let lastMousePos = { x: 0, y: 0 };
    let lastMouseMoveTime = 0;
    let virtualMouse = { x: 0, y: 0 };
    let mouse = { x: 0, y: 0 }; // Normalized -1 to 1

    // Calculate Viewport dimensions at Z=0 (where particles exist)
    // height = 2 * dist * tan(fov/2)
    const computeViewport = () => {
        const vFov = (camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(vFov / 2) * camera.position.z;
        const width = height * (container.clientWidth / container.clientHeight);
        return { width, height };
    };

    let { width: viewWidth, height: viewHeight } = computeViewport();

    const particles = [];
    for (let i = 0; i < settings.count; i++) {
        // Random generation logic from provided code
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 200;

        // Spread across viewport
        const x = (Math.random() - 0.5) * viewWidth;
        const y = (Math.random() - 0.5) * viewHeight;
        const z = (Math.random() - 0.5) * 20;

        const randomRadiusOffset = (Math.random() - 0.5) * 2;

        particles.push({
            t, factor, speed,
            mx: x, my: y, mz: z,  // Original/magnet targets
            cx: x, cy: y, cz: z,  // Current positions
            randomRadiusOffset
        });
    }

    // --- Event Listeners ---
    const onMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        mouse.x = x;
        mouse.y = y;

        const dist = Math.sqrt(
            Math.pow(x - lastMousePos.x, 2) + Math.pow(y - lastMousePos.y, 2)
        );
        if (dist > 0.001) {
            lastMouseMoveTime = Date.now();
            lastMousePos = { x, y };
        }
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationId; // Track ID

    function animate() {
        animationId = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Target calculation
        let destX = (mouse.x * viewWidth) / 2;
        let destY = (mouse.y * viewHeight) / 2;

        // Auto-animate if idle
        if (settings.autoAnimate && Date.now() - lastMouseMoveTime > 2000) {
            destX = Math.sin(time * 0.5) * (viewWidth / 4);
            destY = Math.cos(time * 0.5 * 2) * (viewWidth / 4); // Using viewWidth/4 for circle aspect? Code says (v.height / 4) for Y.
            // Correcting to match code exactly:
            // destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
            destY = Math.cos(time * 0.5 * 2) * (viewHeight / 4);
        }

        // Smooth mouse follow
        const smoothFactor = 0.05;
        virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
        virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

        const targetX = virtualMouse.x;
        const targetY = virtualMouse.y;

        const globalRotation = time * settings.rotationSpeed;

        // Update Particles
        for (let i = 0; i < settings.count; i++) {
            const p = particles[i];

            p.t += p.speed / 2;
            const t = p.t;

            // Projection factor based on depth (simulating perspective attraction)
            const projectionFactor = 1 - p.cz / 50;
            const projectedTargetX = targetX * projectionFactor;
            const projectedTargetY = targetY * projectionFactor;

            const dx = p.mx - projectedTargetX;
            const dy = p.my - projectedTargetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let targetPos = { x: p.mx, y: p.my, z: p.mz * settings.depthFactor };

            // Magnet Effect
            if (dist < settings.magnetRadius) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(t * settings.waveSpeed + angle) * (0.5 * settings.waveAmplitude);
                const deviation = p.randomRadiusOffset * (5 / (settings.fieldStrength + 0.1));
                const currentRingRadius = settings.ringRadius + wave + deviation;

                targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
                targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
                targetPos.z = p.mz * settings.depthFactor + Math.sin(t) * (1 * settings.waveAmplitude * settings.depthFactor);
            }

            // Lerp to target
            p.cx += (targetPos.x - p.cx) * settings.lerpSpeed;
            p.cy += (targetPos.y - p.cy) * settings.lerpSpeed;
            p.cz += (targetPos.z - p.cz) * settings.lerpSpeed;

            // Update Instance Matrix
            dummy.position.set(p.cx, p.cy, p.cz);
            dummy.lookAt(projectedTargetX, projectedTargetY, p.cz);
            dummy.rotateX(Math.PI / 2); // Orient capsule along direction? Code says so.

            // Scale Effect
            const currentDistToMouse = Math.sqrt(
                Math.pow(p.cx - projectedTargetX, 2) + Math.pow(p.cy - projectedTargetY, 2)
            );
            const distFromRing = Math.abs(currentDistToMouse - settings.ringRadius);
            let scaleFactor = 1 - distFromRing / 10;
            scaleFactor = Math.max(0, Math.min(1, scaleFactor));

            const finalScale = scaleFactor * (0.8 + Math.sin(t * settings.pulseSpeed) * 0.2 * settings.particleVariance) * settings.particleSize;
            dummy.scale.set(finalScale, finalScale, finalScale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate();

    // --- Cleanup Function ---
    return function destroy() {
        if (animationId) cancelAnimationFrame(animationId);

        // Remove Listeners
        window.removeEventListener('mousemove', onMouseMove);
        // window.removeEventListener('resize', onResize); // onResize was not defined or added

        // Dispose Three.js
        if (renderer) {
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
    };
}

// NOTE: To properly stop the loop, we need to modify the animate function to check a flag or store the rAF ID.
// Re-implementing animate to be cancelable below:
/*
    let animationId;
    function animate() {
        animationId = requestAnimationFrame(animate);
        // ... rendering logic ...
    }
    animate();
    
    // In destroy:
    cancelAnimationFrame(animationId);
*/
