function activarCache(llave, valor)
{
  const tiempo=5*60*60  //5 [h]
  CacheService.getDocumentCache().put(md5(llave), JSON.stringify(valor), tiempo);

}

function obtenerValor(llave)
{
  var valor=CacheService.getDocumentCache().get(md5(llave));
  try{return JSON.parse(valor);}
  catch{return null;}
}

function md5(llave)
{
  const llaveMinusculas=llave.toLowerCase().replace(/\s/g, "");
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, llaveMinusculas));
}

function llamarCache(fn, args)
{
  const llave=[fn.name].concat(args.map(v=>""+v)).join("|");
  console.log(`cache key: ${llave}`);
  var valor=obtenerValor(llave);
  if(valor!==null)
  {
    console.log("cache hit");
    return valor;
  }
  console.log("cache miss");
  valor=fn(...args);
  activarCache(llave, valor);
  return valor;
}