$(function (){
    $(window).on('load',function(){
        
        mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYWtha295byIsImEiOiJja2dyemduNWkwNmdnMnFwYnVrcHAzN25xIn0.XFJvnmTjjxhZBmDgRtnOSQ';
     
        // マップ初期セット
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/tanakakoyo/ckkcicedz2juq17pkw3ftnbyi',
            center: [39.2748588, -6.8177007],
            zoom: 16
        });
        // オプション機能セット[経路検索]
        map.addControl(
            new MapboxDirections({accessToken: mapboxgl.accessToken}),
            'top-left'
        );
        // オプション機能セット[現在地取得]
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {enableHighAccuracy: false},
            trackUserLocation: true,
            showUserLocation: true
        }));
        // オプション機能セット[拡大・縮小]
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
   
        // JSONの薬局リスト情報取得 & マーカー作成
        $.getJSON("pharmacylist.json" , function(data) {
 
            for(var index = 0; index < data.length; index++) {
            
                var pharmacy = data[index];
                var el = document.createElement('div');
                el.className = 'marker';
                // マーカーセット
                new mapboxgl
                    .Marker(el)
                    .setLngLat([pharmacy["place"]["lng"], pharmacy["place"]["lat"]])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                    '<table>'+
                        '<tr>'+
                            '<th>Name</th>'+
                            '<td>'+(pharmacy["name"]? pharmacy["name"]:"-")+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Adrress</th>'+
                            '<td>'+(pharmacy["address"]? pharmacy["address"]:"-")+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Tel</th>'+
                            '<td>'+(pharmacy["tel"]? pharmacy["tel"]:"-")+'</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>Open</th>'+
                            '<td>'+(pharmacy["open"]? pharmacy["open"]:"-")+'</td>'+
                        '</tr>'+
                        '</table>'
                    ))
                    .addTo(map);
            }
        });
    });
})