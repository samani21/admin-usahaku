"use client"
import React, { useEffect, useRef } from 'react'
import { StoresType } from '@/types/StoresType';
import { UserLocationType } from '../StoresType';

type Props = {
    stores: StoresType[]
    PRIMARY_COLOR: string;
    userLocation: UserLocationType | null;
    selectedStore: StoresType | null;
    setSelectedStore: (store: StoresType) => void;
}

const MapComponent = ({
    stores,
    PRIMARY_COLOR,
    userLocation,
    selectedStore,
    setSelectedStore
}: Props) => {

    const mapRef = useRef<any>(null);
    const userMarkerRef = useRef<any>(null);
    const storeMarkersRef = useRef<any[]>([]);
    const routeRef = useRef<any>(null);

    // 1️⃣ INITIALIZE MAP (Hanya Sekali)
    useEffect(() => {
        const L = window.L;
        if (!L || mapRef.current) return;

        // Inisialisasi peta dengan interaksi drag & zoom yang halus
        mapRef.current = L.map('map-container', {
            zoomControl: false,
            fadeAnimation: true,
            zoomAnimation: true
        }).setView([-6.215, 106.820], 14);

        // Tile layer minimalis & bersih (Light Mode)
        const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        L.tileLayer(tileUrl, {
            attribution: '&copy; CartoDB'
        }).addTo(mapRef.current);

    }, []);

    // 2️⃣ RENDER STORES & TOOLTIPS
    useEffect(() => {
        const L = window.L;
        if (!L || !mapRef.current) return;

        const map = mapRef.current;

        // Bersihkan marker lama
        storeMarkersRef.current.forEach(m => map.removeLayer(m));
        storeMarkersRef.current = [];

        // Custom Marker Pin Modern ala Google Maps modern
        const storeIcon = L.divIcon({
            html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                <div style="
                    background-color: ${PRIMARY_COLOR};
                    width: 30px;
                    height: 30px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 2.5px solid white;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="
                        transform: rotate(45deg);
                        width: 7px;
                        height: 7px;
                        background: white;
                        border-radius: 50%;
                    "></div>
                </div>
            </div>
            `,
            className: '',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        stores?.forEach(store => {
            const marker = L.marker([store.lat, store.lng], { icon: storeIcon })
                .addTo(map)
                .on('click', () => {
                    setSelectedStore(store);
                    map.flyTo([store.lat, store.lng], 16, { animate: true, duration: 1 });
                });

            // Tooltip Teks Nama Toko Melayang di Atas Pin
            if (store.name) {
                marker.bindTooltip(`
                    <div style="
                        background: white;
                        color: #1f2937;
                        font-weight: 700;
                        font-size: 11px;
                        padding: 4px 8px;
                        border-radius: 8px;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                        border: 1px solid #f3f4f6;
                        white-space: nowrap;
                    ">${store.name}</div>
                `, {
                    permanent: true,
                    direction: 'top',
                    offset: [0, -32],
                    className: 'custom-clean-tooltip'
                });
            }

            storeMarkersRef.current.push(marker);
        });

    }, [stores, PRIMARY_COLOR, setSelectedStore]);

    // 3️⃣ USER LOCATION MARKER WITH PULSING RADAR
    useEffect(() => {
        const L = window.L;
        if (!L || !userLocation || !mapRef.current) return;

        const map = mapRef.current;
        const latlng: [number, number] = [userLocation.lat, userLocation.lng];

        // Penanda user dengan animasi gelombang/radar (Ping effect)
        const userIcon = L.divIcon({
            html: `
            <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                <div style="
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: ${PRIMARY_COLOR};
                    opacity: 0.25;
                    border-radius: 50%;
                    animation: pulse-radar 2s infinite ease-out;
                "></div>
                <div style="
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    background: ${PRIMARY_COLOR};
                    border: 2.5px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                "></div>
            </div>
            <style>
                @keyframes pulse-radar {
                    0% { transform: scale(0.6); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
            </style>
            `,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        if (!userMarkerRef.current) {
            userMarkerRef.current = L.marker(latlng, { icon: userIcon }).addTo(map);
            map.flyTo(latlng, 15, { animate: true, duration: 1.5 });
        } else {
            userMarkerRef.current.setLatLng(latlng);
        }

    }, [userLocation, PRIMARY_COLOR]);

    // 4️⃣ ROUTING INTERACTION (Fly To Selected Store & Draw Line)
    useEffect(() => {
        const initRouting = async () => {
            const L: any = window.L;
            if (!L || !mapRef.current) return;

            await import('leaflet-routing-machine');

            const map = mapRef.current;

            if (routeRef.current) {
                map.removeControl(routeRef.current);
                routeRef.current = null;
            }

            if (!selectedStore || !userLocation) return;

            const userLatLng = L.latLng(userLocation.lat, userLocation.lng);
            const storeLatLng = L.latLng(selectedStore.lat, selectedStore.lng);

            // Jalankan animasi transisi kamera fokus ke target rute baru
            map.flyTo([selectedStore.lat, selectedStore.lng], 15, { animate: true, duration: 1 });

            routeRef.current = L.Routing.control({
                waypoints: [userLatLng, storeLatLng],
                lineOptions: {
                    styles: [
                        { color: '#e2e8f0', weight: 7, opacity: 0.7 }, // Garis outline abu-abu lembut
                        { color: PRIMARY_COLOR, weight: 4, opacity: 1 } // Garis rute utama
                    ]
                },
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: false, // Dimatikan agar tidak tabrakan dengan flyTo kustom kita
                show: false,
                createMarker: () => null
            }).addTo(map);
        };

        initRouting();
    }, [selectedStore, userLocation, PRIMARY_COLOR]);

    return (
        <div className="relative w-full h-full p-2 bg-zinc-50 rounded-[2.5rem] shadow-inner">
            {/* Map Container dengan border lembut bergaya dashboard premium */}
            <div
                id="map-container"
                className="h-full w-full rounded-[2.2rem] overflow-hidden border border-zinc-200/60 bg-zinc-100"
            />
        </div>
    );
};

export default MapComponent;