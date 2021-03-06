import { useState } from 'react';
import { Labelled } from '../common/Labelled';
import { NumberInput } from '../common/NumberInput';
import { defaultMapSettings, MapSettings } from './MapSettings';
import { defaultMapState, MapState } from './MapState';
import { MapWidget } from './MapWidget';
import './MapWidgetDemo.css';
import { TileLayerSettings, TileLayerSettingsClass } from './TileLayerSettings';

export function MapWidgetDemo() {
	const [maxWidth, setMaxWidth] = useState<number>(2000);
	const [maxHeight, setMaxHeight] = useState<number>(1000);
	const [mapState, setMapState] = useState<MapState>(defaultMapState);
	const [mapSettings, setMapSettings] = useState<MapSettings>(defaultMapSettings);
	const centerStep = 10 * Math.pow(0.5, mapState.mapZoom);
	const [layersArray, setLayersArray] = useState<ReadonlyArray<TileLayerSettings>>([
		new TileLayerSettingsClass(),
		new TileLayerSettingsClass(),
		new TileLayerSettingsClass(),
	]);
	const layers = [
		{ name: 'transport', link: 'https://tile.memomaps.de/tilegen/' },
		{ name: 'hiking', link: 'https://tile.waymarkedtrails.org/hiking/' },
		{ name: 'railways', link: 'https://a.tiles.openrailwaymap.org/signals/' },
	];
	return (
		<div className="MapWidgetDemo">
			<div className="MapWidgetDemo-state">
				<Labelled label="max width">
					<NumberInput
						min={0}
						max={10000}
						step={1}
						value={maxWidth}
						onChange={setMaxWidth}
					></NumberInput>
				</Labelled>
				<Labelled label="max height">
					<NumberInput
						min={0}
						max={10000}
						step={1}
						value={maxHeight}
						onChange={setMaxHeight}
					></NumberInput>
				</Labelled>
				<Labelled label="centerX">
					<NumberInput
						min={-10}
						max={10}
						step={centerStep}
						value={mapState.centerX}
						onChange={value => setMapState({ ...mapState, centerX: value })}
					></NumberInput>
				</Labelled>
				<Labelled label="centerY">
					<NumberInput
						min={-10}
						max={10}
						step={centerStep}
						value={mapState.centerY}
						onChange={value => setMapState({ ...mapState, centerY: value })}
					></NumberInput>
				</Labelled>
				<Labelled label="wheelSpeed">
					<NumberInput
						min={-1000}
						max={1000}
						step={1}
						value={mapSettings.wheelSpeed}
						onChange={value => setMapSettings({ ...mapSettings, wheelSpeed: value })}
					></NumberInput>
				</Labelled>
				<Labelled label="zoom">
					<NumberInput
						min={mapSettings.minZoom}
						max={mapSettings.maxZoom}
						step={0.5}
						value={mapState.mapZoom}
						onChange={value => setMapState({ ...mapState, mapZoom: value })}
					></NumberInput>
				</Labelled>
				<Labelled label="Layers">
					{
						layers.map((item, index) => {
							return (
								<Labelled key={item.link} label={item.name}>
									<input
										type="checkbox"
										checked={layersArray[index].enabled}
										onChange={
											event => {
												Object.assign(layersArray[index], { enabled: event.target.checked, getTileUrl: (x: number, y: number, z: number) => `${item.link}${z}/${x}/${y}.png` });
												setLayersArray([...layersArray]);
											}
										}>
									</input>
								</Labelled>);
						})
					}
				</Labelled>
				<Labelled label="debug">
					<input
						type="checkbox"
						checked={mapSettings.debug}
						onChange={event => setMapSettings({ ...mapSettings, debug: event.target.checked })}
					></input>
				</Labelled>
			</div>
			<MapWidget
				mapState={mapState}
				onMapStateChange={setMapState}
				mapSettings={mapSettings}
				style={{
					maxWidth,
					maxHeight,
				}}
				tileLayerSettings={layersArray}
			></MapWidget>
		</div>
	);
}
