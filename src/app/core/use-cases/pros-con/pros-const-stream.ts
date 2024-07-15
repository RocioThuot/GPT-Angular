import { OrthographyResponse } from "app/interfaces";
import { environment } from "environments/environment.development";

 export async function* prosConsUseCaseStream(prompt: string, abortSignal:AbortSignal)  {

  try{
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`,{
      method:'POST',
      headers: {
        'Content-type': 'application/json'

      },
      body: JSON.stringify({prompt}),
      signal: abortSignal
    })
    if( !resp.ok) throw new Error('no se pudo realizar la correción')

  const reader = resp.body?.getReader();
  if(!reader){
    throw new Error('No se pudo localizar el reader')

  }

  const decoder = new TextDecoder();
    let text = '';

  while(true){
    const {value, done} = await reader.read();

    if( done ) {
      break
    }

    const decodedChunk = decoder.decode(value,{ stream: true});
    text+= decodedChunk;
    yield text
  }
  return text;

  }catch(error){
   return null;
}
 }
