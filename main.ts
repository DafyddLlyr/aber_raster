import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

const parser = new WMTSCapabilities();

fetch('https://lle.gov.wales/services/tiles/lidar/wmts')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    const result = parser.read(text);
    const options = optionsFromCapabilities(result, {
      layer: '50cm_dsm',
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: new WMTS(options)
        }),
      ],
      target: 'map',
      view: new View({
        center: [-455029.629382, 6874593.449912],
        zoom: 16,
      }),
    });
  });