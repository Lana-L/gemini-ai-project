Build a static website (no backend) using React JS that queries the Mevo APIs (specifically the public endpoints) and displays the position of Mevo vehicles on a map.

https://developer.mevo.co.nz/docs/public/vehicles/

Example Request
curl https://api.mevo.co.nz/public/vehicles/wellington

Response
Status: 200 OK
{
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": ["174.821595", "-41.308734"]
},
"properties": {
"iconUrl": "https://assets.mevo.co.nz/../asset.png"
}
},
{...}
]
}
}

Suggestions/hints:

● An example map screenshot is available on the public endpoints page of our developer site, and there is a vanilla JS/JQuery example on the home zone page of our marketing website. https://developer.mevo.co.nz/img/mevo-home-zone-map.jpg

● Our brand assets (colours, logos) are available on the introduction page of our developer site. https://developer.mevo.co.nz/brand/

● Putting your code in a new public Github repository makes it easy to send over for us to look at, and you could easily set up hosting with a Github Pages project site to put it live for free.
