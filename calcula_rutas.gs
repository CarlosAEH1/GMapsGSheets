function probarRutas()
{
  [
    ()=>CALCULAR_DISTANCIA_CACHE("38.723491, -9.139714", "Tour Eiffel, Paris", "transit"),
    ()=>CALCULAR_DURACION_CACHE("38.723491, -9.139714", "Tour Eiffel, Paris", "transit"),
    ()=>CALCULAR_DURACION_CACHE("38.723491, -9.139714", "Tour Eiffel, Paris")
  ]
  .forEach(f=>console.log(f()));
}

function CALCULAR_DISTANCIA_CACHE(origen, destino, modo="bicycling")
{
  return llamarCache(CALCULAR_DISTANCIA, [origen, destino, modo]);
}

function CALCULAR_DISTANCIA(origen, destino, modo="bicycling")
{
  var ruta=gmapsRoute(origen, destino, modo);
  const {legs: [{distance: {value: distance}}={}]=[]}=ruta;
  return distance;
}

function CALCULAR_DURACION_CACHE(origen, destino, modo="bicycling")
{
  return llamarCache(CALCULAR_DURACION, [origen, destino, modo]);
}

function CALCULAR_DURACION(origen, destino, modo="bicycling")
{
  var ruta=gmapsRoute(origen, destino, modo);
  const {legs: [{duration: {value: duration}}={}]=[]}=ruta;
  return duration;
}

function gmapsRoute(origen, destino, modo="bicycling")
{
  var direcciones=Maps.newDirectionFinder()
  .setOrigin(origen)
  .setDestination(destino)
  .setMode(modo)
  .getDirections()
  //console.log(direcciones);
  const {routes: [data]=[]}=direcciones;
  //console.log(data);
  return data;
}