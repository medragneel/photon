<script lang="ts">
    import { T, useFrame } from "@threlte/core";
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import * as THREE from "three";

    export let animationPaused = false;

    let frame: THREE.Group;
    let imagePlane: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
    let camera: THREE.PerspectiveCamera;
    let tiltX = 0;
    let tiltY = 0;
    const maxTiltAngle = 0.15;

    const animationDuration = 2;

    let debugText = "";

    onMount(() => {
        if (frame) startFrameAnimation();
    });

    function createFrame() {
        frame = new THREE.Group();

        const frameGeometry = new THREE.BoxGeometry(5, 7, 0.3);
        const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

        const edgeGeometry = new THREE.EdgesGeometry(frameGeometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
            color: 0x666666,
            linewidth: 2,
        });
        const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);

        frame.add(edgeMesh);
        frame.add(frameMesh);

        frame.position.set(5, 0, 0);
        frame.scale.set(1, 1, 1);

        return frame;
    }

    function createImagePlane() {
        const loader = new THREE.TextureLoader();
        const texture1 = loader.load("/rengoku_c.png");
        const texture2 = loader.load("/rengoku.png");

        const planeGeometry = new THREE.PlaneGeometry(4.5, 6.5);
        const planeMaterial = new THREE.ShaderMaterial({
            uniforms: {
                texture1: { value: texture1 },
                texture2: { value: texture2 },
                mixRatio: { value: 0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D texture1;
                uniform sampler2D texture2;
                uniform float mixRatio;
                varying vec2 vUv;
                void main() {
                    vec4 texel1 = texture2D(texture1, vUv);
                    vec4 texel2 = texture2D(texture2, vUv);
                    gl_FragColor = mix(texel1, texel2, mixRatio);
                }
            `,
        });

        imagePlane = new THREE.Mesh(planeGeometry, planeMaterial);
        imagePlane.position.z = 0.16;
        return imagePlane;
    }

    function startFrameAnimation() {
        gsap.to(frame.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: animationDuration,
            ease: "power2.inOut",
        });

        gsap.to(frame.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: animationDuration,
            ease: "power2.inOut",
        });

        gsap.to(frame.rotation, {
            y: Math.PI / 32,
            duration: animationDuration,
            ease: "power2.inOut",
        });
    }

    function onMouseMove(event: MouseEvent) {
        if (!camera || !imagePlane) return;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(imagePlane);

        if (intersects.length > 0) {
            debugText = "Mouse over image plane";
            gsap.to(imagePlane.material.uniforms.mixRatio, {
                value: 1,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: () => {
                    imagePlane.material.needsUpdate = true;
                },
            });
        } else {
            debugText = "Mouse not over image plane";
            gsap.to(imagePlane.material.uniforms.mixRatio, {
                value: 0,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: () => {
                    imagePlane.material.needsUpdate = true;
                },
            });
        }

        tiltX =
            ((event.clientY - window.innerHeight / 2) /
                (window.innerHeight / 2)) *
            maxTiltAngle;
        tiltY =
            ((event.clientX - window.innerWidth / 2) /
                (window.innerWidth / 2)) *
            maxTiltAngle;
    }

    useFrame(() => {
        if (!animationPaused && frame) {
            gsap.to(frame.rotation, {
                x: tiltX,
                y: tiltY,
                duration: 0.1,
                ease: "power2.out",
            });
        }
    });

    function resetAnimation() {
        if (frame) startFrameAnimation();
    }

    function toggleAnimation() {
        animationPaused = !animationPaused;
        if (animationPaused) {
            gsap.killTweensOf(frame.position);
            gsap.killTweensOf(frame.rotation);
            gsap.killTweensOf(frame.scale);
        } else {
            startFrameAnimation();
        }
    }
</script>

<T.PerspectiveCamera
    makeDefault
    position={[0, 0, 10]}
    fov={75}
    aspect={window.innerWidth / window.innerHeight}
    near={0.1}
    far={1000}
    bind:ref={camera}
/>
<T.AmbientLight intensity={0.5} />
<T.DirectionalLight intensity={0.5} position={[5, 5, 5]} />

<T is={createFrame()} let:ref={frame}>
    <T is={createImagePlane()} />
</T>

<svelte:window on:mousemove={onMouseMove} />

<div class="absolute top-5 left-5 bg-white bg-opacity-50 p-2 rounded">
    Debug: {debugText}
</div>

<div
    class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10"
>
    <button
        class="px-4 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30 transition-colors"
        on:click={resetAnimation}>Reset</button
    >
    <button
        class="px-4 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30 transition-colors"
        on:click={toggleAnimation}
    >
        {animationPaused ? "Resume" : "Pause"} Animation
    </button>
</div>
