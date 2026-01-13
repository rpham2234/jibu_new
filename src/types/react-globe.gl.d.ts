declare module "react-globe.gl" {
    import { Component } from "react";

    export interface GlobeMethods {
        controls: () => any;
        pointOfView: (coords: { lat: number; lng: number; altitude: number }, duration?: number) => void;
    }

    export interface GlobeProps {
        ref?: any;
        globeImageUrl?: string;
        bumpImageUrl?: string;
        backgroundImageUrl?: string;
        backgroundColor?: string;
        lineHoverPrecision?: number;
        polygonsData?: any[];
        polygonAltitude?: number | ((d: any) => number);
        polygonCapColor?: string | ((d: any) => string);
        polygonSideColor?: string | ((d: any) => string);
        polygonStrokeColor?: string | ((d: any) => string);
        polygonLabel?: string | ((d: any) => string);
        onPolygonHover?: (d: any) => void;
        polygonsTransitionDuration?: number;
        labelsData?: any[];
        labelLat?: string | ((d: any) => number);
        labelLng?: string | ((d: any) => number);
        labelText?: string | ((d: any) => string);
        labelSize?: string | ((d: any) => number);
        labelDotRadius?: string | ((d: any) => number);
        labelColor?: string | ((d: any) => string);
        labelResolution?: number;
        width?: number;
        height?: number;
        onGlobeReady?: () => void;
    }

    export default class Globe extends Component<GlobeProps> { }
}
