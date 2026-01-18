"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const Globe3D = ({ width, height }: { width?: number; height?: number }) => {
    const globeEl = useRef<any>();
    const [countries, setCountries] = useState({ features: [] });
    const [hoverD, setHoverD] = useState<object | null>(null);

    const targetCountries = [
        "Burundi",
        "Ghana",
        "Kenya",
        "Tanzania",
        "Zambia",
        "Democratic Republic of the Congo",
        "Rwanda",
        "Uganda",
    ];

    const cityData = [
        { name: "Burundi", lat: -3.4273, lng: 29.9246 },
        { name: "Ghana", lat: 5.6037, lng: -0.1870 },
        { name: "Kenya", lat: -1.2921, lng: 36.8219 },
        { name: "Tanzania", lat: -6.1630, lng: 35.7516 },
        { name: "Zambia", lat: -15.3875, lng: 28.3228 },
        { name: "DRC", lat: -4.4419, lng: 15.2663 },
        { name: "Rwanda", lat: -1.9441, lng: 30.0619 },
        { name: "Uganda", lat: 0.3476, lng: 32.5825 },
    ];

    useEffect(() => {
        // Load GeoJSON data
        fetch(
            "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
        )
            .then((res) => res.json())
            .then(setCountries);
    }, []);

    useEffect(() => {
        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;

            // Initial point of view (Africa)
            globeEl.current.pointOfView({ lat: -6, lng: 20, altitude: 0.35 });
        }
    }, []);

    const initFlags = () => {
        if (!globeEl.current) return;

        const scene = globeEl.current.scene();
        const ringGroup = new THREE.Group();
        scene.add(ringGroup);

        const baseFlagCountries = [
            { code: 'bi', name: 'Burundi' },
            { code: 'gh', name: 'Ghana' },
            { code: 'ke', name: 'Kenya' },
            { code: 'tz', name: 'Tanzania' },
            { code: 'zm', name: 'Zambia' },
            { code: 'cd', name: 'DRC' },
            { code: 'rw', name: 'Rwanda' },
            { code: 'ug', name: 'Uganda' },
        ];
        // Duplicate to fill the ring (squish closer)
        const flagCountries = [...baseFlagCountries, ...baseFlagCountries];

        const radius = 108;
        const loader = new THREE.TextureLoader();

        // Helper to create rounded rect shape
        const createRoundedRectShape = (width: number, height: number, radius: number) => {
            const shape = new THREE.Shape();
            const x = -width / 2;
            const y = -height / 2;
            shape.moveTo(x, y + radius);
            shape.lineTo(x, y + height - radius);
            shape.quadraticCurveTo(x, y + height, x + radius, y + height);
            shape.lineTo(x + width - radius, y + height);
            shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            shape.lineTo(x + width, y + radius);
            shape.quadraticCurveTo(x + width, y, x + width - radius, y);
            shape.lineTo(x + radius, y);
            shape.quadraticCurveTo(x, y, x, y + radius);
            return shape;
        };

        flagCountries.forEach((country, index) => {
            const angle = (index / flagCountries.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            // Create 3D flag with rounded corners
            const width = 25;
            const height = 15;
            const cornerRadius = 2;
            const shape = createRoundedRectShape(width, height, cornerRadius);

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 1,
                bevelEnabled: false
            });

            // Center geometry in Z (it is already centered in X/Y by shape definition)
            geometry.translate(0, 0, -0.5);

            // Fix UV mapping for the front face
            const uvAttribute = geometry.attributes.uv;
            for (let i = 0; i < uvAttribute.count; i++) {
                const u = uvAttribute.getX(i);
                const v = uvAttribute.getY(i);
                // Map from shape coordinates to 0..1
                uvAttribute.setXY(i, (u + width / 2) / width, (v + height / 2) / height);
            }

            const texture = loader.load(`https://flagcdn.com/w320/${country.code}.png`);
            texture.colorSpace = THREE.SRGBColorSpace;

            const flagMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const sideMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });

            const mesh = new THREE.Mesh(geometry, [flagMaterial, sideMaterial]);

            // Position and orient
            mesh.position.set(x, 0, z);
            mesh.lookAt(0, 0, 0); // Face the center
            mesh.rotation.y += Math.PI; // Face outward

            ringGroup.add(mesh);
        });

        // Animation Loop for the Ring
        const animate = () => {
            ringGroup.rotation.y -= 0.005;
            requestAnimationFrame(animate);
        };
        animate();
    };

    return (
        <div className="absolute inset-0 z-0">
            <Globe
                ref={globeEl}
                onGlobeReady={initFlags}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe@2.45.0/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                // Country Polygons (Subtle highlight for context, but focus on dots)
                polygonsData={countries.features.filter(
                    (d: any) => d.properties.NAME !== "Antarctica"
                )}
                polygonAltitude={(d: any) =>
                    targetCountries.includes(d.properties.NAME) ? 0.02 : 0.005
                }
                polygonCapColor={(d: any) =>
                    targetCountries.includes(d.properties.NAME)
                        ? "rgba(255, 200, 0, 0.1)" // Faint Yellow highlight
                        : "rgba(0, 0, 0, 0)" // Transparent for others
                }
                polygonSideColor={() => "rgba(255, 255, 255, 0.05)"}
                polygonStrokeColor={() => "#222"}
                onPolygonHover={setHoverD}
                polygonsTransitionDuration={300}

                width={width}
                height={height}
            />
        </div>
    );
};

export default Globe3D;
